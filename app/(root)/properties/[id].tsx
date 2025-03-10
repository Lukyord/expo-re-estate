import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Swiper from "react-native-swiper";
import images from "@/constants/images";
import { useAppwrite } from "@/hooks/useAppwrite";
import { propertyService } from "@/services/property";
import NoResult from "@/components/NoResult";
import GallerySwiper from "@/components/property/GallerySwiper";
import PropertyHeader from "@/components/property/PropertyHeader";
import Agent from "@/components/property/Agent";
import TopButtons from "@/components/property/TopButtons";
import Facilities from "@/components/property/Facilities";
import Map from "@/components/property/Map";
import Reviews from "@/components/property/Reviews";

const PropertyScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const { data: property, loading: propertyLoading } = useAppwrite({
        fn: propertyService.getPropertyById,
        params: {
            id: id as string,
        },
    });

    return (
        <SafeAreaView className="bg-white h-full overflow-hidden flex flex-col flex-grow">
            <ScrollView className="relative flex-grow-1">
                <TopButtons />

                {/* GALLERY */}
                <GallerySwiper property={property} propertyLoading={propertyLoading} />

                {/* PROPERTY DETAILS */}
                <View className="p-6 flex flex-col gap-8">
                    {/* Header */}
                    <PropertyHeader property={property} />

                    {/* Separator */}
                    <View className="w-full h-0 border-t-primary-200 border-t-[1px]"></View>

                    {/* Agent */}
                    <Agent property={property} />

                    {/* Overview */}
                    <View>
                        <Text className="text-xl font-rubik-bold">Overview</Text>
                        <Text className="text-base font-rubik-medium text-black-200">{property?.description}</Text>
                    </View>

                    {/* Facilities */}
                    <Facilities property={property} />

                    {/* Map */}
                    <Map property={property} />

                    {/* Reviews */}
                    <Reviews property={property} />
                </View>
            </ScrollView>
            <View className="bg-primary-white  border-primary-200 border-[1px] border-b-0 h-30 rounded-t-2xl overflow-hidden flex-shrink-0">
                <View className="flex flex-row items-center gap-8 p-8">
                    <View>
                        <Text className="text-base font-rubik-medium text-black-200">Price</Text>
                        <Text className="text-xl font-rubik-bold text-black">${property?.price}</Text>
                    </View>
                    <TouchableOpacity className="bg-primary-300 rounded-full p-4 flex-grow shadow-lg shadow-primary-200">
                        <Text className="text-base font-rubik-medium text-white text-center">Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PropertyScreen;
