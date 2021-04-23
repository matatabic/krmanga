import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { viewportWidth } from "@/utils/index";
import { Color } from "@/utils/const";
import { IChapter } from "@/models/download";


interface IProps {
    data: IChapter;
    disabled?: boolean;
    downloading?: boolean;
    selected: boolean;
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;
const itemHeight = 48;
const margin = 5;

const Item = memo(({ data, disabled, downloading, selected }: IProps) => {
    return (
        <View style={styles.itemWrapper}>
            <View style={[styles.item, downloading ? styles.loading : (disabled ? styles.disabled : selected && styles.selected)]}>
                <Text>{data.chapter_num}</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    loading: {
        backgroundColor: Color.orange
    },
    disabled: {
        backgroundColor: Color.disable
    },
    selected: {
        backgroundColor: Color.green
    },
    itemWrapper: {
        width: itemWidth,
        height: itemHeight
    },
    item: {
        flex: 1,
        margin: margin,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.grey_title,
        backgroundColor: Color.grey_page_bg
    }
});

export default Item;

