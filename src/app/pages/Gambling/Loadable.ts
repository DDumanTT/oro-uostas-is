/**
 *
 * Asynchronously loads the component for Gambling
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Gambling = lazyLoad(
  () => import('./index'),
  module => module.Gambling,
);
