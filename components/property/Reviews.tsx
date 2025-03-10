import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Models } from "react-native-appwrite";
import Animated, {
    useAnimatedRef,
    useSharedValue,
    useAnimatedStyle,
    runOnUI,
    measure,
    useDerivedValue,
    withTiming,
} from "react-native-reanimated";

type props = {
    property: Models.Document | null;
};

const AccordionItem = ({ review }: { review: Models.Document }) => {
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0);
    const open = useSharedValue(false);
    const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)));

    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${progress.value * 180}deg` }],
    }));

    return (
        <Animated.View className="mb-2 overflow-hidden rounded-lg relative border border-gray-200">
            <TouchableOpacity
                onPress={() => {
                    if (heightValue.value === 0) {
                        runOnUI(() => {
                            "worklet";
                            heightValue.value = withTiming(measure(listRef)!.height);
                        })();
                    } else {
                        heightValue.value = withTiming(0);
                    }

                    open.value = !open.value;
                }}
            >
                <View className="flex flex-row items-center justify-between gap-4 p-3 h-[50px]">
                    <View className="flex flex-row gap-4 items-center">
                        <Image source={{ uri: review.avatar }} className="w-10 h-10 rounded-full" />
                        <Text className="text-sm font-rubik-medium">{review.name}</Text>
                    </View>
                    <Animated.View style={iconStyle}>
                        <Text>▼</Text>
                    </Animated.View>
                </View>
            </TouchableOpacity>
            <Animated.View style={heightAnimationStyle}>
                <Animated.View ref={listRef} className="p-4 absolute top-100%">
                    <Text className="text-sm font-rubik-medium">{review.rating}</Text>
                    <Text className="text-sm font-rubik-medium  text-black">
                        {review.review}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quos.
                    </Text>
                </Animated.View>
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
                    <AccordionItem key={review.$id} review={review} />
                ))}
            </View>
        </View>
    );
};

export default Reviews;
