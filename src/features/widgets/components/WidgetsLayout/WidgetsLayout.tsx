import { Container, Flex } from '@chakra-ui/react';
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
  onSettingsChange: (index: string, settings: WidgetSettingsData) => void;
}

export const WidgetsLayout: React.FC<WidgetsLayoutProps> = ({
  layout,
  widgets,
  onLayoutChange,
  onWidgetRemove,
  onSettingsChange,
  isDraggable = true,
}) => {
  const renderWidget = (widget: WidgetSettings): ReactNode => {
    switch (widget.name) {
      case 'TokenBalanceWidget': {
        return (
          <TokenBalanceWidget
            settings={widget.settings}
            onSettingsChange={(settings) =>
              onSettingsChange(widget.id, settings)
            }
            onWidgetRemove={() => onWidgetRemove(widget.id)}
          />
        );
      }
    }
  };

  return (
    <Flex flex={'1'} position={'relative'}>
      <Container maxWidth={'6xl'} p={0} position={'relative'}>
        <ReactGridLayout
          className={'layout'}
          cols={12}
          containerPadding={[0, 0]}
          isDraggable={isDraggable}
          isResizable={false}
          layout={layout}
          margin={[10, 10]}
          rowHeight={30}
          useCSSTransforms={false}
          width={100}
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
      </Container>
    </Flex>
  );
};
