'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-6">
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <span className="text-2xl font-extralight tracking-tight">
                    <Link href={"/"}>
                        Artist Name
                    </Link>
                </span>
            </div>
            <div className="block lg:hidden">
                <button 
                    className="flex items-center px-3 py-2 border rounded text-black-200 border-teal-400 hover:text-gray hover:border-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                    <svg
                        className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
                <div className="text-sm lg:flex-grow"></div>
                <div className='font-extralight'>
                    <Link href="#responsive-header" className="block mt-4 px-2 lg:inline-block lg:mt-0 text-black-200 hover:text-gray">
                        Portfolio
                    </Link>
                    <Link href="#responsive-header" className="block mt-4 px-2 lg:inline-block lg:mt-0 text-black-200 hover:text-gray mr-4">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Menu