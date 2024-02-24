import React from 'react'
import { FaHome, FaRobot, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
function ListMenu(props) {
  const location = window.location.pathname
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(props.path)} className="flex items-center gap-3 cursor-pointer">
      {props.icon}
      <h5 className={`${props.path === location ? 'text-[#22c55e] font-bold' : 'text-white hover:font-bold hover:text-[#22c55e] font-light'} text-[18px]`}>{props.nameMenu}</h5>
    </div>
  )
}

function Sidebar() {
  const menuList = [
    { menu: 'Dashboard', icon: <FaHome size={'18px'} color="#fff" />, path: '/dashboard' },
    { menu: 'Data Bot', icon: <FaRobot size={'18px'} color="#fff" />, path: '/dashboard/bot' },
    { menu: 'User', icon: <FaUsers size={'18px'} color="#fff" />, path: '/dashboard/user' },
  ]
  return (
    <React.Fragment>
      <div data-theme="black" className="w-full pt-8 pb-7 space-y-7 px-10 h-screen border-r border-[#ea00d9]">
        {menuList.map((item, idx) => (
          <ListMenu key={idx} icon={item.icon} path={item.path} nameMenu={item.menu} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default Sidebar
