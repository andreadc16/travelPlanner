import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const { width } = Dimensions.get("window");

const DestinationScreen = () => {
    const router = useRouter();

    return (
        <ScrollView style={tw`bg-white`} contentContainerStyle={tw`pb-20`}>
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                style={tw`absolute top-12 left-5 z-10 bg-white p-2 rounded-full shadow`}
            >
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* Image Banner */}
            <Image
                source={require("../../../assets/images/inside_tondol.jpg")} // Change image as needed
                style={{
                    width,
                    height: width * 0.5625, // 16:9 ratio
                }}
                resizeMode="cover"
            />

            {/* Content */}
            <View style={tw`px-5 pt-6`}>
                {/* Title */}
                <Text style={tw`text-2xl font-bold text-black mb-3`}>
                    Tondol Beach
                </Text>

                {/* Description */}
                <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
                    Tondol Beach, located in Anda, Pangasinan, is a serene coastal destination renowned for its expansive white sand and crystal-clear, shallow waters. The beach's gentle slope allows visitors to wade hundreds of meters into the sea, making it ideal for families and those seeking a tranquil beach experience. During low tide, a sandbar emerges, connecting the mainland to nearby Tanduyong Island, which can be reached on foot. The beach is
                    also a gateway to other attractions, such as the Panacalan Sandbar and the Hundred Islands National Park.  </Text>

                {/* Activities */}
                <Text style={tw`text-lg font-semibold text-black mb-2`}>
                    Popular Activities:
                </Text>
                <View style={tw`ml-3`}>
                    {[
                        "Swim and Sunbathe on the Shallow White Sand Beach",
                        "Walk to Tanduyong Island During Low Tide",
                        "Explore the Panacalan Sandbar via Boat",
                        "Go Island Hopping to the Hundred Islands",
                        "Capture Scenic Photos at Anda Bridge"
                    ]   .map((activity, index) => (
                            <Text key={index} style={tw`text-base text-gray-700 mb-1`}>
                                • {activity}
                            </Text>
                        ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default DestinationScreen;