import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import theme, { colors, wp } from "../Theme/GlobalTheme";
import Button from "../components/Button";

const CELL_COUNT = 6;

const ForgotOTP = ({navigation}) => {

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  return (
    <View style={styles.MainContainer}>
      <View style={{marginTop:'80%', width:'100%'}}> 
        <Text style={{ color: theme.colors.white, width: '90%', marginBottom:'2%', fontFamily:'Gilroy-SemiBold', alignSelf:'center' }}>Enter OTP</Text>
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
        {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue} /> : <Button backgroundColor={theme.colors.green} text="Verify" onPress={()=>navigation.replace('ChangePassword')} />}
      </View>
    </View>
  );
};

export default ForgotOTP;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: theme.colors.black,
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
