import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import icons from "../../../constants/icons";


export default function ProfileScreen() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      if (!storedId) return;

      setUserId(storedId);

      try {
        const res = await fetch(`http://192.168.0.16:3000/profile?userId=${storedId}`);
        const data = await res.json();
        setUsername(data.username);
        setEmail(data.email);
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error fetching profile",
        });
      }
    };

    fetchUserData();
  }, []);


const handleProfileUpdate = async () => {
  Alert.alert(
    "Confirm Update",
    "Are you sure you want to update your profile information?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Update",
        onPress: async () => {
          try {
            const res = await fetch("http://192.168.0.16:3000/profile/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId, username, email }),
            });

            const result = await res.json();
            if (result.success) {
              Toast.show({ type: "success", text1: "Profile updated" });
            } else {
              Toast.show({
                type: "error",
                text1: "Update failed",
                text2: result.message || "",
              });
            }
          } catch {
            Toast.show({
              type: "error",
              text1: "Update error",
              text2: "Could not update profile",
            });
          }
        },
      },
    ]
  );
};

  
const deleteProfile = async () => {
  const userId = await AsyncStorage.getItem("userId");

  Alert.alert(
    "Confirm Deletion",
    "Are you sure you want to delete your profile? This action cannot be undone.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`http://192.168.0.16:3000/profile/delete/${username}`, {
              method: "DELETE",
            });

            await AsyncStorage.removeItem("userId");
            Toast.show({ type: "success", text1: "Profile deleted" });
            router.replace("/(auth)/login");
          } catch (err) {
            Toast.show({ type: "error", text1: "Delete failed" });
          }
        },
      },
    ]
  );
};


const handleChangePassword = () => {
  if (newPassword !== confirmPassword) {
    return Toast.show({
      type: "error",
      text1: "Passwords do not match",
    });
  }

  Alert.alert(
    "Confirm Password Change",
    "Are you sure you want to change your password?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Change",
        onPress: async () => {
          try {
            const res = await fetch("http://192.168.0.16:3000/profile/change-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId, currentPassword, newPassword }),
            });

            const result = await res.json();
            if (result.success) {
              Toast.show({ type: "success", text1: "Password changed" });
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
            } else {
              Toast.show({
                type: "error",
                text1: "Password change failed",
                text2: result.message || "",
              });
            }
          } catch {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Could not change password",
            });
          }
        },
      },
    ]
  );
};


  const handleLogout = () => {
  Alert.alert(
    "Log Out",
    "Are you sure you want to log out?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        onPress: async () => {
          await AsyncStorage.removeItem("userId");
          router.replace("/(auth)/login");
        },
      },
    ]
  );
};



  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 40 }}
      keyboardShouldPersistTaps="handled" // Allows tapping outside the inputs to dismiss the keyboard
    >
      <View style={styles.container}>
        <ExpoStatusBar style="dark" />
        <View style={styles.header}>
          <Image source={icons.user} style={{ width: 40, height: 40, borderRadius: 999 }} />
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
          <TextInput value={username} onChangeText={setUsername} placeholder="Username" style={styles.input} />
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} />
          <TouchableOpacity style={styles.saveButton} onPress={handleProfileUpdate}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          <TextInput value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry placeholder="Current Password" style={styles.input} />
          <TextInput value={newPassword} onChangeText={setNewPassword} secureTextEntry placeholder="New Password" style={styles.input} />
          <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder="Confirm New Password" style={styles.input} />
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: "#3b82f6" }]} onPress={handleChangePassword}>
            <Text style={styles.saveButtonText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: "red" }]} onPress={handleLogout}>
            <Text style={styles.saveButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: "#6b7280", marginTop: 10 }]}
            onPress={deleteProfile}
          >
            <Text style={styles.saveButtonText}>Delete Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    marginBottom: 32
  },
  name: {
    fontSize: 22,
    fontWeight: "600"
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 16,
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 16
  },
  saveButton: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
});