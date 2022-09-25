import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import { PoppinTextBold } from "../../components/StyledText";
import { CategoryCard } from "../../components/Category";
import { DefaultColor } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  return (
    <ViewWithLoading loading={loading}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <PoppinTextBold>CATEGORYA</PoppinTextBold>
          <CategoryCard
            onPress={() => {
              navigation.navigate("Amun");
            }}
            source={require("../../assets/lottie/115619-learning-english.json")}
            title="AMUN"
            style={{
              backgroundColor: DefaultColor.danger,
            }}
          />
          <CategoryCard
            onPress={() => {}}
            source={require("../../assets/lottie/61281-class-board.json")}
            title="LEKSYON"
            style={{
              backgroundColor: DefaultColor.brown,
            }}
          />
          <CategoryCard
            onPress={() => {}}
            source={require("../../assets/lottie/72170-books.json")}
            title="PAGSUSULIT"
            style={{
              backgroundColor: DefaultColor.pink,
            }}
          />
        </View>
      </ScrollView>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  lottieContainer: {
    minHeight: 200,
    width: "100%",
  },
});
