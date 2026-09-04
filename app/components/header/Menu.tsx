'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const scrollControl = () => {
        if (isOpen) {
            document.body.style.overflow = "";
        }
        else {
            document.body.style.overflow = "hidden";
        }
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-6                                    ">
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <span className="text-2xl font-extralight tracking-tight">
                    <Link href={"/"} onClick={() => setIsOpen(false)}>
                        <Logo />
                    </Link>
                </span>
            </div>
            <div className="block lg:hidden z-50">
                <button 
                    className="flex items-center px-3 py-2 border rounded text-black-200 hover:text-gray border-white hover:border-white"
                    onClick={() => {setIsOpen(!isOpen); scrollControl()}}
                >
                    <div className={`w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${isOpen ? "mr-0" : ""}`}>
                        <span
                        className={`absolute h-0.5 w-7 bg-black transform transition duration-300 ease-in-out ${
                            isOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
                        }`}
                        ></span>
                        <span
                        className={`absolute h-0.5 bg-black transform transition-all duration-200 ease-in-out ${
                            isOpen ? "w-0 opacity-50" : "w-7 delay-200 opacity-100"
                        }`}
                        ></span>
                        <span
                        className={`absolute h-0.5 w-7 bg-black transform transition duration-300 ease-in-out ${
                            isOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
                        }`}
                        ></span>
                    </div>
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block cmodal-container" : "hidden"}`}>
                <div className="text-sm lg:flex-grow"></div>
                <div className={`font-extralight${isOpen ? " cmodal" : ""}`}>
                    <div className={`${isOpen ? "cmodal-fullscreen text-center text-5xl" : ""}`}>
                        <Link 
                            href="/" 
                            className={`${pathname === "/" ? "underline underline-offset-8 decoration-1" : ""} block mt-4 px-2 lg:inline-block lg:mt-0 text-black-200 hover:underline hover:decoration-gray-500 hover:underline-offset-8 hover:decoration-2 hover:text-gray${isOpen ? " py-2 hover:decoration-2 hover:decoration-gray-500 hover:underline-offset-8" : " hover:decoration-1"}`}
                            onClick={() => { setIsOpen(false); document.body.style.overflow = "";} }
                        >
                            Reel
                        </Link>
                        <Link 
                            href="/motion-design" 
                            className={`${pathname === "/motion-design" ? "underline underline-offset-8 decoration-1" : ""} block mt-4 px-2 lg:inline-block lg:mt-0 text-black-200 hover:underline hover:decoration-gray-500 hover:underline-offset-8 hover:decoration-2 hover:text-gray${isOpen ? " py-2 hover:decoration-2 hover:decoration-gray-500 hover:underline-offset-8" : " hover:decoration-1"}`}
                            onClick={() => { setIsOpen(false); document.body.style.overflow = "";} }
                        >
                            Motion Design
                        </Link>
                        <Link 
                            href="/play" 
                            className={`${pathname === "/play" ? "underline underline-offset-8 decoration-1" : ""} block mt-4 px-2 lg:inline-block lg:mt-0 text-black-200 hover:underline hover:decoration-gray-500 hover:underline-offset-8 hover:decoration-2 hover:text-gray${isOpen ? " py-2 hover:decoration-2 hover:decoration-gray-500 hover:underline-offset-8" : " hover:decoration-1"}`}
                            onClick={() => { setIsOpen(false); document.body.style.overflow = "";} }
                        >
                            Play
                        </Link>
                        <Link 
                            href="about" 
                            className={`${pathname === "/about" ? "underline underline-offset-8 decoration-1" : ""} block mt-4 px-2 lg:inline-block lg:mt-0 text-black-200 hover:underline hover:decoration-gray-500 hover:underline-offset-8 hover:decoration-2 hover:text-gray mr-4${isOpen ? " py-2 hover:decoration-2 hover:decoration-gray-500 hover:underline-offset-8" : " hover:decoration-1"}`}
                            onClick={() => {setIsOpen(false); document.body.style.overflow = "";}}
                        >
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Menu