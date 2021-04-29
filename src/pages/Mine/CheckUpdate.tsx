import React from "react";
import { Text, StyleSheet } from "react-native";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { ModalStackNavigation } from "@/navigator/index";


const mapStateToProps = ({}: RootState) => {
    return {};
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
    navigation: ModalStackNavigation;
}


function CheckUpdate({ navigation }: IProps) {

    const onPress = () => {
        navigation.navigate("AppUpdate");
    };

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <Text>检查更新</Text>
            <Icon name="icon-arrow-right" color={Color.dark_title} size={16} />
        </Touchable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        height: 45,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: Color.page_bg
    }
});

export default connector(CheckUpdate);
