import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';

// Lazy load all route components
const Home = lazy(() => import('./pages/Home'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AllBlogs = lazy(() => import('./pages/AllBlogs'));
const Topics = lazy(() => import('./pages/Topics'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const RoadmapDetail = lazy(() => import('./pages/RoadmapDetail'));
const Login = lazy(() => import('./pages/Login'));
const WriteBlog = lazy(() => import('./pages/WriteBlog'));
const Profile = lazy(() => import('./pages/Profile'));

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '1.5rem'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/roadmap/:id" element={<RoadmapDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/write" element={<WriteBlog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
