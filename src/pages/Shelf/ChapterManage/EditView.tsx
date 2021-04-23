import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";


interface IProps {
    ids: number[];
    isEdit: boolean;
    destroy: () => void;
}

function EditView({ isEdit, ids, destroy }: IProps) {

    const destroyHandle = () => {
        if (typeof destroy === "function") {
            destroy();
        }
    };

    return (
        isEdit && ids.length > 0 ?
            <View>
                <View style={styles.container}>
                    <Touchable style={styles.content} onPress={destroyHandle}>
                        <Icon name="icon-lajitong" size={18} color={Color.red} />
                        <Text style={{ color: Color.red, marginLeft: 10 }}>删除({ids.length})</Text>
                    </Touchable>
                </View>
                <View style={styles.space} />
            </View> : null
    );
}

const styles = StyleSheet.create({
    container: {
        height: 49,
        flexDirection: "row",
        backgroundColor: Color.page_bg
    },
    space: {
        height: getBottomSpace(),
        backgroundColor: Color.page_bg
    },
    content: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.grey,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default memo(EditView);
