import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Home from "../screens/Home/Index";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AddCategory from "../screens/AddCategory";
import Friends from "../screens/Friends";
import Leadership from "../screens/Leadership";
import Profile from "../screens/Profile";
import Task from "../screens/Task";
import { TouchableOpacity } from "react-native";
import BackgroundTimerExample from "../components/BackgroundTimerExample";
import Plan from "../screens/Plan";

const Tab = createBottomTabNavigator();

const BottomNav = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  //   const [userId, setUserId] = useState(null);

  //   // Fetch the id from AsyncStorage
  //   useEffect(() => {
  //     const fetchUserId = async () => {
  //       const id = await AsyncStorage.getItem("id");
  //       setUserId(id);
  //     };
  //     fetchUserId();
  //   }, []);


  const ModalShow = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable onPress={() => setModalVisible(!modalVisible)}
          style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', justifyContent: 'flex-end' }}
        >
          <View style={{ backgroundColor: theme.colors.white, height: '50%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <BackgroundTimerExample onCancel={() => setModalVisible(!modalVisible)} />
          </View>
        </Pressable>
      </Modal>
    )
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: '8%',
            backgroundColor: theme.colors.lightPink
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              height: "40%",
              fontSize: 12,
              fontFamily: "OpenSans-Regular",
            },
            tabBarActiveBackgroundColor: theme.colors.white,
            tabBarInactiveBackgroundColor: theme.colors.white,
            tabBarActiveTintColor: theme.colors.purple,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Icon name="home" size={28} color={focused ? theme.colors.purple : theme.colors.darkGrey} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Gilroy-SemiBold",
                    color: focused ? theme.colors.purple : theme.colors.darkGrey,
                  }}>
                  Home
                </Text>
              </View>
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              height: "40%",
              fontSize: 12,
              fontFamily: "OpenSans-Regular",
            },
            tabBarActiveBackgroundColor: theme.colors.white,
            tabBarInactiveBackgroundColor: theme.colors.white,
            tabBarActiveTintColor: theme.colors.white,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialIcon name="attribution" size={28} color={focused ? theme.colors.purple : theme.colors.darkGrey} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Gilroy-SemiBold",
                    color: focused ? theme.colors.purple : theme.colors.darkGrey,
                  }}>
                  Friends
                </Text>
              </View>
            ),
          }}
          name="Friends"
          component={Friends}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              height: "40%",
              fontSize: 12,
              fontFamily: "OpenSans-Regular",
            },
            tabBarActiveBackgroundColor: theme.colors.white,
            tabBarInactiveBackgroundColor: theme.colors.white,
            tabBarActiveTintColor: theme.colors.white,
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignItems: "center", height: 60, width: 60, backgroundColor: theme.colors.purple, alignItems: 'center', justifyContent: 'center', marginBottom: 50, borderRadius: 100, borderWidth: 2, borderColor: theme.colors.white }}>
                <MaterialIcon name="rocket-launch" size={36} color={theme.colors.white} />
              </TouchableOpacity>
            ),
          }}
          name="Mining"
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              height: "40%",
              fontSize: 12,
              fontFamily: "OpenSans-Regular",
            },
            tabBarActiveBackgroundColor: theme.colors.white,
            tabBarInactiveBackgroundColor: theme.colors.white,
            tabBarActiveTintColor: theme.colors.white,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialIcon name="assignment" size={26} color={focused ? theme.colors.purple : theme.colors.darkGrey} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Gilroy-SemiBold",
                    color: focused ? theme.colors.purple : theme.colors.darkGrey,
                  }}>
                  Plan
                </Text>
              </View>
            ),
          }}
          name="Plan"
          component={Plan}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              height: "40%",
              fontSize: 12,
              fontFamily: "OpenSans-Regular",
            },
            tabBarActiveBackgroundColor: theme.colors.white,
            tabBarInactiveBackgroundColor: theme.colors.white,
            tabBarActiveTintColor: theme.colors.white,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialIcon name="ads-click" size={28} color={focused ? theme.colors.purple : theme.colors.darkGrey} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Gilroy-SemiBold",
                    color: focused ? theme.colors.purple : theme.colors.darkGrey,
                  }}>
                  Leadership
                </Text>
              </View>
            ),
          }}
          name="Leadership"
          component={Leadership}
        />
      </Tab.Navigator>
      <ModalShow />
    </>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  home: {
    height: 24,
    width: 24,
    marginTop: "2%",
  },
  profile: {
    height: 21,
    width: 16,
  },
  activity: {
    height: 22,
    width: 16,
  },
});
