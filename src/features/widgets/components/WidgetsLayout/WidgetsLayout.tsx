import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import {
  TokenBalanceWidget,
  TokenBalanceWidgetProps,
} from '../../components/TokenBalanceWidget/TokenBalanceWidget';

const ReactGridLayout = WidthProvider(RGL);

export type WidgetProps = TokenBalanceWidgetProps;
export type WidgetName = 'TokenBalanceWidget';

export interface Widgets {
  name: WidgetName;
  settings: WidgetProps;
}

export interface WidgetsLayoutProps {
  layout: Layout[];
  widgets: Widgets[];
  isDraggable?: boolean;
  onLayoutChange: (layout: Layout[]) => void;
}

export const WidgetsLayout: React.FC<WidgetsLayoutProps> = ({
  layout,
  widgets,
  onLayoutChange,
  isDraggable = true,
}) => {
  const renderWidget = (widget: Widgets): ReactNode => {
    switch (widget.name) {
      case 'TokenBalanceWidget': {
        return <TokenBalanceWidget {...widget.settings} />;
      }
    }
  };

  return (
    <ReactGridLayout
      className={'layout'}
      cols={12}
      isDraggable={isDraggable}
      isResizable={false}
      layout={layout}
      rowHeight={30}
      onLayoutChange={(newLayout) => onLayoutChange(newLayout)}
    >
      {widgets?.map((widget, i) => (
        <Flex
          key={i}
          alignItems={'stretch'}
          // border={'2px'}
          // borderColor={'red'}
          height={'100%'}
          justifyContent={'center'}
          width={'100%'}
        >
          {renderWidget(widget)}
        </Flex>
      ))}
    </ReactGridLayout>
  );
};
