import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Logout } from '../Redux/User/action'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const location = window.location.pathname
  const name = localStorage.getItem('username')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    try {
      dispatch(Logout())
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <React.Fragment>
      <div data-theme="black" className={`${location === '/' && 'hidden'} border-b border-[#ea00d9]  flex items-center justify-between py-3 px-10`}>
        <h3 className="font-bold text-[#feff6e] text-[28px]">WEB ADMIN</h3>
        <div className="flex items-center">
          <progress className="progress progress-warning  w-64 "></progress>
          <div className="flex items-center  mr-10 ml-20 ">
            <FaUserCircle size={'20px'} color="#fff" />
            <div className="dropdown ">
              <div tabIndex={0} role="button" className="btn m-1 outline-none border-0 bg-transparent text-[#feff6e]">
                {name}
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={onLogout}>
                  <p>Log Out</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar
