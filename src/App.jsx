import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentPage from "./pages/PaymentPage";
import VideoInfoPage from './pages/VideoInfoPage';
import HistoryPage from './pages/ViewAllPages/HistoryPage';
import LatestPage from './pages/ViewAllPages/LatestPage';
import AnimePage from './pages/ViewAllPages/AnimePage';
import BrowsePage from './pages/BrowsePage';
import WelcomePage from './pages/WelcomePage';

// import { Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Subscription" element={<SubscriptionPage />} />
        <Route path="/Payment" element={<PaymentPage />} />
        <Route path="/VideoInfoPage" element={<VideoInfoPage />} />
        <Route path="/BrowsePage" element={<BrowsePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/latest" element={<LatestPage />} />
        <Route path="/anime" element={<AnimePage />} />
      </Routes>
    </main>
  )
}

export default App
