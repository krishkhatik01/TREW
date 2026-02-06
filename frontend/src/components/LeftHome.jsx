import React from 'react';
import logo from '../assets/trew 1.png';
import { FaRegHeart } from "react-icons/fa";
import dp from '../assets/dp1.png';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import OtherUsers from './OtherUsers';

function LeftHome() {
  const { userData, suggestedUsers } = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/signout`, {}, { withCredentials: true }); 
      dispatch(setUserData(null)); 
      navigate('/signin');
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(setUserData(null));
      navigate('/signin');
    }
  };

  return (
    <div className='w-[25%] hidden lg:block min-h-[100vh] bg-black border-r-2 border-gray-900'>
      
      {/* 1. TOP: Header/Logo */}
      <div className='w-full h-[80px] flex items-center justify-between p-[20px]'>
        <img src={logo} alt="TREW" className='w-[70px] object-contain' />
        <div className='text-white'>
          <FaRegHeart size={18} />
        </div>
      </div>

      {/* 2. MIDDLE: Profile Section (The Admin) */}
      <div className='flex items-center justify-between px-[20px] py-4 w-full border-b border-gray-800'>
        <div className='flex items-center gap-[12px]'>
          <div className='w-[45px] h-[45px] border border-gray-700 rounded-full cursor-pointer overflow-hidden shrink-0'>
            <img 
              src={userData?.profileImage || dp} 
              alt="Profile" 
              className='w-full h-full object-cover' 
            />
          </div>
          <div className='flex flex-col justify-center'>
            <div className='text-white font-bold text-sm leading-none mb-1'>
              {userData?.name || "Admin"} 
            </div>
            <div className='text-gray-500 text-[12px] leading-none'>
              @{userData?.userName || "admin"}
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className='text-blue-500 text-[11px] font-bold hover:text-blue-400 uppercase tracking-tighter whitespace-nowrap'
        >
          Log Out
        </button>
      </div>

      {/* 3. BOTTOM: Suggested Users */}
      <div className='w-full flex flex-col gap-[20px] p-[20px]'>
        <h1 className='text-white text-[15px] font-semibold opacity-80'>Suggested Users</h1>
        <div className='flex flex-col gap-3'>
          {suggestedUsers && suggestedUsers.slice(0, 5).map((user) => (
            <OtherUsers key={user._id} user={user} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default LeftHome;