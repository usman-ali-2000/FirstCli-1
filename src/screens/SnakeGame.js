import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity, Image, Pressable, Modal, ActivityIndicator, Alert, BackHandler } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from "react-native-vector-icons/FontAwesome";
import theme from '../Theme/GlobalTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAttempt, addCoins, addReferCoins, BaseUrl, getCurrentDate } from '../assets/Data';
import NetInfo from '@react-native-community/netinfo';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

const { width, height } = Dimensions.get('window');
const GRID_SIZE = 15;
const CELL_SIZE = width / GRID_SIZE;


const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2692954530817995/2872900955';

const interstitialAd = InterstitialAd.createForAdRequest(adUnitId);

const SnakeGame = ({ navigation, route }) => {

    const attempt = route.params.attempt;
    const [snake, setSnake] = useState([[5, 5]]);
    const [food, setFood] = useState([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
    const [direction, setDirection] = useState([1, 0]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [coins, setCoins] = useState(snake.length - 1);
    const [timeLeft, setTimeLeft] = useState(60);
    const [modalVisible, setModalVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(null);
    const [attempts, setAttempts] = useState(attempt);


    const getCurrentDate = () => {
        const date = new Date();

        const day = date.getDate();           // Day of the month (1-31)
        const month = date.getMonth() + 1;     // Month (0-11, add 1 to get 1-12)
        const year = date.getFullYear();       // Year (e.g., 2024)

        return { day, month, year };
    };


    const date = getCurrentDate();



    // Helper function to generate new food position
    const generateFood = () => {
        return [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
    };


    const fetchData = async () => {
        const id = await AsyncStorage.getItem("id");
        try {
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const json = await response.json();
            console.log('json:', json.attempts, json.date);
            setAttempts(json.attempts);
            const formattedDate = `${date.day}/${date.month}/${date.year}`;
            if (json.date !== formattedDate) {
                console.log('json.date:', json.date, formattedDate, json.date === formattedDate);
                addAttempt(0, `${date.day}/${date.month}/${date.year}`);
            }
            console.log('id:', id);
        } catch (e) {
            console.log('error fetching...', e);
        }
    }


    useEffect(() => {
        const unsubscribe = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
            interstitialAd.show();
        });

        interstitialAd.load();

        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log('attempt:', attempt);
        fetchData();
    }, []);



    // Function to update snake's position
    const moveSnake = () => {
        const newSnake = [...snake];
        const head = newSnake[newSnake.length - 1];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];
        // Check if snake hits the walls
        if (newHead[0] < 0 || newHead[0] >= GRID_SIZE || newHead[1] < 0 || newHead[1] >= GRID_SIZE) {
            setIsGameOver(true);
            setModalVisible(true);
            if (coins > 0) {
                addCoins(coins);
                addReferCoins(Math.floor(coins * 3 / 100));
            }
            if (attempts <= 5) {
                addAttempt(attempts + 1, `${date.day}/${date.month}/${date.year}`);
                setAttempts(attempts + 1);
            }
            return;
        }
        // Check if snake eats food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setFood(generateFood());
        } else {
            newSnake.shift(); // Remove tail if no food eaten
        }

        newSnake.push(newHead);
        setSnake(newSnake);
    };

    // useEffect(() => {
    //     if (isGameOver || timeLeft === 0) {
    //         setModalVisible(true);
    //         if (coins > 0) {
    //             addCoins(coins);
    //             addReferCoins(Math.floor(coins * 3 / 100));
    //         }
    //         if (attempts <= 5) {
    //             addAttempt(attempts + 1, `${date.day}/${date.month}/${date.year}`)
    //                 .then(() => fetchData()) // Refresh attempts after updating
    //                 .catch((error) => console.error("Error fetching data:", error));
    //             setAttempts((prev) => prev + 1); // Increment locally as well
    //         }
    //         return;
    //     }
    //     const timerInterval = setInterval(() => {
    //         if (!isGameOver) {
    //             setTimeLeft((prevTime) => prevTime - 1);
    //         }
    //     }, 1000);
    //     return () => clearInterval(timerInterval);
    // }, [timeLeft, isGameOver, attempts]); // Add `attempts` dependency here


    useEffect(() => {
        // Subscribe to network state updates
        const leftTime = timeLeft;
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            console.log("Connection type:", state.type);
            console.log("Is connected?", state.isConnected);
        });

        // Unsubscribe when the component unmounts
        return () => {
            unsubscribe();
            setTimeLeft(leftTime);
        };
    }, []);

    // Game loop for moving the snake periodically
    useEffect(() => {
        if (timeLeft === 0) {
            setModalVisible(true);
            if (coins > 0) {
                addCoins(coins);
                addReferCoins(Math.floor(coins * 3 / 100));
            }
            if (attempts <= 5) {
                addAttempt(attempts + 1, `${date.day}/${date.month}/${date.year}`);
                setAttempts(attempts + 1);
            }
            return;
        }; // Stop the timer when it reaches 0   

        const timerInterval = setInterval(() => {
            if (!isGameOver) {
                setTimeLeft((prevTime) => prevTime - 1);
            }
        }, 1000); // Update every second
        return () => clearInterval(timerInterval); // Clear interval on component unmount
    }, [timeLeft]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isGameOver && timeLeft !== 0) {
                moveSnake()
            };
            setCoins((snake.length - 1) * 10);
        }, 200); // Speed of the game (200ms for each move)
        return () => clearInterval(interval);

    }, [snake, direction, isGameOver]);

    const getHeadRotation = () => {
        if (direction[0] === 1 && direction[1] === 0) return '0deg'; // Right
        if (direction[0] === -1 && direction[1] === 0) return '180deg'; // Left
        if (direction[0] === 0 && direction[1] === -1) return '-90deg'; // Up
        if (direction[0] === 0 && direction[1] === 1) return '90deg'; // Down
        return '0deg'; // Default to 0 degrees
    };

    // Restart game
    const restartGame = () => {
        setSnake([[5, 5]]);
        setFood(generateFood());
        setDirection([1, 0]);
        setIsGameOver(false);
        setTimeLeft(60);
        setModalVisible(!modalVisible);
    };

    const changeDirection = (newDirection) => {
        setDirection(newDirection);
    };

    return (
        <View style={styles.container}>
            {!isConnected || attempts >= 5 ? (
                <View style={{ flex: 1, width: '100%', backgroundColor: theme.colors.darkYellow, alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ width: '95%' }} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={18} color={theme.colors.white} style={{ marginTop: '10%', marginLeft: '5%' }} />
                    </TouchableOpacity>
                    <View style={{ width: '100%', alignItems: 'center', height: '60%' }}>
                        {!isConnected && <FastImage source={require('../assets/images/dollar.gif')} style={{ height: CELL_SIZE * 2, width: CELL_SIZE * 2 }} />}
                        {!isConnected && <Text style={{ color: theme.colors.black, fontSize: 14, marginTop: '5%' }}>Not Internet...</Text>}
                        {attempts >= 5 && <Text style={{ color: theme.colors.black, fontSize: 18, marginTop: '5%', width: '70%', textAlign: 'center', fontFamily: 'Gilroy-SemiBold', lineHeight: 25 }}>You Have Completed Your Today's 5 Attempts</Text>}
                        {attempts >= 5 && <Text style={{ color: theme.colors.red, fontSize: 14, marginTop: '2%', width: '70%', textAlign: 'center', fontFamily: 'Gilroy-SemiBold' }}>Now! You Can Play On Next Day </Text>}
                    </View>
                </View>
            ) : (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between', marginBottom: '5%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../assets/images/time.png')} style={{ height: CELL_SIZE, width: CELL_SIZE }} />
                            <Text style={{ color: theme.colors.darkYellow, fontSize: 20, fontWeight: 'bold', marginLeft: '5%' }}>
                                {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FastImage source={require('../assets/images/dollar.gif')} style={{ height: CELL_SIZE, width: CELL_SIZE }} />
                            <Text style={{ color: theme.colors.darkYellow, fontSize: 20, fontWeight: 'bold', }}>{coins}</Text>
                        </View>
                    </View>
                    <View style={styles.grid}>
                        {/* Render snake */}
                        {snake.map((segment, index) => {
                            const isHead = index === snake.length - 1; // Check if the segment is the head
                            return (
                                isHead ? <View
                                    key={index}
                                    style={[
                                        styles.snakeSegment,
                                        {
                                            left: segment[0] * CELL_SIZE,
                                            top: segment[1] * CELL_SIZE,
                                            transform: [{ rotate: getHeadRotation() }]
                                        },

                                    ]}

                                >
                                    <Image source={require('../assets/images/snake.png')} style={{ height: CELL_SIZE, width: CELL_SIZE }} />
                                </View> : <View
                                    key={index}
                                    style={[
                                        styles.snakeSegment,
                                        {
                                            left: segment[0] * CELL_SIZE,
                                            top: segment[1] * CELL_SIZE,
                                            backgroundColor: '#12AD2B',
                                        },
                                        // isHead && styles.snakeHead // Apply special style if it's the head
                                    ]}
                                />
                            );
                        })}
                        {/* Render food */}
                        <View
                            style={[styles.food, { left: food[0] * CELL_SIZE, top: food[1] * CELL_SIZE }]}
                        >
                            <FastImage source={require('../assets/images/dollar.gif')} style={{ height: CELL_SIZE, width: CELL_SIZE }} />
                        </View>
                    </View>
                </>
            )}
            {isConnected && attempts < 5 && <View style={styles.controls}>
                <TouchableOpacity onPress={() => changeDirection([0, -1])} style={styles.button}>
                    <Image source={require('../assets/images/up.png')} style={{ height: 12, width: 12 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '42%', justifyContent: 'space-between', marginLeft: '14%' }}>
                    <TouchableOpacity onPress={() => changeDirection([-1, 0])} style={styles.button}>
                        <Image source={require('../assets/images/left.png')} style={{ height: 12, width: 12 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeDirection([1, 0])} style={styles.button}>
                        <Image source={require('../assets/images/right.png')} style={{ height: 12, width: 12 }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => changeDirection([0, 1])} style={styles.button}>
                    <Image source={require('../assets/images/down.png')} style={{ height: 12, width: 12 }} />
                </TouchableOpacity>
            </View>}
            {isConnected && attempts < 5 && <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            // onRequestClose={() => {
            //     handleBackButton();
            //     setModalVisible(!modalVisible);
            // }}
            >
                <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={18} color={theme.colors.white} style={{ marginTop: '10%', marginLeft: '5%' }} />
                    </TouchableOpacity>
                    <Pressable style={{ flex: 1, marginBottom: '15%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
                        <FastImage source={require('../assets/images/icon.gif')} style={{ height: CELL_SIZE * 4, width: CELL_SIZE * 4 }} />
                        <Text style={{ fontSize: 24, color: 'white', fontFamily: 'Gilroy-Bold' }}>Attempts Left {5 - attempts}</Text>
                        {timeLeft === 0 && (
                            <TouchableOpacity onPress={restartGame}>
                                <Text style={{ fontSize: 24, color: 'red' }}>Time's up!</Text>
                            </TouchableOpacity>)}
                        {isGameOver && (
                            <TouchableOpacity onPress={restartGame}>
                                <Text style={{ fontSize: 24, color: 'red' }}>GameOver</Text>
                            </TouchableOpacity>)}
                        <TouchableOpacity onPress={restartGame} style={{ height: CELL_SIZE * 2, width: CELL_SIZE * 2, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.white }}>
                            <Image source={require('../assets//images/refresh.png')} style={{ height: CELL_SIZE * 1, width: CELL_SIZE * 1, marginTop: '5%' }} />
                        </TouchableOpacity>
                    </Pressable>
                </View>
            </Modal>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
    },
    grid: {
        width: width,
        height: width,
        backgroundColor: 'white',
        position: 'relative',
        borderWidth: 1,
        borderColor: theme.colors.darkYellow,
    },
    snakeSegment: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        position: 'absolute',
        borderRadius: 50
    },
    food: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        // backgroundColor: 'orange',
        position: 'absolute',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameOver: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    gameOverText: {
        fontSize: 30,
        marginBottom: 20,
    },
    controls: {
        flexDirection: 'column',
        // justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '10%',
    },
    button: {
        padding: 20,
        backgroundColor: theme.colors.darkYellow,
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    snakeHead: {
        // backgroundColor:'white'
    }
});

export default SnakeGame;
