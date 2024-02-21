import { useState } from 'react'
import "preline/preline";

//for testing, will be adjusted
function App() {
  return (
    <>
      <h1 className='text-3xl'>Shasta Dental</h1>
      <p className='bg-red-500'>tailwind works :D</p>
      <button type='button'
        className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
        Preline testing button
      </button>
    </>
  )
}

export default App

