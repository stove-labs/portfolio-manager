import React, { useCallback } from 'react';
import { Button, Container, Flex, Heading } from '@chakra-ui/react';
export const Wallet: React.FC = () => {
  const handleWalletConnectClick = useCallback(() => {}, []);

  return (
    <Container>
      <Flex direction={'column'}>
        <Heading>Wallet</Heading>
        {/* <Text>Status: {wallet.status}</Text> */}
        <Button onClick={handleWalletConnectClick}>Connect wallet</Button>
      </Flex>
    </Container>
  );
};
