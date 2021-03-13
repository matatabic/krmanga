import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Touchable from "@/components/Touchable";
import {IBook} from "@/models/search";
import {Color} from "@/utils/const";

interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}

const IntroItem = ({data, goBrief}: IProps) => {

    const onPress = () => {
        if (typeof goBrief === "function") {
            goBrief(data);
        }
    }

    return (
        <Touchable onPress={onPress} style={styles.item}>
            <Text style={styles.title}>{data.title}</Text>
        </Touchable>
    );
}


const styles = StyleSheet.create({
    item: {
        height: '100%',
        backgroundColor: Color.light,
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5
    },
    title: {
        marginHorizontal: 7
    }
})

export default IntroItem;
