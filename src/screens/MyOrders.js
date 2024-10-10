import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import theme from '../Theme/GlobalTheme';
import { BaseUrl } from '../assets/Data';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrders = () => {
    const [cart, setCart] = useState([]);

    const fetchData = async () => {
        // const email = await AsyncStorage.getItem('email');
        try {
            const response = await fetch(`${BaseUrl}/cart`);
            const json = await response.json();
            console.log('json:', json);

            // const myOrders = await json.cart.filter((item)=>item.email === email);
            if (json && json.cart) {
                setCart(json.cart);
            }
        } catch (e) {
            console.log('error fetching...', e);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${BaseUrl}/cart/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus
                }),
            });

            const updatedCart = await response.json();
            if (updatedCart.success) {
                // Update the status in local state after patch request
                setCart((prevCart) =>
                    prevCart.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                console.log('Failed to update the status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.billItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Product: {item.product}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Quantity: {item.qty}</Text>
            <Text>Total: ${item.price * item.qty}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Admin Bill Summary</Text>

            {cart.length > 0 ? (
                cart.map((order) => (
                    <View
                        style={{
                            padding: '2%',
                            borderRadius: 12,
                            backgroundColor: theme.colors.white,
                            elevation: 2,
                        }}
                        key={order._id}
                    >
                        <Text style={styles.email}>Email: {order.email}</Text>
                        <Text style={styles.date}>
                            Date: {new Date(order.timestamp).toLocaleDateString()}
                        </Text>
                        <Text style={styles.email}>Status: {order?.status}</Text>
                        <FlatList
                            data={order.items}
                            keyExtractor={(item) => item._id}
                            renderItem={renderItem}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Delivered"
                                onPress={() => updateStatus(order._id, 'delivered')}
                            />
                            <Button
                                title="Cancelled"
                                onPress={() => updateStatus(order._id, 'cancelled')}
                            />
                            <Button
                                title="Pending"
                                onPress={() => updateStatus(order._id, 'pending')}
                            />
                        </View>
                    </View>
                ))
            ) : (
                <Text>No orders found</Text>
            )}
        </View>
    );
};

export default MyOrders;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    billItem: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    email: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        marginBottom: 10,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
});
