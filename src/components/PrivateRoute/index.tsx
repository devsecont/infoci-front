import {Navigate, Outlet} from 'react-router';

export const PrivateRoute = (props:any) => {
  const isLogged = !!localStorage.getItem('app-token');

  return isLogged ? <Outlet/> : <Navigate to="/" />
} 