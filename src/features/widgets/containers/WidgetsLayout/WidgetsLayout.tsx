import React, { useCallback, useEffect } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { useDispatchUniqueContext } from '../../providers/DispatchUniqueProvider';
// import { TokenBalanceWidget } from '../TokenBalanceWidget/TokenBalanceWidget';
import {
  WidgetName,
  WidgetsLayout as WidgetsLayoutComponent,
} from './../../components/WidgetsLayout/WidgetsLayout';

export const WidgetsLayout: React.FC = () => {
  const [state, dispatch] = useStoreContext();
  const { flushDispatchQueue } = useDispatchUniqueContext();

  useEffect(() => {
    flushDispatchQueue();
  }, []);

  useEffect(() => {
    window.localStorage.setItem('STATE_LAYOUT', JSON.stringify(state.settings));
  }, [state.settings]);

  const widgetAs = useCallback((name: WidgetName) => {
    switch (name) {
      case 'TokenBalanceWidget':
        return <></>;
      // return TokenBalanceWidget;
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
