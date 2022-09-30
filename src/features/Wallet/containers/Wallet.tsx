import React, { useCallback, useEffect } from 'react';
import { Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useStoreContext } from '../../../store/useStore';
export const Wallet: React.FC = () => {
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
    <Container>
      <Flex direction={'column'}>
        <Heading>Wallet</Heading>
        <Text>Status: {state.wallet.status}</Text>
        <Text>Address: {state.wallet.activeAccount?.address}</Text>
        <Flex>
          <Button onClick={handleWalletConnectClick}>Connect account</Button>
          <Button onClick={handleWalletDisconnectClick}>
            Disconnect account
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
