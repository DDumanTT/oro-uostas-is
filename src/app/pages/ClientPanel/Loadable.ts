/**
 *
 * Asynchronously loads the component for ClientPanel
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ClientPanel = lazyLoad(
  () => import('./index'),
  module => module.ClientPanel,
);
