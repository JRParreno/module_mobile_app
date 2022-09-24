import * as React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import { PoppinText } from "../StyledText";

interface IProps {
    onPress: () => void;
    title: string;
    style?: StyleProp<ViewStyle>;
}

export default function MiniButton(props: IProps) {
    const { title, onPress } = props;
    return (
        <TouchableOpacity
            style={[styles.container, props.style]}
            onPress={onPress}
        >
            <PoppinText style={{ color: DefaultColor.white }}>
                {title}
            </PoppinText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: DefaultColor.main,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'center'
    },

});