import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import theme from '../Theme/GlobalTheme';
import { addCoins, addReferCoins } from '../assets/Data';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';



const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2692954530817995/2872900955';

const interstitialAd = InterstitialAd.createForAdRequest(adUnitId);

const BackgroundCountdownTimer = (props) => {
  const [timeDiff, setTimeDiff] = useState('');
  const intervalIdRef = useRef(null); // Use ref to store interval ID

  useEffect(() => {
    const initializeTimer = async () => {
      try {
        let endTime = await AsyncStorage.getItem('endTime');
        if (!endTime) {
          endTime = moment().add(24, 'hours').format('MM/DD/YYYY HH : mm : ss');
          await AsyncStorage.setItem('endTime', endTime);
        }
        startCountdown(endTime);
      } catch (error) {
        console.error('Failed to initialize timer:', error);
      }
    };

    initializeTimer();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // Ensure cleanup
      }
    };
  }, []);

  const startCountdown = (endTime) => {
    const timer = setInterval(() => {
      const now = moment().format('MM/DD/YYYY HH : mm : ss');
      const remainingTime = calculateRemainingTime(now, endTime);
      if (remainingTime === "00 : 00 : 00") {
        clearInterval(timer);
      }
      setTimeDiff(remainingTime);
    }, 1000);

    intervalIdRef.current = timer;
  };

  const resetTimer = async () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    const newEndTime = moment().add(24, 'hours').format('MM/DD/YYYY HH : mm : ss');
    await AsyncStorage.setItem('endTime', newEndTime);
    setTimeDiff("24 : 00 : 00");
    startCountdown(newEndTime);
  };


  const claimCoin = async () => {
    if (timeDiff === "00 : 00 : 00") {
      addCoins(50);
      addReferCoins(Math.floor(50 * 3 / 100));
      await resetTimer();
      ToastAndroid.show("You Got 50 Coins", ToastAndroid.LONG);
    } else {
      ToastAndroid.show("Wait ...", ToastAndroid.SHORT);
    }
    // console.log('timediff', timeDiff);
  };

  const calculateRemainingTime = (now, end) => {
    const ms = moment(end, 'MM/DD/YYYY HH : mm : ss').diff(moment(now, 'MM/DD/YYYY HH : mm : ss'));
    if (ms <= 0) return "00 : 00 : 00";
    const duration = moment.duration(ms);
    const hours = String(Math.floor(duration.asHours())).padStart(2, '0');
    const minutes = String(duration.minutes()).padStart(2, '0');
    const seconds = String(duration.seconds()).padStart(2, '0');
    return `${hours} : ${minutes} : ${seconds}`;
  };


  useEffect(() => {
    const unsubscribe = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        interstitialAd.show();
    });

    interstitialAd.load();

    return unsubscribe;
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        {timeDiff === "00 : 00 : 00" ?
          <Text style={{ fontSize: 24, fontFamily: 'Gilroy-Bold', color: theme.colors.purple }}>Your Coins Are Ready...</Text> :
          <Text style={styles.timeText}>{timeDiff}</Text>}
        <Text style={styles.description}>Claim Your Daily Coins</Text>
      </View>
      <Image source={require('../assets/images/coins.png')} style={styles.coinImage} />
      <Text style={styles.coinAmount}>50 $</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={claimCoin} style={[styles.claimButton, { backgroundColor: timeDiff === "00 : 00 : 00" ? theme.colors.green : theme.colors.grey }]}>
          <Text style={styles.buttonText}>Claim Now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '0%',
    paddingBottom: '5%',
  },
  timeContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: '10%'
  },
  timeText: {
    fontSize: 30,
    color: theme.colors.purple,
    fontFamily: 'Gilroy-SemiBold',
  },
  description: {
    fontSize: 14,
    color: theme.colors.purple,
    fontFamily: 'Gilroy-SemiBold',
    paddingTop: '5%',
    textAlign: 'center',
    width: '40%',
  },
  coinImage: {
    height: 50,
    width: 50,
    marginTop: '5%',
  },
  coinAmount: {
    fontSize: 30,
    color: theme.colors.purple,
    fontFamily: 'Gilroy-SemiBold',
  },
  buttonsContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  claimButton: {
    padding: 10,
    width: '48%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.red,
    padding: 10,
    width: '48%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
  },
});

export default BackgroundCountdownTimer;
