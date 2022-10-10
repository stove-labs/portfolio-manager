import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { TokenBalanceWidget } from '../../containers/TokenBalanceWidget/TokenBalanceWidget';
import { TokenBalanceWidgetSettingsData } from '../TokenBalanceWidget/TokenBalanceWidget';

const ReactGridLayout = WidthProvider(RGL);

export type WidgetSettingsData = TokenBalanceWidgetSettingsData;
export type WidgetName = 'TokenBalanceWidget';

export interface WidgetSettings {
  id: string;
  name: WidgetName;
  settings?: WidgetSettingsData;
}

export interface WidgetsLayoutProps {
  layout: Layout[];
  widgets: WidgetSettings[];
  isDraggable?: boolean;
  onLayoutChange: (layout: Layout[]) => void;
  onWidgetRemove: (index: string) => void;
}

export const WidgetsLayout: React.FC<WidgetsLayoutProps> = ({
  layout,
  widgets,
  onLayoutChange,
  onWidgetRemove,
  isDraggable = true,
}) => {
  const renderWidget = (widget: WidgetSettings): ReactNode => {
    switch (widget.name) {
      case 'TokenBalanceWidget': {
        return (
          <TokenBalanceWidget
            settings={widget.settings}
            onSettingsChange={(settings) =>
              console.log('WidgetsLayout onSettingsChange', settings)
            }
            onWidgetRemove={() => onWidgetRemove(widget.id)}
          />
        );
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
      {widgets?.map((widget) => (
        <Flex
          key={widget.id}
          alignItems={'start'}
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
