import SignInForm from './auth/forms/SignInForm'
import SignUpForm from './auth/forms/SignUpForm'
import './global.css'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "@/root/pages";
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import { Toaster } from "@/components/ui/toaster"


function App() {

  return (
    <>
    <main>
      <Routes>
        {/* public routes */}
        <Route element= {<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />}/>
          <Route path='/sign-up' element={<SignUpForm />}/>
        </Route>
       

        {/* private routes */}
        <Route element={<RootLayout />}>
        <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} /> 
        </Route>
      </Routes>
      <Toaster />
    </main>
  </>
  )
}

export default App
