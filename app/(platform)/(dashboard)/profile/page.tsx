import React from 'react';

const ProfilePage = () => {
  // You can replace these with actual user data
  const userProfile = {
    name: 'John Doe',
    bio: 'Web Developer | React Enthusiast | Coffee Lover',
    profilePicture: 'https://example.com/profile-picture.jpg',
  };

  return (
    <div className="profile-container">
      <img src={userProfile.profilePicture} alt="Profile" className="profile-picture" />
      <div className="profile-details">
        <h1>{userProfile.name}</h1>
        <p>{userProfile.bio}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
