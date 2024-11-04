import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import forge from 'node-forge';

const AbhaExample = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [txnId, setTxnId] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Function to generate session token (accessToken)
  const generateSessionToken = async () => {
    try {
      const response = await axios.post(
        'https://dev.abdm.gov.in/api/hiecm/gateway/v3/sessions',
        {
          clientId: 'SBXID_008175', // Replace with actual clientId
          clientSecret: '1fa1cd7f-a2bb-468b-b6c2-cc16d725cbdf', // Replace with actual clientSecret
          grantType: 'client_credentials',
        }
      );
      return response.data.accessToken; // Use accessToken in the response
    } catch (error) {
      console.error('Error generating session token:', error);
      return null;
    }
  };

  // Function to fetch the public key
  const getPublicKey = async () => {
    try {
      const response = await axios.get('https://healthidsbx.abdm.gov.in/api/v1/auth/cert');
      return response.data; // Return the full public key
    } catch (error) {
      console.error('Error fetching public key:', error);
      return null;
    }
  };

  // Encrypt data using RSA public key
  const encryptData = (dataToEncrypt, publicKeyPem) => {
    try {
      // Remove the 'BEGIN' and 'END' lines from the PEM key
      const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
      // Encrypt the data using the public key
      const encryptedData = publicKey.encrypt(dataToEncrypt, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      });
      // Convert encrypted data to base64 format
      const encryptedBase64 = forge.util.encode64(encryptedData);
      return encryptedBase64;
    } catch (error) {
      console.error('Error encrypting data:', error);
      return null;
    }
  };

  // Function to send Aadhaar OTP
  const sendAadhaarOtp = async (encryptedAadhaar, txnId) => {
    const authToken = await generateSessionToken(); // Step 1: Generate session token
    if (!authToken) {
      return; // Handle error case
    }

    try {
      const response = await axios.post(
        'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/request/otp',
        {
          txnId: txnId, // Transaction ID, optional or generated from previous steps
          scope: ['abha-enrol'],
          loginHint: 'aadhaar',
          loginId: encryptedAadhaar, // Encrypted Aadhaar number
          otpSystem: 'aadhaar',
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add session token here
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('OTP sent successfully:', response.data);
      return response.data.txnId; // Save txnId for OTP verification
    } catch (error) {
      console.error('Error sending Aadhaar OTP:', error);
      return null;
    }
  };

  // Handle Aadhaar form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (aadhaar.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number.');
    } else {
      setError('');
      const publicKey = await getPublicKey(); // Step 1: Get public key
      if (!publicKey) {
        setError('Failed to fetch public key.');
        return;
      }

      const encryptedAadhaar = encryptData(aadhaar, publicKey); // Step 2: Encrypt Aadhaar number
      if (!encryptedAadhaar) {
        setError('Failed to encrypt Aadhaar number.');
        return;
      }

      const newTxnId = await sendAadhaarOtp(encryptedAadhaar, txnId); // Step 3: Send OTP
      if (newTxnId) {
        setTxnId(newTxnId); // Save txnId for OTP verification
        setOtpSent(true); // Update UI to show OTP sent status
        navigate('/otp-verification', { state: { txnId: newTxnId } }); // Navigate to OTP verification page
      } else {
        setError('Failed to send OTP.');
      }
    }
  };

  return (
    <div>
      <h1>Aadhaar OTP Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Aadhaar number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {otpSent && <p style={{ color: 'green' }}>OTP sent successfully!</p>}
    </div>
  );
};

export default AbhaExample;
