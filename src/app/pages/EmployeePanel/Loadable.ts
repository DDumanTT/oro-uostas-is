/**
 *
 * Asynchronously loads the component for EmployeePanel
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EmployeePanel = lazyLoad(
  () => import('./index'),
  module => module.EmployeePanel,
);
