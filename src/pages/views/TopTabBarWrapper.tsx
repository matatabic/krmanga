import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialTopTabBar, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface IProps extends MaterialTopTabBarProps {

}

class TopTabBarWrapper extends React.Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <MaterialTopTabBar {...this.props} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  }
})

export default TopTabBarWrapper;
