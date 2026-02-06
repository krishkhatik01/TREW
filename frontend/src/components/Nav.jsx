import React from 'react';
import { MdHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { GoVideo } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import dp from '../assets/dp1.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  return (
    <div className='fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] lg:w-[400px] h-[65px] bg-[#0a0a0a] border border-gray-800 flex justify-around items-center rounded-full shadow-2xl z-[100] backdrop-blur-md bg-opacity-90'>
      
      {/* Home Icon */}
      <div 
        onClick={() => navigate('/')} 
        className='cursor-pointer hover:scale-110 transition-transform'
      >
        <MdHome className='text-white w-6 h-6'/>
      </div>

      {/* Search Icon */}
      <div 
        onClick={() => navigate('/search')} 
        className='cursor-pointer hover:scale-110 transition-transform'
      >
        <IoSearch className='text-white w-6 h-6'/>
      </div>

      {/* Add Post Icon */}
      <div 
        onClick={() => navigate('/create')}
        className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors'
      >
        <FaPlus className='text-black w-4 h-4'/>
      </div>

      {/* Video/Reels Icon */}
      <div 
        onClick={() => navigate('/reels')}
        className='cursor-pointer hover:scale-110 transition-transform'
      >
        <GoVideo className='text-white w-6 h-6'/>
      </div>

      {/* Profile Picture */}
      <div 
        className='w-[35px] h-[35px] border border-gray-600 rounded-full cursor-pointer overflow-hidden shrink-0 hover:border-white transition-colors' 
        onClick={() => navigate(`/profile/${userData?.userName}`)}
      >
        <img 
          src={userData?.profileImage || dp} 
          alt="Profile" 
          className='w-full h-full object-cover' 
        />
      </div>
      
    </div>
  );
}

export default Nav;