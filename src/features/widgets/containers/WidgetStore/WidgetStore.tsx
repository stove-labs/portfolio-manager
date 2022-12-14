import { UseDisclosureReturn } from '@chakra-ui/react';
import React from 'react';
import { Layout } from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';
import { useStoreContext } from '../../../../store/useStore';
import { TokenBalanceChartWidget } from '../../components/TokenBalanceChartWidget/TokenBalanceChartWidget';
import story from '../../components/TokenBalanceChartWidget/TokenBalanceChartWidget.stories';
import { TokenBalanceWidget } from '../../components/TokenBalanceWidget/TokenBalanceWidget';
import {
  WidgetName,
  WidgetSettingsData,
} from '../../components/WidgetsLayout/WidgetsLayout';
import {
  AvailableWidgets,
  WidgetSize,
  WidgetStore as WidgetStoreComponent,
} from '../../components/WidgetStore/WidgetStore';

// list of available widgets to be displayed in the WidgetStore component
const availableWidgets: AvailableWidgets = [
  {
    // name of the underlying widget container, that will be rendered upon addition of the widget
    name: 'TokenBalanceWidget',
    displayName: 'Token Balance',
    // default settings for the widget
    settings: {
      token: '0',
      historicalPeriod: '30d',
    },
    // props to render the example component with
    props: {
      token: {
        id: '0',
        name: 'Tezos',
        symbol: 'XTZ',
        contract: {
          address: '0',
        },
        metadata: {
          decimals: '6',
        },
      },
      // TODO: use user's actual selected currency here
      currency: 'USD',
      spotPriceToken: {
        id: '0',
        level: '1',
        currency: 'USD',
        price: '1',
      },
      spotPriceTokenHistorical: {
        id: '0',
        level: '1',
        currency: 'USD',
        price: '1',
      },
      spotPriceNativeToken: {
        id: '0',
        level: '1',
        currency: 'USD',
        price: '1',
      },

      spotPriceNativeTokenHistorical: {
        id: '0',
        level: '1',
        currency: 'USD',
        price: '1',
      },

      balance: {
        id: '0',
        level: '0',
        amount: '100000',
      },
      historicalBalance: {
        id: '0',
        level: '0',
        amount: '80000',
      },
      isLoading: false,
      settingsDisabled: true,
      // mocked event handlers
      onWidgetRemove: () => {},
      onSettingsChange: () => {},
    },
    // component to render the 'example' widget with in the widget store
    component: TokenBalanceWidget,
    // size of the component on the dashboard widget layout grid
    size: {
      w: 4,
      h: 3,
    },
    maxWidth: '33%',
  },
  {
    // name of the underlying widget container, that will be rendered upon addition of the widget
    name: 'TokenBalanceChartWidget',
    displayName: 'Relative token balance change',
    // default settings for the widget
    settings: {
      token: '0',
      historicalPeriod: '30d',
    },
    // props to render the example component with
    props: {
      token: {
        id: '0',
        name: 'Tezos',
        symbol: 'XTZ',
        contract: {
          address: '0',
        },
        metadata: {
          decimals: '6',
        },
      },
      spotPriceToken: {
        id: '0',
        level: '1',
        currency: 'USD',
        price: '1',
      },
      spotPriceNativeToken: {
        id: '0',
        level: '1',
        currency: 'USD',
        price: '1',
      },
      isLoading: false,
      settingsDisabled: true,
      historicalBalances: story.args?.historicalBalances,
      // mocked event handlers
      onWidgetRemove: () => {},
      onSettingsChange: () => {},
    },
    // component to render the 'example' widget with in the widget store
    component: TokenBalanceChartWidget,
    // size of the component on the dashboard widget layout grid
    size: {
      w: 6,
      h: 6,
    },
    maxWidth: '50%',
  },
];

export type WidgetStoreProps = UseDisclosureReturn;

export const WidgetStore: React.FC<WidgetStoreProps> = ({
  isOpen,
  onClose,
}) => {
  const [state, dispatch] = useStoreContext();

  const handleWidgetSelection = (
    widget: WidgetName,
    settings: WidgetSettingsData,
    size: WidgetSize
  ): void => {
    // generate a new random uuid for the widget
    const id = uuidv4();
    const newWidgetCoordinates: Layout = {
      i: id,
      // TODO: @matehoo, what exactly does this do?
      x: (state.settings.widgets.length * size.w) % 12,
      y: Infinity, // puts it at the bottom
      w: size.w,
      h: size.h,
    };

    // close the WidgetStore
    onClose();

    // add the selected widget to the state
    // delay to mitigate grid layout performance issues
    setTimeout(() => {
      dispatch({
        type: 'ADD_WIDGET',
        payload: {
          layout: [...state.settings.layout, newWidgetCoordinates],
          widget: { name: widget, id, settings },
        },
      });
    }, 200);
  };
  return (
    <WidgetStoreComponent
      availableWidgets={availableWidgets}
      isOpen={isOpen}
      onAddWidget={handleWidgetSelection}
      onClose={onClose}
    />
  );
};
