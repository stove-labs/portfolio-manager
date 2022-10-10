import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useStoreContext } from '../../../../store/useStore';
import {
  Balance,
  TokenBalanceWidget as TokenBalanceWidgetComponent,
  TokenBalanceWidgetProps as TokenBalanceWidgetComponentProps,
} from './../../components/TokenBalanceWidget/TokenBalanceWidget';
import { Token } from './store/useTokenBalanceWidgetStore';

export interface TokenBalanceWidgetProps {
  ticker?: string;
  dummy?: boolean;
}

export const TokenBalanceWidget: React.FC<TokenBalanceWidgetProps> = ({
  ticker = 'tzBTC',
  dummy = false,
}) => {
  const [state] = useStoreContext();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<Token | undefined>();
  const [balance, setBalance] = useState<Balance>({
    amount: '0',
    fiatBalance: { amount: '0' },
  });
  const [historicalBalance, setHistoricalBalance] = useState<Balance>({
    amount: '0',
    fiatBalance: { amount: '0' },
  });

  useEffect(() => {
    setIsLoading(
      state.tokens.tokens.isLoading ||
        state.tokens.tokensBalance.isLoading ||
        state.tokens.tokensBalanceHistorical.isLoading
    );
  }, [
    state.tokens.tokens.isLoading,
    state.tokens.tokensBalance.isLoading,
    state.tokens.tokensBalanceHistorical.isLoading,
  ]);

  useEffect(() => {
    if (isLoading) return;

    setToken(
      state.tokens.tokens.data?.filter(
        (item) => item.metadata?.symbol === ticker
      )?.['0']
    );
  }, [ticker, isLoading]);

  const dummyToken = {
    fullName: 'Kolibri USD',
    ticker: 'kUSD',
  };

  const dummyBalance: Balance = {
    amount: '0.005',
    fiatBalance: {
      amount: '100000',
    },
  };

  const dummyHistoricalBalance: Balance = {
    amount: '50000',
    fiatBalance: {
      amount: '50000',
    },
  };

  useEffect(() => {
    const tokensBalance = state.tokens.tokensBalance.data?.filter(
      (item) => item.id === token?.id
    )?.['0'];
    const tokensBalanceHistorical =
      state.tokens.tokensBalanceHistorical.data?.filter(
        (item) => item.id === token?.id
      )?.['0'];

    setBalance({
      amount: String(
        BigNumber(tokensBalance?.balance ?? '0').dividedBy(
          Math.pow(10, Number(token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    });
    setHistoricalBalance({
      amount: String(
        BigNumber(tokensBalanceHistorical?.balanceHistorical ?? '0').dividedBy(
          Math.pow(10, Number(token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    });
  }, [token]);

  const props: TokenBalanceWidgetComponentProps = dummy
    ? {
        token: dummyToken,
        balance: dummyBalance,
        historicalBalance: dummyHistoricalBalance,
        isLoading: false,
      }
    : {
        token: {
          fullName: token?.metadata?.name ?? '',
          ticker,
        },
        balance,
        historicalBalance,
        isLoading,
      };

  return (
    <>
      <TokenBalanceWidgetComponent {...props} />
    </>
  );
};
