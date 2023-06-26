import { Box, Pagination } from '@mui/material';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import { Meta, Post } from '../../interface';
import { axiosGet } from '../../services';

interface PostResponse {
    data: Post[]
    meta: {
        pagination: Meta
    } | null
}

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [pageMeta, setPageMeta] = useState({} as Meta);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);


    const fetchPosts = async (param: any = undefined) => {
        setIsLoading(true);
        try {
            const response: PostResponse = await axiosGet(`/posts`, param ? param : {});
            setPosts(response.data);
            if (response.meta) setPageMeta({ ...response.meta.pagination });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching users:', error);
        }
    }
    const handlePagination = async (params: any, page: number) => {
        try {
            fetchPosts({ page: page, limit: 10 });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    const onCardClick = (post: Post) => {
        console.log(post);
        navigate(`/postDetails/${post.id}`);
    }
    return (
        <>

            <Container>
                <h1>Posts</h1>
                {isLoading ? <div>Loading...</div> : <> <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'initial',
                    gap: '20px',
                    marginTop: '20px'
                }}>
                    {posts.map((post: Post) => {
                        return (
                            <PostCard post={post} onLearnMore={onCardClick} />
                        )
                    })}
                </Box>
                    <Box sx={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '20px'
                    }}>
                        <Pagination count={pageMeta.pages} defaultPage={1} page={pageMeta.page} onChange={handlePagination} />
                    </Box> </>}
            </Container></>
    )
}

export default Posts