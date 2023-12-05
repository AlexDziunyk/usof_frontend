import './App.css'
import { useNavigate, createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from 'react-router-dom';
import Root from './components/Root/Root';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Posts from './pages/Posts/Posts';
import FullPost from './components/FullPost/FullPost';
import CreatePost from './pages/CreatePost/CreatePost';
import { useSelector, useDispatch } from 'react-redux';
import Categories from './pages/Categories/Categories';
import { useState, useEffect } from 'react';
import { fetchAuthMe, isAuthSelector, roleSelector } from './redux/slices/authSlice';
import Profile from './pages/Profile/Profile';
import ProfileMe from './pages/ProfileMe/ProfileMe';
import MyPosts from './pages/MyPosts/MyPosts';
import EditPostContent from './components/EditPostContent/EditPostContent';
import MyComments from './pages/MyComments/MyComments';
import CreateCategory from './pages/CreateCategory/CreateCategory';
import MyCategories from './pages/MyCategories/MyCategories';
import EditCategoryContent from './components/EditCategoryContent/EditCategoryContent';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import AdminPosts from './pages/AdminPosts/AdminPosts';
import AdminComments from './pages/AdminComments/AdminComments';
import AdminCategories from './pages/AdminCategories/AdminCategories';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(roleSelector); 

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  useEffect(() => {
    console.log("AUTH")
  }, [isAuth])

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={ <Root />}>
        <Route index element={<Navigate to="/posts"/>}></Route>
        <Route path='reset-password/:id' element={<ResetPassword />}></Route>
        
        <Route path='posts' element={<Posts />}></Route>
        <Route path='categories' element={<Categories />}></Route>
        <Route path='categories/createCategory' element={userData ? <CreateCategory /> : <Navigate to="/posts"/>}></Route>
        <Route path='posts/:id' element={<FullPost />}></Route>
        <Route path='posts/createPost' element={userData ? <CreatePost /> : <Navigate to="/posts"/>}></Route>
        <Route path='login' element={<Login></Login>} />
        <Route path='register' element={<Register></Register>} />
        <Route path='profile' element={userData ? <Profile></Profile> : <Navigate to="/posts"/>}>
          <Route path='me' element={userData ? <ProfileMe></ProfileMe> : <Navigate to="/posts"/>}></Route>
          <Route path='myposts' element={userData ? <MyPosts></MyPosts> : <Navigate to="/posts"/>}></Route>
          <Route path='mycomments' element={userData ? <MyComments></MyComments> : <Navigate to="/posts"/>}></Route>
          <Route path='mycategories' element={userData ? <MyCategories></MyCategories> : <Navigate to="/posts"/>}></Route>
        </Route>
        <Route path='admin' element={userData && userData.role ? <AdminPanel></AdminPanel> : <Navigate to="/posts"/>}>
          <Route path='posts' element={userData && userData.role ? <AdminPosts></AdminPosts> : <Navigate to="/posts"/>}></Route>
          <Route path='comments' element={userData && userData.role ? <AdminComments></AdminComments> : <Navigate to="/posts"/>}></Route>
          <Route path='categories' element={userData && userData.role ? <AdminCategories></AdminCategories> : <Navigate to="/posts"/>}></Route>
          <Route path='users' element={userData && userData.role ? <AdminUsers></AdminUsers> : <Navigate to="/posts"/>}></Route>
        </Route>
        <Route path='profile/myposts/editPost/:id' element={userData? <EditPostContent></EditPostContent> : <Navigate to="/posts"/>}></Route>
        <Route path='profile/mycomments/editComment/:id' element={userData? <EditPostContent></EditPostContent> : <Navigate to="/posts"/>}></Route>
        <Route path='profile/myCategories/editCategory/:id' element={userData? <EditCategoryContent></EditCategoryContent> : <Navigate to="/posts"/>}></Route>
      </Route>
    </>
  ));

  return (
    <>
      <div className='app'>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
