import React, { useCallback, useRef, useState } from "react";
import { Animated, SectionList, SectionListRenderItemInfo, StyleSheet, View, Text } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { ModalStackNavigation, RootStackNavigation } from "@/navigator/index";
import ListPlaceholder from "@/components/Placeholder/ListPlaceholder";
import { Color } from "@/utils/const";
import Touchable from "@/components/Touchable";
import Item from "@/pages/Shelf/History/Item";
import { wp } from "@/utils/index";
import More from "@/components/More";
import End from "@/components/End";
import EditView from "@/pages/Shelf/EditView";
import { useFocusEffect } from "@react-navigation/native";
import { IHistory } from "@/models/history";

const mapStateToProps = ({ user, history, loading }: RootState) => {
    return {
        isLogin: user.isLogin,
        historyList: history.historyList,
        isEdit: history.isEdit,
        ids: history.ids,
        refreshing: history.refreshing,
        hasMore: history.hasMore,
        pages: history.pagination,
        loading: loading.effects["history/fetchHistoryList"]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation & ModalStackNavigation;
}

function History({ dispatch, navigation, isLogin, isEdit, historyList, ids, loading, refreshing, hasMore, pages }: IProps) {

    const translateX: Animated.Value = useRef(new Animated.Value(0)).current;
    const [endReached, setEndReached] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            loadData(true);
            return () => {
                dispatch({
                    type: "history/setState",
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
                type: "history/fetchHistoryList",
                payload: {
                    refreshing: refreshing
                },
                callback
            });
        }
    };

    const renderSectionHeader = ({ section: { title } }: any) => {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
        );
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

    const onClickItem = useCallback((item: IHistory[]) => {
        if (isEdit) {
            let i = ids.indexOf(item["book_id"]);
            if (i > -1) {
                ids.splice(i, 1);
                dispatch({
                    type: "history/setState",
                    payload: {
                        ids: [...ids]
                    }
                });
            } else {
                dispatch({
                    type: "history/setState",
                    payload: {
                        ids: [...ids, item["book_id"]]
                    }
                });
            }
        } else {
            navigation.navigate("Brief", {
                id: item["book_id"]
            });
        }
    }, [isEdit, ids]);

    const goMangaView = useCallback((item: IHistory[]) => {
        navigation.navigate("Brief", {
            id: item["book_id"]
        });
        navigation.navigate("MangaView", {
            chapter_num: item["chapter_num"],
            markRoast: item["roast"],
            book_id: item["book_id"]
        });
    }, []);

    const renderItem = ({ item }: SectionListRenderItemInfo<IHistory[]>) => {
        const selected = ids.indexOf(item["book_id"]) > -1;
        return (
            <Touchable
                key={item["id"]}
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

    const onRefresh = () => {
        dispatch({
            type: "history/setScreenReload"
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

    const renderFooter = () => {
        if (endReached) {
            return <More />;
        }
        if (!hasMore) {
            return <End />;
        }

        return null;
    };

    const cancel = () => {
        let newData: string[] = [];
        historyList.forEach(items => {
                items.data.forEach(item => {
                    newData = newData.concat(item["book_id"]);
                });
            }
        );
        if (newData.length === ids.length) {
            dispatch({
                type: "history/setState",
                payload: {
                    ids: []
                }
            });
        } else {
            dispatch({
                type: "history/setState",
                payload: {
                    ids: newData
                }
            });
        }
    };

    const destroy = () => {
        dispatch({
            type: "history/delUserHistory",
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
                    <SectionList
                        keyExtractor={(item, index) => `section-item-${index}`}
                        renderSectionHeader={renderSectionHeader}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        sections={historyList}
                        style={styles.container}
                        stickySectionHeadersEnabled={true}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.1}
                        renderItem={renderItem}
                        extraData={endReached}
                        ListFooterComponent={renderFooter}
                    />
                    <EditView
                        data_length={pages.current_page * pages.page_size < pages.total ?
                            pages.current_page * pages.page_size : pages.total}
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
    },
    headerView: {
        height: 45,
        paddingLeft: 15,
        justifyContent: "center",
        backgroundColor: Color.page_bg
    },
    headerTitle: {
        fontSize: 16
    }
});

export default connector(History);
