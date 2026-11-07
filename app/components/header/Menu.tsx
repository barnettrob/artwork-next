'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import InstagramIcon from '../socialMedia/icons/Instagram';
import LinkedInIcon from '../socialMedia/icons/LinkedIn';

interface MenuProps {
    socialLinks: { name: 'instagram' | 'linkedin'; url: string }[];
}

const Menu = ({ socialLinks }: MenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuTop, setMenuTop] = useState(0);
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };
        const updateMenuTop = () => {
            setMenuTop(navRef.current?.getBoundingClientRect().bottom ?? 0);
        };
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener('resize', updateMenuTop);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener('resize', updateMenuTop);
        };
    }, [isOpen]);

    const toggleMenu = () => {
        const nextIsOpen = !isOpen;
        setIsOpen(nextIsOpen);

        if (nextIsOpen) {
            setMenuTop(navRef.current?.getBoundingClientRect().bottom ?? 0);
        }
    }

    return (
        <nav ref={navRef} aria-label="Primary" className="flex items-center justify-between flex-wrap bg-gray-950 p-6">
            <div className="flex items-center flex-shrink-0 text-gray-100 mr-6">
                <span className="text-2xl font-extralight tracking-tight">
                    <Link href={"/"} aria-label="Home" onClick={() => setIsOpen(false)}>
                        <Logo />
                    </Link>
                </span>
            </div>
            <div className="block lg:hidden z-50">
                <button 
                    className="flex items-center px-3 py-2 text-gray-100 hover:text-white"
                    onClick={toggleMenu}
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    aria-controls="primary-navigation"
                >
                    <div className={`w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${isOpen ? "mr-0" : ""}`}>
                        <span
                        className={`absolute h-0.5 w-7 bg-gray-100 transform transition duration-300 ease-in-out ${
                            isOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
                        }`}
                        ></span>
                        <span
                        className={`absolute h-0.5 bg-gray-100 transform transition-all duration-200 ease-in-out ${
                            isOpen ? "w-0 opacity-50" : "w-7 delay-200 opacity-100"
                        }`}
                        ></span>
                        <span
                        className={`absolute h-0.5 w-7 bg-gray-100 transform transition duration-300 ease-in-out ${
                            isOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
                        }`}
                        ></span>
                    </div>
                </button>
            </div>
            <div id="primary-navigation" className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block cmodal-container" : "hidden"}`}>
                <div className="text-sm lg:flex-grow"></div>
                <div className={`font-extralight${isOpen ? " cmodal" : ""}`}>
                    <div className={`${isOpen ? "cmodal-fullscreen text-center text-5xl" : ""}`} style={isOpen ? { top: `${menuTop}px` } : undefined}>
                        <Link 
                            href="/" 
                            aria-current={pathname === "/" ? "page" : undefined}
                            className={`menu-link${pathname === "/" ? " is-active" : ""} block ${isOpen ? "" : "mt-4"} px-2 lg:inline-block lg:mt-0 text-gray-100 hover:text-white${isOpen ? " mx-auto w-fit py-2" : ""}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/work" 
                            aria-current={pathname === "/work" ? "page" : undefined}
                            className={`menu-link${pathname === "/work" ? " is-active" : ""} block ${isOpen ? "" : "mt-4"} px-2 lg:inline-block lg:mt-0 text-gray-100 hover:text-white${isOpen ? " mx-auto w-fit py-2" : ""}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Work
                        </Link>
                        <Link 
                            href="/play" 
                            aria-current={pathname === "/play" ? "page" : undefined}
                            className={`menu-link${pathname === "/play" ? " is-active" : ""} block ${isOpen ? "" : "mt-4"} px-2 lg:inline-block lg:mt-0 text-gray-100 hover:text-white${isOpen ? " mx-auto w-fit py-2" : ""}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Play
                        </Link>
                        <Link 
                            href="/about"
                            aria-current={pathname === "/about" ? "page" : undefined}
                            className={`menu-link${pathname === "/about" ? " is-active" : ""} block ${isOpen ? "" : "mt-4"} px-2 lg:inline-block lg:mt-0 text-gray-100 hover:text-white${isOpen ? " mx-auto w-fit py-2" : " mr-4"}`}
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        {isOpen && (
                            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-gray-100 lg:hidden">
                                {socialLinks.map(({ name, url }) => (
                                    <a
                                        key={name}
                                        href={url}
                                        aria-label={name === 'instagram' ? 'Instagram' : 'LinkedIn'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {name === 'instagram' ? <InstagramIcon /> : <LinkedInIcon />}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Menu