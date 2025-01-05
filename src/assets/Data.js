import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-popup-menu";
import theme from "../Theme/GlobalTheme";
import NetInfo from '@react-native-community/netinfo';

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

export const timeAgo = (inputTime) => {
    const now = new Date();
    const past = new Date(inputTime);
    const diffInMs = now - past;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} mins ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days < 7) return `${days} day ago`;
    if (weeks < 4) return `${weeks} week ago`;
    if (months < 12) return `${months} mon ago`;
    return `${years} yrs ago`;
}

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



export const transferNfuc = async (senderId, receiverId, coins) => {
    const url = `${BaseUrl}/transfer-nfuc`;

    // const url = `http://192.168.100.14:8000/transfer-nfuc`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderId: senderId,
                receiverId: receiverId,
                amount: coins,
            }),
        });

        const data = await response.json();
        console.log('Transfer result:', data, senderId, receiverId);

        if (response.ok) {
            console.log('Transfer successful!');
            Alert.alert('Tranfer Successfull');
        } else {
            console.error('Transfer failed:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


export const withdraw = async (senderId, receiverId, amount, address) => {
    const url = `${BaseUrl}/transhistory`;

    // const url = `http://192.168.100.14:8000/transfer-nfuc`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: senderId,
                receiver: receiverId,
                usdt: amount,
                address: address
            }),
        });

        const data = await response.json();
        console.log('Transfer result:', data, senderId, receiverId);

        if (response.ok) {
            console.log('Withdraw request successful!');
            Alert.alert('Withdraw request sent Successfull');
        } else {
            console.error('Withdraw failed:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


export const sendNotification = async (receiverId, heading, subHeading, path) => {

    const url = `${BaseUrl}/notification`;

    // const url = `http://192.168.100.14:8000/notification`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                receiver: receiverId,
                heading: heading,
                subHeading: subHeading,
                path: path,
            }),
        });

        const data = await response.json();
        console.log('notification data:', data);

        if (response.ok) {
            console.log('Notification successful!');
        } else {
            console.error('Notification failed:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


export const updateNotification = async (notificationId, updatedData) => {
    const url = `${BaseUrl}/notification/${notificationId}`;
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Pass the updated fields here
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Notification updated successfully:', data);
            return data; // Return the updated notification
        } else {
            console.error('Failed to update notification:', data);
        }
    } catch (error) {
        console.error('Error updating notification:', error);
    }
};



export const fetchData = async () => {
    const id = await AsyncStorage.getItem("id");
    try {
        const response = await fetch(`${BaseUrl}/register/${id}`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log('error fetching...', e);
    }
}


export const sendEmail = async (email, subject, text) => {
    const connection = await NetInfo.fetch().then(state => state.isConnected);
    if (!connection) {
        ToastAndroid.show("No internet", ToastAndroid.SHORT);
        return;
    }

    const url = `${BaseUrl}/send-email`;
    const emailData = {
        email: email,
        text: text,
        subject: subject, 
        
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        if (response.ok) {
            ToastAndroid.show("Email sent successfully", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Failed to send email", ToastAndroid.SHORT);
        }
    } catch (error) {
        ToastAndroid.show("Error sending email", ToastAndroid.SHORT);
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
                        textAlign: 'center'
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
                        textAlign: 'center'
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
                        textAlign: 'center'
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