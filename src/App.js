import React from 'react'
import AddUrlForm from './components/Layout/AddUrlForm'
import { ModalProvider } from './components/Bookmrk_context/ModalContext'
const App = () => {
  return (
    <ModalProvider>
      <AddUrlForm />
    </ModalProvider>
  )
}

export default App
