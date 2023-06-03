import { ImageSourcePropType } from 'react-native';

export const wallets: { title: string; icon: ImageSourcePropType; screen?: string }[] = [
  {
    title: 'All Wallet',
    icon: require('../../assets/side-icons/bitcoin-card.png')
  },
  {
    title: 'Add Wallet',
    icon: require('../../assets/side-icons/add-wallet.png')
  },
  {
    title: 'Address Book',
    icon: require('../../assets/side-icons/book-square.png')
  },
  {
    title: 'Currency',
    icon: require('../../assets/side-icons/moneys.png')
  }
];

export const securitys: { title: string; icon: ImageSourcePropType; screen?: string }[] = [
  {
    title: 'Autolock',
    icon: require('../../assets/side-icons/key-square.png')
  },
  {
    title: 'Biometric Login',
    icon: require('../../assets/side-icons/finger-cricle.png')
  }
];

export const transactions: { title: string; icon: ImageSourcePropType; screen?: string }[] = [
  {
    title: 'Approval Transaction',
    icon: require('../../assets/side-icons/shield-tick.png')
  },
  {
    title: 'E-Money Account',
    icon: require('../../assets/side-icons/coin.png')
  }
];

export const helps: { title: string; icon: ImageSourcePropType; screen?: string }[] = [
  {
    title: 'Language',
    icon: require('../../assets/side-icons/translate.png')
  },
  {
    title: 'Push Notification',
    icon: require('../../assets/side-icons/notification-status.png')
  },
  {
    title: 'Help Center',
    icon: require('../../assets/side-icons/user-search.png')
  },
  {
    title: 'About',
    icon: require('../../assets/side-icons/autobrightness.png')
  }
];
