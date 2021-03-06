import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color } from "@/utils/const";
import { IChapter } from "@/models/brief";
import Touchable from "@/components/Touchable";
import Nolen from "@/assets/image/Nolen.png";


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
                <Text>{data.created_at}</Text>
            </View>
            <Image source={Nolen} style={styles.avatar} />
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
        marginBottom: 15
    }
});

export default Item;
