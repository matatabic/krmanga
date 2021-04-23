import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Animated, FlatList, ListRenderItemInfo } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { RootStackNavigation } from "@/navigator/index";
import { useFocusEffect } from "@react-navigation/native";
import { Color } from "@/utils/const";
import Touchable from "@/components/Touchable";
import Item from "@/pages/Shelf/Download/Item";
import { wp } from "@/utils/index";
import { IDownList } from "@/models/downloadManage";
import More from "@/components/More";
import End from "@/components/End";
import ListPlaceholder from "@/components/Placeholder/ListPlaceholder";
import EditView from "@/pages/Shelf/EditView";


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
    navigation: RootStackNavigation;
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
            return () => {
                dispatch({
                    type: "downloadManage/setState",
                    payload: {
                        isEdit: false,
                        ids: []
                    }
                });
            };
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

    const onRefresh = () => {
        dispatch({
            type: "downloadManage/setScreenReload"
        });
        loadData(true);
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
        if (isEdit) {
            let i = ids.indexOf(item.book_id);
            if (i > -1) {
                ids.splice(i, 1);
                dispatch({
                    type: "downloadManage/setState",
                    payload: {
                        ids: [...ids]
                    }
                });
            } else {
                dispatch({
                    type: "downloadManage/setState",
                    payload: {
                        ids: [...ids, item.book_id]
                    }
                });
            }
        } else {
            navigation.navigate("ChapterManage", {
                book_id: item.book_id,
                headerTitle: item.title
            });
        }
    }, [isEdit, ids]);

    const goMangaView = useCallback((item: IDownList) => {
        navigation.navigate("Brief", {
            id: item.book_id
        });
        navigation.navigate("MangaView", {
            chapter_num: item.chapter_num,
            markRoast: item.roast,
            book_id: item.book_id
        });
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

    const cancel = () => {
        const newData = downloadList.map(item => item.book_id);
        if (downloadList.length === ids.length) {
            dispatch({
                type: "downloadManage/setState",
                payload: {
                    ids: []
                }
            });
        } else {
            dispatch({
                type: "downloadManage/setState",
                payload: {
                    ids: newData
                }
            });
        }
    };

    const destroy = () => {
        dispatch({
            type: "downloadManage/delBookCache",
            payload: {
                ids
            }
        });
    };

    if (isEdit) {
        getBeforeX();
    } else {
        getAfterX();
    }

    return (
        !isLogin ? null :
            (loading && refreshing) ? <ListPlaceholder /> :
                <View style={styles.container}>
                    <FlatList
                        keyExtractor={(item, key) => `item-${item.book_id}-key-${key}`}
                        numColumns={1}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        data={downloadList}
                        renderItem={renderItem}
                        extraData={endReached}
                        ListFooterComponent={renderFooter}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.1}
                    />
                    <EditView
                        data_length={downloadList.length}
                        isEdit={isEdit}
                        ids={ids}
                        cancel={cancel}
                        destroy={destroy}
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
