import { Button, Flex, Input } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import {
  TokenBalanceWidget,
  TokenBalanceWidgetProps,
} from '../../components/TokenBalanceWidget/TokenBalanceWidget';

const ReactGridLayout = WidthProvider(RGL);

export type WidgetProps = TokenBalanceWidgetProps;
export type WidgetName = 'TokenBalanceWidget';

export interface WidgetSettings {
  name: WidgetName;
  settings: WidgetProps;
}

export interface WidgetsLayoutProps {
  layout: Layout[];
  widgets: WidgetSettings[];
  isDraggable?: boolean;
  onLayoutChange: (layout: Layout[]) => void;
  downloadSettings: () => void;
  restoreSettings: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const WidgetsLayout: React.FC<WidgetsLayoutProps> = ({
  layout,
  widgets,
  onLayoutChange,
  downloadSettings,
  restoreSettings,
  isDraggable = true,
}) => {
  const renderWidget = (widget: WidgetSettings): ReactNode => {
    switch (widget.name) {
      case 'TokenBalanceWidget': {
        return <TokenBalanceWidget {...widget.settings} />;
      }
    }
  };

  return (
    <>
      <Button onClick={() => downloadSettings()}>Download Settings</Button>
      <Input type={'file'} onChange={(e) => restoreSettings(e)}></Input>
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
            alignItems={'center'}
            border={'2px'}
            borderColor={'red'}
            height={'100%'}
            justifyContent={'center'}
            width={'100%'}
          >
            {renderWidget(widget)}
          </Flex>
        ))}
      </ReactGridLayout>
    </>
  );
};
