import React from "react";
import { View, Text, StyleSheet } from "react-native";


type CustomCardPropTypes = {
    count: number | string,  // Accept both number and string
    backgroundColor: string,
    message: string
};

const CustomCard: React.FC<CustomCardPropTypes> = ({ count, backgroundColor, message }) => {
    const numericCount = parseInt(count as string, 10) || 0; // Convert string to int

    return (
        <View style={[styles.card, { backgroundColor }]}>
            {/* <IconComponent style={styles.icon} color="#3A7D44" /> */}
            <Text style={styles.countText}>{numericCount}</Text>
            <Text style={styles.statusTextStyle}>{message}</Text>

        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 80,
        borderRadius: 10,
        paddingLeft: 12,
        justifyContent: "center",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    countText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black"
    },
    statusTextStyle: {
        fontSize: 14,
        fontWeight: "light",
        color: "grey",
        fontFamily: 'Inter-Regular'
    },
})

export default CustomCard;