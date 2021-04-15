import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { hp } from "@/utils/index";
import Touchable from "@/components/Touchable";
import { Color } from "@/utils/const";


interface IProps {
    downTask: () => void
    downloadList: number[]
}

function EditView({ downTask, downloadList }: IProps) {

    const onPress = () => {
        if (typeof downTask === "function") {
            downTask();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.infoTitle}>已选</Text>
                    <Text style={styles.total}>{downloadList.length}</Text>
                    <Text style={styles.infoTitle}>章</Text>
                </View>
                <Touchable>
                    <Text style={styles.infoTitle}>已下载章节</Text>
                </Touchable>
            </View>
            <Touchable style={styles.edit}>
                {
                    downloadList.length > 0 ?
                        <Touchable style={styles.down} onPress={onPress}>
                            <Text style={styles.editTitle}>下载</Text>
                        </Touchable> :
                        <Text style={styles.editTitle}>请选择章节</Text>
                }
            </Touchable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: hp(20),
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderTopWidth: 1,
        borderTopColor: Color.grey_title
    },
    infoView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Color.grey_title
    },
    infoTitle: {
        fontSize: 16
    },
    total: {
        fontSize: 22,
        color: Color.green
    },
    edit: {
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Color.grey_title,
        borderWidth: 1
    },
    editTitle: {
        fontSize: 18
    },
    down: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.theme
    }
});

export default EditView;
