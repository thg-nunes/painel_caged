import React from 'react'
import { useReducer } from 'react'
import { ContextGlobal } from './context'
import { estadoGlobal } from './data'
import * as reducer from '../reducers/filtros'

export const ContextProvider = ({children}) => {
  
  const [state, dispatch] = useReducer(reducer.reducerFilter, estadoGlobal)

  return <ContextGlobal.Provider  value={{state, dispatch}}>{children}</ContextGlobal.Provider>
}