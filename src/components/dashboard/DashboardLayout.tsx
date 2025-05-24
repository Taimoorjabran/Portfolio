'use client';

import { signOut } from 'next-auth/react';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faTimes, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Using faChartBar for logo, faSignOutAlt for sign out

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: faHome },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" // z-index higher than sidebar
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col p-6 shadow-2xl z-40
                   transform transition-transform duration-300 ease-in-out
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                   lg:relative lg:translate-x-0 lg:flex-shrink-0 lg:shadow-none`} // Hide on mobile by default, slide in, always visible on large screens
      >
        <div className="flex justify-end lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center mb-12 mt-2">
          <FontAwesomeIcon icon={faChartBar} className="h-9 w-9 text-blue-400 mr-3" />
          <div className="text-2xl font-extrabold text-white tracking-wide">Dashboard</div>
        </div>
        <nav className="flex-1">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200
                    ${pathname === item.href
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on nav item click
                >
                  <FontAwesomeIcon icon={item.icon} className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-8 border-t border-gray-700">
          <button
            onClick={() => signOut()}
            className="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-lg shadow-lg
                       hover:from-green-600 hover:to-green-700 transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 mr-2" />
            <span className="font-semibold text-lg">Sign Out</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-auto"> {/* Adjusted padding */}
        <div className="flex justify-start mb-6 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-800 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open sidebar"
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}