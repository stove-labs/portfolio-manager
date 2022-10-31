import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { ActiveAccount as ActiveAccountState } from '../../store/useWalletStore';

export interface ActiveAccountProps {
  activeAccount?: ActiveAccountState;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

export const ActiveAccount: React.FC<ActiveAccountProps> = ({
  activeAccount,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return activeAccount?.address ? (
    <Button
      colorScheme={'gray'}
      textOverflow={'ellipsis'}
      width={'150px'}
      onClick={onDisconnectWallet}
      onMouseLeave={() => setHovering(false)}
      onMouseOver={() => setHovering(true)}
    >
      {/* {activeAccount.address} */}
      {hovering ? (
        <>Disconnect</>
      ) : (
        // <MiddleEllipsis>
        //   <span>{activeAccount.address}</span>
        // </MiddleEllipsis>
        <Box
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}
          width={'150px'}
        >
          {activeAccount.address}
        </Box>
      )}
    </Button>
  ) : (
    <Button colorScheme={'gray'} width={'150px'} onClick={onConnectWallet}>
      Connect wallet
    </Button>
  );
};
