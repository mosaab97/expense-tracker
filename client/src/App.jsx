import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './context/authContext/AuthContext'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            className: "rounded-lg shadow-md",
            success: { style: { background: "#4ade80", color: "white" } },
            error: { style: { background: "#f87171", color: "white" } },
          }}
        />
      </AuthProvider>
    </>
  )
}

export default App
