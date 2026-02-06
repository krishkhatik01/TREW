import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice'; 

// 1. Rename function to start with 'use' (React Hook standard)
const useCurrentUser = (serverUrl) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (!serverUrl) return;

      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        
        dispatch(setUserData(result.data.user || result.data));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [dispatch, serverUrl]); 
};

// 2. Export it with the new name
export default useCurrentUser;