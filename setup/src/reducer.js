
const reducer = (state, action) => {
  if(action.type === 'CLEAR_CART'){
    return {...state, cart:[]}
  }
  if(action.type === 'REMOVE'){
    return {...state, cart: state.cart.filter((carItem) => carItem.id !== action.payload)}
  }
  if (action.type === 'TOTAL') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount
        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))
    return { ...state, total, amount }
  }
  if(action.type === 'LOADING') {
    return{...state, loading:true}
  }
  if(action.type === 'DISPLAY_ITEMS') {
    return{...state, cart:action.payload, loading:false}
  }
  if(action.type === 'TOGGLE_AMOUNT'){
    let tempCart = state.cart.map((cartItem)=>{
      if(cartItem.id === action.payload.id){
        if(action.payload.type === 'increase'){
          return {...cartItem, amount: cartItem.amount + 1}
        }
        if(action.payload.type === 'decrease'){
          return {...cartItem, amount: cartItem.amount - 1}
        }
      }
      return cartItem
    }).filter((cartItem) => cartItem.amount !== 0)
    return {...state, cart: tempCart}
  }
  throw new Error ('no maching type')
}

export default reducer;