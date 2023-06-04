import { useRoute } from '@react-navigation/native';
import { WalletRouteProps } from '../../navigations/WalletRouter';
import DefaultBody from '../../components/DefaultBody';
import DetailHeader from './DetailWalletContents/DetailHeader';
import { useCallback, useState } from 'react';
import TokenContent from './DetailWalletContents/TokenContent';
import { useAtom } from 'jotai';
import { bottomReducer } from '../../state/bottom/bottomReducer';

const DetailWalletScreen = () => {
  const route = useRoute<WalletRouteProps<'DetailWalletScreen'>>();
  const [bottom, setBottom] = useAtom(bottomReducer);
  const [active, setActive] = useState('token');
  const [showSetting, setShowSetting] = useState(false);

  // TODO: Can this be moved to TokenContent component?
  const [activeSlide, setActiveSlide] = useState(route.params.indexWallet);
  const handleChangeSlide = useCallback((param: any) => {
    setActiveSlide(param);
  }, []);

  const handleChangeActive = useCallback((param: string) => {
    setActive(param);
  }, []);

  // TODO: Can this be moved to TokenContent component?
  const handleShowSetting = useCallback((param: boolean) => {
    setShowSetting(param);
  }, []);

  return (
    <DefaultBody>
      <DetailHeader active={active} onPress={handleChangeActive} />
      {active === 'token' && (
        <TokenContent
          showSetting={showSetting}
          setShowSetting={handleShowSetting}
          activeSlide={activeSlide}
          setActiveSlide={handleChangeSlide}
        />
      )}
    </DefaultBody>
  );
};

export default DetailWalletScreen;
