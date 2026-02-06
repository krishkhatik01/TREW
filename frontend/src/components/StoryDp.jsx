import React from 'react';
import dp from '../assets/dp1.png';

function StoryDp({ user }) {
  return (
    // shrink-0 is vital so the circle stays round in a horizontal scroll
    <div className='flex flex-col items-center gap-1 cursor-pointer group shrink-0'>
      
      {/* Story Circle */}
      <div className='w-[60px] h-[60px] p-[2px] border-2 border-pink-600 rounded-full group-hover:scale-105 transition-transform duration-200'>
        <div className='w-full h-full rounded-full overflow-hidden border-2 border-black bg-black'>
          <img 
            src={user?.profileImage || dp} 
            alt="Story" 
            className='w-full h-full object-cover' 
          />
        </div>
      </div>
      
      {/* Small Username text */}
      <span className='text-white text-[10px] w-[65px] truncate text-center opacity-90 font-medium'>
        {user?.userName || "username"}
      </span>
    </div>
  );
}

export default StoryDp;