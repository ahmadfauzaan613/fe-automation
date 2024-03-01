import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Table from '../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser, postUser, updateUser, deleteUser } from '../Redux/User/action'
import { FaEdit, FaEye, FaEyeSlash, FaPlus, FaTrash } from 'react-icons/fa'
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'

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

function User() {
  const [dataUpdate, setUpdateData] = useState(null)
  const [dataDlete, setDlete] = useState(null)
  const { register, handleSubmit, setValue, reset } = useForm()

  const role = localStorage.getItem('role')

  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>
        },
      },
      {
        Header: 'First Name',
        accessor: (data) => data.first_name,
      },
      {
        Header: 'Last Name',
        accessor: (data) => data.last_name,
      },
      {
        Header: 'Username',
        accessor: (data) => data.username,
      },
      {
        Header: 'Role',
        accessor: (data) => data.role,
      },
      {
        Header: 'Action',
        accessor: (data) => {
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (role === 'superadmin') {
                    buttonUpdateModal()
                    setUpdateData(data)
                  }
                }}
                className="btn btn-sm btn-ghost btn-secondary"
              >
                <FaEdit size={'20px'} color="#05bcffd3" />
              </button>
              <button
                onClick={() => {
                  if (role === 'superadmin') {
                    buttonDeleteModal()
                    setDlete(data)
                  }
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

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUser())
        setLoading(false)
      } catch (error) {
        console.error('Error fetching tasks:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch])
  const { allEntity } = useSelector((state) => state.user)

  const [modalAddData, setmodalAddData] = useState(false)
  const buttonModal = () => {
    setmodalAddData(!modalAddData)
  }
  const [modalUpdateData, setmodalUpdateData] = useState(false)
  const buttonUpdateModal = () => {
    setmodalUpdateData(!modalUpdateData)
  }

  const [modalDeleteData, setmodalDeleteData] = useState(false)
  const buttonDeleteModal = () => {
    setmodalDeleteData(!modalDeleteData)
  }

  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }
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

  const [fUsername, setFusername] = useState('')
  const [fFirstName, setFirstName] = useState('')
  const [fLastName, setFlastName] = useState('')
  const [fPassword, setFpassword] = useState('')

  const handleUsername = (e) => {
    setFusername(e.target.value)
  }
  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastName = (e) => {
    setFlastName(e.target.value)
  }
  const handlePassword = (e) => {
    setFpassword(e.target.value)
  }

  const onSubmit = async ({ username, first_name, last_name, role, password }) => {
    try {
      await dispatch(postUser(fUsername, fFirstName, fLastName, 'admin', fPassword))
      toast.success('Berhasil Menambahkan User ')
      setmodalAddData(!modalAddData)
      dispatch(getAllUser())
      setFusername('')
      setFirstName('')
      setFlastName('')
      setFpassword('')
    } catch (error) {
      toast.error('Gagal Menambahkan User')
      throw new Error(error)
    }
  }

  const onUpdate = async ({ newusername, newfirst_name, newlast_name }) => {
    try {
      await dispatch(updateUser(dataUpdate.id, newusername, newfirst_name, newlast_name))
      toast.success('Berhasil Update User')
      dispatch(getAllUser())
      setmodalUpdateData(!modalUpdateData)
      reset()
    } catch (error) {
      toast.error('Gagal Update User')
      throw new Error(error)
    }
  }

  useEffect(() => {
    setValue('newusername', dataUpdate && dataUpdate.username)
    setValue('newfirst_name', dataUpdate && dataUpdate.first_name)
    setValue('newlast_name', dataUpdate && dataUpdate.last_name)
  }, [dataUpdate, setValue])

  const dataDelete = async () => {
    try {
      await dispatch(deleteUser(dataDlete && dataDlete.id))
      toast.success('Berhasil Delete User')
      dispatch(getAllUser())
      setmodalDeleteData(!modalDeleteData)
    } catch (error) {
      toast.error('Gagal Delete User')
      throw new Error(error)
    }
  }

  return (
    <div>
      <React.Fragment>
        <TypeAnimation sequence={['Data User', 1000, 'Typing...', 1000, 'Data User', 1000, 'Typing...', 1000, 'Data User', 1000]} speed={50} style={{ fontSize: '48px', display: 'inline-block', color: '#feff6e' }} repeat={Infinity} />
        <div className="flex items-center justify-between gap-3 mt-10">
          <CardTask task={'Total User'} value={allEntity.length} />
        </div>
        {loading ? (
          <div className="mt-14 flex justify-center">
            <span className="loading loading-spinner loading-lg text-[#ea00d9]" />
          </div>
        ) : (
          <div className="mt-14">
            {role === 'superadmin' && (
              <button onClick={buttonModal} className={`${allEntity && allEntity.length > 0 ? '' : 'hidden'} btn float-right mb-4  text-[18px] w-[7vw] h-[50px]   btn-sm btn-outline btn-secondary`}>
                <FaPlus size={'16px'} color="#22c55e" /> Data
              </button>
            )}
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
            <h3 className="text-[20px] uppercase text-[#feff6e] font-bold">Add Data</h3>
            <span onClick={buttonModal} className="material-symbols-outlined text-[#ea00d9] cursor-pointer">
              close
            </span>
          </div>
          <div className="mt-5 space-y-5">
            <input data-theme="black" type="text" value={fUsername} onChange={handleUsername} name="username" id="username" autoComplete="off" placeholder="Username" className="border border-green-500 w-full outline-none p-3" />
            <input data-theme="black" type="text" value={fFirstName} onChange={handleFirstName} name="first_name" id="first_name" autoComplete="off" placeholder="First Name" className="border border-green-500 w-full outline-none p-3" />
            <input data-theme="black" type="text" value={fLastName} onChange={handleLastName} name="last_name" id="last_name" autoComplete="off" placeholder="Last Name" className="border border-green-500 w-full outline-none p-3" />
            <div className="flex items-center   border border-green-500 px-2 py-3">
              <input data-theme="black" value={fPassword} onChange={handlePassword} autoComplete="off" type={!show ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="w-full  h-fit   outline-none" />
              <button
                onClick={() => {
                  toggleShow()
                }}
              >
                {show ? <FaEyeSlash size={'22px'} color="#ff0000" /> : <FaEye size={'22px'} color="#ff0000" />}
              </button>
            </div>
            <button onClick={onSubmit} className="btn  mb-4  text-[20px] w-full h-[50px]   btn-sm btn-outline btn-secondary">
              Save
            </button>
          </div>
        </Modal>
        <Modal isOpen={modalUpdateData} onRequestClose={buttonUpdateModal} style={customStyles2} contentLabel="Add Modal">
          <div className="border-b border-[#ea00d9] flex bg items-center justify-between pb-4">
            <h3 className="text-[20px] uppercase text-[#feff6e] font-bold">Add Data</h3>
            <span onClick={buttonUpdateModal} className="material-symbols-outlined text-[#ea00d9] cursor-pointer">
              close
            </span>
          </div>
          <form action="" className="mt-5 space-y-5" onSubmit={handleSubmit(onUpdate)}>
            <input
              data-theme="black"
              type="text"
              defaultValue={dataUpdate && dataUpdate.username}
              {...register('newusername')}
              onChange={(e) => setValue('newusername', e.target.value)}
              name="username"
              id="username"
              autoComplete="off"
              placeholder="Username"
              className="border border-green-500 w-full outline-none p-3"
            />
            <input
              data-theme="black"
              type="text"
              defaultValue={dataUpdate && dataUpdate.first_name}
              {...register('newfirst_name')}
              onChange={(e) => setValue('newfirst_name', e.target.value)}
              name="first_name"
              id="first_name"
              autoComplete="off"
              placeholder="First Name"
              className="border border-green-500 w-full outline-none p-3"
            />
            <input
              data-theme="black"
              type="text"
              defaultValue={dataUpdate && dataUpdate.last_name}
              {...register('newlast_name')}
              onChange={(e) => setValue('newlast_name', e.target.value)}
              name="last_name"
              id="last_name"
              autoComplete="off"
              placeholder="Last Name"
              className="border border-green-500 w-full outline-none p-3"
            />
            {/* <div className="flex items-center   border border-green-500 px-2 py-3">
              <input data-theme="black" autoComplete="off" {...register('newpassword')} onChange={(e) => setValue('newpassword', e.target.value)} type={!show ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="w-full  h-fit   outline-none" />
              <button
                onClick={() => {
                  toggleShow()
                }}
              >
                {show ? <FaEyeSlash size={'22px'} color="#ff0000" /> : <FaEye size={'22px'} color="#ff0000" />}
              </button>
            </div> */}
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
    </div>
  )
}

export default User
