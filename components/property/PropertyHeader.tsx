import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";

type props = {
    property: Models.Document | null;
};

const PropertyHeader = ({ property }: props) => {
    return (
        <View className="flex flex-col gap-2">
            <Text className="text-2xl font-rubik-bold">{property?.name}</Text>

            <View className="flex flex-row items-center gap-2">
                <View className="p-2 bg-primary-100 rounded-full">
                    <Text className="text-xs font-rubik-bold text-primary-300">{property?.type}</Text>
                </View>

                <View className="flex flex-row items-center gap-2">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-base font-rubik-bold color-black-200">{property?.rating.toFixed(1)}</Text>
                    <Text className="text-base font-rubik color-black-200">({property?.reviews.length} reviews)</Text>
                </View>
            </View>

            <View className="flex flex-row items-center justify-between flex-wrap gap-2">
                <View className="flex flex-row items-center gap-2">
                    <View className="p-2 bg-primary-100 rounded-full">
                        <Image source={icons.bed} className="size-4" />
                    </View>
                    <Text className="text-base font-rubik-bold">{property?.bedrooms} Beds</Text>
                </View>

                <View className="flex flex-row items-center gap-2">
                    <View className="p-2 bg-primary-100 rounded-full">
                        <Image source={icons.bath} className="size-4" />
                    </View>
                    <Text className="text-base font-rubik-bold">{property?.bathrooms} Bathrooms</Text>
                </View>

                <View className="flex flex-row items-center gap-2">
                    <View className="p-2 bg-primary-100 rounded-full">
                        <Image source={icons.area} className="size-4" />
                    </View>
                    <Text className="text-base font-rubik-bold">{property?.area} sqm</Text>
                </View>
            </View>
        </View>
    );
};

export default PropertyHeader;
