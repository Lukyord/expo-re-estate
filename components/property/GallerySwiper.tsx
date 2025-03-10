import { View, Text, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { Models } from "react-native-appwrite";
import NoResult from "@/components/NoResult";

type props = {
    property: Models.Document | null;
    propertyLoading: boolean;
};

const GallerySwiper = ({ property, propertyLoading }: props) => {
    const [swiperKey, setSwiperKey] = useState(0);

    useEffect(() => {
        if (!propertyLoading) {
            setSwiperKey((prevKey) => prevKey + 1);
        }
    }, [propertyLoading]);

    return (
        <Swiper
            key={swiperKey}
            loop={false}
            className="aspect-square"
            dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 1)",
                marginLeft: 3,
                marginRight: 3,
            }}
            activeDotStyle={{
                width: 32,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#0061FF",
                marginLeft: 3,
                marginRight: 3,
            }}
        >
            {propertyLoading ? (
                <ActivityIndicator size="large" className="color-primary-300 mt-5 w-full mx-auto" />
            ) : property?.gallery.length === 0 ? (
                <NoResult />
            ) : (
                (property?.gallery || []).map((item: { image: string; $id: string }) => (
                    <View className="h-full w-full" key={`slide-${item.$id}`}>
                        <Image source={{ uri: item.image }} className="size-full" />
                    </View>
                ))
            )}
        </Swiper>
    );
};

export default GallerySwiper;
