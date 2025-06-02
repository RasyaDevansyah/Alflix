import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SubscriptionPage from "./pages/SubscriptionPage"; 
import PaymentPage from "./pages/PaymentPage";
import VideoInfoPage from './pages/VideoInfoPage';
import VideoPlayBack from './pages/VideoPlayBack';
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ProfilePage from './pages/ProfilePage';  
// import { Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
      <main>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Subscription" element={<SubscriptionPage />} />
          <Route path="/Payment" element={<PaymentPage />} /> 
          <Route path="/VideoInfoPage" element={<VideoInfoPage />} /> 
          <Route path="/VideoPlayBack" element={<VideoPlayBack />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/Profile" element={<ProfilePage />} />

        </Routes>
      </main>

  )
}

export default App
