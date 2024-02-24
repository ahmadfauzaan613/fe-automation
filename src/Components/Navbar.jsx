import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
function Navbar() {
  const location = window.location.pathname
  return (
    <React.Fragment>
      <div className={`${location === '/' && 'hidden'} bg-[#14213d] flex items-center justify-between py-3 px-10`}>
        <h3 className="font-bold text-[#FCA311] text-[28px]">LOGO</h3>
        <div className="flex items-center gap-3">
          <p className="text-[18px] text-[#FFFFFF] font-bold">Ahmad</p>
          <FaUserCircle size={'18px'} color="#fff" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar
