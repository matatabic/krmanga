import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {SceneRendererProps, TabBar, TabView} from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List/index';
import {NativeViewGestureHandler, PanGestureHandler, TapGestureHandler} from "react-native-gesture-handler";

interface IRoute {
    key: string;
    title: string;
}

interface IState {
    routes: IRoute[];
    index: number;
}

export interface ITabProps {
    panRef: React.RefObject<PanGestureHandler>;
    tapRef: React.RefObject<TapGestureHandler>;
    nativeRef: React.RefObject<NativeViewGestureHandler>;
    onScrollDrag:(event:NativeSyntheticEvent<NativeScrollEvent>) =>void;
}

class Tab extends Component<ITabProps, IState> {
    state = {
        routes: [
            {key: 'introduction', title: '简介'},
            {key: 'brief', title: '列表'},
        ],
        index: 1,
    };

    onIndexChange = (index: number) => {
        this.setState({
            index,
        });
    };

    renderScene = ({route}: { route: IRoute }) => {
        const {panRef, tapRef, nativeRef,onScrollDrag} = this.props;
        switch (route.key) {
            case 'introduction':
                return <Introduction/>;
            case 'brief':
                return <List panRef={panRef} tapRef={tapRef} nativeRef={nativeRef} onScrollDrag={onScrollDrag}/>;
        }
    };

    renderTabBar = (props: SceneRendererProps & { navigationState: IState }) => {
        return (
            <TabBar
                {...props}
                scrollEnabled
                tabStyle={styles.tabStyle}
                labelStyle={styles.label}
                indicatorStyle={styles.indicator}
                style={styles.tabBar}
            />
        );
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={this.onIndexChange}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
            />
        );
    }
}

const styles = StyleSheet.create({
    tabStyle: {
        width: 65,
    },
    label: {
        color: '#333',
    },
    tabBar: {
        backgroundColor: '#fff',
        ...Platform.select({
            android: {
                elevation: 0,
                borderBottomColor: '#e3e3e3',
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
        }),
    },
    indicator: {
        backgroundColor: '#eb6d48',
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderColor: '#fff',
    },
});

export default Tab;
