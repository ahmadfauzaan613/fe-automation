import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Table from '../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTask } from '../Redux/Task/action'

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
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllTask())
        setLoading(false)
      } catch (error) {
        console.error('Error fetching tasks:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch])
  const { allEntity } = useSelector((state) => state.task)
  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>
        },
      },
      {
        Header: 'Name Task',
        accessor: (data) => data.name_task,
      },
      {
        Header: 'Status',
        accessor: (data) => data.status,
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <TypeAnimation sequence={['Dashboard', 1000, 'Typing...', 1000, 'Dashboard', 1000, 'Typing...', 1000, 'Dashboard', 1000]} speed={50} style={{ fontSize: '48px', display: 'inline-block', color: '#feff6e' }} repeat={Infinity} />
      <div className="flex items-center justify-between gap-3 mt-10">
        <CardTask task={'Total Task'} value={allEntity.length} />
      </div>
      {loading ? (
        <div className="mt-14 flex justify-center">
          <span className="loading loading-spinner loading-lg text-[#ea00d9]" />
        </div>
      ) : (
        <div className="mt-14">
          {allEntity && allEntity.length > 0 ? (
            <Table columns={columns} data={allEntity} />
          ) : (
            <div className="absolute bottom-[40%] right-[37%]">
              <p className="text-[32px] pt-5 uppercase text-[#feff6e] font-bold text-center">EMPTY DATA</p>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default Dashboard
