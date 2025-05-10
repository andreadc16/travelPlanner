import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import tw from "twrnc";

type TravelPlan = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  travel_date: string;
  completed: boolean;
};

const formatDateToYMD = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const TravelChecklistScreen = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) {
        const parsedId = parseInt(storedId);
        setUserId(parsedId);
        fetchPlans(parsedId);
      } else {
        Toast.show({ type: "error", text1: "User ID not found in storage" });
      }
    };
    fetchUserId();
  }, []);

  const fetchPlans = async (id: number) => {
    try {
      const res = await axios.get("http://192.168.0.111:3000/travel-plans", {
        params: { userId: id },
      });
      setTravelPlans(res.data);
    } catch (err) {
      Toast.show({ type: "error", text1: "Failed to fetch travel plans" });
    }
  };

  const savePlan = async () => {
    if (!title || !description || !travelDate) {
      Toast.show({ type: "error", text1: "Please fill all fields" });
      return;
    }

    if (!userId) {
      Toast.show({ type: "error", text1: "User not found" });
      return;
    }

    const formattedDate = formatDateToYMD(travelDate);

    try {
      if (editingId !== null) {
        await axios.put(`http://192.168.0.111:3000/travel-plans/${editingId}`, {
          title,
          description,
          travelDate: formattedDate,
          completed: false,
        });
        Toast.show({ type: "success", text1: "Plan updated" });
      } else {
        await axios.post("http://192.168.0.111:3000/travel-plans", {
          userId,
          title,
          description,
          travelDate: formattedDate,
        });
        Toast.show({ type: "success", text1: "Travel plan saved" });
      }

      setTitle("");
      setDescription("");
      setTravelDate("");
      setEditingId(null);
      fetchPlans(userId);
    } catch (err) {
      Toast.show({ type: "error", text1: "Save failed" });
    }
  };

  const formatDateToYMD = (dateString: string) => {
    // Ensure that the input date string is in 'YYYY-MM-DD' format (removes time parts)
    const date = new Date(dateString);
    
    // Extract the date part (YYYY-MM-DD) to avoid time zone shifting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const toggleComplete = async (plan: TravelPlan) => {
    try {
      await axios.put(`http://192.168.0.111:3000/travel-plans/${plan.id}`, {
        title: plan.title,
        description: plan.description,
        travelDate: formatDateToYMD(plan.travel_date), // Correctly formatted date
        completed: !plan.completed,
      });
      if (userId) fetchPlans(userId); // Refresh plans after update
    } catch (err) {
      Toast.show({ type: "error", text1: "Update failed" });
    }
  };

  const deletePlan = async (planId: number) => {
    try {
      await axios.delete(`http://192.168.0.111:3000/travel-plans/${planId}`);
      if (userId) fetchPlans(userId);
    } catch (err) {
      Toast.show({ type: "error", text1: "Delete failed" });
    }
  };

  const handleEdit = (plan: TravelPlan) => {
    setTitle(plan.title);
    setDescription(plan.description);
    setTravelDate(formatDateToYMD(plan.travel_date));
    setEditingId(plan.id);
  };

  return (
    <ScrollView
      style={tw`bg-gray-100`}
      contentContainerStyle={tw`px-5 pt-14 pb-28`} // Add bottom padding to avoid tab overlap
      keyboardShouldPersistTaps="handled"
    >
      <ExpoStatusBar style="dark" />
      <Text style={styles.header}>
        {editingId ? "✏️ Edit Travel Plan" : "📝 Create Travel Plan"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Travel Date (YYYY-MM-DD)"
        value={travelDate}
        onChangeText={setTravelDate}
      />

      <TouchableOpacity style={styles.saveButton} onPress={savePlan}>
        <Text style={styles.saveButtonText}>
          {editingId ? "Update Plan" : "Save Plan"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.header}>📋 My Travel Plans</Text>

      {travelPlans.map((plan) => (
        <View
          key={plan.id}
          style={[styles.plan, plan.completed && styles.completed]}
        >
          <Text style={styles.planTitle}>
            {plan.title} —{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(plan.travel_date))}
          </Text>
          <Text>{plan.description}</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleEdit(plan)}>
              <Ionicons name="create-outline" size={22} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleComplete(plan)}>
              <Ionicons
                name={plan.completed ? "checkmark-done" : "checkmark-done-outline"}
                size={22}
                color="green"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletePlan(plan.id)}>
              <Ionicons name="trash-outline" size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  plan: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  completed: {
    backgroundColor: "#d0f0d0",
  },
  planTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    marginTop: 10,
  },
});

export default TravelChecklistScreen;