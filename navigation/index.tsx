/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useFocusEffect,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useCallback, useState } from "react";
import { ColorSchemeName, Pressable, View, StyleSheet } from "react-native";
import Loader from "../components/Loader";

import Colors, { DefaultColor } from "../constants/Colors";
import { getData } from "../database/StoreData";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import LandingScreen from "../screens/LandingScreen";
import { HomeScreen } from "../screens/Home";
import Modal from "react-native-modal";
import { PoppinText } from "../components/StyledText";
import { Switch } from "react-native-elements";
import AmunNavigator from "./AmunNavigator";
import LeksyonNavigator from "./LeksyonNavigator";
import ExamNavigator from "./ExamNavigator";
import { TranslationScreen } from "../screens/Translation";
import { Audio } from "expo-av";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [skipped, setSkipped] = useState(true);
  const [isInitialized, setInitialized] = useState(false);


  const checkSkipped = async () => {
    const skipLanding = await getData("skipLanding");
    setSkipped(skipLanding !== undefined && skipLanding !== "");
    setInitialized(true);
  };


  useFocusEffect(
    useCallback(() => {
      checkSkipped();
    }, [])
  );

  return isInitialized ? (
    <View
      style={{ flex: 1, paddingTop: 10, backgroundColor: DefaultColor.main }}
    >
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
          title: "",
          headerTransparent: true,
        }}
        initialRouteName={skipped ? "Root" : "Landing"}
      >
        <Stack.Screen
          name="Root"
          component={HomeScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="Amun"
          component={AmunNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Leksyon"
          component={LeksyonNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Exam"
          component={ExamNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Translation"
          component={TranslationScreen}
          options={{
            headerTransparent: false,
            title: "Translation",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: DefaultColor.main },
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </View>
  ) : (
    <Loader />
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: DefaultColor.white,
    minHeight: 100,
    padding: 20,
    borderWidth: 1,
    borderColor: DefaultColor.white,
    borderRadius: 20,
  },
  listContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  closeContainer: {
    flex: 0,
    alignItems: "center",
    backgroundColor: DefaultColor.danger,
    padding: 5,
    borderWidth: 1,
    borderColor: DefaultColor.danger,
    borderRadius: 20,
  },
});

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
