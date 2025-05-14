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
                source={require("../../../assets/images/inside_hot.jpeg")} // Change image as needed
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
                    Manleluag Hot Spring National Park
                </Text>

                {/* Description */}
                <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
                    Manleluag Hot Spring National Park, located in Barangay Malabobo, Mangatarem, Pangasinan, is a protected area
                    encompassing approximately 1,935 hectares. Established in 1934 and reclassified as a protected landscape in 2004, the park features natural hot springs, lush forests, and diverse wildlife. The hot springs, originating from the extinct Mount Malabobo, are known for their therapeutic properties. Visitors can enjoy swimming in the spring-fed pools, hiking through forest trails, and observing various bird species in their natural habitat. The park also offers picnic areas and cottages for relaxation.
                </Text>

                {/* Activities */}
                <Text style={tw`text-lg font-semibold text-black mb-2`}>
                    Popular Activities:
                </Text>
                <View style={tw`ml-3`}>
                    {[
                        "Soak in the Natural Hot Spring Pools",
                        "Hike Through Forest Trails and Enjoy Nature",
                        "Birdwatch and Spot Endemic Species",
                        "Picnic in Designated Areas with Family and Friends",
                        "Explore the Surrounding Flora and Fauna"
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