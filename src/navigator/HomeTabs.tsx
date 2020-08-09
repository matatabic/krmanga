import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import {StyleSheet, View} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/categorySetting';
import {createHomeModel} from '@/config/dva';

export type HomeParamList = {
  [key: string]: {
    namespace: string;
  };
};

const Tab = createMaterialTopTabNavigator<HomeParamList>();

const mapStateToProps = ({categorySetting}: RootState) => {
  return {
    myCategories: categorySetting.myCategories,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class HomeTabs extends React.Component<IProps> {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };

  renderScreen = (item: ICategory) => {
    console.log(item);
    createHomeModel(item.id.toString());
    return (
      <Tab.Screen
        key={item.id}
        name={item.id.toString()}
        component={Home}
        options={{tabBarLabel: item.name}}
        initialParams={{
          namespace: item.id.toString(),
        }}
      />
    );
  };

  render() {
    const {myCategories} = this.props;
    console.log(myCategories);
    return (
      <Tab.Navigator
        lazy
        tabBar={this.renderTabBar}
        sceneContainerStyle={styles.sceneContainer}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 80,
          },
          indicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: '#FCE04F',
          },
          activeTintColor: '#FCE04F',
          inactiveTintColor: '#333',
        }}>
        {myCategories.map(this.renderScreen)}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default connector(HomeTabs);
