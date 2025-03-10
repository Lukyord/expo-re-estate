import { Image, TouchableOpacity } from "react-native";

import { View, Text } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";

const TopButtons = () => {
    const router = useRouter();

    return (
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
    );
};

export default TopButtons;
