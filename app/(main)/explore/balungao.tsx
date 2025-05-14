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
                source={require("../../../assets/images/inside_balungao.jpg")} // Change image as needed
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
                    Balungao Hilltop Adventure
                </Text>

                {/* Description */}
                <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
                    Balungao Hilltop Adventure is a premier eco-adventure destination located at the foot of Mount Balungao in Pangasinan, approximately 4 kilometers from the town proper. Developed by the local government to boost tourism, this resort combines natural hot and cold springs with adrenaline-pumping activities, making it a perfect getaway for thrill-seekers and nature lovers alike. The site features the longest zipline in Region 1, offering panoramic views of the surrounding
                    landscapes, and a variety of other outdoor adventures set against the backdrop of an extinct volcano.
                </Text>

                {/* Activities */}
                <Text style={tw`text-lg font-semibold text-black mb-2`}>
                    Popular Activities:
                </Text>
                <View style={tw`ml-3`}>
                    {[
                        "Ride the 1.4 km Zipline—the Longest in Region 1",
                        "Drive an All-Terrain Vehicle (ATV) Across Scenic Trails",
                        "Soak in Natural Hot and Cold Spring Pools",
                        "Hike or Bike Around Mount Balungao",
                        "Challenge Yourself with Wall Climbing and Rope Courses"
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