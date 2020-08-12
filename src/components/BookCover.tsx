import React from 'react';
import {Image, Text} from 'react-native';
import {ICommend, IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';

const DEFAULT_IMAGE =
  'https://jiecaomh.com/media/uploads/a/目標就是妳內褲完結/cover.jpg';

interface itemStyle {
  width: Number;
  marginVertical: Number;
  marginHorizontal: Number;
}

export interface IProps {
  data: ICommend | IGuess;
  goBrief: (data: ICommend) => void;
  itemStyle: any;
  imageStyle: any;
}

class BookCover extends React.PureComponent<IProps> {
  showError = () => {
    const {data} = this.props;
    console.log('error' + data.id);
  };

  render() {
    const {data, goBrief, itemStyle, imageStyle} = this.props;
    return (
      <Touchable style={{...itemStyle}} onPress={() => goBrief(data)}>
        <Image
          source={{uri: data.image}}
          onError={this.showError}
          style={{...imageStyle}}
          resizeMode="stretch"
        />
        <Text numberOfLines={1}>{data.title}</Text>
        <Text numberOfLines={1}>{data.category ? data.category : ''}</Text>
      </Touchable>
    );
  }
}

export default BookCover;
