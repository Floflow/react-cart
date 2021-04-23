import React from 'react'
import { useGlobalContext } from './context'

// components
import Navbar from './Navbar'
import CartContainer from './CartContainer'
// items

function App() {
  const { loading } = useGlobalContext();
   if (loading) {
     return (
       <div className='loading'>
         <h1 data-testid='loading' >Loading...</h1>
       </div>
     )
   }
  return (
    <main data-testid="fetch-data">
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
