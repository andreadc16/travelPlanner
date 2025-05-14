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
        source={require("../../../assets/images/inside_tayug.jpg")} // Change image as needed
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
        Tayug Sunflower Eco Park
        </Text>

        {/* Description */}
        <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
        Tayug Sunflower Eco Park, located in Tayug, Pangasinan, is a vibrant eco-tourism destination renowned for its expansive sunflower fields and the first-ever sunflower maze in the Philippines. Established on February 17, 2017, 
        the park offers visitors a serene retreat amidst nature, featuring various colorful flowers and vegetables. 
        </Text>

        {/* Activities */}
        <Text style={tw`text-lg font-semibold text-black mb-2`}>
          Popular Activities:
        </Text>
        <View style={tw`ml-3`}>
          {[
  "Capture Instagram-Worthy Photos",
  "Enjoy a Picnic Amidst Nature",
  "Participate in Seasonal Events",
  "Harvest Fresh Produce"
].map((activity, index) => (
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