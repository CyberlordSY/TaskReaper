import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className='flex sticky top-0 justify-between bg-[#4a4a4a] text-white p-2'>
                <div className="logo flex items-center">
                    <img src="/vite.png" className='w-[10vh]' alt="" srcset="" />
                    <span className='font-bold text-xl mx-8'>TaskReaper</span>
                </div>
                <ul className='flex gap-8 mx-9'>
                    <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar