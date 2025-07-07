import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",  // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {}
})

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress('cart')
  }

  function hideCart() {
    setUserProgress('')
  }

  function showCheckout() {
    setUserProgress('checkout')
  }

  function hideCheckout() {
    console.log('--hide Checkout 11-->');
    setUserProgress('')
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  }

  console.log('--userProgressCtx-->', userProgressCtx);


  return (
    <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
  )
}

export default UserProgressContext;
