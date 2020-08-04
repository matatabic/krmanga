import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialTopTabBar, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import Touchable from "@/components/Touchable";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = ({ home }: RootState) => {
  return {
    linearColors: home.carousels && home.carousels.length > 0
      ? (home.carousels[home.activeCarouselIndex] ? home.carousels[home.activeCarouselIndex].colors : undefined)
      : undefined,
    activeCarouselIndex: home.activeCarouselIndex,
  }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {

  get linearGradient() {
    const { linearColors = ['#ccc', '#e2e2e2'], activeCarouselIndex } = this.props;
    return <LinearAnimatedGradientTransition colors={linearColors} style={styles.gradient} />;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topTabBarView}>
          <MaterialTopTabBar {...this.props} style={styles.tabBar} />
          <Touchable style={styles.categoryBtn}>
            <Text>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottomTabBarView}>
          <Touchable style={styles.searchBtn}>
            <Text>Search</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text>History</Text>
          </Touchable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBar: {
    flex: 1,
    elevation: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  bottomTabBarView: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  }
})

export default connector(TopTabBarWrapper);
