import React from 'react';
import { useSelector } from 'react-redux';
import dp from '../assets/dp1.png';
import { useNavigate } from 'react-router-dom'; // Fixed: Added missing import

function OtherUser({ user }) {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const isMe = userData?._id === user?._id;

  return (
    <div className='w-full flex items-center justify-between p-2 hover:bg-gray-900 rounded-lg transition-all cursor-pointer group'>
      <div className='flex items-center gap-[12px]'>
        {/* Profile Image with Navigation */}
        <div 
          className='w-[40px] h-[40px] border border-gray-700 rounded-full overflow-hidden' 
          onClick={() => navigate(`/profile/${user?.userName}`)}
        >
          <img 
            src={user?.profileImage || dp} 
            alt="Profile" 
            className='w-full h-full object-cover' 
          />
        </div>

        <div className='flex flex-col'>
          <div className='text-white font-bold text-sm leading-tight'>
            {user?.name || "User"}
          </div>
          <div className='text-gray-500 text-[12px]'>
            @{user?.userName || "username"}
          </div>
        </div>
      </div>
      
      {/* Follow Button Logic */}
      {!isMe && (
        <button className='px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl text-black font-bold hover:bg-blue-500 hover:text-white transition-colors'>
          Follow
        </button>
      )}
    </div>
  );
}

export default OtherUser;