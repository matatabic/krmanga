import React from 'react';
import {ICategory} from '@/models/categorySetting';
import {StyleSheet, Text, View} from 'react-native';
import {viewportWidth} from "@/utils/index";
import {Color} from "@/utils/const";

interface IProps {
    isEdit: boolean;
    selected: boolean;
    data: ICategory;
    disabled?: boolean;
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;
const itemHeight = 48;
const margin = 5;

const Item = ({data, isEdit, disabled, selected}: IProps) => {
    return (
        <View style={styles.itemWrapper}>
            <View style={[styles.item, disabled && styles.disabled]}>
                <Text>{data.name}</Text>
                {isEdit && !disabled && (
                    <View style={styles.icon}>
                        <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    disabled: {
        backgroundColor: Color.disable,
    },
    icon: {
        position: 'absolute',
        top: -5,
        right: -5,
        height: 16,
        width: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.icon,
        borderRadius: 8,
    },
    iconText: {
        color: Color.white,
        lineHeight: 15,
    },
    itemWrapper: {
        width: itemWidth,
        height: itemHeight,
    },
    item: {
        flex: 1,
        backgroundColor: Color.grey_page_bg,
        margin: margin,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
});

export default Item;

