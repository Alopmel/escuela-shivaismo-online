import { IoVideocam, IoStar, IoCloudUpload, IoSettingsSharp, IoSettings  } from "react-icons/io5";
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Clases guardadas',
    path: '/portal/userprofile/videos',
    position: { top: 'calc(50% + 342px)', left: 'calc(50% + 80px)' },
    icon: <IoVideocam size={20} />,
  },
  {
    title: 'Recomendadas',
    path: '/portal/userprofile/recommended',
    position: { top: 'calc(50% + 378px)', left: 'calc(50% - 9px)' },
    icon: <IoStar size={20} />,
  },
  {
    title: 'Perfil',
    path: '/portal/userprofile/setting',
    position: { top: 'calc(50% + 461px)', left: 'calc(50% - 64px)' },
    icon: <IoSettingsSharp size={20} />,
  }
];
