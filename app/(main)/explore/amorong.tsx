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
                source={require("../../../assets/images/inside_amurong.jpg")} 
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
                    Mount Amorong
                </Text>

                {/* Description */}
                <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
                    Mount Amorong is a 376-meter-high lava dome situated in Umingan, Pangasinan, Philippines. As part of the Amorong Volcanic Group, it is considered a potentially active volcano, exhibiting fumarolic and solfataric activity. The volcano's last known eruption occurred during the Pleistocene epoch, over a million years ago.
                    Its composition primarily consists of trachyandesite rocks, and it lies along the Eastern Bataan volcanic lineament
                </Text>

                {/* Activities */}
                <Text style={tw`text-lg font-semibold text-black mb-2`}>
                    Popular Activities:
                </Text>
                <View style={tw`ml-3`}>
                    {[
                        "Hike to the Summit for Panoramic Views",
                        "Observe Fumarolic and Solfataric Activity",
                        "Explore the Unique Lava Dome Formation",
                        "Capture Photographs of the Surrounding Landscape",
                        "Engage with Local Communities in Umingan"
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