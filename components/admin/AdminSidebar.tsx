'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, Layers, LogOut, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdminSidebarProps {
  currentPath?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function AdminSidebar({ currentPath, isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
 return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Layers },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const handleNavClick = () => {
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
      >
        <Menu className="w-5 h-5 text-charcoal" />
      </button>

      {/* Backdrop */}
      {isOpen && isMobile && (
        <div
          onClick={onToggle}
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out flex-shrink-0 ${
          isMobile 
            ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-72 fixed top-0 left-0`
            : 'translate-x-0 w-64 relative'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-charcoal">AI Explorer</h1>
              <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
            </div>
            {isMobile && (
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-lime/10 text-charcoal font-medium border-l-4 border-lime'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}