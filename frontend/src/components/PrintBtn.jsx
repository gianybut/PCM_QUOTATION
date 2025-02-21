import React from 'react'

const PrintBtn = () => {

    const handlePrint = () => {
        window.print()
    }

  return (
    <div className='w-48 h-24 p-4'>
        <button onClick={handlePrint}
        className='bg-blue-500 text-white p-2 rounded non-printable'
        >Print</button>
    </div>
  )
}

export default PrintBtn
