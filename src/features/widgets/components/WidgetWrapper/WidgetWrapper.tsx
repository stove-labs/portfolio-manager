import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
  useColorModeValue,
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
          width: '25%',
          minHeight: '',
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
      borderRadius={'lg'}
      direction={'column'}
      letterSpacing={'0px'}
      minHeight={styles.minHeight}
      padding={'2'}
      paddingBottom={'2'}
      paddingTop={'2'}
      shadow={'xs'}
      width={styles.width}
    >
      <Text
        color={useColorModeValue('gray.600', 'gray.600')}
        fontSize={'xs'}
        fontWeight={'normal'}
        opacity={'.6'}
        padding={'0'}
      >
        <Editable defaultValue={title} onSubmit={onTitleSubmit}>
          <EditablePreview padding={0} />
          <EditableInput />
        </Editable>
      </Text>
      <Flex flex={'1'} height={'100%'} paddingBottom={'0'} paddingTop={'1'}>
        {children}
      </Flex>
    </Flex>
  );
};
