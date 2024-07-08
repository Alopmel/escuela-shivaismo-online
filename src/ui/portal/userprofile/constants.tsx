import { IoHome,
         IoVideocam,
         IoNotifications,
         IoSettingsSharp,
         IoLogOut,
         IoStar,
         IoEye,
         IoCloudUpload 
        } from "react-icons/io5";


import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Clases guardadas',
    path: '/portal/userprofile/videos',
    icon: <IoVideocam  size={20} />,
  },
  {
    title: 'Recomendadas',
    path: '/portal/userprofile/recommended',
    icon: <IoStar size={20} />,
  },
  {
    title: 'Más vistas',
    path: '/portal/userprofile/more-view',
    icon: <IoEye size={20} />,
  },
  {
    title: 'Últimas subidas',
    path: '/portal/userprofile/last-updated',
    icon: <IoCloudUpload size={20} />,
  },
  {
    title: 'Notificaciones',
    path: '/portal/userprofile/notification',
    icon: <IoNotifications size={20} />,
  },
  {
    title: 'Perfil',
    path: '/portal/userprofile/setting',
    icon: <IoSettingsSharp  size={20} />,
  },
  {
    title: 'Salir',
    path: '/',
    icon: <IoLogOut size={20} />,
  },
];