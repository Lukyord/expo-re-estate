import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";

type props = {
    property: Models.Document | null;
};

const Facilities = ({ property }: props) => {
    return (
        <View>
            <Text className="text-xl font-rubik-bold">Facilities</Text>

            <View className="flex flex-row flex-wrap mt-4">
                {property?.facilities.map((facility: string) => {
                    let facilityIcon = icons.backArrow;
                    switch (facility) {
                        case "Laundry":
                            facilityIcon = icons.laundry;
                            break;
                        case "Parking":
                            facilityIcon = icons.carPark;
                            break;
                        case "Gym":
                            facilityIcon = icons.dumbell;
                            break;
                        case "Wifi":
                            facilityIcon = icons.wifi;
                            break;
                        case "Pet-Friendly":
                            facilityIcon = icons.dog;
                            break;
                    }

                    return (
                        <View className="w-[25%] flex flex-col items-center gap-2" key={facility}>
                            <View className="p-4 bg-primary-100 rounded-full">
                                <Image source={facilityIcon} className="size-8" />
                            </View>
                            <Text className="text-base font-rubik-bold text-center">{facility}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default Facilities;
