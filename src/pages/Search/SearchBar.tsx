import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import Touchable from "@/components/Touchable";
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";


const mapStateToProps = ({search}: RootState) => {
    return {
        searchTitle: search.searchTitle,
        showBookView: search.showBookView,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

let tempTimeout: NodeJS.Timeout | null = null;

function SearchBar({navigation, dispatch, searchTitle}: IProps) {


    const onSubmitEditing = () => {
        if (searchTitle.length > 0) {
            dispatch({
                type: 'search/setState',
                payload: {
                    showBookView: true,
                }
            })
            dispatch({
                type: 'search/fetchBookList',
                payload: {
                    title: searchTitle,
                    refreshing: true,
                },
                addSearch: (isAdd: boolean) => {
                    if (isAdd) {
                        dispatch({
                            type: 'search/addSearch',
                            payload: {
                                title: searchTitle,
                            }
                        })
                    }
                }
            })
        }
    }

    const debounce = (cb: any, wait: number) => {
        let timeout = tempTimeout
        if (timeout !== null) {
            clearTimeout(timeout)
        }
        tempTimeout = setTimeout(() => {
            tempTimeout = null
            cb && cb()
        }, wait);
    }

    const onChangeText = (title: string) => {
        dispatch({
            type: 'search/setState',
            payload: {
                searchTitle: title
            }
        })

        if (title && title.length > 0) {
            debounce(() => loadData(title), 1000)
        } else {
            dispatch({
                type: 'search/setState',
                payload: {
                    showSimpleView: false,
                    showBookView: false,
                }
            })
            if (tempTimeout !== null) {
                clearTimeout(tempTimeout)
            }
        }
    }

    const cleanTitle = () => {
        dispatch({
            type: 'search/setState',
            payload: {
                searchTitle: '',
                showSimpleView: false,
                showBookView: false,
            }
        })
    }

    const loadData = (title: string) => {
        dispatch({
            type: 'search/fetchSimpleList',
            payload: {
                searchTitle: title
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftView}>
                <Icon name="icon-search" style={styles.searchIcon} size={18}/>
                <TextInput style={styles.searchInput}
                           onSubmitEditing={onSubmitEditing}
                           maxLength={20}
                           placeholder={'搜索关键字...'}
                           onChangeText={(text) => {
                               onChangeText(text)
                           }}
                           value={searchTitle}
                />
                <Touchable onPress={cleanTitle}>
                    <Icon name="icon-chacha" style={styles.cleanTitle} size={18}/>
                </Touchable>
            </View>
            <Touchable onPress={() => navigation.goBack()}>
                <View style={styles.rightView}>
                    <Text>取消</Text>
                </View>
            </Touchable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        paddingTop: getStatusBarHeight(),
        backgroundColor: Color.theme,
    },
    leftView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.page_bg,
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    searchView: {
        flex: 1,
        backgroundColor: Color.page_bg
    },
    searchIcon: {
        marginHorizontal: 10,
    },
    cleanTitle: {
        marginHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        padding: 0
    },
    rightView: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
})

export default connector(SearchBar);
