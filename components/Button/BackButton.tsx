import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { DefaultColor } from "../../constants/Colors";
import { PoppinText } from "../StyledText";

interface IProps {
    onPress: () => void;
}

export default function BackButton(props: IProps) {
    return (
        <View style={{ flex: 0, width: '100%', backgroundColor: DefaultColor.white, paddingVertical: 10 }}>
            <TouchableOpacity
                style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
                onPress={props.onPress}
            >
                <Ionicons
                    name='chevron-back'
                    size={24}
                    color={DefaultColor.main}
                />
                <PoppinText numberOfLines={1}>
                    Back
                </PoppinText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
