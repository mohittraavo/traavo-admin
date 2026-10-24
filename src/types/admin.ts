export type DashboardSummary = {
  tenantCount: number;
  userCount: number;
  generatedLicenseCount: number;
  activeLicenseCount: number;
  openTicketCount: number;
  baselineRoles: string[];
  activeSubscriptionCount: number;
  expiringSubscriptionCount: number;
  gracePeriodSubscriptionCount: number;
  subscriptionAlerts: Array<{
    subscriptionId: string;
    schoolId: string;
    schoolName: string;
    planName: string;
    status: string;
    endDate: string | null;
    gracePeriodDays: number;
    gracePeriodEndDate: string | null;
    daysRemaining: number;
  }>;
};

export type User = {
  userId: number;
  tenantId: number;
  fullName: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "PARENT";
  active: boolean;
  createdAt: string;
};

export type Ticket = {
  ticketId: number;
  tenantId: number;
  campusName: string;
  subject: string;
  description: string;
  priority: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  resolutionNote: string;
  createdAt: string;
  updatedAt: string;
};

export type Permissions = Record<string, Record<string, boolean>>;
