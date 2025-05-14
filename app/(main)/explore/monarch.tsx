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
                source={require("../../../assets/images/inside_monarch.jpg")} // Change image as needed
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
                    Monarch Hotel in Calasiao
                </Text>

                {/* Description */}
                <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
                    The Monarch Hotel in Calasiao, Pangasinan, is a premier 4-star establishment offering a blend of luxury, comfort, and top-tier service. Strategically located along McArthur Highway in Barangay San Miguel, it provides easy access to nearby cities like Dagupan and Manaoag. With 170 well-appointed rooms and suites, the hotel caters to both leisure and business travelers. Guests can indulge in amenities such as a modern fitness center, outdoor swimming pool, and the in-house restaurant, Cristoforo, known for its international cuisine. The hotel
                    also features function rooms suitable for events and gatherings, making it a versatile choice for various occasions.
                </Text>

                {/* Activities */}
                <Text style={tw`text-lg font-semibold text-black mb-2`}>
                    Popular Activities:
                </Text>
                <View style={tw`ml-3`}>
                    {[
                        "Relax by the Outdoor Pool",
                        "Dine at Cristoforo Restaurant",
                        "Work Out at the Fitness Center",
                        "Host Events in Function Rooms"
                    ]
                        .map((activity, index) => (
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