// lib/useBreadcrumbs.js
import { usePathname } from 'next/navigation';
import { data } from '@/components/app-sidebar';

export function useBreadcrumbs() {
  const pathname = usePathname();
  
  // Find the current nav item and sub-item
  for (const navItem of data.navMain) {
    // Check if current path matches main nav item
    if (pathname === navItem.url) {
      return {
        title: navItem.title,
        itemTitle: 'Overview'
      };
    }
    
    // Check sub-items
    if (navItem.items) {
      for (const subItem of navItem.items) {
        if (pathname === subItem.url) {
          return {
            title: navItem.title,
            itemTitle: subItem.title
          };
        }
      }
    }
  }
  
  // Default fallback
  return {
    title: 'Dashboard',
    itemTitle: 'Overview'
  };
}