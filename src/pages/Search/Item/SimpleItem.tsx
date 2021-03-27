import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {IBook} from "@/models/search";
import Touchable from "@/components/Touchable";
import {Color} from "@/utils/const";

interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}

const SimpleItem = ({data, goBrief}: IProps) => {
    const onPress = () => {
        if (typeof goBrief === "function") {
            goBrief(data);
        }
    }

    return (
        <Touchable onPress={onPress} style={styles.item}>
            <Text>{data.title}</Text>
            <Text style={styles.authorText}>{data.author}</Text>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 44,
        paddingLeft: 20,
        backgroundColor: Color.page_bg,
        borderBottomColor: Color.split_line,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorText: {
        fontSize: 12,
        marginLeft: 5,
        color: Color.dark_title
    }
})

export default SimpleItem;
