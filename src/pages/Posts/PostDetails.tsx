import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Post } from '../../interface'
import { axiosGet } from '../../services'
import { Container } from '@mui/material';

interface Response {
  data: Post
}
const PostDetails = () => {
  const { id } = useParams()
  const [post, setPost] = useState({} as Post);
  const navigate = useNavigate();


  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response: Response = await axiosGet(`/posts/${id}`);
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  return (
    <Container>
      <h1> Post Details </h1>

      <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {post.id}
        </Typography>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> navigate(-1)}>Back</Button>
      </CardActions>
    </Card>

    </Container>
  )
}

export default PostDetails