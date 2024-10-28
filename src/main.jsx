import React from 'react'
import ReactDOM from 'react-dom/client'
import './init'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/router'
import UserProvider from './context/user-context'
import AppProvider from './context/app-context'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AppProvider>
  </React.StrictMode>,
)
