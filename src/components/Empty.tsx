import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Color} from "@/utils/const";

function Empty() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>暂无数据！</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: 'center',
    },
    text: {
        color: Color.light,
    },
});

export default Empty;
