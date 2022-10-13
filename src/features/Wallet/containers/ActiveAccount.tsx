import React, { useCallback, useEffect } from 'react';
import { useStoreContext } from '../../../store/useStore';
import { ActiveAccount as ActiveAccountComponent } from '../components/ActiveAccount/ActiveAccount';
export const ActiveAccount: React.FC = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: 'CHECK_ACTIVE_ACCOUNT' });
  }, []);

  const handleWalletConnectClick = useCallback(() => {
    dispatch({ type: 'CONNECT_ACTIVE_ACCOUNT' });
  }, [dispatch]);

  const handleWalletDisconnectClick = useCallback(() => {
    dispatch({ type: 'DISCONNECT_ACTIVE_ACCOUNT' });
  }, [dispatch]);

  return (
    <ActiveAccountComponent
      activeAccount={state.wallet.activeAccount}
      onConnectWallet={handleWalletConnectClick}
      onDisconnectWallet={handleWalletDisconnectClick}
    />
    // <Container>
    //   <Flex direction={'column'}>
    //     <Heading>Wallet</Heading>
    //     <Text>Status: {state.wallet.status}</Text>
    //     <Text>Address: {state.wallet.activeAccount?.address}</Text>
    //     <Flex>
    //       <Button onClick={handleWalletConnectClick}>Connect account</Button>
    //       <Button onClick={handleWalletDisconnectClick}>
    //         Disconnect account
    //       </Button>
    //     </Flex>
    //   </Flex>
    // </Container>
  );
};
