import React, { useEffect } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { WidgetsLayout as WidgetsLayoutComponent } from './../../components/WidgetsLayout/WidgetsLayout';

export const WidgetsLayout: React.FC = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    window.localStorage.setItem('STATE_LAYOUT', JSON.stringify(state.layout));
  }, [state.layout]);

  return (
    <WidgetsLayoutComponent
      layout={state.layout.layout}
      widgets={state.layout.widgets}
      onLayoutChange={(layout) =>
        dispatch({ type: 'UPDATE_LAYOUT', payload: { layout } })
      }
    />
  );
};
