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
        <SafeAreaView className="bg-white h-full overflow-hidden">
            <ScrollView className="relative">
                <View className="flex flex-row justify-between absolute top-[5vw] left-[5vw] w-[calc(100vw-10vw)] z-10">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                    >
                        <Image source={icons.backArrow} className="size-5" />
                    </TouchableOpacity>

                    <View className="flex flex-row items-center gap-2">
                        <TouchableOpacity className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                            <Image source={icons.heart} className="size-5" tintColor="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                            <Image source={icons.send} className="size-5" tintColor="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <GallerySwiper property={property} propertyLoading={propertyLoading} />

                <View className="h-[200vh] bg-red-500"></View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PropertyScreen;
