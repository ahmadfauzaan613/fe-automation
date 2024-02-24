import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Table from '../Components/Table'

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

function Dashboard() {
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
  return (
    <React.Fragment>
      <TypeAnimation sequence={['Dashboard', 1000, 'Typing...', 1000, 'Dashboard', 1000, 'Typing...', 1000, 'Dashboard', 1000]} speed={50} style={{ fontSize: '48px', display: 'inline-block', color: '#feff6e' }} repeat={Infinity} />
      <div className="flex items-center justify-between gap-3 mt-10">
        <CardTask task={'Total Task'} value={10} />
        <CardTask task={'Pending Task'} value={10} />
        <CardTask task={'On Going Task'} value={10} />
        <CardTask task={'Done Task'} value={10} />
      </div>
      <div className="mt-14">
        <Table columns={columns} data={data} />
      </div>
    </React.Fragment>
  )
}

export default Dashboard
