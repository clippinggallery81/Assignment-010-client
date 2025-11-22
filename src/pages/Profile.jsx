import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import { FaUserCircle, FaEnvelope, FaEdit, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile({
        displayName: displayName || null,
        photoURL: photoURL || null,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // Refresh the page to show updated data
      window.location.reload();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-10">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-linear-to-r from-primary to-secondary h-32 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-base-200">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="pt-20 px-8 pb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {user?.displayName || "User"}
            </h1>
            <div className="flex items-center justify-center gap-2 text-base-content/70">
              <FaEnvelope />
              <p>{user?.email}</p>
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditing ? (
            <form
              onSubmit={handleUpdateProfile}
              className="max-w-md mx-auto space-y-4 mt-8"
            >
              <div>
                <label className="block text-sm font-medium text-base-content/80 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content/80 mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Enter photo URL"
                  className="w-full px-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn btn-primary text-white"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto space-y-4 mt-8">
              {/* Profile Stats or Additional Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-base-200 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-base-content/70">
                    Properties Saved
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-base-content/70">
                    Properties Viewed
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full btn btn-primary text-white flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </button>

                <Link
                  to={"/"}
                  onClick={handleLogout}
                  className="w-full btn btn-outline btn-error flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </Link>
              </div>
            </div>
          )}

          {/* Account Information */}
          <div className="mt-8 pt-8 border-t border-base-300">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/70">Account Created:</span>
                <span className="font-medium">
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Last Sign In:</span>
                <span className="font-medium">
                  {user?.metadata?.lastSignInTime
                    ? new Date(
                        user.metadata.lastSignInTime
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Email Verified:</span>
                <span className="font-medium">
                  {user?.emailVerified ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-orange-600">No</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
