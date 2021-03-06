import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Animated, FlatList, ListRenderItemInfo } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { ModalStackNavigation, RootStackNavigation } from "@/navigator/index";
import { useFocusEffect } from "@react-navigation/native";
import BookPlaceholder from "@/components/Placeholder/BookPlaceholder";
import More from "@/components/More";
import End from "@/components/End";
import EditView from "@/pages/Shelf/EditView";
import Item from "@/pages/Shelf/Item";
import { Color } from "@/utils/const";
import { ICollection } from "@/models/collection";


const mapStateToProps = ({ user, collection, loading }: RootState) => {
    return {
        isLogin: user.isLogin,
        isEdit: collection.isEdit,
        ids: collection.ids,
        collectionList: collection.collectionList,
        refreshing: collection.refreshing,
        hasMore: collection.hasMore,
        loading: loading.effects["collection/fetchCollectionList"]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation & ModalStackNavigation;
}

function Shelf({
                   navigation, dispatch, isLogin, loading,
                   refreshing, hasMore, collectionList, ids, isEdit
               }: IProps) {

    const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
    const [endReached, setEndReached] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            loadData(true);
            return () => {
                dispatch({
                    type: "collection/setState",
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
                type: "collection/fetchCollectionList",
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

    const onClickItem = useCallback((item: ICollection) => {
        if (isEdit) {
            const i = ids.indexOf(item.id);
            if (i > -1) {
                ids.splice(i, 1);
                dispatch({
                    type: "collection/setState",
                    payload: {
                        ids: [...ids]
                    }
                });
            } else {
                dispatch({
                    type: "collection/setState",
                    payload: {
                        ids: [...ids, item.id]
                    }
                });
            }
        } else {
            navigation.navigate("Brief", {
                id: item.book_id
            });
        }
    }, [isEdit, ids]);

    const cancel = () => {
        const newData = collectionList.map(item => item.id);
        if (collectionList.length === ids.length) {
            dispatch({
                type: "collection/setState",
                payload: {
                    ids: []
                }
            });
        } else {
            dispatch({
                type: "collection/setState",
                payload: {
                    ids: newData
                }
            });
        }
    };

    const destroy = () => {
        dispatch({
            type: "collection/delUserCollection",
            payload: {
                ids
            }
        });
    };

    const renderItem = ({ item }: ListRenderItemInfo<ICollection>) => {
        const selected = ids.indexOf(item.id) > -1;
        return (
            <Item
                key={item.id}
                data={item}
                isEdit={isEdit}
                selected={selected}
                onClickItem={onClickItem}
            />
        );
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

    const getHeaderOpacity = () => {
        return scrollY.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });
    };

    return (
        !isLogin ? null :
            refreshing ? <BookPlaceholder /> :
                <View style={styles.container}>
                        <Animated.Text style={[styles.total,{
                            opacity: getHeaderOpacity()
                        }]}>总收藏{collectionList.length}本</Animated.Text>
                    <FlatList
                        keyExtractor={(item, key) => `item-${item.id}-key-${key}`}
                        scrollEventThrottle={1}
                        data={collectionList}
                        style={styles.container}
                        numColumns={3}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: { contentOffset: { y: scrollY } }
                            }],
                            {
                                useNativeDriver: false
                            }
                        )}
                        renderItem={renderItem}
                        extraData={endReached}
                        ListFooterComponent={renderFooter}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.1}
                    />
                    <EditView
                        data_length={collectionList.length}
                        ids={ids}
                        isEdit={isEdit}
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
    total: {
        position:'absolute',
        top:0,
        zIndex:1,
        alignSelf:"center"
    }
});

export default connector(Shelf);
