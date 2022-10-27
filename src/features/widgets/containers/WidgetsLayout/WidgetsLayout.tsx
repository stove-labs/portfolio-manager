import React, { useCallback, useEffect } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { useDispatchUniqueContext } from '../../providers/DispatchUniqueProvider';
import { TokenBalanceWidget } from '../TokenBalanceWidget/TokenBalanceWidget';
// import { TokenBalanceWidget } from '../TokenBalanceWidget/TokenBalanceWidget';
import {
  WidgetName,
  WidgetsLayout as WidgetsLayoutComponent,
} from './../../components/WidgetsLayout/WidgetsLayout';

export const WAIT_FOR_DISPATCH = 1000;
export const WidgetsLayout: React.FC = () => {
  const [state, dispatch] = useStoreContext();
  const { flushDispatchQueue } = useDispatchUniqueContext();

  useEffect(() => {
    // wait for a bit and then flush the queue, this assumes all the components
    // register their actions in the given WAIT_FOR_DISPATCH timespan
    setInterval(() => {
      flushDispatchQueue();
    }, WAIT_FOR_DISPATCH);
  }, []);

  const widgetAs = useCallback((name: WidgetName) => {
    switch (name) {
      case 'TokenBalanceWidget':
        return TokenBalanceWidget;
    }
  }, []);

  return (
    <>
      <WidgetsLayoutComponent
        layout={state.settings.layout}
        widgetAs={widgetAs}
        widgets={state.settings.widgets}
        onLayoutChange={(layout) =>
          dispatch({ type: 'UPDATE_LAYOUT', payload: { layout } })
        }
        onSettingsChange={(id, settings) => {
          dispatch({ type: 'UPDATE_WIDGET', payload: { id, settings } });
        }}
        onWidgetRemove={(id) =>
          dispatch({ type: 'REMOVE_WIDGET', payload: { id } })
        }
      />
    </>
  );
};
