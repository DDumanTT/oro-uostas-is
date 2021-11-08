/**
 *
 * Asynchronously loads the component for AccountMenu
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AccountMenu = lazyLoad(
  () => import('./index'),
  module => module.AccountMenu,
);
