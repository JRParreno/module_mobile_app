import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import ViewWithLoading from '../components/ViewWithLoading';

export default function StarterScreen() {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <ViewWithLoading loading={loading}>

        </ViewWithLoading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});