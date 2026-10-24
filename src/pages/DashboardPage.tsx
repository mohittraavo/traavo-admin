import { useNavigate } from "react-router-dom";
import { DataTable } from "../components/common/DataTable";
import { StatusBadge } from "../components/common/StatusBadge";
import { useGetDashboardQuery } from "../store/tcmsApi";

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: dashboard } = useGetDashboardQuery();
  const overview = {
    schools: dashboard?.tenantCount ?? 0,
    campuses: 347,
    students: 48921,
    teachers: 4862,
    activeLicenses: dashboard?.activeLicenseCount ?? 0,
    mrrText: "8.42L",
    openTickets: dashboard?.openTicketCount ?? 0
  };

  const topKpis = [
    { title: "Total Schools", value: formatNumber(overview.schools), sub: "Active school tenants" },
    { title: "Active Campuses", value: "342", sub: "Across all schools" },
    { title: "Active Licenses", value: formatNumber(overview.activeLicenses), sub: `${dashboard?.expiringSubscriptionCount ?? 0} subscriptions expiring soon` },
    { title: "Active Subscriptions", value: formatNumber(dashboard?.activeSubscriptionCount ?? 0), sub: "Currently assigned plans" },
    { title: "Grace Period", value: formatNumber(dashboard?.gracePeriodSubscriptionCount ?? 0), sub: "Schools within grace window" },
    { title: "Monthly Revenue (MRR)", value: "8.42L", sub: "↑ 12%" },
    { title: "Students Managed", value: "48,921", sub: "Across all tenants" },
    { title: "Support Tickets", value: `${overview.openTickets} Open`, sub: "Open and in progress" }
  ];

  const monthlyRevenue = [
    { label: "Jan", valueL: 4.2 },
    { label: "Feb", valueL: 4.5 },
    { label: "Mar", valueL: 5.1 },
    { label: "Apr", valueL: 5.8 },
    { label: "May", valueL: 6.7 },
    { label: "Jun", valueL: 7.5 },
    { label: "Jul", valueL: 8.4 }
  ];

  const subscriptionBreakdown = [
    { label: "Starter", percent: 38 },
    { label: "Professional", percent: 44 },
    { label: "Enterprise", percent: 18 }
  ];

  const onboardingStats = {
    invited: 8,
    generated: 6,
    started: 5,
    verification: 2,
    live: 117
  };

  const licenseHealthRows = [
    { school: "DPS Noida", license: "DPS-ENT-124", plan: "Enterprise", daysLeft: 124, status: "Active" },
    { school: "ABC School", license: "ABC-ST-219", plan: "Starter", daysLeft: 5, status: "Expiring" },
    { school: "XYZ School", license: "XYZ-PR-390", plan: "Professional", daysLeft: 0, status: "Expired" }
  ];

  const recentActivity = [
    { type: "School Created", target: "Delhi Public School", when: "10 min ago" },
    { type: "License Generated", target: "Green Valley School", when: "22 min ago" },
    { type: "Campus Added", target: "Ryan Noida Extension", when: "45 min ago" },
    { type: "Support Ticket Raised", target: "Ticket #391", when: "1 hour ago" }
  ];

  const supportMetrics = {
    open: 14,
    resolvedToday: 18,
    avgResolution: "3.2 hrs"
  };

  const upcomingRenewals = (dashboard?.subscriptionAlerts ?? []).map((item) => ({
    school: item.schoolName,
    plan: item.planName,
    days: item.daysRemaining,
    status: item.status,
    gracePeriodEndDate: item.gracePeriodEndDate,
  }));

  const platformHealth = [
    { label: "API Status", value: "Healthy" },
    { label: "Database", value: "Healthy" },
    { label: "Storage", value: "62%" },
    { label: "Queue", value: "Healthy" }
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map((point) => point.valueL), 1);
  const starterPercent = subscriptionBreakdown[0].percent;
  const professionalPercent = subscriptionBreakdown[1].percent;
  const licenseHealthColumns = [
    { key: "school", header: "School", render: (row: typeof licenseHealthRows[number]) => row.school },
    { key: "license", header: "License", render: (row: typeof licenseHealthRows[number]) => row.license },
    { key: "plan", header: "Plan", render: (row: typeof licenseHealthRows[number]) => row.plan },
    { key: "daysLeft", header: "Days Left", render: (row: typeof licenseHealthRows[number]) => row.daysLeft },
    {
      key: "status",
      header: "Status",
      render: (row: typeof licenseHealthRows[number]) => <StatusBadge value={row.status} />
    }
  ];

  return (
    <div className="dashboard-stack">
      <section className="overview-card">
        <div>
          <h2>Platform Overview</h2>
          <p className="lead">Revenue, onboarding, licensing and support in one control surface.</p>
        </div>
        <div className="overview-grid">
          <div><span>Schools</span><strong>{overview.schools}</strong></div>
          <div><span>Campuses</span><strong>{overview.campuses}</strong></div>
          <div><span>Students</span><strong>{formatNumber(overview.students)}</strong></div>
          <div><span>Teachers</span><strong>{formatNumber(overview.teachers)}</strong></div>
          <div><span>Licenses</span><strong>{overview.activeLicenses} Active</strong></div>
          <div><span>Subscriptions</span><strong>{dashboard?.activeSubscriptionCount ?? 0} Active</strong></div>
          <div><span>Grace Period</span><strong>{dashboard?.gracePeriodSubscriptionCount ?? 0}</strong></div>
          <div><span>Revenue</span><strong>₹{overview.mrrText} MRR</strong></div>
          <div><span>Open Tickets</span><strong>{overview.openTickets}</strong></div>
        </div>
      </section>

      <section className="metric-cards-grid">
        {topKpis.map((kpi) => (
          <article key={kpi.title} className="metric-card">
            <p>{kpi.title}</p>
            <h3>{kpi.value}</h3>
            <small>{kpi.sub}</small>
          </article>
        ))}
      </section>

      <section className="dashboard-two-col">
        <article className="surface-panel">
          <h3>Monthly Recurring Revenue</h3>
          <div className="revenue-chart">
            {monthlyRevenue.map((point) => {
              const barHeight = Math.max((point.valueL / maxRevenue) * 100, 10);
              return (
                <div key={point.label} className="revenue-col">
                  <div className="revenue-bar-wrap">
                    <div className="revenue-bar" style={{ height: `${barHeight}%` }} />
                  </div>
                  <p>{point.label}</p>
                  <small>₹{point.valueL.toFixed(1)}L</small>
                </div>
              );
            })}
          </div>
        </article>

        <article className="surface-panel">
          <h3>Subscription Breakdown</h3>
          <div className="donut-wrap">
            <div
              className="donut"
              style={{
                background: `conic-gradient(
                  var(--brand) 0 ${starterPercent}%,
                  var(--chart-secondary) ${starterPercent}% ${starterPercent + professionalPercent}%,
                  var(--amber) ${starterPercent + professionalPercent}% 100%
                )`
              }}
            >
              <span>{overview.activeLicenses}</span>
            </div>
            <div className="donut-legend">
              {subscriptionBreakdown.map((plan) => (
                <p key={plan.label}>
                  <span className={`dot ${plan.label.toLowerCase()}`} />
                  {plan.label} {plan.percent}%
                </p>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="dashboard-two-col">
        <article className="surface-panel">
          <h3>School Onboarding Pipeline</h3>
          <div className="pipeline-grid">
            <div><span>Invited</span><strong>{onboardingStats.invited}</strong></div>
            <div><span>License Generated</span><strong>{onboardingStats.generated}</strong></div>
            <div><span>Onboarding Started</span><strong>{onboardingStats.started}</strong></div>
            <div><span>Awaiting Verification</span><strong>{onboardingStats.verification}</strong></div>
            <div><span>Live Schools</span><strong>{onboardingStats.live}</strong></div>
          </div>
        </article>

        <article className="surface-panel">
          <h3>Support Metrics</h3>
          <div className="support-grid">
            <div><span>Open Tickets</span><strong>{supportMetrics.open}</strong></div>
            <div><span>Resolved Today</span><strong>{supportMetrics.resolvedToday}</strong></div>
            <div><span>Avg Resolution</span><strong>{supportMetrics.avgResolution}</strong></div>
          </div>
        </article>
      </section>

      <section className="surface-panel">
        <div className="panel-head">
          <h3>License Health</h3>
          <button className="btn btn-ghost" type="button">Renew License</button>
        </div>
        <DataTable columns={licenseHealthColumns} rows={licenseHealthRows} rowKey={(row) => row.license} />
      </section>

      <section className="dashboard-two-col">
        <article className="surface-panel">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((item) => (
              <div key={`${item.type}-${item.target}`} className="activity-item">
                <p>{item.type}</p>
                <strong>{item.target}</strong>
                <small>{item.when}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-panel">
          <h3>Upcoming Renewals</h3>
          <div className="renewal-list">
            {upcomingRenewals.length === 0 ? <p className="lead">No expiring subscriptions.</p> : upcomingRenewals.map((row) => (
              <div key={`${row.school}-${row.plan}`} className="renewal-item">
                <div>
                  <strong>{row.school}</strong>
                  <small>{row.plan} · {row.status === "GRACE" ? `Grace until ${row.gracePeriodEndDate}` : "Renew within 30 days"}</small>
                </div>
                <span>{row.status === "GRACE" ? "Grace" : `${row.days} days`}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-two-col">
        <article className="surface-panel">
          <h3>Platform Health</h3>
          <div className="health-grid">
            {platformHealth.map((item) => (
              <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>
            ))}
          </div>
        </article>

        <article className="surface-panel">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/users")}>+ Create School</button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/licenses")}>Generate License</button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/licenses")}>Add Campus</button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/users")}>Create Admin</button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/tickets")}>Open Support Ticket</button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/roles")}>View Reports</button>
          </div>
        </article>
      </section>
    </div>
  );
}

function formatInrLakh(value: number): string {
  return `₹${(value / 100000).toFixed(2)}L`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}
