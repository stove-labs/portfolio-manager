import { Button, Flex, Heading, Text } from '@chakra-ui/react';

export interface CounterProps {
  count: number;
  onIncrement: (amount: number) => void;
  onDecrement: () => void;
}

export const Counter: React.FC<CounterProps> = ({
  count,
  onIncrement,
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
        <Button onClick={() => onDecrement()}>Decrement</Button>
        <Button onClick={() => onIncrement(3)}>Increment by 3</Button>
      </Flex>
    </Flex>
  );
};
