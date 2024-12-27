import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Keyboard, ActivityIndicator, ToastAndroid, Alert } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import theme, { colors, wp } from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl } from "../assets/Data";

const CELL_COUNT = 6;

const EnterOTP = ({ navigation, route }) => {

  const name = route.params.name;
  const phone = route.params.phone;
  const email = route.params.email;
  const password = route.params.password;
  const otp = route.params.otp;
  const referalId = route.params.referalId;

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  useEffect(() => {
    console.log('data:', name, email, phone, password, typeof (otp.toString()), typeof (value));
  }, []);

  const handleSubmit = async () => {

    setLoading(true);

    if (otp.toString() !== value) {
      ToastAndroid.show('incorrect OTP', ToastAndroid.SHORT);
      setLoading(false);
      return;
    }

    const data = {
      name,
      phone: Number(phone),
      email,
      userId: referalId,
      password,
    };

    try {
      // console.log("Sending data:", typeof data.phone);  // Add logging to see the payload sent
      const response = await fetch(`${BaseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log("Response JSON:", json);  // Log the response from the server

      if (response.status === 201) {
        Alert.alert('Successfully Registered');
        navigation.navigate('Login');  // Automatically redirect to login after successful registration
      } else {
        // Handle unsuccessful registration
        Alert.alert('Registration failed', json.msg || 'Please try again');
      }

    } catch (e) {
      console.log('Error during signup:', e);  // Log any network or API errors
      Alert.alert('An error occurred during registration. Please try again later.');
    }
    setLoading(false);
  };




  return (
    <View style={styles.MainContainer}>
      <View style={{ marginTop: '80%', width: '100%' }}>
        <Text style={{ color: theme.colors.white, width: '90%', marginBottom: '2%', fontFamily: 'Gilroy-SemiBold', alignSelf: 'center' }}>Enter OTP</Text>
        <View style={styles.BoxContainer}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={(text) => {
              setValue(text);
              if (text.length === CELL_COUNT) {
                Keyboard.dismiss();
              }
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
      </View>
      <View style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-end', marginBottom: '10%' }}>
        {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue} /> : <Button backgroundColor={theme.colors.green} text="Verify" onPress={handleSubmit} />}
      </View>
    </View>
  );
};

export default EnterOTP;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: theme.colors.white,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  codeFieldRoot: {},
  cell: {
    width: '40%',
    height: 50,
    borderRadius: 6,
    fontSize: 24,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.white,
    textAlign: "center",
    color: theme.colors.black,
    marginHorizontal: "5%",
    paddingTop: '5%'
  },
  focusCell: {
    borderColor: theme.colors.green,
    borderWidth: 2
  },
  BoxContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
});
