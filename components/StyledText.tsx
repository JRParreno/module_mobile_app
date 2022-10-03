import { DefaultColor } from "../constants/Colors";
import { Text, TextProps } from "./Themed";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}

export function PoppinText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "poppins-regular", fontSize: 14, color: "#262626" },
        props.style,
      ]}
    />
  );
}

export function PoppinQuestiobText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "poppins-regular",
          fontSize: 18,
          color: DefaultColor.black,
        },
        props.style,
      ]}
    />
  );
}

export function PoppinTextBold(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "poppins-semibold",
          fontSize: 25,
          color: "#262626",
          textAlign: "center",
          marginBottom: 20,
        },
        props.style,
      ]}
    />
  );
}
