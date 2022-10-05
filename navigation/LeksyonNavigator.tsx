import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LeksyonParamList } from "../types";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DefaultColor } from "../constants/Colors";
import {
  ActivitiesScreen,
  LecturesScreen,
  LeksyonScreen,
  QuarterScreen,
} from "../screens/Leksyon";

const Stack = createNativeStackNavigator<LeksyonParamList>();

export default function LeksyonNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerRight: () => (
          <Pressable
            onPress={async () => {
              // await AsyncStorage.multiRemove(["skipLanding"]);
            }}
          >
            <Ionicons name="settings" size={26} />
          </Pressable>
        ),
        headerBackTitleVisible: false,
        title: "",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: DefaultColor.main },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="LeksyonQuarter"
        component={QuarterScreen}
        options={{
          title: "Leksyon",
        }}
      />
      <Stack.Screen
        name="LeksyonView"
        component={LeksyonScreen}
        options={{
          title: "Leksyon",
        }}
      />
      <Stack.Screen
        name="Lectures"
        component={LecturesScreen}
        options={{
          title: "Pumili ng leksyon",
        }}
      />
      <Stack.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          title: "Pumili ng Pagsusulit",
        }}
      />
    </Stack.Navigator>
  );
}
