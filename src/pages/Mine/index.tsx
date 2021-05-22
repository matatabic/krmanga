import React, { useRef } from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import ImageBackground from "./ImageBackground";
import { Color } from "@/utils/const";
import Information from "./Information";
import BuyList from "./BuyList";
import Balance from "./Balance";
import { ModalStackNavigation, RootStackNavigation } from "@/navigator/index";
import { viewportHeight } from "@/utils/index";
import Version from "@/pages/Mine/Version";
import CheckUpdate from "@/pages/Mine/CheckUpdate";
import Harmony from "@/pages/Mine/Harmony";
import Location from "@/pages/Mine/Location";
import Native from "@/pages/Mine/Native";


interface IProps {
    navigation: RootStackNavigation & ModalStackNavigation;
}

function Mine({ navigation }: IProps) {

    const translateY: Animated.Value = useRef(new Animated.Value(0)).current;

    const getBgImageSize = () => {
        return translateY.interpolate({
            inputRange: [-100, 0],
            outputRange: [1.3, 1],
            extrapolate: "clamp"
        });
    };

    return (
        <View>
            <ImageBackground imageSize={getBgImageSize()} />
            <Animated.ScrollView
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: { contentOffset: { y: translateY } }
                        }
                    ],
                    {
                        useNativeDriver: true
                    }
                )}>
                <View style={styles.container}>
                    <View style={{ height: 100 }} />
                    <View style={{ flex: 1, backgroundColor: Color.grey_page_bg }} />
                    <View style={styles.detail}>
                        <Information navigation={navigation} />
                        <BuyList />
                        <Balance />
                        <CheckUpdate navigation={navigation} />
                        <Harmony />
                        <Version />
                        <Location />
                        {Platform.OS === "android" && <Native />}
                    </View>

                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: viewportHeight,
        marginTop: 150
    },
    detail: {
        ...StyleSheet.absoluteFillObject,
        marginHorizontal: 15,
        marginBottom: 25
    }
});

export default Mine;
