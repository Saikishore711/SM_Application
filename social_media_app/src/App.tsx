import SignInForm from './auth/forms/SignInForm'
import SignUpForm from './auth/forms/SignUpForm'
import './global.css'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './root/pages'
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
        </Route>
      </Routes>
      <Toaster />
    </main>
  </>
  )
}

export default App
