import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import React from 'react';
import { Layout } from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';
import { useStoreContext } from '../../../../store/useStore';
import { TokenBalanceWidget } from '../TokenBalanceWidget/TokenBalanceWidget';
import { WidgetName } from '../../components/WidgetsLayout/WidgetsLayout';

export type widgetsSize = {
  [key in WidgetName]: {
    w: number;
    h: number;
  };
};

export const Settings: React.FC<UseDisclosureReturn> = ({
  isOpen,
  onClose,
}) => {
  const [state, dispatch] = useStoreContext();

  const widgetsSizes: widgetsSize = {
    TokenBalanceWidget: {
      w: 4,
      h: 5,
    },
  };

  const handleWidgetSelection = (widget: WidgetName): void => {
    const id = uuidv4();
    const newWidgetCoordinates: Layout = {
      i: id,
      x: (state.settings.widgets.length * widgetsSizes[widget].w) % 12,
      y: Infinity, // puts it at the bottom
      w: widgetsSizes[widget].w,
      h: widgetsSizes[widget].h,
    };

    dispatch({
      type: 'ADD_WIDGET',
      payload: {
        layout: [...state.settings.layout, newWidgetCoordinates],
        widget: { name: widget, id },
      },
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} scrollBehavior={'inside'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Widget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>Token Balance Widget </h1>
            <div
              onClick={() => handleWidgetSelection('TokenBalanceWidget')}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <TokenBalanceWidget />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
