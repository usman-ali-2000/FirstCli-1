import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-popup-menu";
import theme from "../Theme/GlobalTheme";

export const BaseUrl = "https://book-shop-api-sage.vercel.app";
export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dve7g3iz6/upload";
// export const BaseUrl = "http://192.168.100.47:8000";

export const getCurrentDate = () => {
    const date = new Date();

    const day = date.getDate();           // Day of the month (1-31)
    const month = date.getMonth() + 1;     // Month (0-11, add 1 to get 1-12)
    const year = date.getFullYear();       // Year (e.g., 2024)

    return { day, month, year };
};

export const addNfuc = async (additionalCoins, accType) => {
    const id = await AsyncStorage.getItem("id");
    try {
        const response = await fetch(`${BaseUrl}/register/${id}/add-nfuc`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ additionalCoins, accType })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Coins added successfully:", data);
        } else {
            const errorData = await response.json();
            console.error("Failed to add coins:", errorData);
        }
    } catch (error) {
        console.error("An error occurred while adding coins:", error);
    }
};


export const addCoins = async (additionalCoins) => {
    const id = await AsyncStorage.getItem("id");
    try {
        const response = await fetch(`${BaseUrl}/register/${id}/add-coins`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ additionalCoins })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Coins added successfully:", data);
        } else {
            const errorData = await response.json();
            console.error("Failed to add coins:", errorData);
        }
    } catch (error) {
        console.error("An error occurred while adding coins:", error);
    }
};


export const addReferNfuc = async (nfucRefer) => {
    const userId = await AsyncStorage.getItem("userId");
    // console.log("userId", userId);
    if (userId) {
        console.log("userId", userId);
        try {
            const response = await fetch(`${BaseUrl}/register/generated/${userId}/refer-nfuc`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nfucRefer })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Refer coins added successfully:", data);
            } else {
                const errorData = await response.json();
                console.error("Failed to add refer coins:", errorData);
            }
        } catch (error) {
            console.error("An error occurred while adding refer coins:", error);
        }
    }
};

export const addReferCoins = async (referCoins) => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
        console.log("userId", userId);
        try {
            const response = await fetch(`${BaseUrl}/register/generated/${userId}/refer-coins`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ referCoins })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Refer coins added successfully:", data);
            } else {
                const errorData = await response.json();
                console.error("Failed to add refer coins:", errorData);
            }
        } catch (error) {
            console.error("An error occurred while adding refer coins:", error);
        }
    }
};


export const addAttempt = async (attempt, date) => {
    const id = await AsyncStorage.getItem("id");
    try {
        const response = await fetch(`${BaseUrl}/attempts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ attempt, date })
        });

        const data = await response.json();
        console.log('response:', data);
        if (response.ok) {
            console.log("Attempt added successfully:", data);
        } else {
            const errorData = await response.json();
            console.error("Failed to add attempt:", errorData);
        }
    } catch (error) {
        console.error("An error occurred while adding attempt:", error);
    }
};

export const offerData = [
    require('../assets/images/offer1.png'),
    require('../assets/images/offer2.png'),
    require('../assets/images/offer2.png'),
    require('../assets/images/offer1.png'),
    require('../assets/images/offer1.png'),
]



export const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};


export const openLink = async (webUrl) => {
    try {
        await Linking.openURL(webUrl); // Open the app URL if available, otherwise the web URL
    } catch (error) {
        Alert.alert('Failed to open link', error.message);
    }
};


export const NfucMenu = (props) => {
    return (
        <View>
            <Menu
                onPressAction={({ nativeEvent }) => {
                    Alert.alert('Selected Option', `You selected: ${nativeEvent.event}`);
                }}
                style={{
                    backgroundColor: theme.colors.white,
                    marginLeft: "10%",
                    alignItems: 'center',
                    padding: 5,
                    width: 100,
                    borderRadius: 5
                }}
            >
                <TouchableOpacity onPress={props.onPress}>
                    <Text style={{
                        color: theme.colors.black,
                        fontSize: 12,
                        fontFamily: 'Gilroy-SemiBold',
                        width: 100,
                        textAlign:'center'
                    }}>
                        Send
                    </Text>
                </TouchableOpacity>
            </Menu>
        </View>
    )
}
export const WxMenu = (props) => {
    return (
        <View>
            <Menu
                onPressAction={({ nativeEvent }) => {
                    Alert.alert('Selected Option', `You selected: ${nativeEvent.event}`);
                }}
                style={{
                    backgroundColor: theme.colors.white,
                    marginLeft: "10%",
                    alignItems: 'center',
                    padding: 5,
                    width: 100,
                    borderRadius: 5
                }}
            >
                <TouchableOpacity onPress={props.onPress}>
                    <Text style={{
                        color: theme.colors.black,
                        fontSize: 12,
                        fontFamily: 'Gilroy-SemiBold',
                        width: 100,
                        textAlign:'center'
                    }}>
                        Exchange
                    </Text>
                </TouchableOpacity>
            </Menu>
        </View>
    )
}
export const UsdtMenu = (props) => {
    return (
        <View>
            <Menu
                onPressAction={({ nativeEvent }) => {
                    Alert.alert('Selected Option', `You selected: ${nativeEvent.event}`);
                }}
                style={{
                    backgroundColor: theme.colors.white,
                    marginLeft: "10%",
                    alignItems: 'center',
                    padding: 5,
                    width: 100,
                    borderRadius: 5
                }}
            >
                <TouchableOpacity onPress={props.onPress}>
                    <Text style={{
                        color: theme.colors.black,
                        fontSize: 12,
                        fontFamily: 'Gilroy-SemiBold',
                        width: 100,
                        textAlign:'center'
                    }}>
                        Withdraw
                    </Text>
                </TouchableOpacity>
            </Menu>
        </View>
    )
}

// ca-app-pub-1125964563702406~7565257761
// ca-app-pub-1125964563702406/6295444098