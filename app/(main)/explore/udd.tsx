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
                source={require("../../../assets/images/inside_udd.jpg")} // Change image as needed
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
                    Universidad de Dagupan
                </Text>

                {/* Description */}
                <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
                    Universidad de Dagupan (UdD), formerly known as Colegio de Dagupan, is a private, non-sectarian higher education institution located in
                    Dagupan City, Pangasinan. Established in 1984, it transitioned from a computer-electronics training center to a university in 2022. UdD offers a range of academic programs and is recognized for its commitment to providing quality education to underserved communities in Pangasinan and beyond.
                </Text>

                {/* Activities */}
                <Text style={tw`text-lg font-semibold text-black mb-2`}>
                    Enroll Now!
                </Text>
                <View style={tw`ml-3`}>
                    {[
                        "Participate in Intramural Sports and Cheerdance Competitions",
                        "Attend Cultural Events like Binibining Universidad de Dagupan",
                        "Engage in Research through the Research and Planning Unit",
                        "Explore Career Opportunities at On-Campus Job Fairs"
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