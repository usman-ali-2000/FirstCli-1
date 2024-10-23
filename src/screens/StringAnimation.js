import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';

const { height } = Dimensions.get('window'); // Get screen height for animation

const StringAnimation = () => {
    const objectY = useRef(new Animated.Value(height - 100)).current; // Start at the bottom (height of the screen)

    const [value, setValue] = useState(false);
    // Function to animate the object upwards
    const moveObjectToTop = () => {
        setValue(!value);
        const targetValue = value ? -500 : 50; // Move to the top or back to the bottom

        Animated.timing(objectY, {
            toValue: targetValue, // Move to the top
            duration: 2000, // Duration of the animation (2 seconds)
            useNativeDriver: false, // Disable native driver for height animation
        }).start();
    };

    useEffect(()=>{
        moveObjectToTop();
    },[]);

    // Calculate string height dynamically based on objectY value
    const stringHeight = objectY.interpolate({
        inputRange: [-500, height - 600], // From top to bottom
        outputRange: [50, height], // String shrinks as object moves up
        extrapolate: 'clamp', // Prevent values outside the range
    });

    return (
        <View style={styles.container}>
            {/* Button to trigger animation */}
            {/* <Button title="Move Object to Top" onPress={moveObjectToTop} /> */}

            {/* String dynamically adjusting its height */}
            <Animated.View style={[styles.string, { height: stringHeight }]} />

            {/* Animated object (circle) */}
            <Animated.View style={[styles.object, { transform: [{ translateY: objectY }] }]}>
                <TouchableOpacity onPress={() => { moveObjectToTop(); }} style={{ height: 50, width: 50, backgroundColor: 'orange', alignSelf: 'center', borderRadius: 25 }} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        width: '100%',
    },
    string: {
        position: 'absolute',
        width: 2, // Thickness of the string
        backgroundColor: 'black',
        top: 50, // Start the string from a fixed top position
        left: '50%', // Center the string horizontally
        transform: [{ translateX: -1 }], // Center the string perfectly (since width is 2)
    },
    object: {
        width: 50,
        height: 50,
        backgroundColor: 'blue', // Color of the object
        borderRadius: 25, // Make it circular
        position: 'absolute',
        bottom: 50, // Initial bottom position (this is ignored by Animated.Value)
    },
});

export default StringAnimation;
