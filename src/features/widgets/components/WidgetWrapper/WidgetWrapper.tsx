import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
} from '@chakra-ui/react';
import React, { PropsWithChildren, useMemo } from 'react';

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
  title,
  size,
  onTitleSubmit,
}) => {
  const styles = useMemo<WrapperStyle>(() => {
    switch (size) {
      case 'sm':
        return {
          width: '15%',
          minHeight: '140px',
        };
      case 'md':
        return {
          width: '50%',
          minHeight: '90px',
        };
      case 'lg':
        return {
          width: '75%',
          minHeight: '90px',
        };
    }
  }, [size]);

  return (
    <Flex
      borderRadius={'md'}
      direction={'column'}
      minHeight={styles.minHeight}
      padding={'2'}
      paddingBottom={'0'}
      shadow={'base'}
      width={styles.width}
    >
      <Text
        // color={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}
        fontSize={'xs'}
        fontWeight={'semibold'}
        opacity={'.8'}
      >
        <Editable defaultValue={title} onSubmit={onTitleSubmit}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Text>
      <Flex
        alignItems={'center'}
        flex={'1'}
        height={'100%'}
        justifyContent={'center'}
        paddingBottom={'3'}
        paddingTop={'0'}
      >
        {children}
      </Flex>
    </Flex>
  );
};
