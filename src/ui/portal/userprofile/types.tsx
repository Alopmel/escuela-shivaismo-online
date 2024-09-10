export type Position = {
  top?: string;
  left?: string;
}[];

export type SideNavItem = {
    title: string;
    path: string;
    position: {
      top: string;
      left: string;
    };
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
  };

export type MenuItemWithSubMenuProps = {
    item: SideNavItem;
    toggleOpen: () => void;
}