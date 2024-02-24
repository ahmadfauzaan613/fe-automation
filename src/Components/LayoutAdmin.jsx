import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

function LayoutAdmin(props) {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
  }, [navigate])

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
