import React, { memo } from "react";
import { Text, StyleSheet, View } from "react-native";
import Touchable from "@/components/Touchable";
import { Color } from "@/utils/const";
import { IStatus } from "@/models/categorySetting";

interface IProps {
    data: IStatus;
    active: Boolean;
    onClickEdit: (data: IStatus) => void;
}

function Item({ data, active, onClickEdit }: IProps) {

    const onPress = () => {
        if (typeof onClickEdit === "function") {
            onClickEdit(data);
        }
    };

    return (
        <Touchable key={data.id} onPress={onPress}>
            <View style={styles.item}>
                <Text style={active ? styles.activeTitle : styles.title}>{data.title}</Text>
            </View>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    item: {
        width: 50,
        height: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 12
    },
    activeTitle: {
        fontSize: 12,
        color: Color.theme
    }
});

export default memo(Item);
