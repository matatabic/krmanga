import React, { memo } from "react";
import {View, Text, StyleSheet} from 'react-native';
import {Color} from "@/utils/const";
import Icon from "@/assets/iconfont";


function Balance(){
    return (
        <View style={styles.container}>
            <View style={styles.leftView}>
                <View style={styles.currencyView}>
                    <Icon name="icon-jinbi" color={Color.dark_title} size={20}/>
                    <Text style={styles.currencyTitle}>--</Text>
                </View>
                <View style={styles.giftView}>
                    <Icon name="icon-saleordertempSend" color={Color.dark_title} size={20}/>
                    <Text style={styles.giftTitle}>--</Text>
                </View>
            </View>
            <View style={styles.rightView}>
                <View style={styles.recharge}>
                    <Text>去充值</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:60,
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: Color.page_bg
    },
    leftView: {
        flex: 7,
        flexDirection: 'row',
        marginHorizontal: 25,
    },
    currencyView: {
        flex: 1,
        flexDirection: 'row',

        alignItems: 'center',
    },
    currencyTitle: {
        marginLeft: 5
    },
    giftView: {
        flex: 1,
        flexDirection: 'row',

        alignItems: 'center',
    },
    giftTitle: {
        marginLeft: 5
    },
    rightView: {
        flex: 3,
        justifyContent: 'center',
    },
    recharge: {
        height: 46,
        borderRadius: 23,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.purple
    },
})

export default memo(Balance);
