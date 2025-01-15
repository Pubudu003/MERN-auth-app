import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import EmailverificationPage from './pages/EmailverificationPage.jsx';

import FloatingShape from "./components/FloatingShape"
import LoadingSpinner from './components/LoadingSpinner.jsx';

import { useAuthStore } from './store/authStore.js';
import { useEffect } from 'react';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';

// protect routes that requie authentication
const ProtectedRoute = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  if(!user?.isVerified) {
    return <Navigate to={"/verify-email"} />
  }

  return children;
};

// redirect authenticated users to the homepage
const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

 // console.log("isAuthenticated: ", isAuthenticated);
 // console.log("user: ", user);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={"/"} replace />
  }
  
  return children;
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900
                    flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-purple-500' size='w-64 h-64' top='-20%' left='10%' delay={0}/>
      <FloatingShape color='bg-violet-300' size='w-48 h-48' top='70%' left='80%' delay={5}/>
      <FloatingShape color='bg-fuchsia-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>

     <Routes>
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        <Route 
          path='/signup' 
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          } 
        />
        <Route 
          path='/login' 
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-email' 
              element={
                <RedirectAuthenticatedUser>
                  <EmailverificationPage />
                </RedirectAuthenticatedUser>
              } />
        <Route path='/forgot-password' 
              element={
                /*<RedirectAuthenticatedUser>
                  <ForgotPasswordPage />
                </RedirectAuthenticatedUser>*/
                <ForgotPasswordPage />
              } />
        <Route path='/reset-password/:token'
              element={
                <RedirectAuthenticatedUser>
                  <ResetPasswordPage />
                </RedirectAuthenticatedUser>
              } />

        {/* catch all routes */}
        <Route path='*' element={<Navigate to='/' replace /> } />
        
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
