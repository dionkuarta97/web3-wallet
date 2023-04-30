import { View } from 'native-base';
import React from 'react';
import { ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { width } from '../../../Helpers';

const images = [
  { image: require('../../../../assets/carousel/btc.png') },
  { image: require('../../../../assets/carousel/btc.png') },
  { image: require('../../../../assets/carousel/btc.png') }
];

const HomeCarousel = () => {
  const itemWidth = Math.round(width * 0.75);

  const renderItem = ({ item }: any) => {
    return (
      <ImageBackground
        source={item.image}
        borderRadius={15}
        style={{
          width: itemWidth,
          height: itemWidth / 2,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    );
  };

  return (
    <View style={{ marginTop: 8, alignItems: 'center', justifyContent: 'center' }}>
      <Carousel
        layout={'default'}
        data={images}
        itemWidth={itemWidth}
        sliderWidth={width}
        renderItem={renderItem}
        autoplay={true}
        enableMomentum={true}
        lockScrollWhileSnapping={true}
        autoplayInterval={4000}
        disableIntervalMomentum={true}
        loop={true}
        decelerationRate={0.25}
      />
    </View>
  );
};

export default HomeCarousel;
