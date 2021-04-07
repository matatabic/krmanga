import React from "react";
import { StyleSheet, View } from "react-native";
import { hp } from "@/utils/index";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";

interface IProps {
    showDrawer: () => void;
}

function Bottom({ showDrawer }: IProps) {

    const onPress = () => {
        if (typeof showDrawer === "function") {
            showDrawer();
        }
    };

    return (
        <View style={styles.container}>
            <Touchable onPress={onPress}>
                <Icon name="icon-mianbaoxie" color={Color.grey_title} size={22} />
            </Touchable>
            <View>
                <Icon name="icon-dark" color={Color.grey_title} size={22} />
            </View>
            <View>
                <Icon name="icon-weibiaoti527" color={Color.grey_title} size={25} />
            </View>
            <View>
                <Icon name="icon-shezhi" color={Color.grey_title} size={23} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp(10),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 45,
        backgroundColor: Color.black
    }
});

export default Bottom;
