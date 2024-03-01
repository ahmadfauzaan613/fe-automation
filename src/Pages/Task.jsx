import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Table from '../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getAllTask, postTask, updateTask } from '../Redux/Task/action'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

function NumberAnimation({ value }) {
  const [displayValue, setDisplayValue] = useState(0)
  useEffect(() => {
    let start = 0
    const end = parseInt(value)
    const duration = 2000
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
function Task() {
  const [dataUpdate, setUpdateData] = useState(null)
  const [dataDlete, setDlete] = useState(null)
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
      {
        Header: 'Action',
        accessor: (data) => {
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  buttonUpdateModal()
                  setUpdateData(data)
                }}
                className="btn btn-sm btn-ghost btn-secondary"
              >
                <FaEdit size={'20px'} color="#05bcffd3" />
              </button>
              <button
                onClick={() => {
                  buttonDeleteModal()
                  setDlete(data)
                }}
                className="btn  btn-sm btn-ghost btn-secondary"
              >
                <FaTrash size={'20px'} color="red" />
              </button>
            </div>
          )
        },
      },
    ],
    []
  )

  const customStyles2 = {
    content: {
      backgroundColor: '#000',
      border: '1px solid #ea00d9',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height: 'auto',
      width: '50vw',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
    },
  }

  const [modalAddData, setmodalAddData] = useState(false)
  const buttonModal = () => {
    setmodalAddData(!modalAddData)
  }

  const [modalUpdateData, setmodalUpdateData] = useState(false)
  const buttonUpdateModal = () => {
    setmodalUpdateData(!modalUpdateData)
  }

  const dataLov = [{ name: 'PENDING' }, { name: 'ON GOING' }, { name: 'DONE' }]

  const { register, handleSubmit, setValue, reset } = useForm()
  const onSubmit = async ({ name_task, status }) => {
    try {
      await dispatch(postTask(name_task, status))
      toast.success('Berhasil Menambahkan Task ')
      dispatch(getAllTask())
      setmodalAddData(!modalAddData)
      reset()
    } catch (error) {
      toast.error('Gagal Menambahkan Task')
      throw new Error(error)
    }
  }
  const onUpdate = async ({ newname_task, newstatus }) => {
    try {
      await dispatch(updateTask(dataUpdate.id, newname_task, newstatus))
      toast.success('Berhasil Update Task')
      dispatch(getAllTask())
      setmodalUpdateData(!modalUpdateData)
      reset()
    } catch (error) {
      toast.error('Gagal Update Task')
      throw new Error(error)
    }
  }
  useEffect(() => {
    setValue('newname_task', dataUpdate && dataUpdate.name_task)
    setValue('newstatus', dataUpdate && dataUpdate.status)
  }, [dataUpdate, setValue])

  const [modalDeleteData, setmodalDeleteData] = useState(false)
  const buttonDeleteModal = () => {
    setmodalDeleteData(!modalDeleteData)
  }

  const dataDelete = async () => {
    try {
      await dispatch(deleteTask(dataDlete && dataDlete.id))
      toast.success('Berhasil Delete Task')
      dispatch(getAllTask())
      setmodalDeleteData(!modalDeleteData)
    } catch (error) {
      toast.error('Gagal Delete Task')
      throw new Error(error)
    }
  }

  return (
    <React.Fragment>
      <TypeAnimation sequence={['Data Task', 1000, 'Typing...', 1000, 'Data Task', 1000, 'Typing...', 1000, 'Data Task', 1000]} speed={50} style={{ fontSize: '48px', display: 'inline-block', color: '#feff6e' }} repeat={Infinity} />
      <div className="flex items-center justify-between gap-3 mt-10">
        <CardTask task={'Total Task'} value={allEntity.length} />
      </div>
      {loading ? (
        <div className="mt-14 flex justify-center">
          <span className="loading loading-spinner loading-lg text-[#ea00d9]" />
        </div>
      ) : (
        <div className="mt-14">
          <button onClick={buttonModal} className={`${allEntity && allEntity.length > 0 ? '' : 'hidden'} btn float-right mb-4  text-[18px] w-[7vw] h-[50px]   btn-sm btn-outline btn-secondary`}>
            <FaPlus size={'16px'} color="#22c55e" /> Data
          </button>
          {allEntity && allEntity.length > 0 ? (
            <Table columns={columns} data={allEntity} />
          ) : (
            <div className="absolute bottom-[40%] right-[37%]">
              <p className="text-[32px] pt-5 uppercase text-[#feff6e] font-bold text-center">EMPTY DATA</p>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={modalAddData} onRequestClose={buttonModal} style={customStyles2} contentLabel="Add Modal">
        <div className="border-b border-[#ea00d9] flex bg items-center justify-between pb-4">
          <h3 className="text-[20px] uppercase text-[#feff6e] font-bold">Add Task</h3>
          <span onClick={buttonModal} className="material-symbols-outlined text-[#ea00d9] cursor-pointer">
            close
          </span>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <input {...register('name_task')} onChange={(e) => setValue('name_task', e.target.value)} data-theme="black" type="text" name="name_task" id="name_task" autoComplete="off" placeholder="Name Task" className="border border-green-500 w-full outline-none p-3" />
          <select data-theme="black" {...register('status')} autoComplete="off" onChange={(e) => setValue('status', e.target.value)} name="status" id="status" className="border border-green-500 w-full outline-none p-3">
            <option value="" key="0">
              -- STATUS --
            </option>
            {dataLov.map((item, i) => (
              <option value={item.name} key={i}>
                {item.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn  mb-4  text-[20px] w-full h-[50px]   btn-sm btn-outline btn-secondary">
            Save
          </button>
        </form>
      </Modal>
      <Modal isOpen={modalUpdateData} onRequestClose={buttonUpdateModal} style={customStyles2} contentLabel="Add Modal">
        <div className="border-b border-[#ea00d9] flex bg items-center justify-between pb-4">
          <h3 className="text-[20px] uppercase text-[#feff6e] font-bold">Add Task</h3>
          <span onClick={buttonUpdateModal} className="material-symbols-outlined text-[#ea00d9] cursor-pointer">
            close
          </span>
        </div>
        <form action="" onSubmit={handleSubmit(onUpdate)} className="mt-5 space-y-5">
          <input
            defaultValue={dataUpdate && dataUpdate.name_task}
            {...register('newname_task')}
            onChange={(e) => setValue('newname_task', e.target.value)}
            data-theme="black"
            type="text"
            name="name_task"
            id="name_task"
            autoComplete="off"
            placeholder="Name Task"
            className="border border-green-500 w-full outline-none p-3"
          />
          <select defaultValue={dataUpdate && dataUpdate.status} data-theme="black" {...register('newstatus')} autoComplete="off" onChange={(e) => setValue('newstatus', e.target.value)} name="status" id="status" className="border border-green-500 w-full outline-none p-3">
            <option value="" key="0">
              -- STATUS --
            </option>
            {dataLov.map((item, i) => (
              <option value={item.name} key={i}>
                {item.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn  mb-4  text-[20px] w-full h-[50px]   btn-sm btn-outline btn-secondary">
            Save
          </button>
        </form>
      </Modal>
      <Modal isOpen={modalDeleteData} onRequestClose={buttonDeleteModal} style={customStyles2} contentLabel="Add Modal">
        <h3 className="text-[24px] uppercase text-[#feff6e] font-bold text-center">Delete Data</h3>
        <p className="text-[20px] pt-5 uppercase text-[#feff6e] font-bold text-center">Are you sure to delete this data?</p>
        <div className="flex items-center justify-center mt-4 gap-4">
          <button onClick={buttonDeleteModal} className="btn  mb-4  text-[20px] w-[30%] h-[50px]   btn-sm btn-outline btn-secondary">
            Cancel
          </button>
          <button
            onClick={() => {
              dataDelete()
            }}
            className="btn  mb-4  text-[20px] w-[30%] h-[50px]   btn-sm btn-outline btn-secondary"
          >
            Yes
          </button>
        </div>
      </Modal>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </React.Fragment>
  )
}

export default Task
