import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Templates from './pages/Templates.jsx';
import OccasionTemplates from './pages/OccasionTemplates.jsx';
import TemplatePreview from './pages/TemplatePreview.jsx';
import Customize from './pages/Customize.jsx';
import GeneratedWish from './pages/GeneratedWish.jsx';
import NotFound from './pages/NotFound.jsx';

// Layout wrapper to conditionally show Navbar & Footer
function AppLayout() {
  const location = useLocation();

  // Hide general navbar and footer for standalone recipient pages to provide full screen gift experience
  const isRecipientPage =
    location.pathname.startsWith('/w/') ||
    location.pathname.startsWith('/preview/') ||
    location.pathname.startsWith('/wish/') ||
    location.pathname.startsWith('/birthday/');

  // Preview page and Customizer have their own specialized toolbars
  const isStudioOrPreview =
    location.pathname.includes('/preview') ||
    location.pathname.startsWith('/customize/');

  return (
    <div className="app-wrapper">
      {!isRecipientPage && !isStudioOrPreview && <Navbar />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/occasions" element={<Templates />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:occasion" element={<OccasionTemplates />} />
          <Route path="/templates/:templateId/preview" element={<TemplatePreview />} />
          <Route path="/customize/:templateId" element={<Customize />} />
          <Route path="/customize/:occasion/:templateId" element={<Customize />} />
          <Route path="/w/:projectId" element={<GeneratedWish />} />
          <Route path="/preview/:projectId" element={<GeneratedWish />} />
          <Route path="/wish/:projectId" element={<GeneratedWish />} />
          <Route path="/birthday/:projectId" element={<GeneratedWish />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isRecipientPage && !isStudioOrPreview && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
