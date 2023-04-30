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
