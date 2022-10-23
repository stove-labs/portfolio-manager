import { RefObject, useCallback, useRef } from 'react';
import { useStoreContext } from '../../../../../store/useStore';
import { useSelectActiveAccountAddress } from '../../../../wallet/store/useWalletSelectors';
import { useSelectWidgetsLayout } from '../../WidgetsLayout/store/useWidgetsLayoutSelectors';
import { WidgetsLayoutState } from '../../WidgetsLayout/store/useWidgetsLayoutStore';

export interface UseSettingsReturn {
  handleSettingsExport: () => void;
  handleSettingsImport: () => void;
  importSettings: (u: React.ChangeEvent<HTMLInputElement>) => void;
  settingsFileInputRef: RefObject<HTMLInputElement>;
}

export const useSettings = (): UseSettingsReturn => {
  const [, dispatch] = useStoreContext();
  const settings = useSelectWidgetsLayout();
  const address = useSelectActiveAccountAddress();
  // ref to the hidden file input element
  const settingsFileInputRef = useRef<HTMLInputElement>(null);

  // saves a file with the current widget settings including widget layout
  const handleSettingsExport = useCallback((): void => {
    if (!address) return;
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(settings)], {
      type: 'text/plain',
    });
    a.href = URL.createObjectURL(file);
    a.download = `${address}-portfolio-dashboard-settings.json`;
    a.click();
  }, [settings, address]);

  // imports layout/widget settings from a JSON file uploaded by the user
  const importSettings = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    },
    []
  );

  // trigger file input on a hidden settings file input
  const handleSettingsImport = useCallback(() => {
    settingsFileInputRef.current?.click();
  }, [settingsFileInputRef]);

  return {
    importSettings,
    settingsFileInputRef,
    handleSettingsExport,
    handleSettingsImport,
  };
};
