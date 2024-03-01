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

export const setUser = (User) => {
  return {
    type: 'USER',
    payload: User,
  }
}

const apiurl = process.env.REACT_APP_API_URL

export const Login = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${apiurl}/login`, {
        username,
        password,
      })
      const loginUser = res.data
      const token = loginUser.Authorization
      const user = loginUser.username
      const role = loginUser.role
      localStorage.setItem('token', token)
      localStorage.setItem('username', user)
      localStorage.setItem('role', role)
      dispatch(setUser(loginUser))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      console.error('Login error:', error)
    }
  }
}

export const Logout = () => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')

    window.location.href = '/'
  } catch (error) {
    console.error('Logout error:', error)
  }
}

export const getAllUser = () => {
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
      const res = await axios.get(`${apiurl}/user`, config)
      const dataUser = res.data.data
      dispatch(allEntity(dataUser))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      console.error('Error fetching data:', error)
    }
  }
}

export const postUser = (username, first_name, last_name, role, password) => {
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

      const response = await axios.post(`${apiurl}/user/create`, { username, first_name, last_name, role, password }, config)
      const postEntity = response.data
      dispatch(setEntity(postEntity))
      dispatch(setLoading(false))
    } catch (error) {
      throw new Error(error.response)
    }
  }
}

export const updateUser = (id, newusername, newfirst_name, newlast_name) => {
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
        `${apiurl}/user/update`,
        {
          id,
          username: newusername,
          first_name: newfirst_name,
          last_name: newlast_name,
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

export const deleteUser = (id) => {
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
      const response = await axios.delete(`${apiurl}/user/delete/${id}`, config)
      const delData = response.data
      dispatch(setEntity(delData))
      dispatch(setLoading(false))
    } catch (error) {
      throw new Error(error.response)
    }
  }
}
