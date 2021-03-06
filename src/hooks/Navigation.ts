import React from 'react';
import {get, isNil} from 'lodash';
import {
  useNavigationState,
  useNavigation,
  useRoute,
  NavigationState,
  CommonActions,
} from '@react-navigation/native';
import {ParamKeys, Screens} from '@/constants/Navigation';

function _routeParamSelector<T>(
  state: NavigationState,
  keyName: string,
): T | undefined {
  const routes = state.routes || [];
  // Traverse the routes and find out the parameter
  for (let i = routes.length - 1; i >= 0; i--) {
    const value = get(routes[i], `params.${keyName}`);
    if (!isNil(value)) {
      return value;
    }
  }
  return undefined;
}

/**
 * It's hard to pass => pass => pass params between the screens
 * so in stack, traverse reverse and  find out if the parameter is set.
 * useful.
 * @param  {[type]} keyName [description]
 * @return {[type]}         [description]
 */
export function useRouteParamInStack<T>(keyName: string): T | undefined {
  return useNavigationState((state) => _routeParamSelector(state, keyName));
}

const _screenKeySelector = (
  state: NavigationState,
  screenName: string,
): string | undefined => {
  const routes = state.routes || [];
  // Traverse the routes and find out the parameter
  for (let i = routes.length - 1; i >= 0; i--) {
    if (routes[i].name === screenName) {
      return routes[i].key;
    }
  }
  return undefined;
};
/**
 * Traverse and Get the key with specific screen name.
 * To go back exactly to the screen.
 * @param  {[type]} screenName [description]
 * @return {[type]}            [description]
 */
export function useGetNavKeyWithScreenName(
  screenName: string,
): string | undefined {
  return useNavigationState((state) => _screenKeySelector(state, screenName));
}

/**
 * Function to get the current navigation context.
 * @return {[type]} [description]
 */
export function useNavContext<TData = any, TResult = any>():
  | NavContext<TData, TResult>
  | undefined {
  return useRouteParamInStack(ParamKeys.context);
}

// This is different with react navigation context!
export interface NavContext<TData = any, TResult = any> {
  name: string;
  startScreenKey: string;
  startScreenName: string;
  pop2Start: () => void;
  data?: TData;
  onResult?: (result?: TResult) => void;
}

export function useCreateNavContext<TData = any, TResult = any>(): (
  name: string,
  data?: TData,
) => NavContext<TData, TResult> {
  const navigation = useNavigation();
  const route = useRoute();
  const startScreenKey = route.key;
  const startScreenName = route.name;

  return React.useCallback(
    (name: string) => {
      return {
        name,
        startScreenKey,
        startScreenName,
        pop2Start: () => navigation.navigate({key: startScreenKey}),
      };
    },
    [navigation, startScreenKey, startScreenName],
  );
}

export function useNavigateWithContext<TData = any, TResult = any>(): (
  screenName: string,
  context?: NavContext<TData, TResult>,
) => void {
  const navigation = useNavigation();
  return React.useCallback(
    (screenName: string, context?: NavContext) => {
      const params = context ? {[ParamKeys.context]: context} : {};
      navigation.navigate(screenName, params);
    },
    [navigation],
  );
}

export function useCanGoBack(): boolean {
  return useNavigationState((state) => state.index > 0);
}

