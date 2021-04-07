import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color } from "@/utils/const";
import { IChapter } from "@/models/brief";
import Touchable from "@/components/Touchable";
import Day from "@/assets/image/day.png";


interface IProps {
    data: IChapter;
    goMangaView: (data: IChapter) => void;
}

function Item({ data, goMangaView }: IProps) {

    const onPress = () => {
        if (typeof goMangaView === "function") {
            goMangaView(data);
        }
    };

    return (
        <Touchable style={styles.container} onPress={onPress}>
            <View style={styles.info}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.created_time}>{data.created_at}</Text>
            </View>
            <Image source={Day} style={styles.avatar} />
        </Touchable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: Color.dark_title,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    info: {
        justifyContent: "space-around"
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18
    },
    title: {
        marginBottom: 15,
        color: Color.white
    },
    created_time: {
        color: Color.dark_title
    }
});

export default Item;
