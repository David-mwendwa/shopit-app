import React from 'react';

const TestTailwind = () => {
  return (
    <div className='min-h-[200px] flex flex-col items-center justify-center bg-slate-100 gap-4 p-6'>
      <h1 className='text-2xl font-semibold text-[var(--mh-color-primary)]'>
        Tailwind Test Component
      </h1>
      <p className='text-sm text-slate-700 max-w-md text-center'>
        If Tailwind is working, you should see colored boxes, rounded corners,
        spacing, and hover effects on the elements below.
      </p>
      <div className='flex gap-4'>
        <div className='w-20 h-20 rounded-lg bg-[var(--mh-color-primary)] text-white flex items-center justify-center text-xs font-medium'>
          Primary
        </div>
        <div className='w-20 h-20 rounded-lg bg-[var(--mh-color-accent)] text-black flex items-center justify-center text-xs font-medium'>
          Accent
        </div>
        <div className='w-20 h-20 rounded-lg border border-dashed border-slate-400 flex items-center justify-center text-[10px] text-slate-600'>
          Border
        </div>
      </div>
      <button className='mt-2 px-4 py-2 rounded-full bg-[var(--mh-color-primary)] text-white text-sm font-medium shadow hover:bg-blue-700 transition-colors'>
        Hover me
      </button>
    </div>
  );
};

export default TestTailwind;
