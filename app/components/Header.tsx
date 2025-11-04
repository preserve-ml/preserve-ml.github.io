'use client';

import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="neomorph-flat px-6 py-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Preserve
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

