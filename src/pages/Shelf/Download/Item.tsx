import React, { memo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color } from "@/utils/const";
import FastImage from "react-native-fast-image";
import Touchable from "@/components/Touchable";
import { ip, wp } from "@/utils/index";
import Icon from "@/assets/iconfont";
import ErrorImage from "@/assets/image/error.png";
import { IHistory } from "@/models/history";
import { IDownList } from "@/models/downloadManage";


const imageWidth = wp(25);
const imageHeight = ip(imageWidth);
const itemHeight = imageHeight + 10;

interface IProps {
    data: IDownList;
    isEdit: boolean;
    selected: boolean;
    goMangaView: (data: IDownList) => void;
}

function Item({ data, isEdit, selected, goMangaView }: IProps) {

    const [errorLoad, setErrorLoad] = useState<boolean>(false);

    const showError = () => {
        setErrorLoad(true);
    };

    const onPress = () => {
        if (typeof goMangaView === "function") {
            goMangaView(data);
        }
    };

    return (
        <View style={styles.container}>
            {
                isEdit &&
                <View style={styles.selectedView}>
                  <Icon name="icon-gouxuan" size={18} color={selected ? Color.red : Color.grey} />
                </View>
            }
            <FastImage
                source={errorLoad ? ErrorImage : { uri: data.image, cache: FastImage.cacheControl.immutable }}
                onError={showError}
                style={styles.image}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <View style={styles.mainView}>
                <Text numberOfLines={2} style={styles.titleText}>{data.title}</Text>
                <View>
                    <Text style={styles.infoText}>{data["author"]}</Text>
                    <Text style={styles.infoText}>{`更新至第${data.chapter_total}话`}</Text>
                </View>
            </View>
            {
                !isEdit &&
                <View style={styles.rightView}>
                  <Touchable onPress={onPress} style={styles.read}>
                    <Text style={styles.readTitle}>{`续看第${data.chapter_num}话`}</Text>
                  </Touchable>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: itemHeight,
        paddingTop: 5,
        paddingHorizontal: 15,
        flexDirection: "row"
    },
    image: {
        borderRadius: 10,
        width: imageWidth,
        height: imageHeight
    },
    mainView: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10
    },
    titleText: {
        fontSize: 15
    },
    infoText: {
        color: Color.dark_title,
        paddingVertical: 5
    },
    rightView: {
        justifyContent: "center",
        alignItems: "center"
    },
    read: {
        width: wp(25),
        height: 35,
        borderWidth: 2,
        borderColor: Color.pink,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    readTitle: {
        color: Color.pink
    },
    selectedView: {
        justifyContent: "center",
        left: -wp(5)
    },
    selected: {
        width: 15,
        height: 15,
        backgroundColor: Color.red
    }
});

export default memo(Item);
