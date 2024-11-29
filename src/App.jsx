import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import NavBar from './components/layout/NavBar';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
