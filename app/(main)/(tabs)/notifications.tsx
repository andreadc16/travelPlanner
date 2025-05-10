import { StatusBar as ExpoStatusBar } from "expo-status-bar"; // If using Expo's StatusBar component
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const sampleNotifications = [
  { id: "1", text: "📍 New spot added in Alaminos! Check it out now." },
  { id: "2", text: "🌅 Don’t miss today’s sunset at Cape Bolinao." },
  { id: "3", text: "📌 Hundred Islands Festival starts this weekend." },
];

export default function Notifications() {
  return (
    <View style={styles.container}>
      <ExpoStatusBar style="dark" />

      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={sampleNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No new notifications.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  itemText: { fontSize: 16, color: "#000" },
  emptyText: { textAlign: "center", color: "gray", marginTop: 40 },
});