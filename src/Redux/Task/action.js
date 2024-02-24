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
