import React, { useState, useRef } from "react";

const EVENT_PREFERENCES = [
  "Social", "Arts", "Tech", "Community", "Sports", "Food"
];

export default function Profile({ user, onUpdate }) {
  const [profile, setProfile] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    sex: user?.sex || "",
    preferences: user?.preferences || [],
    contact: user?.contact || "",
    profilePic: user?.profilePic || null,
  });
  const [success, setSuccess] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const fileInputRef = useRef();

  function handlePreferencesChange(pref) {
    setProfile(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  }

  function handleProfilePicChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setProfile(prev => ({ ...prev, profilePic: ev.target.result }));
      reader.readAsDataURL(file);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate?.(profile);
    setSuccess(true);
    setEditMode(false);
    setTimeout(() => setSuccess(false), 2000);
  }

  // View mode
  if (!editMode) {
    return (
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2 flex items-center justify-center">
            {profile.profilePic ? (
              <img src={profile.profilePic} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-4xl">👤</span>
            )}
          </div>
        </div>
        <div className="mb-2"><span className="font-semibold">Name:</span> {profile.name}</div>
        <div className="mb-2"><span className="font-semibold">Bio:</span> {profile.bio}</div>
        <div className="mb-2"><span className="font-semibold">Location:</span> {profile.location}</div>
        <div className="mb-2"><span className="font-semibold">Sex:</span> {profile.sex}</div>
        <div className="mb-2">
          <span className="font-semibold">Event Preferences:</span> {profile.preferences.join(", ")}
        </div>
        <div className="mb-4"><span className="font-semibold">Contact Info:</span> {profile.contact}</div>
        <button
          className="w-full bg-violet-600 text-white py-2 rounded font-bold hover:bg-violet-700"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
        {success && <div className="text-green-600 mt-4 text-center">Profile updated!</div>}
      </div>
    );
  }

  // Edit mode
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2 flex items-center justify-center">
            {profile.profilePic ? (
              <img src={profile.profilePic} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-4xl">👤</span>
            )}
          </div>
          <button
            type="button"
            className="text-violet-600 underline text-sm"
            onClick={() => fileInputRef.current.click()}
          >
            {profile.profilePic ? "Change" : "Add"} Profile Picture
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>

        <label className="block mb-2 font-semibold">Name</label>
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Your name"
        />

        <label className="block mb-2 font-semibold">Bio</label>
        <textarea
          className="w-full mb-4 p-2 border rounded"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
        />

        <label className="block mb-2 font-semibold">Location</label>
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="Your location"
        />

        <label className="block mb-2 font-semibold">Sex</label>
        <select
          className="w-full mb-4 p-2 border rounded"
          name="sex"
          value={profile.sex}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <label className="block mb-2 font-semibold">Event Preferences</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {EVENT_PREFERENCES.map(pref => (
            <label key={pref} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={profile.preferences.includes(pref)}
                onChange={() => handlePreferencesChange(pref)}
              />
              <span>{pref}</span>
            </label>
          ))}
        </div>

        <label className="block mb-2 font-semibold">Contact Info</label>
        <input
          className="w-full mb-6 p-2 border rounded"
          type="text"
          name="contact"
          value={profile.contact}
          onChange={handleChange}
          placeholder="Email or phone"
        />

        <button className="w-full bg-violet-600 text-white py-2 rounded font-bold hover:bg-violet-700" type="submit">
          Save Profile
        </button>
        {success && <div className="text-green-600 mt-4 text-center">Profile updated!</div>}
      </form>
    </div>
  );
}