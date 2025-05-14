import { Ionicons } from "@expo/vector-icons"; // For star icon
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from 'react-native-toast-message';
import tw from "twrnc";
import icons from "../../../constants/icons"; // Add a star icon here


const { width } = Dimensions.get("window");

const Explore = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = async (title: string) => {
  const card = scenicCards.find((c) => c.title === title);
  if (!card) return;

  let updatedFavorites: any[] = [];

  if (favorites.includes(title)) {
    updatedFavorites = favorites.filter((t) => t !== title);

    // ✅ Toast when removed
    Toast.show({
      type: "info",
      text1: "Removed from Favorites",
      text2: `${title} has been removed.`,
      visibilityTime: 1500,
    });
  } else {
    updatedFavorites = [...favorites, title];

    // ✅ Toast when added
    Toast.show({
      type: "success",
      text1: "Added to Favorites",
      text2: `${title} has been added.`,
      visibilityTime: 1500,
    });
  }

  setFavorites(updatedFavorites);

  const favoriteCards = scenicCards.filter((c) => updatedFavorites.includes(c.title));
  await AsyncStorage.setItem("favorites", JSON.stringify(favoriteCards));
};


  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem("favorites");
        if (stored) {
          const parsed = JSON.parse(stored);
          setFavorites(parsed.map((c: any) => c.title));
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };
    loadFavorites();
  }, []);



  const scenicCards = [
    { title: "Cape Bolinao", image: require("../../../assets/images/bolinao.jpg"), route: "/(main)/explore/cape-bolinao" },
    { title: "Tayug Sunflower Eco Park", image: require("../../../assets/images/tayug.jpg"), route: "/(main)/explore/tayug" },
    { title: "Universidad de Dagupan", image: require("../../../assets/images/udd.jpg"), route: "/(main)/explore/udd" },
    { title: "Monarch Hotel", image: require("../../../assets/images/monarch.jpg"), route: "/(main)/explore/monarch" },
    { title: "Hundred Islands", image: require("../../../assets/images/hundred_islands.jpg"), route: "/(main)/explore/hundred-islands" },
    { title: "The Minor Basilica of Manaoag", image: require("../../../assets/images/manaoag.jpg"), route: "/(main)/explore/manaoag" },
    { title: "Leisure Coast Resort", image: require("../../../assets/images/lcr.jpg"), route: "/(main)/explore/lcr" },
    { title: "Patar Beach", image: require("../../../assets/images/patar.jpg"), route: "/(main)/explore/patar" },
    { title: "Tondol Beach", image: require("../../../assets/images/tondol.jpg"), route: "/(main)/explore/tondol" },
    { title: "Mount Amorong", image: require("../../../assets/images/amurong.jpg"), route: "/(main)/explore/amorong" },
    { title: "Mount Zion Pilgrim Mountain", image: require("../../../assets/images/zion.jpg"), route: "/(main)/explore/zion" },
    { title: "El Puerto Marina Beach Resort", image: require("../../../assets/images/marina.jpg"), route: "/(main)/explore/marina" },
    { title: "Balungao Hilltop Adventure", image: require("../../../assets/images/balungao.jpg"), route: "/(main)/explore/balungao" },
    { title: "Enchanted Cave", image: require("../../../assets/images/cave.png"), route: "/(main)/explore/cave" },
    { title: "Manleluag Hot Spring National Park", image: require("../../../assets/images/hot.jpg"), route: "/(main)/explore/hot" },
  ];

  const filteredCards = scenicCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      style={tw`bg-gray-100`}
      contentContainerStyle={tw`px-5 pt-14 pb-28`}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <Image source={require("../../../assets/icons/logo.png")} style={tw`w-20 h-20 rounded-full`} />
        <TouchableOpacity onPress={() => router.push("../(stacks)/favorites")}>
          <Ionicons name="star" size={24} color="gold" />
        </TouchableOpacity>
      </View>


      <Text style={tw`text-2xl font-bold text-black mb-4`}>
        Explore the Beauty of Pangasinan
      </Text>

      <Image
        source={require("../../../assets/images/love.jpg")}
        style={{ width: width - 40, height: (width - 40) * 0.5625, borderRadius: 16, marginBottom: 20 }}
        resizeMode="cover"
      />

      {/* Search Bar */}
      <View style={tw`flex-row items-center mb-4`}>
        <View style={tw`flex-1 flex-row items-center bg-white p-1 rounded-lg shadow-md`}>
          <Image source={icons.search} style={tw`w-5 h-5 mr-2`} resizeMode="contain" />
          <TextInput
            placeholder="Search..."
            style={tw`flex-1 text-lg`}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>

      {/* Scenic Cards */}
      {filteredCards.length === 0 ? (
        <Text style={tw`text-center text-xl text-gray-600`}>No results found</Text>
      ) : (
        filteredCards.map((card, index) => (
          <View key={index} style={tw`mb-5 bg-white rounded-lg shadow-md overflow-hidden`}>
            <TouchableOpacity onPress={() => router.push(card.route as any)}>
              <Image
                source={card.image}
                style={{ width: width - 40, height: (width - 40) * 0.5625 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={tw`p-4 flex-row justify-between items-center`}>
              <Text style={tw`text-lg font-semibold text-black`}>{card.title}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(card.title)}>
                <Ionicons
                  name={favorites.includes(card.title) ? "star" : "star-outline"}
                  size={24}
                  color={favorites.includes(card.title) ? "gold" : "gray"}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Explore;
