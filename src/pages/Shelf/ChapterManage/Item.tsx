import React, { memo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Touchable from "@/components/Touchable";
import { ip, viewportWidth, wp } from "@/utils/index";
import { Color } from "@/utils/const";
import SandGlass from "@/assets/image/sandglass.png";
import ErrorImage from "@/assets/image/error.png";
import { IChapter } from "@/models/ChapterManage";
import Icon from "@/assets/iconfont";


interface IProps {
    data: IChapter;
    isEdit: Boolean;
    selected: Boolean;
    onClickItem: (data: IChapter) => void;
}


const itemWidth = wp(90) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(90)) / 4;

function Item({ data, isEdit, selected, onClickItem }: IProps) {

    const [errorLoad, setErrorLoad] = useState<boolean>(false);

    const onError = () => {
        console.log("aaa");
        setErrorLoad(true);
    };

    const onPress = () => {
        if (typeof onClickItem === "function") {
            onClickItem(data);
        }
    };

    return (
        <Touchable style={styles.item} onPress={onPress}>
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
                <Text style={styles.title} numberOfLines={1}>{`第${data.chapter_num}话`}</Text>
                <Text style={styles.category} numberOfLines={1}>{`${data.size}页`}</Text>
            </View>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        marginTop: itemMargin,
        marginLeft: itemMargin,
        backgroundColor: Color.page_bg
    },
    titleView: {
        width: itemWidth,
        height: 35,
        marginTop: 5
    },
    image: {
        width: itemWidth,
        height: imageHeight,
        borderRadius: 5
    },
    placeholder: {
        width: itemWidth,
        height: imageHeight,
        position: "absolute",
        top: 0,
        left: 0
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
    title: {
        textAlign: "center"
    },
    category: {
        fontSize: 14,
        color: Color.grey_title
    }
});

export default memo(Item);
