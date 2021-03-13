import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Touchable from "@/components/Touchable";
import {Color} from "@/utils/const";

interface IProps {
    destroyHistory: () => void;
}

const DestroyView = ({destroyHistory}: IProps) => {

    const onPress = () => {
        if (typeof destroyHistory === "function") {
            destroyHistory();
        }
    }


    return (
        <Touchable onPress={onPress} style={styles.container}>
            <Text style={styles.title}>清除历史记录</Text>
        </Touchable>
    )

}

const styles = StyleSheet.create({
    container: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
    },
    title: {
        color: Color.dark_title,
    }
})

export default DestroyView;
