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
        source={require("../../../assets/images/inside_manaoag.jpg")} // Change image as needed
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
        The Minor Basilica of Our Lady of the Rosary of Manaoag
        </Text>

        {/* Description */}
        <Text style={tw`text-base text-gray-700 mb-5 leading-relaxed`}>
        The Minor Basilica of Our Lady of the Rosary of Manaoag, commonly known as Manaoag Church, is a Roman Catholic minor basilica 
        located in Manaoag, Pangasinan in the Philippines. It is under the jurisdiction of the Archdiocese of 
        Lingayen-Dagupan. The shrine is dedicated to the Blessed Virgin Mary under the title of Our Lady of the 
        Rosary. The original shrine was founded in 1600, it is administered by the Order of Preachers 
        and is a popular tourist and pilgrimage site among devotees due to the veneration of Our Lady of Manaoag.
        </Text>

        {/* Activities */}
        <Text style={tw`text-lg font-semibold text-black mb-2`}>
          Popular Activities:
        </Text>
        <View style={tw`ml-3`}>
          {["Attend a Holy Mass", "Venerate the Image of Our Lady of Manaoag", "Explore the Basilica Museum",
           "Candle Lightings"].map((activity, index) => (
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