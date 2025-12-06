import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccess } from '../../utils/alert';
import { logout } from '../../actions/userActions';
import {
  PhoneIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon as SearchIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  MapPinIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    showSuccess('You logged out');
  };

  return (
    <header className='bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm'>
      {/* Top Bar */}
      <div className='bg-indigo-50 text-indigo-800 text-sm'>
        <div className='container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center space-x-6 mb-2 md:mb-0'>
            <div className='flex items-center space-x-2'>
              <PhoneIcon className='h-4 w-4 text-indigo-600' />
              <a
                href='tel:+254717587337'
                className='hover:text-indigo-600 transition-colors font-medium'>
                +254 717 587 337
              </a>
            </div>
            <div className='hidden md:flex items-center space-x-2'>
              <EnvelopeIcon className='h-4 w-4 text-indigo-600' />
              <a
                href='mailto:support@markethub.com'
                className='hover:text-indigo-600 transition-colors font-medium'>
                support@markethub.com
              </a>
            </div>
            <Link
              to='/orders/track'
              className='group flex items-center space-x-2 text-indigo-700 hover:text-indigo-600 transition-colors'>
              <ArrowPathIcon className='h-4 w-4 group-hover:rotate-180 transition-transform duration-300' />
              <span className='font-semibold'>Track Order</span>
            </Link>
          </div>
          <div className='flex items-center space-x-6'>
            <div className='relative group'>
              <button className='flex items-center space-x-1 text-sm font-medium text-indigo-900 hover:text-indigo-700 transition-colors'>
                <span>KES (KSh)</span>
                <ChevronDownIcon className='w-3 h-3' />
              </button>
              <div className='absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100'>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-indigo-50 flex items-center'>
                  <span className='w-12 font-semibold'>KES</span>
                  <span className='text-indigo-600 text-xs'>(KSh)</span>
                </button>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-indigo-50 flex items-center'>
                  <span className='w-12 font-semibold'>USD</span>
                  <span className='text-indigo-600 text-xs'>($)</span>
                </button>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-indigo-50 flex items-center'>
                  <span className='w-12 font-semibold'>EUR</span>
                  <span className='text-indigo-600 text-xs'>(€)</span>
                </button>
              </div>
            </div>

            <div className='relative group'>
              <button className='flex items-center space-x-1 text-sm font-medium text-indigo-900 hover:text-indigo-700 transition-colors'>
                <span>English</span>
                <ChevronDownIcon className='w-3 h-3' />
              </button>
              <div className='absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100'>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-indigo-50 flex items-center'>
                  <span className='flex-1'>English</span>
                  <span className='text-xs text-indigo-600'>EN</span>
                </button>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-indigo-50 flex items-center'>
                  <span className='flex-1'>Español</span>
                  <span className='text-xs text-indigo-600'>ES</span>
                </button>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-indigo-50 flex items-center'>
                  <span className='flex-1'>Français</span>
                  <span className='text-xs text-indigo-600'>FR</span>
                </button>
              </div>
            </div>

            {user ? (
              <div className='relative group'>
                <button className='flex items-center space-x-1 text-sm text-text-primary hover:text-primary transition-colors'>
                  <UserIcon className='w-4 h-4' />
                  <span>My Account</span>
                  <ChevronDownIcon className='w-3 h-3' />
                </button>
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-border'>
                  <Link
                    to='/me'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Profile
                  </Link>
                  <Link
                    to='/orders/me'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    My Orders
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className='w-full text-left px-4 py-2 text-sm text-error hover:bg-background-light transition-colors'>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to='/login'
                className='text-sm text-text-primary hover:text-primary flex items-center space-x-1 transition-colors'>
                <UserIcon className='w-4 h-4' />
                <span>Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className='container mx-auto px-4 py-3 border-b border-border'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link to='/' className='flex items-center space-x-2'>
              <div className='bg-gradient-to-r from-primary to-primary-dark p-2 rounded-lg'>
                <ShoppingCartIcon className='h-6 w-6 text-white' />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent'>
                MarketHub
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-text-muted hover:text-text-primary transition-colors'>
              {isMobileMenuOpen ? (
                <XMarkIcon className='h-6 w-6' />
              ) : (
                <Bars3Icon className='h-6 w-6' />
              )}
            </button>
          </div>

          {/* Search Bar with Categories Dropdown - Desktop */}
          <div className='hidden md:flex items-center flex-1 max-w-2xl mx-8'>
            <div className='relative flex w-full'>
              {/* Categories Dropdown */}
              <div className='relative group'>
                <button className='h-10 px-4 bg-background-light border border-r-0 border-border rounded-l-md text-sm font-medium text-text-primary hover:bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-primary flex items-center'>
                  <span>All Categories</span>
                  <ChevronDownIcon className='ml-2 h-4 w-4' />
                </button>
                <div className='absolute left-0 mt-1 w-64 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block max-h-96 overflow-y-auto border border-border'>
                  <Link
                    to='/?category=Electronics'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Electronics
                  </Link>
                  <Link
                    to='/?category=Cameras'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Cameras
                  </Link>
                  <Link
                    to='/?category=Laptops'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Laptops
                  </Link>
                  <Link
                    to='/?category=Accessories'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Accessories
                  </Link>
                  <Link
                    to='/?category=Headphones'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Headphones
                  </Link>
                  <Link
                    to='/?category=Food'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Food
                  </Link>
                  <Link
                    to='/?category=Books'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Books
                  </Link>
                  <Link
                    to='/?category=Clothes/Shoes'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Clothes/Shoes
                  </Link>
                  <Link
                    to='/?category=Beauty/Health'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Beauty/Health
                  </Link>
                  <Link
                    to='/?category=Sports'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Sports
                  </Link>
                  <Link
                    to='/?category=Outdoor'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Outdoor
                  </Link>
                  <Link
                    to='/?category=Home'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Home
                  </Link>
                </div>
              </div>

              {/* Search Input */}
              <div className='flex-1 relative'>
                <input
                  type='text'
                  placeholder='Search for products...'
                  className='w-full h-10 px-4 border-t border-b border-border text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-text-muted/50'
                />
              </div>
              <button className='h-10 px-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-r-md hover:opacity-90 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md'>
                <SearchIcon className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className='hidden md:flex items-center space-x-6'>
            <div className='relative group'>
              <button className='flex items-center space-x-2 text-text-primary hover:text-primary transition-colors'>
                <div className='relative'>
                  <HeartIcon className='h-6 w-6' />
                  <span className='absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]'>
                    0
                  </span>
                </div>
                <span className='text-sm'>Wishlist</span>
              </button>
            </div>

            <div className='relative group'>
              <Link
                to='/cart'
                className='flex items-center space-x-2 text-text-primary hover:text-primary transition-colors'>
                <div className='relative'>
                  <ShoppingCartIcon className='h-6 w-6' />
                  <span className='absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]'>
                    {cartItems.reduce((a, item) => a + item.quantity, 0)}
                  </span>
                </div>
                <div className='text-left'>
                  <div className='text-sm font-medium'>Shopping Cart</div>
                  <div className='text-xs text-text-muted'>
                    $
                    {cartItems
                      .reduce((a, item) => a + item.price * item.quantity, 0)
                      .toFixed(2)}
                  </div>
                </div>
              </Link>
            </div>

            {user && (
              <div className='relative group'>
                <button className='flex items-center space-x-2 text-text-primary hover:text-primary transition-colors'>
                  <UserCircleIcon className='h-6 w-6' />
                  <div className='text-left'>
                    <div className='text-sm font-medium'>
                      {user?.name?.split(' ')[0] || 'User'}
                    </div>
                    <div className='text-xs text-text-muted'>My Account</div>
                  </div>
                </button>
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-border'>
                  <Link
                    to='/me'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    Profile
                  </Link>
                  <Link
                    to='/orders/me'
                    className='block px-4 py-2 text-sm text-text-primary hover:bg-background-light transition-colors'>
                    My Orders
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className='w-full text-left px-4 py-2 text-sm text-error hover:bg-background-light transition-colors'>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden bg-white border-t border-border'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <Link
                to='/'
                className='block px-3 py-2 text-text-primary hover:bg-background-light rounded-md transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link
                to='/shop'
                className='block px-3 py-2 text-text-primary hover:bg-background-light rounded-md transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}>
                Shop
              </Link>
              <Link
                to='/deals'
                className='block px-3 py-2 text-text-primary hover:bg-background-light rounded-md transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}>
                Deals
              </Link>
              <Link
                to='/about'
                className='block px-3 py-2 text-text-primary hover:bg-background-light rounded-md transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link
                to='/contact'
                className='block px-3 py-2 text-text-primary hover:bg-background-light rounded-md transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
            <div className='px-4 py-3 border-t border-border'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search for products...'
                  className='w-full pl-4 pr-10 py-2 border border-border rounded-full text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-text-muted/50'
                />
                <button className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-text-muted hover:text-primary transition-colors'>
                  <SearchIcon className='h-5 w-5' />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Third Row - Navigation Links */}
      <div className='bg-white border-t border-gray-100 shadow-sm hidden md:block'>
        <div className='container mx-auto px-4'>
          <nav className='flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide'>
            <Link
              to='/'
              className='whitespace-nowrap text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
              Home
            </Link>
            <Link
              to='/shop'
              className='whitespace-nowrap text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
              Shop All
            </Link>
            <Link
              to='/deals'
              className='whitespace-nowrap text-sm font-medium text-red-600 hover:text-red-700 transition-colors flex items-center'>
              <span className='bg-red-100 px-2 py-0.5 rounded-full text-xs font-semibold mr-1.5'>
                HOT
              </span>
              <span>Deals</span>
            </Link>
            <Link
              to='/category/electronics'
              className='whitespace-nowrap text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
              Electronics
            </Link>
            <Link
              to='/category/fashion'
              className='whitespace-nowrap text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
              Fashion
            </Link>
            <Link
              to='/category/home'
              className='whitespace-nowrap text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
              Home & Living
            </Link>
            <Link
              to='/category/beauty'
              className='whitespace-nowrap text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
              Beauty
            </Link>
            <Link
              to='/category/sports'
              className='whitespace-nowrap text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
              Sports & Outdoors
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
