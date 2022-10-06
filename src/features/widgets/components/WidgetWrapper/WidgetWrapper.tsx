import { Flex, useColorModeValue, Heading } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import { WidgetSettings } from '../WidgetSettings/WidgetSettings';

export interface WidgetWrapperProps {
  title: string;
  size: 'sm' | 'md' | 'lg';
  settings: ReactNode;
  onTitleSubmit: (title: string) => void;
}

export interface WrapperStyle {
  width: string;
  minHeight: string;
}

export const WidgetWrapper: React.FC<PropsWithChildren<WidgetWrapperProps>> = ({
  children,
  size,
  title,
  settings,
}) => {
  return (
    <Flex
      background={useColorModeValue('white', 'white')}
      borderRadius={'md'}
      cursor={'grab'}
      flex={'1'}
      flexDirection={'column'}
      p={'2'}
      pb={'2'}
      shadow={'sm'}
      sx={{
        ':hover': {
          '.settings-icon': {
            opacity: '.7',
          },
        },
      }}
    >
      <Flex
        justifyContent={'space-between'}
        // opacity={'0.4'}
      >
        <Heading
          color={useColorModeValue('gray.400', 'gray.400')}
          fontSize={'0.65rem'}
          letterSpacing={'tight'}
          size={'xs'}
          textTransform={'uppercase'}
        >
          {title}
        </Heading>
        <Flex
          cursor={'pointer'}
          transition={'ease'}
          transitionDuration={'fast'}
        >
          <WidgetSettings>{settings}</WidgetSettings>
        </Flex>
      </Flex>
      <Flex flex={'1'} height={'100%'}>
        {children}
      </Flex>
    </Flex>
  );
};
