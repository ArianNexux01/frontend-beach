// eslint-disable max-classes-per-file
/* eslint no-use-before-define: 0 */ //
/*
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AppContextType {
  userData: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
AppContext.Provider;
interface AuthContextProps {
  children: ReactNode;
}
/*
export const AuthContext = ({ children }: AuthContextProps) => {
/*  const [userData, setUserData] = useState<UserData | null>(() =>
    JSON.parse(localStorage.getItem('userData') ?? 'null'),
  );
};
*/
