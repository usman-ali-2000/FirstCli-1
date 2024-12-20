import AsyncStorage from "@react-native-async-storage/async-storage";

export const BaseUrl = "https://book-shop-api-sage.vercel.app";
// export const BaseUrl = "http://192.168.100.47:8000";

export const getCurrentDate = () => {
    const date = new Date();

    const day = date.getDate();           // Day of the month (1-31)
    const month = date.getMonth() + 1;     // Month (0-11, add 1 to get 1-12)
    const year = date.getFullYear();       // Year (e.g., 2024)

    return { day, month, year };
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

export const resetTimer = async () => {
    // Clear the current interval
    clearInterval(intervalId);

    // Set the new end time to 24 hours from now
    const newEndTime = moment().add(24, 'hours').format('MM/DD/YYYY HH:mm:ss');
    await AsyncStorage.setItem('endTime', newEndTime);

    // Restart the countdown with the new end time
    setTimeDiff("24:00:00");
    startCountdown(newEndTime);
  };


export const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};