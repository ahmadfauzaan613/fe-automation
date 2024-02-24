import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux'
// ADMIN
import AdminPage from './Pages/Admin'
import LayoutAdmin from './Components/LayoutAdmin'
import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route
            path="/dashboard"
            element={
              <LayoutAdmin>
                <Dashboard />
              </LayoutAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
