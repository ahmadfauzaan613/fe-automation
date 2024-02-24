import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

function LayoutAdmin(props) {
  return (
    <React.Fragment>
      <Navbar />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 ">
          <div data-theme="business" className="py-7 px-12 h-screen">
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LayoutAdmin
