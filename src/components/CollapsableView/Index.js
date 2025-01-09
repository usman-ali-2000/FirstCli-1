import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import React from 'react';
import Collapsible from 'react-native-collapsible';
import theme from '../../Theme/GlobalTheme';

const { width } = Dimensions.get('window');

const CollapsableView = (props) => {
    const { onPress, question, answer, style, collapsed, arrowIcon, selected, onSelect } = props;

    return (
        <View style={{ width: '90%', alignItems: 'center', marginLeft: 10 }}>
            {/* Dropdown Header */}
            <TouchableOpacity style={[styles.dropDownButton, style]} onPress={onPress}>
                <View style={styles.openDropDowninner}>
                    <View style={{ width: '94%' }}>
                        {/* Show selected value or default question */}
                        <Text style={styles.detailLabel}>{selected ? selected : question}</Text>
                    </View>
                </View>
                {arrowIcon}
            </TouchableOpacity>

            {/* Collapsible Section */}
            <Collapsible collapsed={collapsed} duration={550}>
                {answer?.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onSelect(item)} // Update selected value
                        style={styles.CollaspsedStyle}
                    >
                        <Text style={styles.Answer}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </Collapsible>
        </View>
    );
};

export default CollapsableView;

const styles = StyleSheet.create({
    dropDownButton: {
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 5,
        marginTop: '4%',
        borderRadius: 3,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: theme.colors.grey,
    },
    CollaspsedStyle: {
        flex: 1,
        marginTop: '1%',
        paddingVertical: 5,
        paddingHorizontal: '2.5%',
        alignSelf: 'center',
        width: width - width * 0.10,
        backgroundColor: 'white',
        borderRadius: 3,
    },
    Answer: {
        fontSize: 15,
        color: theme.colors.jetBlack,
    },
    detailLabel: {
        color: 'black',
        paddingLeft: '5%',
    },
    openDropDowninner: {
        flex: 1,
        flexDirection: 'column',
    },
});
