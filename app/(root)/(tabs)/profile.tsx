import { View, Text, ScrollView, Image, Touchable, TouchableOpacity, ImageSourcePropType, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/context/global-provider";
import { authService } from "@/services/auth";

type SettingsItemProps = {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    shadowArrow?: boolean;
};

const SettingsItem = ({ icon, title, onPress, textStyle, shadowArrow }: SettingsItemProps) => (
    <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
        <View className="flex flex-row items-center gap-3">
            <Image source={icon} className="size-6" />
            <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
        </View>

        {shadowArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const { user, refetch } = useGlobalContext();

    const handleLogOut = async () => {
        const result = await authService.logout();

        if (result) {
            Alert.alert("Success", "You have been logged out successfully");
            refetch({});
        } else {
            Alert.alert("Error", "An error occurred while logging out");
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
                <View className="flex flex-row items-center justify-between mt-5">
                    <Text className="text-xl font-rubik-bold">Profile</Text>
                    <Image source={icons.bell} className="size-5" />
                </View>

                <View className="flex flex-row justify-center mt-5">
                    <View className="flex flex-col items-center relative mt-5">
                        <Image source={{ uri: user?.avatar }} className="size-44 relative rounded-full" />

                        <TouchableOpacity className="absolute bottom-11 right-2">
                            <Image source={icons.edit} className="size-9" />
                        </TouchableOpacity>

                        <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
                    </View>
                </View>

                <View className="flex flex-col mt-10">
                    <SettingsItem icon={icons.calendar} title="My Bookings" onPress={() => {}} />
                    <SettingsItem icon={icons.wallet} title="Payment" onPress={() => {}} />
                </View>

                <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                    {settings.slice(2).map((setting, index) => (
                        <SettingsItem key={index} {...setting} />
                    ))}
                </View>

                <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                    <SettingsItem
                        icon={icons.logout}
                        title="Logout"
                        textStyle="text-danger"
                        shadowArrow={false}
                        onPress={handleLogOut}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
