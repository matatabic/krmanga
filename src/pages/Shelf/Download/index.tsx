import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, SectionListRenderItemInfo, Animated, FlatList, ListRenderItemInfo } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { ModalStackNavigation, RootStackNavigation } from "@/navigator/index";
import { useFocusEffect } from "@react-navigation/native";
import { Color } from "@/utils/const";
import { IHistory } from "@/models/history";
import Touchable from "@/components/Touchable";
import Item from "@/pages/Shelf/Download/Item";
import { wp } from "@/utils/index";
import { IDownList } from "@/models/downloadManage";
import More from "@/components/More";
import End from "@/components/End";


const mapStateToProps = ({ user, downloadManage, loading }: RootState) => {
    return {
        isLogin: user.isLogin,
        isEdit: downloadManage.isEdit,
        ids: downloadManage.ids,
        downloadList: downloadManage.downloadList,
        refreshing: downloadManage.refreshing,
        hasMore: downloadManage.hasMore,
        pages: downloadManage.pagination,
        loading: loading.effects["downloadManage/fetchDownloadList"]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation & ModalStackNavigation;
}

function Download({
                      dispatch, navigation, isEdit, isLogin, ids, downloadList,
                      refreshing, hasMore, loading
                  }: IProps) {

    const translateX: Animated.Value = useRef(new Animated.Value(0)).current;
    const [endReached, setEndReached] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            loadData(true);
        }, [isLogin])
    );

    const loadData = (refreshing: boolean, callback?: () => void) => {
        if (isLogin) {
            dispatch({
                type: "downloadManage/fetchDownloadList",
                payload: {
                    refreshing: refreshing
                },
                callback
            });
        }
    };

    const onEndReached = () => {
        if (!hasMore || loading) {
            return;
        }
        setEndReached(true);

        loadData(false, () => {
            setEndReached(false);
        });
    };

    const getBeforeX = () => {
        Animated.timing(translateX,
            {
                useNativeDriver: false,
                toValue: wp(5),
                duration: 150
            }
        ).start();
    };

    const getAfterX = () => {
        Animated.timing(translateX,
            {
                useNativeDriver: false,
                toValue: 0,
                duration: 150
            }
        ).start();
    };

    const onClickItem = useCallback((item: IDownList) => {

    }, [isEdit, ids]);

    const goMangaView = useCallback((item: IDownList) => {
        // navigation.navigate("Brief", {
        //     id: item["book_id"]
        // });
        // navigation.navigate("MangaView", {
        //     chapter_num: item["chapter_num"],
        //     markRoast: item["roast"],
        //     book_id: item["book_id"]
        // });
    }, []);

    const renderFooter = () => {
        if (endReached) {
            return <More />;
        }
        if (!hasMore) {
            return <End />;
        }

        return null;
    };

    const renderItem = ({ item }: ListRenderItemInfo<IDownList>) => {
        const selected = ids.indexOf(item.book_id) > -1;
        return (
            <Touchable
                key={item.book_id}
                onPress={() => onClickItem(item)}
            >
                <Animated.View
                    style={{ transform: [{ translateX: translateX }] }}
                >
                    <Item
                        data={item}
                        isEdit={isEdit}
                        selected={selected}
                        goMangaView={goMangaView}
                    />
                </Animated.View>
            </Touchable>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item, key) => `item-${item.book_id}-key-${key}`}
                numColumns={1}
                data={downloadList}
                renderItem={renderItem}
                extraData={endReached}
                ListFooterComponent={renderFooter}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.page_bg
    }
});

export default connector(Download);
