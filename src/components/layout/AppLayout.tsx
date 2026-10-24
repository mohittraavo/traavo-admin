import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useAdminData } from "../admin/AdminDataProvider";
import { TravoLogo } from "../common/TravoLogo";

type SidebarItem = {
  to?: string;
  label: string;
  hint: string;
  glyph: string;
  permissionKey?: string;
};

type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

const sidebarSections: SidebarSection[] = [
  {
    items: [{ to: "/dashboard", label: "Dashboard", hint: "Platform pulse and KPIs", glyph: "DB", permissionKey: "Dashboard.View Dashboard" }]
  },
  {
    items: [
      { to: "/school-management", label: "School Management", hint: "School directory", glyph: "SC", permissionKey: "School Management.View" }
    ]
  },
  {
    items: [
      { to: "/campus-management", label: "Campus Management", hint: "Campuses and capacity", glyph: "CM", permissionKey: "Campus Management.View" }
    ]
  },
  {
    items: [
      { to: "/users", label: "User Management", hint: "Platform users and school admins", glyph: "US", permissionKey: "User Management.View" },
      { to: "/features", label: "Features", hint: "Manage plan features", glyph: "FT", permissionKey: "Subscription Management.View" },
      { to: "/subscriptions", label: "Subscriptions", hint: "Plan mix and billing", glyph: "SB", permissionKey: "Subscription Management.View" },
      { to: "/tickets", label: "Support Inbox", hint: "Ticket triage and SLA", glyph: "SP", permissionKey: "Support Inbox.View" },
      { label: "Reports", hint: "Operational exports", glyph: "RP" },
      { label: "Settings", hint: "Platform configuration", glyph: "ST" }
    ]
  }
];

const sidebarItems = sidebarSections.flatMap((section) => section.items);

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const { dashboard, loading, error, canAccess } = useAdminData();
  const [profileOpen, setProfileOpen] = useState(false);

  const healthState = loading ? "Syncing" : error ? "Needs Review" : "Healthy";
  const activeTab = sidebarItems.find(
    (tab) => tab.to && (location.pathname === tab.to || location.pathname.startsWith(`${tab.to}/`))
  );
  const pageTitle = location.pathname === "/profile" ? "Profile" : activeTab?.label ?? "Dashboard";

  return (
    <div className="app-shell">
      <aside className="left-rail">
        <div className="rail-brand">
          <div className="brand-cluster">
            <TravoLogo size={36} />
            <div className="logo-shell">
              <span className="tra">Tra</span>
              <span className="avo">avo</span>
            </div>
          </div>
        </div>
        <div className="sidebar-divider" />

        <nav className="sidebar-nav" aria-label="Primary">
          {sidebarSections.map((section, sectionIndex) => (
            <div key={section.title ?? `section-${sectionIndex}`} className="sidebar-section">
              {section.title ? <p className="sidebar-group-title">{section.title}</p> : null}
              {section.items.filter((entry) => canAccess(entry.permissionKey ?? "")).map((entry) => (
                entry.to ? (
                  <NavLink
                    key={entry.label}
                    to={entry.to}
                    className={({ isActive }) => (isActive ? "menu-btn active" : "menu-btn")}
                  >
                    <span className="menu-glyph" aria-hidden="true">{entry.glyph}</span>
                    <span className="menu-copy">
                      <strong>{entry.label}</strong>
                      <small>{entry.hint}</small>
                    </span>
                  </NavLink>
                ) : (
                  <button key={entry.label} type="button" className="menu-btn menu-btn-muted" aria-disabled="true">
                    <span className="menu-glyph" aria-hidden="true">{entry.glyph}</span>
                    <span className="menu-copy">
                      <strong>{entry.label}</strong>
                      <small>{entry.hint}</small>
                    </span>
                  </button>
                )
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-row">
            <h1 className="topbar-title">{pageTitle}</h1>
            <div className="header-actions">
              <button
                className="icon-btn"
                aria-label="Toggle theme"
                title="Toggle theme"
                onClick={() => {
                  const root = document.documentElement;
                  const isDark = root.getAttribute("data-theme") === "dark";
                  root.setAttribute("data-theme", isDark ? "light" : "dark");
                }}
              >
                <span aria-hidden="true">◐</span>
              </button>

              <div className="profile-menu-wrap">
                <button
                  className="icon-btn profile-icon-btn"
                  aria-label="Open profile menu"
                  title="Profile"
                  onClick={() => setProfileOpen((prev) => !prev)}
                >
                  <span aria-hidden="true">👤</span>
                </button>

                {profileOpen ? (
                  <div className="profile-menu" role="menu">
                    <button
                      className="profile-menu-item"
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="profile-menu-item"
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        void logout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <main className="content-wrap">
          <section className="content-card">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}
