import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import App from './pages/App';

function Root() {
  return (
    <Router basename="/stockrater">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<App />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default Root;
