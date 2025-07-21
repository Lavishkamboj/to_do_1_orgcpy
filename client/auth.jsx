import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not checked yet
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost:8000/auth', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.status === 200) {
       toast.success("😊😊😊😊");
        setUser(true);
      } else {
       	toast.info("First login to access Tasks")
        setUser(false);
      }
    } catch (err) {
      toast.info("First loggin to access Tasks")
      console.error(err);
      
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <>
     <ToastContainer />
    <AuthContext.Provider value={{ user, setUser, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
      
   
    </>
    
  );
};
