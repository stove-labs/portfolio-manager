import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import MiddleEllipsis from 'react-middle-ellipsis';
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
      width={'150px'}
      onClick={onDisconnectWallet}
      onMouseLeave={() => setHovering(false)}
      onMouseOver={() => setHovering(true)}
    >
      {/* {activeAccount.address} */}
      {hovering ? (
        <>Disconnect</>
      ) : (
        <MiddleEllipsis>
          <span>{activeAccount.address}</span>
        </MiddleEllipsis>
      )}
    </Button>
  ) : (
    <Button colorScheme={'gray'} width={'150px'} onClick={onConnectWallet}>
      Connect wallet
    </Button>
  );
};
