export type InternalUser = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: "Active" | "Suspended";
  lastLogin: string;
};

export type SchoolAdministrator = {
  id: string;
  school: string;
  adminName: string;
  email: string;
  mobile: string;
  subscription: string;
  licenseStatus: "Active" | "Expiring" | "Expired";
  lastLogin: string;
  status: "Active" | "Disabled" | "Pending";
};

export type Invitation = {
  id: string;
  target: string;
  email: string;
  role: string;
  status: "Pending" | "Accepted" | "Expired";
  sentAt: string;
};

export type LoginSession = {
  id: string;
  user: string;
  device: string;
  browser: string;
  ipAddress: string;
  loginTime: string;
};

export type AuditLog = {
  id: string;
  event: string;
  user: string;
  detail: string;
  time: string;
};

export const internalUsersSeed: InternalUser[] = [
  { id: "INT-001", name: "Mohit Kumar", role: "Super Admin", department: "Leadership", email: "mohit@travo.ai", status: "Active", lastLogin: "Today, 09:12 AM" },
  { id: "INT-002", name: "Niharika Arora", role: "Operations Manager", department: "Operations", email: "niharika@travo.ai", status: "Active", lastLogin: "Today, 08:04 AM" },
  { id: "INT-003", name: "Saurabh Jain", role: "Support Executive", department: "Support", email: "saurabh@travo.ai", status: "Suspended", lastLogin: "Yesterday, 05:40 PM" },
  { id: "INT-004", name: "Priya Singh", role: "Finance", department: "Finance", email: "priya@travo.ai", status: "Active", lastLogin: "Yesterday, 11:20 AM" },
  { id: "INT-005", name: "Aman Batra", role: "Customer Success", department: "Customer Success", email: "aman@travo.ai", status: "Active", lastLogin: "2 days ago" }
];

export const schoolAdminsSeed: SchoolAdministrator[] = [
  { id: "SAD-001", school: "Delhi Public School", adminName: "Radhika Sharma", email: "principal@dpsncr.edu", mobile: "+91 98XXXXXX21", subscription: "Enterprise", licenseStatus: "Active", lastLogin: "Today, 08:30 AM", status: "Active" },
  { id: "SAD-002", school: "Green Valley School", adminName: "Ankit Verma", email: "principal@gvschool.edu", mobile: "+91 97XXXXXX44", subscription: "Professional", licenseStatus: "Expiring", lastLogin: "Yesterday, 07:12 PM", status: "Pending" },
  { id: "SAD-003", school: "Ryan International", adminName: "Maya Singh", email: "principal@ryanjpr.edu", mobile: "+91 88XXXXXX22", subscription: "Starter", licenseStatus: "Expired", lastLogin: "3 days ago", status: "Disabled" },
  { id: "SAD-004", school: "Lotus Valley Academy", adminName: "Neha Arora", email: "principal@lotusvalley.edu", mobile: "+91 95XXXXXX11", subscription: "Professional", licenseStatus: "Active", lastLogin: "Today, 09:10 AM", status: "Active" }
];

export const invitationsSeed: Invitation[] = [
  { id: "INV-001", target: "Green Valley School", email: "admin@gvschool.edu", role: "School Administrator", status: "Pending", sentAt: "Today, 09:00 AM" },
  { id: "INV-002", target: "Ryan International", email: "ops@ryanjpr.edu", role: "School Administrator", status: "Expired", sentAt: "2 days ago" },
  { id: "INV-003", target: "Priya Singh", email: "priya@travo.ai", role: "Finance", status: "Accepted", sentAt: "Yesterday, 10:20 AM" }
];

export const loginSessionsSeed: LoginSession[] = [
  { id: "SES-001", user: "Mohit Kumar", device: "MacBook Pro", browser: "Chrome 138", ipAddress: "122.177.12.33", loginTime: "Today, 09:12 AM" },
  { id: "SES-002", user: "Radhika Sharma", device: "Windows Laptop", browser: "Edge 138", ipAddress: "103.85.214.52", loginTime: "Today, 08:30 AM" },
  { id: "SES-003", user: "Neha Arora", device: "iPhone 15", browser: "Safari", ipAddress: "49.37.188.11", loginTime: "Yesterday, 07:01 PM" }
];

export const auditLogsSeed: AuditLog[] = [
  { id: "AUD-001", event: "User Created", user: "Mohit Kumar", detail: "Created internal user Priya Singh", time: "Today, 08:45 AM" },
  { id: "AUD-002", event: "Password Reset", user: "Niharika Arora", detail: "Reset password for Green Valley admin", time: "Today, 08:02 AM" },
  { id: "AUD-003", event: "Login", user: "Radhika Sharma", detail: "Successful school admin login", time: "Today, 08:30 AM" },
  { id: "AUD-004", event: "Failed Login", user: "Unknown", detail: "3 failed attempts on Ryan admin", time: "Yesterday, 09:14 PM" },
  { id: "AUD-005", event: "Account Disabled", user: "Mohit Kumar", detail: "Disabled Ryan International admin", time: "Yesterday, 05:10 PM" }
];
