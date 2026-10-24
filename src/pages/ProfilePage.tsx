import { useAuth } from "../components/auth/AuthProvider";

export function ProfilePage() {
  const { user } = useAuth();

  const displayName = user?.fullName || "Platform User";
  const initials = displayName
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">{initials || "PU"}</div>
        <div className="profile-head-copy">
          <h1>{displayName}</h1>
          <p className="lead">Manage your identity, security preferences, and workspace defaults.</p>
          <div className="profile-tags">
            <span>Role: {user?.role || "ADMIN"}</span>
            <span>Tenant: {user?.tenantId ?? 0}</span>
            <span>User ID: {user?.userId ?? 1}</span>
          </div>
        </div>
      </section>

      <section className="profile-grid">
        <article className="profile-panel">
          <h3>Contact Information</h3>
          <div className="profile-field-grid">
            <div>
              <label>Full Name</label>
              <p>{displayName}</p>
            </div>
            <div>
              <label>Email</label>
              <p>{user?.email || "admin@travo.local"}</p>
            </div>
            <div>
              <label>Primary Phone</label>
              <p>+91 98XXXXXX10</p>
            </div>
            <div>
              <label>Location</label>
              <p>Noida, India</p>
            </div>
          </div>
        </article>

        <article className="profile-panel">
          <h3>Security</h3>
          <div className="profile-list">
            <div><span>Two-factor authentication</span><strong>Enabled</strong></div>
            <div><span>Last password change</span><strong>18 days ago</strong></div>
            <div><span>Active sessions</span><strong>2 devices</strong></div>
            <div><span>Recovery email</span><strong>Configured</strong></div>
          </div>
        </article>
      </section>

      <section className="profile-grid">
        <article className="profile-panel">
          <h3>Preferences</h3>
          <div className="profile-list">
            <div><span>Language</span><strong>English</strong></div>
            <div><span>Timezone</span><strong>Asia/Kolkata</strong></div>
            <div><span>Notification Digest</span><strong>Daily at 09:00</strong></div>
            <div><span>Theme</span><strong>Auto</strong></div>
          </div>
        </article>

        <article className="profile-panel">
          <h3>Activity Snapshot</h3>
          <div className="profile-metrics">
            <div><span>Tickets Resolved</span><strong>42</strong></div>
            <div><span>Licenses Issued</span><strong>19</strong></div>
            <div><span>Users Onboarded</span><strong>27</strong></div>
            <div><span>Avg Response Time</span><strong>3.1 hrs</strong></div>
          </div>
        </article>
      </section>
    </div>
  );
}
