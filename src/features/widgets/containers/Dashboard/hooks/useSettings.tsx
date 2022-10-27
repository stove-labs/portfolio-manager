import { RefObject, useCallback, useEffect, useRef } from 'react';
import { CurrencyTicker } from '../../../../../config/config/currencies';
import { useStoreContext } from '../../../../../store/useStore';
import { setCurrency } from '../../../../fiat/store/useFiatActions';
import { useSelectCurrency } from '../../../../fiat/store/useFiatSelectors';
import { useSelectActiveAccountAddress } from '../../../../wallet/store/useWalletSelectors';
import { useSelectWidgetsLayout } from '../../WidgetsLayout/store/useWidgetsLayoutSelectors';
import { WidgetsLayoutState } from '../../WidgetsLayout/store/useWidgetsLayoutStore';

export interface UseSettingsReturn {
  handleSettingsExport: () => void;
  handleSettingsImport: () => void;
  importSettings: (u: React.ChangeEvent<HTMLInputElement>) => void;
  settingsFileInputRef: RefObject<HTMLInputElement>;
}

export interface PersistableSettings {
  widgetLayout: WidgetsLayoutState;
  currency: CurrencyTicker;
}

export const useSettings = (): UseSettingsReturn => {
  // TODO: add currency persisting as part of settings
  const [, dispatch] = useStoreContext();
  const settings = useSelectWidgetsLayout();
  const address = useSelectActiveAccountAddress();
  // ref to the hidden file input element
  const settingsFileInputRef = useRef<HTMLInputElement>(null);
  const currency = useSelectCurrency();

  useEffect(() => {
    const persistableSettings: PersistableSettings = {
      widgetLayout: settings,
      currency,
    };

    window.localStorage.setItem(
      'STATE_LAYOUT',
      JSON.stringify(persistableSettings)
    );
  }, [settings, currency]);

  // saves a file with the current widget settings including widget layout
  const handleSettingsExport = useCallback((): void => {
    if (!address) return;
    const a = document.createElement('a');
    const persistableSettings: PersistableSettings = {
      widgetLayout: settings,
      currency,
    };
    const file = new Blob([JSON.stringify(persistableSettings)], {
      type: 'text/plain',
    });
    a.href = URL.createObjectURL(file);
    a.download = `${address}-portfolio-dashboard-settings.json`;
    a.click();
  }, [settings, address, currency]);

  // imports layout/widget settings from a JSON file uploaded by the user
  const importSettings = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files?.[0]) {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = (e) => {
          const settings = JSON.parse(
            e.target?.result?.toString() ?? ''
          ) as PersistableSettings;
          if (
            !(
              'widgets' in settings.widgetLayout &&
              'layout' in settings.widgetLayout
            ) ||
            !settings.currency
          )
            return;

          if (settings) {
            dispatch(setCurrency(settings.currency));
            dispatch({
              type: 'SET_LAYOUT',
              payload: settings.widgetLayout,
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
