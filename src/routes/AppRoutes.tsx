import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import CampaignDetails from '../pages/CampaignDetails';
import SegmentBuilder from '../pages/SegmentBuilder';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/campaign/:id" element={<CampaignDetails />} />
      <Route
        path="/segments"
        element={
          <ProtectedRoute>
            <SegmentBuilder />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
