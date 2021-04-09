import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import SearchBar from "@/pages/Search/SearchBar";
import { RootStackNavigation } from "@/navigator/index";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/models/index";
import { IBook } from "@/models/search";
import SearchMain from "@/pages/Search/SearchMain";

const mapStateToProps = ({}: RootState) => {
    return {};
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

function Search({ dispatch, navigation }: IProps) {

    useEffect(() => {
        return () => {
            dispatch({
                type: "search/setState",
                payload: {
                    searchTitle: "",
                    showSimpleView: false,
                    showBookView: false
                }
            });
        };
    });

    const goBrief = useCallback((data: IBook) => {
        navigation.navigate("Brief", {
            id: data.id
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <SearchBar navigation={navigation} />
            <SearchMain goBrief={goBrief} />
        </View>
    );
}

export default connector(Search);
