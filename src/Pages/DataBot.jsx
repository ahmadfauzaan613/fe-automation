import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import iconData from '../Assets/happy.png'
import { useNavigate } from 'react-router-dom'
function CardBot(props) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(props.navigate)} className="w-full  border p-2 border-[#ea00d9] hover:bg-[#ea00d9] hover:cursor-pointer hover:border-0">
      <div className="flex justify-center">
        <img src={props.image} alt="" className="w-[5vw] py-4" />
      </div>
      <p className="text-[20px] text-center font-bold">{props.title}</p>
    </div>
  )
}

function DataBot() {
  return (
    <React.Fragment>
      <TypeAnimation sequence={['Data Bot', 1000, 'Typing...', 1000, 'Data Bot', 1000, 'Typing...', 1000, 'Data Bot', 1000]} speed={50} style={{ fontSize: '48px', display: 'inline-block', color: '#feff6e' }} repeat={Infinity} />
      <div className="grid grid-cols-4 mt-8 gap-8">
        <CardBot image={iconData} title={'Data Dummy'} navigate={'/dashboard/bot/data-bot'} />
      </div>
    </React.Fragment>
  )
}

export default DataBot
