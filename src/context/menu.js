'use client'

import { createContext, useContext, useState } from 'react'

const MenuContext = createContext()

export function useMenu() {
  return useContext(MenuContext)
}

export function MenuProvider({ children }) {
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [visibleSolution, setVisibleSolution] = useState(false)

  return (
    <MenuContext.Provider value={{ setVisibleMenu, visibleMenu, visibleSolution, setVisibleSolution }}>
      {children}
    </MenuContext.Provider>
  )
}