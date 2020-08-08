import React from 'react';
import {ICategory} from '@/models/categorySetting';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  isEdit: boolean;
  selected: boolean;
  data: ICategory;
  disabled?: boolean;
  itemWrapperStyle: any;
  item: any;
}

class Item extends React.Component<IProps> {
  render() {
    const {
      data,
      isEdit,
      selected,
      disabled,
      itemWrapperStyle,
      item,
    } = this.props;
    return (
      <View style={{...itemWrapperStyle}}>
        <View style={[{...item}, disabled && styles.disabled]}>
          <Text>{data.name}</Text>
          {isEdit && !disabled && (
            <View style={styles.icon}>
              <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: '#ccc',
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
    lineHeight: 15,
  },
});

export default Item;
