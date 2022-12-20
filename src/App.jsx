import './App.css';
import { Button } from '@mui/material';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login'
import { Provider } from 'react-redux';
import {store} from './store';
import CheckOut from './pages/CheckOut';
import AuthProvider from './firebase/auth';
import { useAuth } from './firebase/auth';
import Register from './pages/Register';

function ProtectedRoute({children}){
  const {user}=useAuth();
  if(!user){
    return <Navigate to ={"/login"}/>
  }
  return children;
}

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="/cart" index element={<Cart/>} />
      <Route 
      path="/CheckOut" 
      index 
      element={
        <ProtectedRoute>
          <CheckOut/>
        </ProtectedRoute>
      }/>
    </Route>
      <Route path="/login" index element={<Login/>} />
      <Route path="/register" index element={<Register/>} />
    
      
    </>
  )
);
function App() {

  return (
    <AuthProvider>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </AuthProvider>
  );
}

export default App;
