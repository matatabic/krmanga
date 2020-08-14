import React from 'react';
import {Animated, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useHeaderHeight} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation, RootStackParamList} from '@/navigator/index';
import Tab from './Tab';
import {NativeViewGestureHandler, PanGestureHandler, PanGestureHandlerStateChangeEvent, State, TapGestureHandler} from "react-native-gesture-handler";
import {viewportHeight} from "@/utils/index";


const mapStateToProps = ({brief}: RootState) => {
    return {
        description: brief.description,
        collected: brief.collected,
        serial: brief.serial,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    headerHeight: number;
    route: RouteProp<RootStackParamList, 'Brief'>;
    navigation:RootStackNavigation;
}

const HEADER_HEIGHT = 260;
const USE_NATIVE_DRIVER = true;

class Brief extends React.Component<IProps> {
    panRef = React.createRef<PanGestureHandler>();
    tapRef = React.createRef<TapGestureHandler>();
    nativeRef = React.createRef<NativeViewGestureHandler>();
    RANGE = [-(HEADER_HEIGHT - this.props.headerHeight), 0]
    translationY = new Animated.Value(0);
    lastScrollY = new Animated.Value(0);
    reverseLastScrollY = Animated.multiply(new Animated.Value(-1), this.lastScrollY);
    lastScrollYValue = 0;
    translationYValue = 0;
    translationYOffset = new Animated.Value(0);
    translateY = Animated.add(Animated.add(this.translationY, this.reverseLastScrollY), this.translationYOffset);

    componentDidMount() {
        const {dispatch, route,navigation} = this.props;
        const {id} = route.params.item;
        dispatch({
            type: 'brief/fetchBrief',
            payload: {
                book_id: id,
            },
        });
        navigation.setParams({
            opacity:this.translateY.interpolate({
                inputRange:this.RANGE,
                outputRange:[1,0],
            })
        })
    }

    renderHeader = () => {
        const {headerHeight, route, collected, serial, description} = this.props;
        const {title, image, id, category} = route.params.item;
        return (
            <View style={[styles.header, {paddingTop: headerHeight}]}>
                <Image source={{uri: image}} style={styles.background}/>
                <BlurView
                    blurType="light"
                    blurAmount={10}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.leftView}>
                    <Image source={{uri: image}} style={styles.thumbnail}/>
                </View>
                <View>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.bookInfoText}>
                        {serial ? '已完结' : '连载中'}
                    </Text>
                    <Text style={styles.bookInfoText}>{category}</Text>
                </View>
            </View>
        );
    };

    onScrollDrag = Animated.event(
        [{nativeEvent: {contentOffset: {y: this.lastScrollY}}}],
        {
            useNativeDriver: USE_NATIVE_DRIVER,
            listener: ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
                this.lastScrollYValue = nativeEvent.contentOffset.y;
            }
        }
    )

    onGestureEvent = Animated.event(
        [{nativeEvent: {translationY: this.translationY}}],
        {
            useNativeDriver: USE_NATIVE_DRIVER
        }
    )

    onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            let {translationY} = nativeEvent;
            translationY -= this.lastScrollYValue;
            this.translationYOffset.extractOffset();
            this.translationYOffset.setValue(translationY);
            this.translationYOffset.flattenOffset();
            this.translationY.setValue(0);

            this.translationYValue += translationY;
            let maxDeltaY = -this.RANGE[0] - this.translationYValue;
            if (this.translationYValue < this.RANGE[0]) {
                this.translationYValue = this.RANGE[0];
                Animated.spring(this.translationYOffset, {
                    useNativeDriver: USE_NATIVE_DRIVER,
                    toValue: this.RANGE[0],
                }).start();
                maxDeltaY = this.RANGE[1];
            } else if (this.translationYValue > this.RANGE[1]) {
                this.translationYValue = this.RANGE[1];
                Animated.spring(this.translationYOffset, {
                    useNativeDriver: USE_NATIVE_DRIVER,
                    toValue: this.RANGE[1],
                }).start();
                maxDeltaY = -this.RANGE[0];
            }
            if (this.tapRef.current) {
                const tap: any = this.tapRef.current;
                tap.setNativeProps({
                    maxDeltaY,
                })
            }
        }
    }

    render() {
        return (
            <TapGestureHandler ref={this.tapRef} maxDeltaY={-this.RANGE[0]}>
                <View style={styles.container}>
                    <PanGestureHandler
                        ref={this.panRef}
                        simultaneousHandlers={[this.tapRef, this.nativeRef]}
                        onGestureEvent={this.onGestureEvent}
                        onHandlerStateChange={this.onHandlerStateChange}>
                        <Animated.View
                            style={[
                                styles.container,
                                {
                                    transform: [{
                                        translateY: this.translateY.interpolate({
                                            inputRange: this.RANGE,
                                            outputRange: this.RANGE,
                                            extrapolate: 'clamp',
                                        })
                                    }],
                                }
                            ]}>
                            {this.renderHeader()}
                            <View style={{height: viewportHeight - this.props.headerHeight}}>
                                <Tab panRef={this.panRef} tapRef={this.tapRef} nativeRef={this.nativeRef} onScrollDrag={this.onScrollDrag}/>
                            </View>
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </TapGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    header: {
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#eee',
    },
    leftView: {
        marginRight: 26,
    },
    thumbnail: {
        width: 98,
        height: 125,
        borderColor: '#000',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
        backgroundColor: '#ccc',
    },
    rightView: {
        flex: 1,
    },
    titleText: {
        fontSize: 23,
        fontWeight: '900',
        color: '#000',
    },
    bookInfoText: {
        fontSize: 15,
        marginVertical: 10,
        color: '#000',
    },
});

const Wrapper = function (props: IProps) {
    const headerHeight = useHeaderHeight();
    return <Brief {...props} headerHeight={headerHeight}/>;
};

export default connector(Wrapper);
