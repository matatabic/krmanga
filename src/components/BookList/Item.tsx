import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Touchable from "@/components/Touchable";
import { ip, wp } from "@/utils/index";
import { IBook } from "@/models/search";
import { Color } from "@/utils/const";
import ErrorImage from "@/assets/image/error.png";
import SandGlass from "@/assets/image/sandglass.png";

const imageWidth = wp(25);
const imageHeight = ip(imageWidth);
const itemHeight = imageHeight + 10;

interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}

function Item({ data, goBrief }: IProps) {

    const [errorLoad, setErrorLoad] = useState<boolean>(false);

    const onError = () => {
        setErrorLoad(true);
    };

    const onPress = () => {
        if (typeof goBrief === "function") {
            goBrief(data);
        }
    };

    return (
        <Touchable style={styles.container} onPress={onPress}>
            <Image
                defaultSource={SandGlass}
                source={errorLoad ? ErrorImage : { uri: data.image }}
                onError={onError}
                style={styles.image}
                resizeMode={"stretch"}
            />
            <View style={styles.mainView}>
                <Text numberOfLines={2} style={styles.titleText}>{data.title}</Text>
                <View>
                    <Text style={styles.infoTitle}>{data.author}</Text>
                    <Text style={styles.infoTitle}>{data.category}</Text>
                </View>
            </View>
            <View style={styles.rightView}>
                <Text style={{ color: data.statusColor }}>{data.status}</Text>
            </View>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: itemHeight,
        paddingTop: 5,
        flexDirection: "row",
        backgroundColor: Color.white,
        paddingHorizontal: 20
    },
    image: {
        borderRadius: 10,
        width: imageWidth,
        height: imageHeight
    },
    placeholder: {
        width: imageWidth,
        height: imageHeight,
        position: "absolute",
        top: 0,
        left: 0
    },
    mainView: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10
    },
    titleText: {
        fontSize: 15
    },
    infoTitle: {
        paddingVertical: 5,
        color: Color.dark_title
    },
    rightView: {
        width: imageWidth,
        justifyContent: "center",
        alignItems: "center"
    }

});

export default Item;
