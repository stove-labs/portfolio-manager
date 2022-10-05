import { Flex, useColorModeValue, Heading } from '@chakra-ui/react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { PropsWithChildren } from 'react';

export interface WidgetWrapperProps {
  title: string;
  size: 'sm' | 'md' | 'lg';
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
}) => {
  return (
    <Flex
      background={useColorModeValue('white', 'white')}
      borderRadius={'md'}
      cursor={'grab'}
      flex={'1'}
      flexDirection={'column'}
      p={'3'}
      pb={'2'}
      shadow={'sm'}
      sx={{
        '.settings-icon': {
          opacity: '0',
        },
        ':hover': {
          '.settings-icon': {
            opacity: '.7',
            ':hover': {
              color: useColorModeValue('gray.900', 'gray.900'),
              opacity: '1',
            },
          },
        },
      }}
    >
      <Flex
        justifyContent={'space-between'}
        color={useColorModeValue('gray.400', 'gray.400')}
        // opacity={'0.4'}
      >
        <Heading
          fontSize={'0.65rem'}
          letterSpacing={'tight'}
          size={'xs'}
          textTransform={'uppercase'}
        >
          {title}
        </Heading>
        <Flex
          className="settings-icon"
          cursor={'pointer'}
          transition={'ease'}
          transitionDuration={'fast'}
        >
          <FontAwesomeIcon icon={faGear} size={'xs'} />
        </Flex>
      </Flex>
      <Flex flex={'1'} height={'100%'}>
        {children}
      </Flex>
    </Flex>
  );
};
