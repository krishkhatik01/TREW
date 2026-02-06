import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuggestedUsers } from '../redux/userSlice'; // Make sure you have this action

const SuggestedUser = (serverUrl) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        // Changed endpoint to fetch a list of suggestions instead of current user
        const result = await axios.get(`${serverUrl}/api/user/suggested`, {
          withCredentials: true,
        });
        
        // Dispatching the array of users to your Redux store
        dispatch(setSuggestedUsers(result.data.users || result.data));
      } catch (error) {
        console.error("Failed to fetch suggested users:", error);
      }
    };

    if (serverUrl) {
      fetchSuggestedUsers();
    }
  }, [dispatch, serverUrl]); 
};

export default SuggestedUser;