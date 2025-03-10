import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Models } from "react-native-appwrite";

const INITIAL_REGION = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

type props = {
    property: Models.Document | null;
};

const Map = ({ property }: props) => {
    const mapRef = useRef<MapView>(null);

    const focusMap = () => {
        if (!property?.geolocation) return;

        const [lat, lng] = property.geolocation.split(",").map((coord: string) => parseFloat(coord.trim()));

        if (isNaN(lat) || isNaN(lng)) {
            console.error("Invalid geolocation format:", property.geolocation);
            return;
        }

        mapRef.current?.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    return (
        <View>
            <Text className="text-xl font-rubik-bold">Map</Text>
            <View className="w-full h-64 mt-4 overflow-hidden rounded-lg">
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={INITIAL_REGION}
                    showsUserLocation
                    showsMyLocationButton
                />
            </View>
            <TouchableOpacity onPress={focusMap} className="w-24 px-4 py-2 mt-4 bg-primary-300 rounded-full z-10">
                <Text className="text-center text-white">FOCUS</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Map;
