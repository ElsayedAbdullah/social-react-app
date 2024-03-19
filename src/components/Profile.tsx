import { useContext, useEffect, useState } from "react";
import Page from "./Page";
import axios from "axios";
import StateContext from "../context/StateContext";
import ProfilePosts from "./ProfilePosts";

export default function Profile() {
  const { user } = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    counts: {
      postCount: 0,
      followerCount: 0,
      followingCount: 0,
    },
  });

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await axios.post(
          `/profile/${user?.username}`,
          {
            token: user?.token,
          },
          {
            cancelToken: ourRequest.token,
          }
        );
        setProfileData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message); // Handle Axios errors
        } else {
          console.error(error); // Handle other types of errors
        }
      }
    }
    fetchData();

    // Cleanup function
    return () => {
      ourRequest.cancel();
    };
  }, [user]);

  return (
    <Page title="Profile">
      <h2>
        <img
          className="avatar-small"
          src={profileData.profileAvatar}
          alt="profile avatar"
        />{" "}
        {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 ">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  );
}
