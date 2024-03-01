import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux'
// ADMIN
import AdminPage from './Pages/Admin'
import LayoutAdmin from './Components/LayoutAdmin'
import Dashboard from './Pages/Dashboard'
import DataBot from './Pages/DataBot'
import BotData from './Pages/Data/Dummy'
import UserPage from './Pages/User'
import Task from './Pages/Task'

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
          <Route
            path="/dashboard/bot"
            element={
              <LayoutAdmin>
                <DataBot />
              </LayoutAdmin>
            }
          />
          <Route
            path="/dashboard/bot/data-bot"
            element={
              <LayoutAdmin>
                <BotData />
              </LayoutAdmin>
            }
          />
          <Route
            path="/dashboard/user"
            element={
              <LayoutAdmin>
                <UserPage />
              </LayoutAdmin>
            }
          />
          <Route
            path="/dashboard/task"
            element={
              <LayoutAdmin>
                <Task />
              </LayoutAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
