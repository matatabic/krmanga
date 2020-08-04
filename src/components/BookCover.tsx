import React from 'react';
import { Image, Text } from 'react-native';
import { ICommend, IGuess } from "@/models/home";
import Touchable from "@/components/Touchable";

interface itemStyle {
  width: Number;
  marginVertical: Number;
  marginHorizontal: Number;
}

export interface IProps {
  data: ICommend | IGuess;
  onPress: (data: ICommend) => void;
  itemStyle: any;
  imageStyle: any;
}

class BookCover extends React.PureComponent<IProps> {

  showError = () =>{
    console.log('error')
  }

  render() {
    const { data, onPress, itemStyle, imageStyle } = this.props;
    return (
      <Touchable
        style={{ ...itemStyle }}
        onPress={() => onPress(data)}
      >
        <Image
          source={{ uri: data.image }}
          onError={this.showError}
          style={{ ...imageStyle }} />
        <Text numberOfLines={1}>{data.title}</Text>
        <Text numberOfLines={1}>{data.category ? data.category : ''}</Text>
      </Touchable>
    );
  }
}

export default BookCover;
