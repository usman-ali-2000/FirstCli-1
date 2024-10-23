import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity, Image, Pressable, Modal } from 'react-native';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');
const GRID_SIZE = 15;
const CELL_SIZE = width / GRID_SIZE;

const SnakeGame = () => {
    // Initial state of the snake and food
    const [snake, setSnake] = useState([[5, 5]]); // Array of coordinates [x, y]
    const [food, setFood] = useState([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
    const [direction, setDirection] = useState([1, 0]); // [x, y] direction
    const [isGameOver, setIsGameOver] = useState(false);
    const [coins, setCoins] = useState(snake.length - 1);
    const [timeLeft, setTimeLeft] = useState(60);
    const [modalVisible, setModalVisible] = useState(false);

    // Helper function to generate new food position
    const generateFood = () => {
        return [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
    };

    // Function to update snake's position
    const moveSnake = () => {
        const newSnake = [...snake];
        const head = newSnake[newSnake.length - 1];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];
        // Check if snake hits the walls
        if (newHead[0] < 0 || newHead[0] >= GRID_SIZE || newHead[1] < 0 || newHead[1] >= GRID_SIZE) {
            setIsGameOver(true);
            setModalVisible(true);
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

    // Game loop for moving the snake periodically
    useEffect(() => {
        if (timeLeft === 0) {
            setModalVisible(true);
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
        // const interval = setInterval(() => {
        //     if (!isGameOver && timeLeft !== 0) { moveSnake() };
        //     setCoins((snake.length - 1) * 10);
        // }, 200); // Speed of the game (200ms for each move)
        // return () => clearInterval(interval);
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
            {/* {isGameOver ? (
                <View style={styles.gameOver}>
                    <Text style={styles.gameOverText}>Game Over</Text>
                    <Button title="Restart" onPress={restartGame} />
                </View>
            ) : ( */}
            <>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between', marginBottom: '5%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/images/time.png')} style={{ height: CELL_SIZE, width: CELL_SIZE }} />
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: '5%' }}>
                            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                        </Text>
                    </View>
                    {/* {timeLeft === 0 && (
                            <TouchableOpacity onPress={restartGame}>
                                <Text style={{ fontSize: 24, color: 'red' }}>Time's up!</Text>
                            </TouchableOpacity>)} */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FastImage source={require('../assets/images/dollar.gif')} style={{ height: CELL_SIZE, width: CELL_SIZE }} />
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>{coins}</Text>
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
            {/* )} */}
            <View style={styles.controls}>
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
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Pressable style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.55)' }}>
                    <FastImage source={require('../assets/images/icon.gif')} style={{ height: CELL_SIZE * 4, width: CELL_SIZE * 4 }} />
                    {timeLeft === 0 && (
                        <TouchableOpacity onPress={restartGame}>
                            <Text style={{ fontSize: 24, color: 'red' }}>Time's up!</Text>
                        </TouchableOpacity>)}
                    {isGameOver && (
                        <TouchableOpacity onPress={restartGame}>
                            <Text style={{ fontSize: 24, color: 'red' }}>GameOver</Text>
                        </TouchableOpacity>)}
                    <TouchableOpacity onPress={restartGame}>
                        <Image source={require('../assets//images/refresh.png')} style={{ height: CELL_SIZE * 2, width: CELL_SIZE * 2, marginTop: '5%' }} />
                    </TouchableOpacity>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
    },
    grid: {
        width: width,
        height: width,
        backgroundColor: 'black',
        position: 'relative',
        borderWidth: 1,
        borderColor: 'red',
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
        backgroundColor: '#12AD2B',
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
