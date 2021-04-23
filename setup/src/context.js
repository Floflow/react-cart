import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
import axios from 'axios'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart:cartItems,
  total:0,
  amount:0
}

const AppProvider = ({ children }) => {
  const [state, dispach] = useReducer(reducer, initialState)

  const clearCart = () => {
    dispach({ type:'CLEAR_CART' })
  }
  const remove = (id) => {
    dispach({ type: 'REMOVE', payload:id })
  }
  const increase = (id) => {
    dispach({ type:'INCREASE', payload:id })
  }
  const decrease = (id) => {
    dispach({ type:'DECREASE', payload:id })
  }

 const fetchData = async () => {
    dispach({type: 'LOADING'});
    try{
      const response = await fetch(url);
      const data = await response.json();
      dispach({type: 'DISPLAY_ITEMS', payload: data})
    } catch(error){
      console.log('did not work my friend')
    }
  }

  const toggleAmount = (id, type) => {
    dispach({type:'TOGGLE_AMOUNT', payload: { id, type } })
  }

  useEffect(()=>{
    fetchData()
  }, [])

  useEffect(()=>{
    dispach({ type:'TOTAL' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
