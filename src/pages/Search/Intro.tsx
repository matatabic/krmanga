import React, {useEffect} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {IBook} from "@/models/search";
import {Color} from "@/utils/const";
import IntroItem from "@/pages/Search/Item/IntroItem";

const mapStateToProps = ({search}: RootState) => {
    return {
        introList: search.introList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBrief: (data: IBook) => void;
}

function Intro({dispatch, goBrief, introList}: IProps) {

    useEffect(() => {
        dispatch({
            type: 'search/fetchIntroList'
        });
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>大家都在搜</Text>
            <View style={styles.itemView}>
                {
                    Object.keys(introList).map((value, key) => {
                        return (
                            <View style={styles.item} key={key}>
                                {
                                    introList[value].map((item: IBook) => {
                                        return (
                                            <View key={`intro-${item.id}`}>
                                                <IntroItem data={item} goBrief={goBrief}/>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 235,
        backgroundColor: Color.white,
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: Color.dark_title,
        marginTop: 15,
        fontSize: 12,
    },
    itemView: {
        flex: 1,
        marginVertical: 15,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
})

export default connector(Intro);
