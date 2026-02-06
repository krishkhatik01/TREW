import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp1.png";

function Profile() {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Accessing both profile and the logged-in user's data
  const { profileData, userData } = useSelector((state) => state.user);

  // Logic to check if the profile being viewed belongs to the logged-in user
  const isMe = userData?.userName === userName;

  const handleProfile = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getProfile/${userName}`, { withCredentials: true });
      const fetchedUser = result.data.user || result.data;
      dispatch(setProfileData(fetchedUser));
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/signout`, {}, { withCredentials: true }); 
      dispatch(setUserData(null)); 
      navigate('/signin');
    } catch (error) {
      dispatch(setUserData(null));
      navigate('/signin');
    }
  };

  useEffect(() => {
    handleProfile();
    // Cleanup function: Clear profile data when leaving the page to avoid 
    // showing the old user's data when clicking a new profile
    return () => dispatch(setProfileData(null));
  }, [userName, dispatch]);

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans flex flex-col">
      
      {/* FIXED HEADER */}
      <header className="w-full h-16 grid grid-cols-3 items-center px-6 sticky top-0 bg-black z-50 border-b border-gray-900">
        <div className="flex justify-start">
          <IoMdArrowRoundBack 
            onClick={() => navigate(-1)} 
            className="text-2xl cursor-pointer hover:text-gray-400 transition-colors" 
          />
        </div>

        <div className="flex justify-center overflow-hidden">
          <span className="text-sm font-medium truncate">
            {profileData?.userName || userName}
          </span>
        </div>

        <div className="flex justify-end">
          {/* Logout only visible if it's your own profile */}
          {isMe && (
            <button 
              onClick={handleLogout} 
              className="text-blue-500 font-bold text-sm whitespace-nowrap hover:text-blue-400 transition-colors"
            >
              Log Out
            </button>
          )}
        </div>
      </header>

      {/* SCROLLABLE BODY */}
      <main className="flex-1 flex flex-col items-center pt-10 pb-20">
        
        <section className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
          <div className="flex items-center justify-center gap-10">
            <div className="w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden border-2 border-gray-800">
              <img 
                src={profileData?.profileImage || dp} 
                className="w-full h-full object-cover" 
                alt="profile" 
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">{profileData?.name || "Loading..."}</h1>
                {isMe && (
                  <button className="bg-[#1c1c1c] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#262626]">
                    Edit Profile
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-sm mt-1">{profileData?.bio || "New User"}</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-around w-full max-w-md mt-6 border-y border-gray-900 py-6">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{profileData?.posts?.length || 0}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{profileData?.followers?.length || 0}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{profileData?.following?.length || 0}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Following</span>
            </div>
          </div>
        </section>

        <div className="mt-10 w-full px-4 text-center text-gray-600 italic">
          No posts yet.
        </div>
      </main>
    </div>
  );
}

export default Profile;