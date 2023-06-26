import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Post } from '../interface';

const PostCard = (Props: { post: Post, onLearnMore: any }) => {
  const { post, onLearnMore } = Props;
  return (
    <Card sx={{ maxWidth: 270, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
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
        <Button size="small" onClick={()=>onLearnMore(post)}>Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default PostCard