import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import icons from "../../../constants/icons";

const { width } = Dimensions.get("window");

const Explore = () => {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");

  const scenicCards = [
    {
      title: "Hundred Islands",
      image: require("../../../assets/images/hundred_islands.jpg"),
      route: "/(main)/explore/hundred-islands",
    },
    {
      title: "Cape Bolinao",
      image: require("../../../assets/images/bolinao.jpg"),
      route: "/(main)/explore/cape-bolinao",
    },
    // Add more cards as needed
  ];

  // Filter scenicCards based on search query
  const filteredCards = scenicCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      style={tw`bg-gray-100`}
      contentContainerStyle={tw`px-5 pt-14 pb-28`} // Add bottom padding to avoid tab overlap
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <Image source={icons.user} style={tw`w-10 h-10 rounded-full`} />
      </View>

      {/* Title */}
      <Text style={tw`text-2xl font-bold text-black mb-4`}>
        Explore the Beauty of Pangasinan
      </Text>

      {/* Banner Image */}
      <Image
        source={require("../../../assets/images/scenery.jpg")}
        style={{
          width: width - 40,
          height: (width - 40) * 0.5625, // 16:9 ratio
          borderRadius: 16,
          marginBottom: 20,
        }}
        resizeMode="cover"
      />

      {/* Search Bar */}
      <View style={tw`flex-row items-center mb-4`}>
        <View style={tw`flex-1 flex-row items-center bg-white p-3 rounded-lg shadow-md`}>
          <Image source={icons.search} style={tw`w-5 h-5 mr-2`} resizeMode="contain" />
          <TextInput
            placeholder="Search..."
            style={tw`flex-1 text-lg`}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)} // Update search query
          />
        </View>
      </View>

      {/* Scenic Cards */}
      {filteredCards.length === 0 ? (
        <Text style={tw`text-center text-xl text-gray-600`}>No results found</Text>
      ) : (
        filteredCards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(card.route as any)}
            style={tw`mb-5 bg-white rounded-lg shadow-md overflow-hidden`}
          >
            <Image
              source={card.image}
              style={{
                width: width - 40,
                height: (width - 40) * 0.5625,
              }}
              resizeMode="cover"
            />
            <View style={tw`p-4`}>
              <Text style={tw`text-lg font-semibold text-black`}>
                {card.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default Explore;