import { useEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';

export function useRouteDebugger() {
  const state = useNavigationState((state) => state);

  useEffect(() => {
    console.log('[ROUTE STACK]');
    state.routes.forEach((route, i) => {
      console.log(`${i}: ${route.name}`);
    });
  }, [state]);
}
