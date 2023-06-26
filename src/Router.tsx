import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PostDetails from './pages/Posts/PostDetails'
import Posts from './pages/Posts'
import Users from './pages/Users'
import UserDetails from './pages/Users/UserDetails'
import Header from './pageLayout/Header'

const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Header><Users /></Header>} />
      <Route path="/users/:id" element={<Header><UserDetails /></Header>} />
      <Route path="/posts" element={<Header><Posts /></Header>} />
      <Route path="/postDetails/:id" element={<Header><PostDetails /></Header>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default Router