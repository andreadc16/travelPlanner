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
                source={require("../../../assets/images/inside_zion.jpg")}
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
                    Mount Zion Pilgrim Mountain
                </Text>

                {/* Description */}
                <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
                    Mount Zion Pilgrim Mountain is a 52-hectare pilgrimage site located in Barangay Laguit Padilla, Bugallon, Pangasinan. Developed by the Emmanuel Servants of the Holy Trinity (ESHT) Congregation, it serves as a serene destination for spiritual reflection and religious devotion. The site features a prominent statue of Jesus Christ reminiscent of Rio de Janeiro's Christ the Redeemer, a 35-foot statue of the Blessed Virgin Mary, life-sized Stations of the Cross, a chapel, and a retreat house. Visitors can also enjoy panoramic views of Pangasinan and nearby Zambales from the summit.
                </Text>

                {/* Activities */}
                <Text style={tw`text-lg font-semibold text-black mb-2`}>
                    Popular Activities:
                </Text>
                <View style={tw`ml-3`}>
                    {[
                        "Walk the Life-Sized Stations of the Cross",
                        "Pray and Reflect at the Chapel",
                        "Admire the Christ the Redeemer Replica",
                        "Hike to the Summit for Panoramic Views",
                        "Participate in Retreats and Spiritual Seminars"
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