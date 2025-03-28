import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { categories } from "@/constants/data";

const Filter = () => {
    const router = useRouter();
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || "All");

    const handleCategoryPress = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory("All");
            router.setParams({ filter: "All" });
            return;
        }

        setSelectedCategory(category);
        router.setParams({ filter: category });
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2 overflow-visible">
            {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    className={`${
                        selectedCategory === item.category
                            ? "bg-primary-300"
                            : "bg-primary-100 border border-purple-200"
                    }  flex flex-col items-start mr-4 px-4 py-2 rounded-full`}
                    onPress={() => handleCategoryPress(item.category)}
                >
                    <Text
                        className={`text-sm ${
                            selectedCategory === item.category
                                ? "text-white font-rubik-bold mt-0.5"
                                : "text-black font-rubik"
                        }`}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Filter;
