/**
 *
 * Asynchronously loads the component for WheelSpinner
 *
 */

import { lazyLoad } from 'utils/loadable';

export const WheelSpinner = lazyLoad(
  () => import('./index'),
  module => module.WheelSpinner,
);
