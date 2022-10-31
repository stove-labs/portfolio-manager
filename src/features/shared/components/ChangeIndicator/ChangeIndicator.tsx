import { Flex, Text, TextProps, useColorModeValue } from '@chakra-ui/react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';

export interface ChangeIndicatorProps {
  size: 'sm' | 'lg';
  change: number;
}
// TODO: add a neutral trend instead of just up/down green/red
export const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({
  size,
  change,
}) => {
  const cappedChange: string = useMemo((): string => {
    const sign: string = change > 0 ? '+' : '-';
    if (change === 0) return '0';
    if (Math.abs(change) > 1000) return `>${sign}1000`;
    if (Math.abs(change) < 0.01) return `<${sign}0.01`;

    return change.toFixed(2);
  }, [change]);
  const sizing = useMemo<{
    iconSize: SizeProp;
    fontSize: TextProps['fontSize'];
  }>(() => {
    switch (size) {
      case 'lg':
        return {
          iconSize: '1x',
          fontSize: 'xs',
        };

      case 'sm':
        return {
          iconSize: 'xs',
          fontSize: 'x-small',
        };
    }
  }, [size]);
  const trend = change > 1 ? 'upwards' : change < 0 ? 'downwards' : 'neutral';
  const upwardsTrendColor = useColorModeValue('green.500', 'green.500');
  const downwardsTrendColor = useColorModeValue('red.500', 'red.500');
  const trendColor = useMemo(() => {
    switch (trend) {
      case 'upwards':
        return upwardsTrendColor;
      case 'downwards':
        return downwardsTrendColor;
      case 'neutral':
        return upwardsTrendColor;
    }
  }, [trend, upwardsTrendColor, downwardsTrendColor]);
  const trendIcon = useMemo(() => {
    switch (trend) {
      case 'upwards':
        return faCaretUp;
      case 'downwards':
        return faCaretDown;
      case 'neutral':
        return faCaretUp;
    }
  }, [trend]);
  const trendIconOffset = useMemo(() => {
    switch (trend) {
      case 'upwards':
        return '0.5px';
      case 'downwards':
        return '-0.5px';
    }
  }, [trend]);
  return (
    <Flex
      alignItems={'center'}
      color={trendColor}
      justifyContent={'center'}
      pl={'2'}
    >
      <Flex alignItems={'center'} justifyContent={'center'} pr={'1'}>
        <FontAwesomeIcon
          icon={trendIcon}
          size={sizing.iconSize}
          style={{
            position: 'relative',
            top: trendIconOffset,
          }}
        />
      </Flex>
      <Text fontSize={sizing.fontSize}>({cappedChange}%)</Text>
    </Flex>
  );
};
