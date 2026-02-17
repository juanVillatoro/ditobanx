import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register  from "./views/Auth/Register"
import Users from "./views/Auth/TableUsers"
import TransferForm from './views/transactions/CreateTransaction'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/transfer" element={<TransferForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
