import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

const { width } = Dimensions.get("window");

const CapeBolinaoScreen = () => {
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
        source={require("../../../assets/images/inside_bolinao.jpg")} // Replace with actual image
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
          Cape Bolinao
        </Text>

        {/* Description */}
        <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
          Cape Bolinao, located in Bolinao, Pangasinan, is known for its historic lighthouse,
          dramatic rock formations, and scenic coastlines. It's one of the best places to witness
          a golden sunset and enjoy peaceful beachfront views with fewer crowds.
        </Text>

        {/* Activities */}
        <Text style={tw`text-lg font-semibold text-black mb-2`}>
          Popular Activities:
        </Text>
        <View style={tw`ml-3`}>
          {[
            "Visit Bolinao Lighthouse",
            "Explore Patar White Beach",
            "Swim at Bolinao Falls",
            "Sunset viewing",
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

export default CapeBolinaoScreen;