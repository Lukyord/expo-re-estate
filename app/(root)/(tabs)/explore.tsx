import { Card, FeaturedCard } from "@/components/Card";
import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/context/global-provider";
import { useAppwrite } from "@/hooks/useAppwrite";
import { propertyService } from "@/services/property";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();
    const {
        data: properties,
        loading: propertiesLoading,
        refetch: propertiesRefetch,
    } = useAppwrite({
        fn: propertyService.getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        },
        skip: true,
    });

    useEffect(() => {
        propertiesRefetch({
            filter: params.filter!,
            query: params.query!,
            limit: 20,
        });
    }, [params.filter, params.query]);

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    return (
        <SafeAreaView className="bg-white h-full overflow-hidden">
            <FlatList
                data={properties}
                renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    propertiesLoading ? (
                        <ActivityIndicator size="large" className="color-primary-300 mt-5" />
                    ) : (
                        <NoResult />
                    )
                }
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                            >
                                <Image source={icons.backArrow} className="size-5" />
                            </TouchableOpacity>

                            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                                Search for Your Ideal Home
                            </Text>

                            <Image source={icons.bell} className="size-6" />
                        </View>

                        <Search />

                        <View className="mt-5">
                            <Filter />

                            <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                                Found {properties?.length} results
                            </Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
