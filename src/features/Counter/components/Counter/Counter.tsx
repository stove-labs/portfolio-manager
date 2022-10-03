import React from 'react';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';

export interface CounterProps {
  count: number;
  onIncrement: (amount: number) => void;
  onIncrementAsync: (amount: number) => void;
  onDecrement: () => void;
}

export const Counter: React.FC<CounterProps> = ({
  count,
  onIncrement,
  onIncrementAsync,
  onDecrement,
}) => {
  return (
    <Flex direction={'column'} gap={'4'}>
      <Flex direction={'column'} gap={'2'}>
        <Heading>Counter</Heading>
        <Text>Current count: {count}</Text>
      </Flex>
      <Flex gap={'4'}>
        <Button onClick={() => onIncrement(1)}>Increment</Button>
        <Button onClick={() => onIncrementAsync(1)}>Increment Async</Button>
        <Button onClick={() => onIncrement(2)}>Increment by 2</Button>

        <Button onClick={() => onDecrement()}>Decrement</Button>
      </Flex>
    </Flex>
  );
};
