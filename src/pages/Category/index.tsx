import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, ListRenderItemInfo, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { RootState } from "@/models/index";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { CategoryTabParamList } from "@/navigator/CategoryTabs";
import { connect, ConnectedProps } from "react-redux";
import { RootStackNavigation } from "@/navigator/index";
import BookPlaceholder from "@/components/Placeholder/BookPlaceholder";
import { Color } from "@/utils/const";
import { IBook } from "@/models/home";
import BookCover from "@/components/BookCover";
import More from "@/components/More";
import End from "@/components/End";

const mapStateToProps = (state: RootState, { route }: { route: RouteProp<CategoryTabParamList, string> }) => {
    const { namespace, category_id } = route.params;
    const activeStatus = state["category"].activeStatus;
    const activeModel = `${namespace}-status-${activeStatus}`;

    return {
        category_id,
        activeModel,
        activeCategory: state["category"].activeCategory,
        activeStatus: state["category"].activeStatus,
        bookList: state[activeModel] ? state[activeModel].bookList : [],
        hasMore: state[activeModel] ? state[activeModel].hasMore : false,
        refreshing: state[activeModel] ? state[activeModel].refreshing : false,
        hideHeader: state[activeModel] ? state[activeModel] : false,
        loading: state.loading.effects[`${activeModel}/fetchBookList`]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<CategoryTabParamList, string>;
    navigation: RootStackNavigation;
}

function Category({ dispatch, navigation, category_id, activeStatus, activeModel, bookList, loading, hasMore, refreshing }: IProps) {

    let scrollViewStartOffsetY: number = 0;
    const [endReached, setEndReached] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            dispatch({
                type: "category/setState",
                payload: {
                    activeCategory: category_id
                }
            });
            loadData(true);
        }, [activeStatus])
    );

    const loadData = (refreshing: boolean, callback?: () => void) => {
        dispatch({
            type: `${activeModel}/fetchBookList`,
            payload: {
                refreshing,
                category_id
            },
            callback
        });
    };

    const goBrief = useCallback((data: IBook) => {
        navigation.navigate("Brief", {
            id: data.id
        });
    }, []);

    const renderItem = ({ item }: ListRenderItemInfo<IBook>) => {
        return <BookCover
            data={item}
            goBrief={goBrief}
            key={item.id}
        />;
    };

    const onRefresh = () => {
        dispatch({
            type: `${activeModel}/fetchBookList`,
            payload: {
                refreshing: true,
                onRefresh: true,
                category_id
            }
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

    const onScrollBeginDrag = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollViewStartOffsetY = nativeEvent.contentOffset.y;
    };

    const onScrollEndDrag = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (scrollViewStartOffsetY > nativeEvent.contentOffset.y) {
            dispatch({
                type: "category/setState",
                payload: {
                    hideHeader: false
                }
            });
        } else {
            dispatch({
                type: "category/setState",
                payload: {
                    hideHeader: true
                }
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

    return (
        (loading && refreshing) ? <BookPlaceholder /> :
            <FlatList
                keyExtractor={(item, key) => `item-${item.id}-key-${key}`}
                data={bookList}
                extraData={endReached}
                renderItem={renderItem}
                refreshing={refreshing}
                style={styles.container}
                onRefresh={onRefresh}
                ListFooterComponent={renderFooter}
                scrollEventThrottle={1}
                onScrollBeginDrag={onScrollBeginDrag}
                onScrollEndDrag={onScrollEndDrag}
                numColumns={3}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
            />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.page_bg
    }
});

export default connector(Category);
