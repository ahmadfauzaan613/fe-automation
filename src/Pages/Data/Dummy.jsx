import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Table from '../../Components/Table'
import { FaRegWindowClose } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function NumberAnimation({ value }) {
  const [displayValue, setDisplayValue] = useState(0)
  useEffect(() => {
    let start = 0
    const end = parseInt(value)
    const duration = 2000 // Durasi animasi dalam milidetik
    const range = end - start
    let current = start
    const increment = end > start ? 1 : -1
    const stepTime = Math.abs(Math.floor(duration / range))

    const timer = setInterval(() => {
      current += increment
      setDisplayValue(current)
      if (current === end) {
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [value])

  return <p className="number-animation text-[32px] text-[#22c55e]">{displayValue}</p>
}

function CardTask(props) {
  return (
    <div className="w-full h-full flex items-center justify-between border p-2 border-[#ea00d9]">
      <p className="text-[20px]">{props.task}</p>
      <NumberAnimation value={props.value} />
    </div>
  )
}

function Dummy() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
    ],
    []
  )
  const data = React.useMemo(
    () => [
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'Bob Johnson', age: 40, city: 'Chicago' },
      { name: 'Last', age: 40, city: 'Chicago' },
    ],
    []
  )
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <TypeAnimation sequence={['Data Dummy', 1000, 'Typing...', 1000, 'Data Dummy', 1000, 'Typing...', 1000, 'Data Dummy', 1000]} speed={50} style={{ fontSize: '48px', display: 'inline-block', color: '#feff6e' }} repeat={Infinity} />
        <button onClick={() => navigate('/dashboard/bot')} className="outline-none cursor-pointer">
          <FaRegWindowClose size={'38px'} color="#fff" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 mt-10">
        <CardTask task={'Total Data'} value={10} />
      </div>
      <div className="mt-14">
        <Table columns={columns} data={data} />
      </div>
    </React.Fragment>
  )
}

export default Dummy
