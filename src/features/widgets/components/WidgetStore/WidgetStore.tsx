import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  UseDisclosureReturn,
  Flex,
  Heading,
} from '@chakra-ui/react';
import space from 'to-space-case';

import { TokenBalanceWidget } from '../TokenBalanceWidget/TokenBalanceWidget';
import {
  WidgetName,
  WidgetSettings,
  WidgetSettingsData,
  WidgetsProps,
} from '../WidgetsLayout/WidgetsLayout';
import { TokenBalanceChartWidget } from '../../containers/TokenBalanceChartWidget/TokenBalanceChartWidget';

// size of the widget on the layout grid
export interface WidgetSize {
  w: number;
  h: number;
}

// array of available widgets for the widget store
export type AvailableWidgets = Array<
  Omit<
    WidgetSettings & {
      props: WidgetsProps;
      component: typeof TokenBalanceWidget | typeof TokenBalanceChartWidget;
      size: WidgetSize;
      displayName: string;
    },
    'id'
  > & {
    maxWidth: string;
  }
>;

export const formatWidgetName = (name: string): string => {
  return space(name).replace('widget', '');
};

export type WidgetStoreProps = {
  onAddWidget: (
    name: WidgetName,
    settings: WidgetSettingsData,
    size: WidgetSize
  ) => void;
  availableWidgets: AvailableWidgets;
} & Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>;

export const WidgetStore: React.FC<WidgetStoreProps> = ({
  onAddWidget,
  isOpen,
  onClose,
  availableWidgets,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} scrollBehavior={'inside'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxHeight={'80%'} maxWidth={'6xl'}>
          <ModalHeader shadow={'md'}>Add Widget</ModalHeader>
          <ModalCloseButton right={'3.5'} top={'3.5'} />
          <ModalBody
            background={'gray.50'}
            borderBottomLeftRadius={'md'}
            borderBottomRightRadius={'md'}
            pb={'5'}
            pt={'5'}
          >
            <Flex flexWrap={'wrap'} gap={'3'} maxW={'6xl'}>
              {availableWidgets.map((availableWidget, i) => {
                const WidgetComponent = availableWidget.component;
                return (
                  <Flex
                    key={i}
                    flex={'1'}
                    flexDirection={'column'}
                    maxWidth={availableWidget.maxWidth}
                    pb={'3'}
                  >
                    {/* TODO: key to human readable widget name */}
                    <Heading pb={'3'} size={'sm'} textTransform={'capitalize'}>
                      {availableWidget.displayName}
                    </Heading>
                    <div
                      onClick={() =>
                        onAddWidget(
                          availableWidget.name,
                          // TODO: fix types
                          availableWidget.settings,
                          availableWidget.size
                        )
                      }
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <WidgetComponent {...availableWidget.props} />
                    </div>
                  </Flex>
                );
              })}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
