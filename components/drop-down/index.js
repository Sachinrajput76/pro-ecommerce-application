import React, { useState, useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside';
import Link from 'next/link';
const index = ({ name, options, style }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => {
        setMenuOpen(false);
    }

    const dropDownRef = useRef(null);
    // on click outside
    useOnClickOutside(dropDownRef, closeMenu);

    const dropDownOptions = options.map((st, i) => {
        return <a href={st.path} key={i} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{st.name}</a>
    })

    return (
        <div className="relative inline-block text-left" ref={dropDownRef} onClick={() => setMenuOpen(!menuOpen)}>
            <button type="button" className={`inline-flex justify-center w-full rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${style ? style : ""}`} id="menu-button" aria-expanded="true" aria-haspopup="true">
                {name}
                <i className="icon-drop-down ml-1" />
            </button>
            <div className={`z-[999999] ${menuOpen ? 'Drop-down--open' : 'Drop-down--close'} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" `}>
                <div className="py-1" role="none">
                    {dropDownOptions}
                </div>
            </div>
        </div>
    )
}

export default index
