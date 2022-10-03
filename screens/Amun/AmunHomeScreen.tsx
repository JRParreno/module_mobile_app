import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CategoryCard } from "../../components/Category";
import { PoppinText } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import AMUN_SELECTION from "../../data/GAME_SELECTION";
import Amun from "../../models/Amun";

export default function AmunHomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const [amun, setAmun] = useState<Array<Amun> | null>(null);
  const handleLoadAmun = () => {
    setLoading(true);
    setAmun(AMUN_SELECTION());
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      handleLoadAmun();
    }, [])
  );

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        {amun && amun.length > 0 ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {amun.map((data: Amun) => (
              <CategoryCard
                key={data.pk}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("Game", {
                    amun: data,
                  });
                }}
                style={{ backgroundColor: DefaultColor.danger }}
                source={data.path}
                title={data.title}
              />
            ))}
          </ScrollView>
        ) : (
          <PoppinText>No data found</PoppinText>
        )}
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
