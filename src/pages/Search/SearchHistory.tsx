import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { Color } from "@/utils/const";
import DestroyView from "@/pages/Search/DestroyView";
import HistoryItem from "@/pages/Search/Item/HistoryItem";


const mapStateToProps = ({ search }: RootState) => {
    return {
        searchHistoryList: search.searchHistoryList
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;


function SearchHistory({ dispatch, searchHistoryList }: ModelState) {

    const destroyHistory = useCallback(() => {
        dispatch({
            type: "search/destroyHistory"
        });
    }, []);

    const clearHistory = useCallback((index: number) => {
        dispatch({
            type: "search/deleteHistory",
            payload: {
                index
            }
        });
    }, []);

    const HistorySearch = useCallback((searchTitle: string) => {
        dispatch({
            type: "search/setState",
            payload: {
                searchTitle,
                showBookView: true
            }
        });
        dispatch({
            type: "search/fetchBookList",
            payload: {
                title: searchTitle,
                refreshing: true
            }
        });
    }, []);

    if (searchHistoryList.length === 0) {
        return null;
    }

    if (searchHistoryList.length > 3) {
        searchHistoryList = searchHistoryList.filter((item, index) => index < 3);
    }

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>搜索历史</Text>
            </View>
            {
                searchHistoryList.map((title, index) => {
                    return (
                        <View key={index}>
                            <HistoryItem
                                index={index}
                                title={title}
                                clearHistory={clearHistory}
                                HistorySearch={HistorySearch}
                            />
                        </View>

                    );
                })
            }
            <DestroyView destroyHistory={destroyHistory} />
        </>

    );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        flexDirection: "column-reverse",
        backgroundColor: Color.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Color.split_line,
        paddingLeft: 20
    },
    headerTitle: {
        color: Color.dark_title,
        marginBottom: 15,
        fontSize: 12
    },
    item: {
        height: 45,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: Color.page_bg,
        borderBottomColor: Color.split_line
    },
    itemLeft: {
        marginLeft: 20,
        flexDirection: "row"
    },
    itemRight: {
        marginRight: 20
    },
    title: {
        marginLeft: 5
    }
});

export default connector(SearchHistory);
