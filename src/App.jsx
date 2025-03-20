import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SubscriptionPage from "./pages/SubscriptionPage"; 
// import { Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/HomePage/Navbar";

function App() {

  return (
      <main>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Subscription" element={<SubscriptionPage />} />
        </Routes>
      </main>

  )
}

export default App
