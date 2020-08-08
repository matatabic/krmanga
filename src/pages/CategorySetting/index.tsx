import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ICategories, ICategory} from '@/models/categorySetting';
import {viewportWidth} from '@/utils/index';
import Item from '@/pages/CategorySetting/Item';
import {RootStackNavigation} from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';

const mapStateToProps = ({categorySetting}: RootState) => {
  return {
    myCategories: categorySetting.myCategories,
    categories: categorySetting.categories,
    isEdit: categorySetting.isEdit,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  myCategories: ICategory[];
}

const fixedItems = [0, 1];

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

class CategorySetting extends React.Component<IProps, IState> {
  state = {
    myCategories: this.props.myCategories,
  };

  onSubmit = () => {
    const {dispatch} = this.props;
    const {myCategories} = this.state;
    dispatch({
      type: 'categorySetting/toggle',
      payload: {
        myCategories,
      },
    });
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />,
    });
  }

  UNSAFE_componentWillMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'categorySetting/setState',
      payload: {
        isEdit: false,
      },
    });
  }

  onLongPress = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'categorySetting/setState',
      payload: {
        isEdit: true,
      },
    });
  };

  onPress = (item: ICategory, index: number, selected: boolean) => {
    const {isEdit} = this.props;
    const {myCategories} = this.state;
    const disabled = fixedItems.indexOf(index) > -1;
    if (disabled) {
      return false;
    }
    if (isEdit) {
      if (selected) {
        this.setState({
          myCategories: myCategories.filter(
            (selectedItem) => selectedItem.id !== item.id,
          ),
        });
      } else {
        this.setState({
          myCategories: myCategories.concat([item]),
        });
      }
    }
  };

  renderItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <Touchable key={item.id} onPress={() => this.onPress(item, index, true)}>
        <Item
          data={item}
          isEdit={isEdit}
          disabled={disabled}
          itemWrapperStyle={styles.itemWrapper}
          item={styles.item}
          selected
        />
      </Touchable>
    );
  };

  renderUnSelectedItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, false)}
        onLongPress={this.onLongPress}>
        <Item
          data={item}
          isEdit={isEdit}
          itemWrapperStyle={styles.itemWrapper}
          item={styles.item}
          selected={false}
        />
      </Touchable>
    );
  };

  render() {
    const {myCategories} = this.state;
    const {categories} = this.props;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          {myCategories.map(this.renderItem)}
        </View>
        <View>
          {Object.keys(categories).map((classify) => {
            return (
              <View key={classify}>
                <View>
                  <Text style={styles.classifyName}>{classify}</Text>
                </View>
                <View style={styles.classifyView}>
                  {categories[classify].map(
                    (item: ICategory, index: number) => {
                      if (
                        myCategories.find(
                          (selectedItem) => selectedItem.id === item.id,
                        )
                      ) {
                        return null;
                      }
                      return this.renderUnSelectedItem(item, index);
                    },
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  itemWrapper: {
    width: itemWidth,
    height: 48,
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});

export default connector(CategorySetting);
