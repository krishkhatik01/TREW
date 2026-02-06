import React from 'react';
import logo from '../assets/trew 1.png';
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import StoryDp from '../components/StoryDp';
import Nav from './Nav';

function Feed() {
  const { userData, suggestedUsers } = useSelector((state) => state.user);

  return (
    <div className='lg:w-[50%] w-full bg-black min-h-screen lg:h-screen relative lg:overflow-y-auto no-scrollbar border-r border-gray-900'>
      
      {/* 1. COMPACT MOBILE HEADER: Reduced h-[80px] to h-[60px] to bring stories closer */}
      <div className='w-full h-[60px] flex items-center justify-between px-5 lg:hidden border-b border-gray-900 sticky top-0 bg-black z-10'>
        <div className='flex items-center h-full'>
            {/* Constrained logo height to h-[28px] to prevent stretching */}
            <img src={logo} alt="TREW" className='h-[28px] w-auto object-contain' />
        </div>
        <FaRegHeart className='text-white w-6 h-6 cursor-pointer' />
      </div>

      {/* 2. OPTIMIZED STORY TRAY: Reduced vertical padding (py-2) for tight distance */}
      <div className='flex w-full overflow-x-auto gap-4 items-center px-4 py-2 no-scrollbar border-b border-gray-900'>
        
        {/* Admin Story: Added shrink-0 to prevent length/oval distortion */}
        {userData && (
          <div className="relative shrink-0">
            <StoryDp user={userData} />
            {/* Perfectly positioned plus icon */}
            <div className="absolute bottom-5 right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center border-2 border-black text-[10px] font-bold pointer-events-none">
              +
            </div>
          </div>
        )}

        {/* 3. Mapped Stories */}
        {suggestedUsers && suggestedUsers.map((user) => (
          <StoryDp key={user._id} user={user} />
        ))}
      </div>

      {/* Main Feed Content Area */}
      <div className='flex flex-col w-full'>
        {/* Post components will be mapped here later */}
      </div>

      <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]'>
        <Nav />
      </div>

    </div>
  );
}

export default Feed;