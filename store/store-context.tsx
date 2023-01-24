import React, { createContext, useReducer } from "react";

export type coffeeStore = {
  id: string;
  name: string;
  imgUrl: string;
  voting: string;
  address: string;
  neighborhood: string;
};

type StateType = {
  latLong: string;
  coffeeStores: coffeeStore[];
};

const INITIAL_STATE = {
  latLong: "",
  coffeeStores: [],
} as StateType;

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

type ActionType =
  | { type: "SET_LAT_LONG"; payload: string }
  | { type: "SET_COFFEE_STORES"; payload: coffeeStore[] };

export type StoreContextType = {
  latLong: string;
  coffeeStores: coffeeStore[];
  setCoffeeStores: (coffeeStores: coffeeStore[]) => void;
  setLatLong: (latLong: string) => void;
};

//REDUCER

const StoreReducer = (state: StateType, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: payload };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: payload };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

type StoreProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const StoreContext = createContext<StoreContextType | null>(null);

/// PROVIDER
const StoreProvider = ({ children }: StoreProviderProps) => {
  const [{ coffeeStores, latLong }, dispatch] = useReducer(
    StoreReducer,
    INITIAL_STATE
  );

  // ACTIONS
  const setLatLong = (latLong: string) => {
    dispatch({ type: "SET_LAT_LONG", payload: latLong });
  };

  const setCoffeeStores = (coffeeStores: coffeeStore[]) => {
    dispatch({
      type: "SET_COFFEE_STORES",
      payload: coffeeStores,
    });
  };

  const value = { latLong, setLatLong, coffeeStores, setCoffeeStores } as any;

  return (
    <StoreContext.Provider value={value}> {children} </StoreContext.Provider>
  );
};
export default StoreProvider;
