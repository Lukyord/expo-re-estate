import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Models } from "react-native-appwrite";

type props = {
    property: Models.Document | null;
};

const AccordionItem = ({
    review,
    isOpen,
    onPress,
}: {
    review: Models.Document;
    isOpen: boolean;
    onPress: () => void;
}) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isOpen ? 50 + contentHeight : 50,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isOpen, contentHeight]);

    return (
        <Animated.View
            style={[
                {
                    borderWidth: 1,
                    borderRadius: 10,
                    height: animation,
                },
            ]}
            className="mb-2 overflow-hidden rounded-lg relative"
        >
            <TouchableOpacity
                onPress={() => {
                    onPress();
                }}
            >
                <View className="flex flex-row items-center justify-between gap-4 p-3 h-[50px]">
                    <View className="flex flex-row gap-4 items-center">
                        <Image source={{ uri: review.avatar }} className="w-10 h-10 rounded-full" />
                        <Text className="text-sm font-rubik-medium">{review.name}</Text>
                    </View>
                    <Animated.View>
                        <Text>{isOpen ? "▲" : "▼"}</Text>
                    </Animated.View>
                </View>
            </TouchableOpacity>
            <Animated.View
                className="p-4 absolute top-[50px]"
                onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
            >
                <Text className="text-sm font-rubik-medium">{review.rating}</Text>
                <Text className="text-sm font-rubik-medium  text-black">
                    {review.review}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </Text>
            </Animated.View>
        </Animated.View>
    );
};

const Reviews = ({ property }: props) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    return (
        <View>
            <Text className="text-xl font-rubik-bold">Reviews</Text>

            <View className="mt-4">
                {property?.reviews.map((review: Models.Document, index: number) => (
                    <AccordionItem
                        key={review.$id}
                        review={review}
                        isOpen={activeIndex === index}
                        onPress={() => {
                            const newIndex = activeIndex === index ? -1 : index;
                            setActiveIndex(newIndex);
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default Reviews;
