import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';


function App() {

  return (
    <main>
        <Routes>
          <Route path="/" element={<SignInPage />}/>
          <Route path="/SignUp" element={<SignUpPage/>}/>
          <Route path="/Home" element={<HomePage/>} />
          <Route/>
        </Routes>
    </main>
  )
}

export default App
