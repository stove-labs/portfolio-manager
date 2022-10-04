import { Flex, useColorModeValue } from '@chakra-ui/react';
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
  size,
}) => {
  const styles = useMemo<WrapperStyle>(() => {
    switch (size) {
      case 'sm':
        return {
          width: '25%',
          minHeight: '90px',
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
      backdropFilter={'blur(120px)'}
      // background={useColorModeValue(
      //   'linear-gradient(135deg, rgba(217, 219, 231, 0.19) 35%, rgba(38, 61, 155, 0.455) 80%)',
      //   'linear-gradient(135deg, rgba(3, 7, 24, 0.49) 35%, rgba(36, 44, 84, 0.49) 80%)'
      // )}
      // background={useColorModeValue(
      //   'linear-gradient(135deg, RGBA(255, 255, 255, 0.92) 35%, #FFFFF0 80%, #FFFAF0, #FEFCBF)',
      //   'linear-gradient(135deg, RGBA(0, 0, 0, 0.36) 35%, #5F370E 80%, #652B19, #744210, #7B341E)'
      // )}
      background={useColorModeValue(
        'transparent',
        '#171923'
      )}
      backgroundClip={'border-box'}
      bgGradient={useColorModeValue(
        'transparent',
        'linear-gradient(90deg, #171923 0%, #1a365d 47%, #2A4365 100%)'
      )}
      borderRadius={'lg'}
      direction={'column'}
      letterSpacing={'0px'}
      minHeight={styles.minHeight}
      minWidth={styles.width}
      padding={'3'}
      shadow={'xs'}
    >
      <Flex flex={'1'} height={'100%'} paddingBottom={'0'} paddingTop={'1'}>
        {children}
      </Flex>
    </Flex>
  );
};
