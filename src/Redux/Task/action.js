import axios from 'axios'

export const setLoading = (loading) => {
  return {
    type: 'SET_LOADING',
    payload: loading,
  }
}

export const allEntity = (allEntity) => {
  return {
    type: 'ALL_ENTITY',
    payload: allEntity,
  }
}

export const setEntity = (entity) => {
  return {
    type: 'SET_ENTITY',
    payload: entity,
  }
}

const apiurl = process.env.REACT_APP_API_URL

export const getAllTask = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('Token is not available.')
        dispatch(setLoading(false))
        return
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.get(`${apiurl}/task`, config)
      const dataUser = res.data.data
      dispatch(allEntity(dataUser))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      console.error('Error fetching data:', error)
    }
  }
}

export const postTask = (name_task, status) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('Token is not available.')
        dispatch(setLoading(false))
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(`${apiurl}/task/create`, { name_task, status }, config)
      const postEntity = response.data
      dispatch(setEntity(postEntity))
      dispatch(setLoading(false))
    } catch (error) {
      throw new Error(error.response)
    }
  }
}

export const updateTask = (id, newname_task, newstatus) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token is not available.')
      dispatch(setLoading(false))
      return
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await axios.put(
        `${apiurl}/task/update`,
        {
          id,
          name_task: newname_task,
          status: newstatus,
        },
        config
      )
      const putDevices = response.data
      dispatch(setEntity(putDevices))
      dispatch(setLoading(false))
    } catch (error) {
      throw new Error(error.response)
    }
  }
}

export const deleteTask = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token is not available.')
      dispatch(setLoading(false))
      return
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await axios.delete(`${apiurl}/task/delete/${id}`, config)
      const delData = response.data
      dispatch(setEntity(delData))
      dispatch(setLoading(false))
    } catch (error) {
      throw new Error(error.response)
    }
  }
}
