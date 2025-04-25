// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-User',
      title: 'User',
      type: 'item',
      url: '/User',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-Brand',
      title: 'Brand',
      type: 'item',
      url: '/Brand',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-Product',
      title: 'Product',
      type: 'item',
      url: '/Product',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-Category',
      title: 'Category',
      type: 'item',
      url: '/Category',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-Contact',
      title: 'Contact',
      type: 'item',
      url: '/Contact',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-Order',
      title: 'Order',
      type: 'item',
      url: '/Order',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-Address',
      title: 'Address',
      type: 'item',
      url: '/Address',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-OrderDetail',
      title: 'OrderDetail',
      type: 'item',
      url: '/OrderDetail',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-Role',
      title: 'Role',
      type: 'item',
      url: '/Role',
      icon: icons.IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;
