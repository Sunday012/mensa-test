import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import HomePage from './pages/home';
import ProjectDetails from './pages/projectDetails';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
