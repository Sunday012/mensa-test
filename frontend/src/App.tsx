import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import ProjectDetails from './pages/projectDetails';
import { SignUp } from './components/SignUp';
import { Header } from './components/header';
import { Login } from './components/Login';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
    </Router>
    </Provider>
  );
}

export default App;
