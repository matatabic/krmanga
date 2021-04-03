import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Color } from "@/utils/const";
import { IBookInfo, IChapter } from "@/models/brief";
import Header from "@/components/LightDrawer/Header";
import Item from "@/components/LightDrawer/Item";
import Touchable from "@/components/Touchable";


interface IProps {
    chapterList: IChapter[];
    bookInfo: IBookInfo;
    headerHeight: number;
    drawerX: Animated.AnimatedInterpolation;
    goMangaView: (data: IChapter) => void;
    hideDrawer: () => void;
}

function LightDrawer({ chapterList, bookInfo, headerHeight, drawerX, goMangaView, hideDrawer }: IProps) {

    const spinValue = useRef(new Animated.Value(0)).current;
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    });

    const [isSpin, setIsSpin] = useState<boolean>(true);
    const [data, setData] = useState<IChapter[] | []>([]);

    useEffect(() => {
        setData(chapterList);
    }, [chapterList]);

    const onPress = () => {
        if (typeof hideDrawer === "function") {
            hideDrawer();
        }
    };

    const renderItem = ({ item }: ListRenderItemInfo<IChapter>) => {
        return (
            <Item data={item} goMangaView={goMangaView} />
        );
    };

    const reverse = () => {
        if (isSpin) {
            Animated.timing(
                spinValue,
                {
                    toValue: 0.5,
                    duration: 250,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start();
        } else {
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 250,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start(() => spinValue.setValue(0));
        }

        setData([...data.reverse()]);
        setIsSpin(!isSpin);
    };

    return (
        <Animated.View style={[styles.wrapper, {
            transform: [{ translateX: drawerX }]
        }]}>
            <View style={styles.container}>
                <Touchable onPress={onPress} style={styles.transparentView} />
                <View style={[styles.listContainer, {
                    paddingTop: headerHeight
                }]}>
                    <Header bookInfo={bookInfo} spin={spin} reverse={reverse} />
                    <FlatList
                        data={chapterList}
                        renderItem={renderItem}
                        keyExtractor={(item, key) => `item-${key}-item-${item.id}`}
                    />
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        zIndex: 100
    },
    container: {
        flex: 1,
        flexDirection: "row"
    },
    transparentView: {
        flex: 1,
        backgroundColor: Color.translucent
    },
    listContainer: {
        flex: 5,
        backgroundColor: Color.page_bg
    }
});

export default LightDrawer;
