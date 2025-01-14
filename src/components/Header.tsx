import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('transition-colors', 'duration-500');
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNavClick = (href: string) => {
    setIsSidebarOpen(false);
    
    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/', { state: { scrollTo: sectionId } });
      }
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/works', label: 'Works' },
    { href: '/blog', label: 'Blog' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.substring(1);
    }
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50   bg-gradient-to-r from-blue-200 via-pink-300 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            onClick={() => handleNavClick('/')}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            <img src="/Images/Logo.png" alt="Logo" className="h-8 w-auto" />
          </Link>

          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.li key={link.href} whileHover={{ y: -2 }}>
                {link.href.startsWith('/#') ? (
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 transition-colors ${
                      isActiveLink(link.href) ? 'text-pink-600 dark:text-pink-500' : ''
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => link.href === '/' && handleNavClick('/')}
                    className={`text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 transition-colors ${
                      isActiveLink(link.href) ? 'text-pink-600 dark:text-pink-500' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
            
            <motion.button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 p-6"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex justify-end mb-8">
              <motion.button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <motion.li 
                  key={link.href}
                  whileHover={{ x: 5 }}
                >
                  {link.href.startsWith('/#') ? (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`block text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 transition-colors ${
                        isActiveLink(link.href) ? 'text-pink-600 dark:text-pink-500' : ''
                      }`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => {
                        setIsSidebarOpen(false);
                        if (link.href === '/') handleNavClick('/');
                      }}
                      className={`block text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 transition-colors ${
                        isActiveLink(link.href) ? 'text-pink-600 dark:text-pink-500' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}
