import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SignIn } from "../pages/SignIn";
import { FormUser } from "../pages/FormUser";
import {PrivateRoute} from '../components/PrivateRoute'
import { SelectUG } from '../pages/SelectUG';


export const RoutesForm = () => {

  return (
    
    <>
      <BrowserRouter >
        <Routes >
          <Route path="/" element={<SignIn />} />
         
          <Route path="/select_ug" element={<PrivateRoute />} >
            <Route path="/select_ug" element={<SelectUG />}/>
          </Route>
         
          <Route path="/form" element={<PrivateRoute />} >
            <Route path="/form" element={<FormUser />} />
          </Route>

          <Route  path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
    
  );
}