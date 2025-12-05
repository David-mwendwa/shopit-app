import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestTailwind = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='p-8'>
          <h1 className='text-3xl font-bold text-primary mb-4'>
            Tailwind CSS Test Component
          </h1>

          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>Colors</h2>
            <div className='flex flex-wrap gap-3 mb-4'>
              <div className='w-16 h-16 bg-primary rounded flex items-center justify-center text-white font-medium'>
                Primary
              </div>
              <div className='w-16 h-16 bg-secondary rounded flex items-center justify-center text-white font-medium'>
                Secondary
              </div>
              <div className='w-16 h-16 bg-blue-500 rounded flex items-center justify-center text-white font-medium'>
                Blue 500
              </div>
              <div className='w-16 h-16 bg-green-500 rounded flex items-center justify-center text-white font-medium'>
                Green 500
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>
              Typography
            </h2>
            <p className='text-lg text-gray-700 mb-3'>
              This is a paragraph with some text to test the default font and
              text styles.
            </p>
            <p className='font-mono bg-gray-100 p-2 rounded text-sm'>
              This is monospace text in a code-like block.
            </p>
          </div>

          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>
              Buttons
            </h2>
            <div className='flex flex-wrap gap-3'>
              <button className='px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors'>
                Primary Button
              </button>
              <button className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors'>
                Secondary Button
              </button>
              <button className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'>
                Danger Button
              </button>
            </div>
          </div>

          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>Card</h2>
            <div className='border rounded-lg overflow-hidden shadow-sm'>
              <div className='p-4 bg-gray-50 border-b'>
                <h3 className='font-medium'>Card Title</h3>
              </div>
              <div className='p-4'>
                <p className='text-gray-600'>
                  This is a card component with a title and content area.
                </p>
                <div className='mt-4 flex justify-end'>
                  <button className='text-sm text-primary hover:underline'>
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-3'>
              Responsive Test
            </h2>
            <div className='bg-blue-500 text-white p-4 text-center'>
              <p className='md:hidden'>Mobile (default) - Blue background</p>
              <p className='hidden md:block lg:hidden'>
                Tablet (md) - Blue background
              </p>
              <p className='hidden lg:block xl:hidden'>
                Laptop (lg) - Blue background
              </p>
              <p className='hidden xl:block'>Desktop (xl) - Blue background</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <>
      <App />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  </Provider>
);
