import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {getActiveRouteName} from '@/utils/index';

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routeName = getActiveRouteName(props.state);
  const modelState = state[routeName];
  return {
    linearColors:
      modelState.carousels && modelState.carousels.length > 0
        ? modelState.carousels[modelState.activeCarouselIndex]
          ? modelState.carousels[modelState.activeCarouselIndex].colors
          : undefined
        : undefined,
    activeCarouselIndex: modelState.activeCarouselIndex,
    gradientVisible: modelState.gradientVisible,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {
  get linearGradient() {
    const {
      linearColors = ['rgba(0,0,0,0.5)', 'rgba(255,255,255,0.5)'],
      gradientVisible,
    } = this.props;
    if (gradientVisible) {
      return (
        <LinearAnimatedGradientTransition
          colors={linearColors}
          style={styles.gradient}
        />
      );
    } else {
      return null;
    }
  }

  goCategorySetting = () => {
    const {navigation} = this.props;
    navigation.navigate('CategorySetting');
  };

  render() {
    let {gradientVisible, indicatorStyle, ...restProps} = this.props;
    let textStyle = styles.text;
    let activeTintColor = '#333';
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
      if (indicatorStyle) {
        indicatorStyle = StyleSheet.compose(
          indicatorStyle,
          styles.whiteBackgroundColor,
        );
      }
    }
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topTabBarView}>
          <MaterialTopTabBar
            {...restProps}
            indicatorStyle={indicatorStyle}
            activeTintColor={activeTintColor}
            style={styles.tabBar}
          />
          <Touchable
            style={styles.categoryBtn}
            onPress={this.goCategorySetting}>
            <Text style={textStyle}>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottomTabBarView}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>Search</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>History</Text>
          </Touchable>
        </View>
      </View>
    );
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
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  },
});

export default connector(TopTabBarWrapper);
