import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AppHomePage from './components/app/AppHomePage';
import AnalyzePage from './components/app/AnalyzePage';
import ReportPage from './components/app/ReportPage';
import ComparePage from './components/app/ComparePage';
import HistoryPage from './components/app/HistoryPage';
import GuidePage from './components/app/GuidePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppHomePage />} />
        <Route path="/app/analyze" element={<AnalyzePage />} />
        <Route path="/app/report/:id" element={<ReportPage />} />
        <Route path="/app/compare" element={<ComparePage />} />
        <Route path="/app/history" element={<HistoryPage />} />
        <Route path="/app/guide" element={<GuidePage />} />
      </Routes>
    </BrowserRouter>
  );
}