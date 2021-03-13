import React from 'react';
import {Animated, StyleSheet, View, Text} from "react-native";
import {RootStackNavigation} from "@/navigator/index";
import Touchable from "@/components/Touchable";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {useHeaderHeight} from "@react-navigation/stack";
import Icon from '@/assets/iconfont/index';
import {Color} from "@/utils/const";

interface IProps {
    navigation: RootStackNavigation;
    topBarColor: Animated.AnimatedInterpolation;
}


function TopBarWrapper({navigation, topBarColor}: IProps) {

    const headerHeight = useHeaderHeight()

    const goSearch = () => {
        navigation.navigate('Search');
    }

    const goGuess = (headerTitle: string) => {
        navigation.navigate('Guess', {
            headerTitle
        });
    }

    return (
        <Animated.View style={[styles.container, {
            height: headerHeight
        }]}>
            <Animated.View style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: Color.theme,
                opacity: topBarColor
            }}/>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Touchable style={styles.headerLeftView} onPress={() => goGuess("榜单")}>
                        <Icon name="icon-paihangbang" size={25}/>
                        <Text style={styles.headerText}>榜单</Text>
                    </Touchable>
                    <Touchable style={styles.headerLeftView} onPress={() => goGuess("更新")}>
                        <Icon name="icon-shizhong" size={25}/>
                        <Text style={styles.headerText}>更新</Text>
                    </Touchable>
                    <Touchable style={styles.headerLeftView} onPress={() => goGuess("书单")}>
                        <Icon name="icon-history" size={25}/>
                        <Text style={styles.headerText}>书单</Text>
                    </Touchable>
                    <Touchable style={styles.headerLeftView} onPress={() => goGuess("VIP")}>
                        <Icon name="icon-VIP" size={25}/>
                        <Text style={styles.headerText}>VIP</Text>
                    </Touchable>
                </View>
                <Touchable onPress={goSearch}>
                    <View style={styles.headerRight}>
                        <Icon name="icon-search" size={25}/>
                    </View>
                </Touchable>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 100,
    },
    header: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: getStatusBarHeight(),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    headerLeftView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 15
    },
    headerRight: {
        paddingLeft: 35,
        paddingRight: 8,
    }
});

export default TopBarWrapper;
