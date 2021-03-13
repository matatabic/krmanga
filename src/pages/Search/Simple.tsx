import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {IBook} from "@/models/search";
import SimpleItem from "@/pages/Search/Item/SimpleItem";

const mapStateToProps = ({search}: RootState) => {
    return {
        searchTitle: search.searchTitle,
        simpleList: search.simpleList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBrief: (data: IBook) => void;
}

function Simple({simpleList, goBrief}: IProps) {
    return (
        <View style={styles.container}>
            {
                simpleList.map((item, index) => {
                    return (
                        <View key={index}>
                            <SimpleItem data={item} goBrief={goBrief}/>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 220
    }
})

export default connector(Simple);
