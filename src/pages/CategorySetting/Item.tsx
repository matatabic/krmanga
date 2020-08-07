import React from 'react';
import { ICategory } from "@/models/categorySetting";
import { Text, View } from "react-native";

interface IProps {
  data: ICategory;
  itemWrapperStyle: any;
  item: any;
}

class Item extends React.Component<IProps> {
  render() {
    const { data, itemWrapperStyle, item } = this.props;
    return (
      <View key={data.id} style={{ ...itemWrapperStyle }}>
        <View style={{ ...item }}>
          <Text>{data.name}</Text>
        </View>
      </View>
    )
  }
}

export default Item;
