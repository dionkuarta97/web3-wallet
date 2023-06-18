import Air from '../../../../assets/services/air.png';
import Pulsa from '../../../../assets/services/pulsa.png';
import Token from '../../../../assets/services/token.png';
import PLN from '../../../../assets/services/pln.png';
import Internet from '../../../../assets/services/internet.png';
import Games from '../../../../assets/services/games.png';
import NFT from '../../../../assets/services/nft.png';
import More from '../../../../assets/services/more.png';
import { ImageSourcePropType } from 'react-native';

import Satu from '../../../../assets/apps/1.png';
import Dua from '../../../../assets/apps/2.png';
import Tiga from '../../../../assets/apps/3.png';
import Empat from '../../../../assets/apps/4.png';
import Lima from '../../../../assets/apps/5.png';
import Enam from '../../../../assets/apps/6.png';
import Tujuh from '../../../../assets/apps/7.png';
import Delapan from '../../../../assets/apps/8.png';

type service = {
  name: string;
  logo: ImageSourcePropType;
};

type app = {
  logo: ImageSourcePropType;
};

export const services: service[] = [
  {
    name: 'Pulsa',
    logo: Pulsa
  },
  {
    name: 'Token',
    logo: Token
  },
  {
    name: 'PLN',
    logo: PLN
  },
  {
    name: 'Internet',
    logo: Internet
  },
  {
    name: 'Air',
    logo: Air
  },
  {
    name: 'Games',
    logo: Games
  },
  {
    name: 'NFT',
    logo: NFT
  },
  { name: 'More', logo: More }
];

export const apps: app[] = [
  {
    logo: Satu
  },
  {
    logo: Dua
  },
  {
    logo: Tiga
  },
  {
    logo: Empat
  },
  {
    logo: Lima
  },
  {
    logo: Enam
  },
  {
    logo: Tujuh
  },
  { logo: Delapan }
];

export const crypto: {
  icon: ImageSourcePropType;
  name: string;
  chart: ImageSourcePropType;
  desc: string;
  harga: string;
  persen: string;
}[] = [
  {
    name: 'ZRX',
    icon: require('../../../../assets/homeCoins/zrx.png'),
    chart: require('../../../../assets/homeCoins/red.png'),
    desc: '0x',
    harga: '3.259',
    persen: '-2,74'
  },
  {
    name: '1INCH',
    icon: require('../../../../assets/homeCoins/1inch.png'),
    chart: require('../../../../assets/homeCoins/green.png'),
    desc: '1inch',
    harga: '5.850',
    persen: '-0,26'
  },
  {
    name: 'AAVE',
    icon: require('../../../../assets/homeCoins/aave.png'),
    chart: require('../../../../assets/homeCoins/red.png'),
    desc: 'AAVE',
    harga: '956.541',
    persen: '-0,26'
  },
  {
    name: 'ACM',
    icon: require('../../../../assets/homeCoins/acm.png'),
    chart: require('../../../../assets/homeCoins/red.png'),
    desc: 'AC Milan Fans Club',
    harga: '33.614',
    persen: '-2,83'
  },
  {
    name: 'API3',
    icon: require('../../../../assets/homeCoins/api3.png'),
    chart: require('../../../../assets/homeCoins/red.png'),
    desc: 'API3',
    harga: '17.349',
    persen: '-3,98'
  }
];
