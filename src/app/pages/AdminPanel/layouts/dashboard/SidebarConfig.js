import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import { getUser, Roles } from 'user_info';

// ----------------------------------------------------------------------

const getIcon = name => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill),
  // },
];

if ([Roles.admin, Roles.worker].includes(getUser().role)) {
  sidebarConfig.push({
    title: 'Create flight',
    path: '/employee',
    icon: getIcon('fa-solid:plane-departure'),
  });

  sidebarConfig.push({
    title: 'Update flight status',
    path: '/dashboard/flights',
    icon: getIcon('bx:bxs-message-rounded-edit'),
  });

  sidebarConfig.push({
    title: 'Add plane',
    path: '/addplane',
    icon: getIcon('clarity:plane-solid'),
  });
}

export default sidebarConfig;
