import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import SignInForm from '../src/components/Login/SignInForm'
import WorkerDash from './components/WorkerDash/WorkerDash';
import UserDash from './components/UserDash/Userdash';
import Service from './components/Services/Service';
import Footer from './components/Footer/Footer';
import CategorywiseView from './components/CategoryView/CategorywiseView';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/view-service' element={<Service/>} />
          <Route path='/view-contact' element={<Footer/>} />
          <Route path='/login' element={<SignInForm/>} />
          <Route path='/worker-dashboard' element={<WorkerDash/>} />
          <Route path='/user-dashboard' element={<UserDash/>} />
          <Route path='/category-view-div' element={<CategorywiseView/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
