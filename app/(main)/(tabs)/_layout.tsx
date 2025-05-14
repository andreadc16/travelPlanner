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

// Custom TabIcon with rounded background when focused
const TabIcon = ({ icon, color, label, focused }: TabIconProps) => (
  <View style={tw`items-center justify-center`}>
    <View
      style={[
        tw`p-1 rounded-full`,
        {
          backgroundColor: focused ? "transparent" : "transparent",
        },
      ]}
    >
      <View
  style={{
    padding: 5,
    borderWidth: 3,
    borderColor: focused ? "blue" : "black",
    borderRadius: 20, // Makes the border circular
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Image
    source={icon}
    resizeMode="stretch"
    style={{
      width: 24,
      height: 24,
      tintColor: focused ? "blue" : "black",
    }}
  />
</View>

    </View>
    <Text
      style={{
        fontSize: 12,
        marginTop: 4,
        color: focused ? "#1E90FF" : "#999",
        fontWeight: focused ? "bold" : "normal",
      }}
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
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
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
              label=""
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
              icon={icons.writing}
              color={color}
              label=""
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
              label=""
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
