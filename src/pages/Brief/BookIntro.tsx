import React from "react";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Color } from "@/utils/const";
import Touchable from "@/components/Touchable";


const itemHeight = 48;

const mapStateToProps = ({ brief }: RootState) => {
    return {
        bookInfo: brief.bookInfo,
        book_update_info: brief.book_update_info
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    showDrawer: () => void
}

function BookIntro({ bookInfo, book_update_info, showDrawer }: IProps) {

    const onPress = () => {
        if (typeof showDrawer === "function") {
            showDrawer();
        }
    };

    return (
        <View>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>{bookInfo.description}</Text>
            </View>
            <View style={styles.itemHeader}>
                <View style={styles.itemHeaderLeft}>
                    <Text style={styles.itemHeaderLeftTitle}>章节</Text>
                </View>
                <View style={styles.itemHeaderRight}>
                    <Text style={styles.itemHeaderRightTitle}>{book_update_info}</Text>
                </View>
            </View>
            <View style={styles.allWrapper}>
                <Touchable style={styles.allView} onPress={onPress}>
                    <Text style={styles.all}>全部</Text>
                </Touchable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    description: {
        flex: 1,
        backgroundColor: Color.page_bg,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 5
    },
    descriptionTitle: {
        color: Color.dark_title
    },
    itemHeader: {
        flex: 1,
        height: 45,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Color.page_bg
    },
    itemHeaderLeft: {
        marginLeft: 10
    },
    itemHeaderLeftTitle: {
        fontSize: 15
    },
    itemHeaderRight: {
        marginRight: 15
    },
    itemHeaderRightTitle: {
        fontSize: 12,
        color: Color.dark_title
    },
    allWrapper: {
        height: itemHeight,
        backgroundColor: Color.page_bg
    },
    allView: {
        flex: 1,
        borderRadius: 4,
        marginHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.grey_page_bg
    },
    all: {
        fontWeight: "bold"
    }
});

export default connector(BookIntro);
