import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const PropertyScreen = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>PropertyScreen ID: {id}</Text>
        </View>
    );
};

export default PropertyScreen;
