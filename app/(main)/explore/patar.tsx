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
                source={require("../../../assets/images/inside_patar.jpg")} // Change image as needed
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
                    Patar Beach
                </Text>

                {/* Description */}
                <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
                    Patar Beach in Bolinao, Pangasinan, is a stunning coastal destination renowned for its golden-white sand, crystal-clear waters, and breathtaking sunsets over the West Philippine Sea. Situated approximately 19 kilometers from Bolinao town proper, this serene beach offers a tranquil escape for nature lovers and beach enthusiasts alike. Visitors can enjoy the natural beauty,
                    swim in the clear waters, and relax in the available nipa huts or set up tents along the shore.
                </Text>


                {/* Activities */}
                <Text style={tw`text-lg font-semibold text-black mb-2`}>
                    Popular Activities:
                </Text>
                <View style={tw`ml-3`}>
                    {[
                        "Swim and Sunbathe on the Golden-White Sand Beach",
                        "Watch the Sunset at Patar Rock Formations",
                        "Visit Cape Bolinao Lighthouse",
                        "Explore Enchanted and Wonderful Caves",
                        "Take a Dip at Bolinao Falls"
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