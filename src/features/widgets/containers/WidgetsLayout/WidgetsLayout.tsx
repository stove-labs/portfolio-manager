import { Button, Input } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { Settings } from '../../components/Settings/Settings';
import { WidgetsLayoutState } from './store/useWidgetsLayoutStore';
import { WidgetsLayout as WidgetsLayoutComponent } from './../../components/WidgetsLayout/WidgetsLayout';

export const WidgetsLayout: React.FC = () => {
  const [state, dispatch] = useStoreContext();
  const address = 'address';

  useEffect(() => {
    window.localStorage.setItem('STATE_LAYOUT', JSON.stringify(state.settings));
  }, [state.settings]);

  const downloadSettings = (): void => {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(state.settings)], {
      type: 'text/plain',
    });
    a.href = URL.createObjectURL(file);
    a.download = `${address}-portfolio-dashboard-settings.json`;
    a.click();
  };

  const restoreSettings = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
        const data = JSON.parse(
          e.target?.result?.toString() ?? ''
        ) as WidgetsLayoutState;
        if (!('widgets' in data && 'layout' in data)) return;

        if (data) {
          dispatch({
            type: 'SET_LAYOUT',
            payload: { layout: data.layout, widgets: data.widgets },
          });
        }
      };
    }
  };

  return (
    <>
      <Button onClick={() => downloadSettings()}>Download Settings</Button>
      <Input type={'file'} onChange={(e) => restoreSettings(e)}></Input>
      <Settings />
      <WidgetsLayoutComponent
        layout={state.settings.layout}
        widgets={state.settings.widgets}
        onLayoutChange={(layout) =>
          dispatch({ type: 'UPDATE_LAYOUT', payload: { layout } })
        }
      />
    </>
  );
};
