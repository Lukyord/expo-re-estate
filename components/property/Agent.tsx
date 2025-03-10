import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";

type props = {
    property: Models.Document | null;
};

const Agent = ({ property }: props) => {
    return (
        <View>
            <Text className="text-xl font-rubik-bold">Agent</Text>

            <View className="flex flex-row items-center gap-2 justify-between mt-4">
                <View className="flex flex-row gap-4 items-center">
                    <Image source={{ uri: property?.agent.avatar }} className="size-20 rounded-full" />
                    <View>
                        <Text className="text-lg font-rubik-bold">{property?.agent.name}</Text>
                        <Text className="text-sm color-black-200">Owner</Text>
                    </View>
                </View>

                <View className="flex flex-row gap-4 items-center">
                    <Image source={icons.chat} className="size-8" />
                    <Image source={icons.phone} className="size-8" />
                </View>
            </View>
        </View>
    );
};

export default Agent;
