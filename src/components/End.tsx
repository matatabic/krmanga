import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Color} from "@/utils/const";

function End() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>已经没有更多内容！</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        marginTop: 10,
        alignItems: 'center',
    },
    text: {
        color: Color.theme,
    },
});

export default End;
