import React, { useEffect } from 'react';
import { useDispatchUniqueContext } from '../../providers/DispatchUniqueProvider';
import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';

export const WidgetRenderer: React.FC = () => {
  const { flushDispatchQueue } = useDispatchUniqueContext();

  useEffect(() => {
    flushDispatchQueue();
  }, []);

  return <WidgetsLayout />;
};
