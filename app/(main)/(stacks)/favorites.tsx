import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const { width } = Dimensions.get("window");

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        try {
          const stored = await AsyncStorage.getItem("favorites");
          if (stored) setFavorites(JSON.parse(stored));
        } catch (error) {
          console.error("Failed to load favorites", error);
        }
      };

      loadFavorites();
    }, [])
  );

  if (favorites.length === 0) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <Text style={tw`text-gray-600 text-lg`}>No favorite destinations yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={tw`p-5 bg-white pb-20`}>
      {favorites.map((card, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => router.push(card.route)}
          style={tw`mb-5 bg-white rounded-lg shadow-md overflow-hidden`}
        >
          <Image
            source={card.image}
            style={{ width: width - 40, height: (width - 40) * 0.5625 }}
            resizeMode="cover"
          />
          <View style={tw`p-4`}>
            <Text style={tw`text-lg font-semibold text-black`}>{card.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Favorites;
