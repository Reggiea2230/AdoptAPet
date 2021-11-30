import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import * as likesApi from "../../utils/likesApi";

export default function ProfilePage(props) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    getProfile();
  }, [username]);

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      setPosts(data.posts);
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  async function like(postId) {
    try {
      const data = await likesApi.create(postId);
      getProfile();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  async function removeLike(likesId) {
    try {
      const data = await likesApi.removeLike(likesId);
      getProfile(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }


  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostFeed
            isProfile={true}
            posts={posts}
            numPhotosCol={3}
            user={props.user}
            like={like}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
