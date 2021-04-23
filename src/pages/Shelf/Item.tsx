import React, { memo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ip, viewportWidth, wp } from "@/utils/index";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import ErrorImage from "@/assets/image/error.png";
import { ICollection } from "@/models/collection";
import Touchable from "@/components/Touchable";
import SandGlass from "@/assets/image/sandglass.png";


interface IProps {
    data: ICollection;
    isEdit: boolean;
    selected: boolean;
    onClickItem: (data: ICollection) => void
}


const itemWidth = wp(90) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(90)) / 4;


function Item({ data, isEdit, selected, onClickItem }: IProps) {

    const [errorLoad, setErrorLoad] = useState<boolean>(false);

    const onError = () => {
        setErrorLoad(true);
    };

    const onPress = () => {
        if (typeof onClickItem === "function") {
            onClickItem(data);
        }
    };

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <Image
                defaultSource={SandGlass}
                source={errorLoad ? ErrorImage : { uri: data.image }}
                onError={onError}
                style={styles.image}
                resizeMode={"stretch"}
            />
            {isEdit &&
            <>
              <View style={styles.cover} />
                {
                    selected ?
                        <View style={[styles.circle, {
                            backgroundColor: Color.red
                        }]}>
                            <Icon name="icon-gou" color={Color.white} size={18} />
                        </View> :
                        <View style={[styles.circle, {
                            opacity: 0.7,
                            backgroundColor: Color.black
                        }]} />
                }
            </>
            }
            <View style={styles.titleView}>
                <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                <Text style={styles.chapter_info} numberOfLines={1}>{data.chapter_info}</Text>
            </View>
        </Touchable>
    );
}


const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        marginTop: itemMargin,
        marginLeft: itemMargin,
        backgroundColor: Color.white
    },
    cover: {
        width: itemWidth,
        height: imageHeight,
        backgroundColor: Color.black,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.5
    },
    circle: {
        width: itemWidth / 5,
        height: itemWidth / 5,
        borderRadius: itemWidth / 5,
        position: "absolute",
        top: 7,
        right: 7,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: Color.white
    },
    titleView: {
        width: itemWidth,
        marginTop: 5,
        height: 35
    },
    image: {
        width: itemWidth,
        height: imageHeight,
        borderRadius: 5
    },
    title: {
        textAlign: "center"
    },
    chapter_info: {
        fontSize: 14,
        textAlign: "center",
        color: Color.grey_title
    }
});

export default memo(Item);
