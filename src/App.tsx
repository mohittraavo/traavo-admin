import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminDataProvider } from "./components/admin/AdminDataProvider";
import { AppLayout } from "./components/layout/AppLayout";
import { CampusDetailPage } from "./pages/CampusDetailPage";
import { CampusManagementPage } from "./pages/CampusManagementPage";
import { CampusCapacityPage } from "./pages/CampusCapacityPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SchoolDetailPage } from "./pages/SchoolDetailPage";
import { SchoolManagementPage } from "./pages/SchoolManagementPage";
import { TicketsPage } from "./pages/TicketsPage";
import { UsersPage } from "./pages/UsersPage";
import { useAdminData } from "./components/admin/AdminDataProvider";
import { SchoolsPage } from "./pages/SchoolsPage";
import { SchoolOnboardingPage } from "./pages/SchoolOnboarding";
import { SubscriptionsPage } from "./pages/SubscriptionsPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { ApiFeedback } from "./components/common/ApiFeedback";

function PermissionRoute({ permissionKey, element }: { permissionKey: string; element: JSX.Element }) {
  const { loading, canAccess } = useAdminData();
  if (loading) {
    return <div className="boot-screen">Checking access...</div>;
  }
  return canAccess(permissionKey) ? element : <Navigate to="/dashboard" replace />;
}

function App() {
  return (
    <AuthProvider>
      <ApiFeedback />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <AdminDataProvider>
                <AppLayout />
              </AdminDataProvider>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PermissionRoute permissionKey="Dashboard.View Dashboard" element={<DashboardPage />} />} />
            <Route path="/school-management" element={<PermissionRoute permissionKey="School Management.View" element={<SchoolManagementPage />} />} />
            <Route path="/school-management/:schoolId" element={<PermissionRoute permissionKey="School Management.View" element={<SchoolDetailPage />} />} />
            <Route path="/schools" element={<Navigate to="/school-management?tab=schools" replace />} />
            <Route path="/campus-management" element={<PermissionRoute permissionKey="Campus Management.View" element={<CampusManagementPage />} />} />
            <Route path="/campus-management/:campusId" element={<PermissionRoute permissionKey="Campus Management.View" element={<CampusDetailPage />} />} />
            <Route path="/campuses" element={<Navigate to="/campus-management?tab=campuses" replace />} />
            <Route path="/campus-capacity" element={<Navigate to="/campus-management?tab=capacity" replace />} />
            <Route path="/users" element={<PermissionRoute permissionKey="User Management.View" element={<UsersPage />} />} />
            
            <Route path="/features" element={<PermissionRoute permissionKey="Subscription Management.View" element={<FeaturesPage />} />} />
            <Route path="/subscriptions" element={<PermissionRoute permissionKey="Subscription Management.View" element={<SubscriptionsPage />} />} />
            <Route path="/tickets" element={<PermissionRoute permissionKey="Support Inbox.View" element={<TicketsPage />} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/school-management" element={<SchoolsPage />} /> 
            <Route path="/school-management/create" element={<SchoolOnboardingPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
