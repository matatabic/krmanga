import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";
import { ICollection } from "@/models/collection";
import { IHistoryList } from "@/models/history";


interface IProps {
    data: ICollection[] | IHistoryList[];
    ids: number[],
    isEdit: boolean;
    cancel: () => void;
    destroy: () => void;
}

function EditView({ data, isEdit, ids, cancel, destroy }: IProps) {

    const cancelHandle = () => {
        if (typeof cancel === "function") {
            cancel();
        }
    };

    const destroyHandle = () => {
        if (typeof destroy === "function") {
            destroy();
        }
    };

    return (
        data.length > 0 && isEdit ?
            <View>
                <View style={styles.container}>
                    <Touchable style={styles.content} onPress={cancelHandle}>
                        {ids.length === data.length ?
                            <>
                                <Icon name="icon-tianxie" size={18} color={Color.red} />
                                <Text style={{ color: Color.red, marginLeft: 10 }}>取消全选</Text>
                            </> :
                            <>
                                <Icon name="icon-gouxuan" size={18} color={Color.grey} />
                                <Text style={{ color: Color.grey, marginLeft: 10 }}>全选</Text>
                            </>
                        }
                    </Touchable>
                    <Touchable style={styles.content} onPress={destroyHandle}>
                        {ids.length > 0 ?
                            <>
                                <Icon name="icon-lajitong" size={18} color={Color.red} />
                                <Text style={{ color: Color.red, marginLeft: 10 }}>删除({ids.length})</Text>
                            </> :
                            <Icon name="icon-lajitong" size={18} color={Color.grey} />
                        }
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

export default EditView;
