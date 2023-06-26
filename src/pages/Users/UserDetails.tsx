import { Box, Button, Pagination, Paper, Stack, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostCard from '../../components/PostCard'
import { axiosGet, axiosPut } from '../../services'
import { User, Meta, Post } from '../../interface'

interface PostResponse {
  data: Post[]
  meta: {
    pagination: Meta
  } | null
}
interface Response {
  data: User
  meta: {
    pagination: Meta
  } | null
}

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState<User>({} as User);
  const [updatedUser, setUpdatedUser] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageMeta, setPageMeta] = useState({} as Meta);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async (param: any = undefined) => {
    try {
      const response: PostResponse = await axiosGet(`/users/${id}/posts`, param ? param : {});
      setPosts(response.data);
      if (response.meta) setPageMeta(response.meta.pagination);
      console.log(response, "post");
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  const fetchUser = async () => {
    try {
      const response: Response = await axiosGet(`/users/${id}`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const handlePagination = async (params: any, page: number) => {
    try {
      fetchUserPosts({ page: page, limit: 10 });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  const onCardClick = (post: Post) => {
    console.log(post);
    navigate(`/postDetails/${post.id}`);
  }
  const onActionButton = () => {

    if (isEditing) {
      updateUser();
    } else {
      setUpdatedUser(user);
      setIsEditing(true);
    }
  }
  const updateUser = async () => {
    const userId = user.id;
    const updateUser = {
      name: updatedUser.name,
      email: updatedUser.email,
    };
    try {
      const response: Response = await axiosPut(`/users/${userId}`, updateUser);
      setUser(response.data);
      console.log(response.data);
      setIsEditing(false);
    } catch (error: any) {
      window.alert(
        `Error updating user "${error.message}"`
      )
     
      console.error('Error fetching users:', error);
    }
    // try {
    //     await axios.put(`${BASE_URL}/users/${id}`, updatedUser);
    //     // Assuming a successful update, you may handle the response as needed
    //     console.log('User updated successfully!');
    // } catch (error) {
    //     console.error('Error updating user:', error);
    // }
  };
  return (
    <Container>
      <h1>UserDetails</h1>
      <Paper elevation={2} style={{ padding: '20px' }}>
        {isEditing ? <>
          <Stack
            component="form"
            sx={{ width: '50ch', marginBottom: '20px' }}
            spacing={2}
            noValidate
            autoComplete="off"
          >
            <TextField
              hiddenLabel
              id="name"
              name="name"
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              defaultValue={user?.name}
              variant="outlined"
            />
            <TextField
              hiddenLabel
              id="email"
              name="email"
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              defaultValue={user?.email}
              variant="outlined"

            />
          </Stack>
        </> : <>
          <h2>{user?.name}</h2>
          <h3>{user?.email}</h3>
        </>}
        <Button size="small" variant="contained" onClick={() => onActionButton()}>{isEditing ? "Save" : "Edit"}</Button>
        {isEditing && <Button sx={{ marginLeft: '10px' }} size="small" variant="outlined" onClick={() => setIsEditing(false)}> Cancel </Button>}
      </Paper>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'initial',
        gap: '20px',
        marginTop: '20px'
      }}>
        {posts.map((post: Post) => (
          <PostCard post={post} onLearnMore={onCardClick} />
        ))}
      </Box>
      <Box sx={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
      </Box>
      <Pagination count={pageMeta.pages} page={pageMeta.page} onChange={handlePagination} />
    </Container>
  )
}

export default UserDetails