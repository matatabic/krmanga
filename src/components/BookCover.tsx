import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import {ip, viewportWidth, wp} from "@/utils/index";
import {IBook} from "@/models/home";
import {Color} from "@/utils/const";
import FastImage from 'react-native-fast-image';
import SandGlass from '@/assets/image/sandglass.png'
import ErrorImage from '@/assets/image/error.png'


interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}


const itemWidth = wp(90) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(90)) / 4;

function BookCover({data, goBrief}: IProps) {

    const [errorLoad, setErrorLoad] = useState<boolean>(false);
    const [placeholder, setPlaceholder] = useState<boolean>(true);

    const onError = () => {
        setErrorLoad(true)
    };

    const onLoadEnd = () => {
        setPlaceholder(false)
    }

    const onPress = () => {
        if (typeof goBrief === 'function') {
            goBrief(data);
        }
    }

    return (
        <Touchable style={styles.item} onPress={onPress}>
            <FastImage
                source={errorLoad ? ErrorImage : {uri: data.image, cache: FastImage.cacheControl.immutable}}
                onError={onError}
                onLoadEnd={onLoadEnd}
                style={styles.image}
                resizeMode={FastImage.resizeMode.stretch}
            />
            {placeholder && <Image source={SandGlass} style={styles.placeholder}/>}
            <View style={styles.titleView}>
                <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                <Text style={styles.category} numberOfLines={1}>{data.category}</Text>
            </View>
        </Touchable>
    )
}

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        marginTop: itemMargin,
        marginLeft: itemMargin,
        backgroundColor: Color.page_bg,
    },
    titleView: {
        width: itemWidth,
        height: 35,
        marginTop: 5,
    },
    image: {
        width: itemWidth,
        height: imageHeight,
        borderRadius: 5,
    },
    placeholder: {
        width: itemWidth,
        height: imageHeight,
        position: "absolute",
        top: 0,
        left: 0,
    },
    title: {
        textAlign: 'center',
    },
    category: {
        fontSize: 14,
        color: Color.grey_title,
    },
})

export default BookCover;
