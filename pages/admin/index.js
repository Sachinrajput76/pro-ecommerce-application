import React, { useState } from 'react'
import FormComponent from './FromComponent'
import { sideMenu } from './sideMenu'


const index = () => {
    const [toggle, setToggle] = useState(true)

    // const menuItems = ['DASHBOARD', 'Products', 'USERS', 'STOCK', 'SALE', 'USER PROFILE', 'TABLE LIST', 'TYPOGRAPHY', 'RTL SUPPORT', 'UPGRADE TO PRO']
    const menuComp = sideMenu.map((st, i) => {
        return (
            <a href={st.path}><li className='flex items-center p-4 justify-left text-white rounded-md text-sm' key={i}>{st.name}</li></a>)
    })
    return (
        <>
            <div className='admin w-screen flex'>
                {toggle ? <div className={`admin__sidebar h-screen bg-stone-900 p-4 bg-[#1e1e2e] transition ease-in-out ${toggle ? "w-48" : "w-0"}`}>
                    {/* side bar */}
                    <div className='flex flex-col gap-5 items-center h-full'>
                        <div className='p-4 h-20 text-sm flex items-center text-white'>Admin Dashboard</div>
                        <div className='overflow-y-auto'>{menuComp}</div>
                    </div>
                </div> : ""}
                <div className='grow h-screen overflow-y-auto'>
                    {/* main content */}
                    <div className="admin__header flex items-center h-24 text-white bg-[#1e1e2e]">
                        {/* header */}
                        <div>
                            <button onClick={() => setToggle(!toggle)}><i className="fas fa-bars text-xl p-4"></i></button>
                        </div>
                        <div class="pt-2 relative mx-auto text-gray-600">
                            <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                type="search" name="search" placeholder="Search" />
                            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div className="admin__body__main bg-[#f3f3f3]">
                        {/* body */}
                        <div className='admin__body__main--content'>
                            <div class="flex justify-center text-black text-center text-lg p-4">
                                Add Product
                            </div>
                            <FormComponent />
                        </div>
                    </div>
                    <div className='admin__footer bg-[#1e1e2e] h-24 text-center'>
                        {/* footer */}
                        footer
                    </div>
                </div>
            </div>

        </>
    )
}

export default index
