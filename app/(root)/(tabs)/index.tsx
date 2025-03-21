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

export default function Index() {
    const router = useRouter();
    const { user } = useGlobalContext();
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();
    const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
        fn: propertyService.getProperties,
    });
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
            limit: 6,
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
                        <ActivityIndicator size="large" className="color-primary-300 mt-5 w-full mx-auto" />
                    ) : (
                        <NoResult />
                    )
                }
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <View className="flex flex-row">
                                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                                <View className="flex flex-col items-start ml-2 justify-center">
                                    <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                                    <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                                </View>
                            </View>

                            <Image source={icons.bell} className="size-6" />
                        </View>

                        <Search />

                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={latestProperties}
                                renderItem={({ item }) => (
                                    <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />
                                )}
                                keyExtractor={(item) => item.$id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerClassName="mt-3 flex gap-5"
                                className="overflow-visible"
                                bounces={false}
                                ListEmptyComponent={
                                    latestPropertiesLoading ? (
                                        <ActivityIndicator
                                            size="large"
                                            className="color-primary-300 h-80 w-full mx-auto"
                                        />
                                    ) : (
                                        <NoResult />
                                    )
                                }
                            />
                        </View>

                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-rubik-bold text-black-300">Our Recommendations</Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                                </TouchableOpacity>
                            </View>

                            <Filter />
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
