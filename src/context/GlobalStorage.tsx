import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface UserAuthProps {
  id?:number,
  name?: string,
  token?: string,
}

interface FormInfoProps {
  id?:number,
  codigoUnidadeGestoraSigefes?: string,
  codigoUnidadeGestoraCidades?: string,
  nomeUnidadeGestora?: string,
}

interface ResultContext {
  valueTab: number,
  setValueTab: (value: number) => void,
  userAuth: UserAuthProps,
  setUserAuth: Dispatch<SetStateAction<UserAuthProps>>,
  formInfo: FormInfoProps,
  setFormInfo: Dispatch<SetStateAction<FormInfoProps>>,
  path: string,
  setPath: (value:string) => void,
  
}

interface ContextPropsType {
  children:ReactNode
}

export const GlobalContext = createContext({} as ResultContext);

export const GlobalStorage = (props:ContextPropsType) => {
  const [valueTab, setValueTab] = useState(0)
  const [userAuth, setUserAuth] = useState<UserAuthProps>({});
  const [formInfo, setFormInfo] = useState<UserAuthProps>({});
  const [path, setPath] = useState('');
  
  

  return (
    <GlobalContext.Provider value={{valueTab,setValueTab,userAuth, setUserAuth, formInfo, setFormInfo, path, setPath}}>
      {props.children}
    </GlobalContext.Provider>
  );
}