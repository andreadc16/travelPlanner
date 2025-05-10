import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import tw from "twrnc";
import icons from "../../../constants/icons";

type TabIconProps = {
  icon: any;
  color: string;
  label: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, label, focused }: TabIconProps) => (
  <View style={tw`items-center justify-center`}>
    <Image
      source={icon}
      resizeMode="contain"
      style={tw`w-6 h-6 mb-1`}
      tintColor={color}
    />
    <Text
      style={tw`text-xs ${focused ? "text-black font-bold" : "text-gray-500"}`}
    >
      {label}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.explore}
              color={color}
              label="Explore"
              focused={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bell}
              color={color}
              label="Notifications"
              focused={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="travel-checklist"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.notebook}
              color={color}
              label="Plans"
              focused={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.user}
              color={color}
              label="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;