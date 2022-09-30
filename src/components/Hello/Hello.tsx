import { Heading } from '@chakra-ui/react';

export interface HelloProps {
  name: string;
}

export const Hello: React.FC<HelloProps> = ({ name }) => {
  return <Heading>Hello {name}!</Heading>;
};
