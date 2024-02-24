import axios from 'axios'

export const setLoading = (loading) => {
  return {
    type: 'SET_LOADING',
    payload: loading,
  }
}

const apiurl = process.env.REACT_APP_API_URL

// export const Login = (username, password) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.post(`${apiurl}/login`, {
//         username,
//         password,
//       })
//       const loginUser = res.data
//       const token = loginUser.Authorization
//       const user = loginUser.username
//       localStorage.setItem('token', token)
//       localStorage.setItem('username', user)
//       dispatch(setUser(loginUser))
//       dispatch(setLoading(false))
//     } catch (error) {
//       dispatch(setLoading(false))
//       console.error('Login error:', error)
//     }
//   }
// }

// export const Logout = () => {
//   try {
//     localStorage.removeItem('token')
//     localStorage.removeItem('username')

//     window.location.href = '/admin'
//   } catch (error) {
//     console.error('Logout error:', error)
//   }
// }
