'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { items, MenuItem } from '@/utils/menuItems';

type MenuState = {
  isOpen: boolean;
  currentItems: MenuItem[];
  breadcrumb: string[];
  centralTitle: string;
};

type MenuContextType = {
  menuState: MenuState;
  toggleMenu: () => void;
  selectItem: (item: MenuItem) => void;
  goBack: () => void;
  getBreadcrumbPath: (item: MenuItem) => string[];
};

const initialTitle = 'Escuela de Shivaismo de Cachemira';

const initialState: MenuState = {
  isOpen: false,
  currentItems: items,
  breadcrumb: [],
  centralTitle: initialTitle
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuState, setMenuState] = useState<MenuState>(initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('menuState');
      if (savedState) {
        setMenuState(JSON.parse(savedState));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('menuState', JSON.stringify(menuState));
    }
  }, [menuState]);

  const toggleMenu = () => {
    setMenuState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const getBreadcrumbPath = (targetItem: MenuItem): string[] => {
    const findPath = (currentItems: MenuItem[], path: string[] = []): string[] | null => {
      for (const item of currentItems) {
        if (item === targetItem) {
          return [...path, item.text];
        }
        if (item.subItems) {
          const result = findPath(item.subItems, [...path, item.text]);
          if (result) return result;
        }
      }
      return null;
    };

    const path = findPath(items);
    return path || [];
  };

  const selectItem = (item: MenuItem) => {
    const newBreadcrumb = getBreadcrumbPath(item);
    setMenuState(prev => ({
      ...prev,
      currentItems: item.subItems || [],
      breadcrumb: newBreadcrumb,
      centralTitle: item.text
    }));
  };

  const goBack = () => {
    setMenuState(prev => {
      if (prev.breadcrumb.length > 1) {
        const newBreadcrumb = prev.breadcrumb.slice(0, -1);
        const newCurrentItems = findItemsByBreadcrumb(newBreadcrumb);
        const newCentralTitle = newBreadcrumb[newBreadcrumb.length - 1];
        return {
          ...prev,
          currentItems: newCurrentItems,
          breadcrumb: newBreadcrumb,
          centralTitle: newCentralTitle
        };
      } else if (prev.breadcrumb.length === 1) {
        // Paso intermedio: volver al primer nivel de items
        return {
          ...prev,
          currentItems: items,
          breadcrumb: [],
          centralTitle: initialTitle
        };
      }
      // Si ya estamos en el nivel inicial, cerramos el menú
      return {
        ...initialState,
        isOpen: false
      };
    });
  };

  const findItemsByBreadcrumb = (breadcrumb: string[]): MenuItem[] => {
    let currentItems = items;
    for (const crumb of breadcrumb) {
      const foundItem = currentItems.find(item => item.text === crumb);
      if (foundItem && foundItem.subItems) {
        currentItems = foundItem.subItems;
      } else {
        break;
      }
    }
    return currentItems;
  };

  return (
    <MenuContext.Provider value={{ menuState, toggleMenu, selectItem, goBack, getBreadcrumbPath }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};