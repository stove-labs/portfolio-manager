import React, { useEffect } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { useDispatchUniqueContext } from '../../providers/DispatchUniqueProvider';
import { WidgetsLayout as WidgetsLayoutComponent } from './../../components/WidgetsLayout/WidgetsLayout';

export const WidgetsLayout: React.FC = () => {
  const [state, dispatch] = useStoreContext();
  const { flushDispatchQueue } = useDispatchUniqueContext();

  useEffect(() => {
    flushDispatchQueue();
  }, []);

  useEffect(() => {
    window.localStorage.setItem('STATE_LAYOUT', JSON.stringify(state.settings));
  }, [state.settings]);

  console.log('widgets', state.settings.widgets);

  return (
    <>
      {/* <Button onClick={() => downloadSettings()}>Download Settings</Button>
      <Input type={'file'} onChange={(e) => restoreSettings(e)}></Input>
      <Settings /> */}
      <WidgetsLayoutComponent
        layout={state.settings.layout}
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
