import { Flex, useColorModeValue, Heading } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import { WidgetProps } from '../TokenBalanceWidget/TokenBalanceWidget';
import { WidgetSettings } from '../WidgetSettings/WidgetSettings';

export interface WidgetWrapperProps {
  title: string;
  settingsContent: ReactNode;
  onTitleSubmit: (title: string) => void;
  onWidgetRemove: () => void;
}

export interface WrapperStyle {
  width: string;
  minHeight: string;
}

export const WidgetWrapper: React.FC<
  PropsWithChildren<WidgetWrapperProps & WidgetProps<any>>
> = ({
  children,
  title,
  settingsContent,
  onSettingsChange,
  onWidgetRemove,
  settings,
  settingsDisabled,
}) => {
  return (
    <Flex
      background={useColorModeValue('white', 'white')}
      borderRadius={'md'}
      cursor={'grab'}
      flex={'1'}
      flexDirection={'column'}
      p={'3'}
      pb={'3'}
      shadow={'sm'}
      // mr={'3'}
      sx={{
        ':hover': {
          '.settings-icon': {
            opacity: '.7',
          },
        },
      }}
    >
      <Flex justifyContent={'space-between'}>
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
          {!settingsDisabled ? (
            <WidgetSettings
              settings={settings}
              onSettingsChange={onSettingsChange}
              onWidgetRemove={onWidgetRemove}
            >
              {settingsContent}
            </WidgetSettings>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
      <Flex flex={'1'} height={'100%'}>
        {children}
      </Flex>
    </Flex>
  );
};
