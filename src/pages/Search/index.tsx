import React, {useEffect} from 'react'
import {StyleSheet, View} from "react-native";
import SearchBar from "@/pages/Search/SearchBar";
import {RootStackNavigation} from "@/navigator/index";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "@/models/index";
import {IBook} from "@/models/search";
import SearchMain from "@/pages/Search/SearchMain";

const mapStateToProps = ({search}: RootState) => {
    return {};
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

function Search({dispatch, navigation}: IProps) {

    useEffect(() => {
        return () => {
            dispatch({
                type: 'search/setState',
                payload: {
                    searchTitle: '',
                    showSimpleView: false,
                    showBookView: false,
                }
            })
        }
    })

    const goBrief = (data: IBook) => {
        navigation.navigate('Brief', {
            id: data.id
        })
    }

    return (
        <View style={styles.container}>
            <SearchBar navigation={navigation}/>
            <SearchMain goBrief={goBrief}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connector(Search);
