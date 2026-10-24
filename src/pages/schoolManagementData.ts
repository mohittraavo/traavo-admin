export type SchoolPermissionGroup = {
  module: string;
  permissions: Array<{ name: string; enabled: boolean }>;
};

export type SchoolRecord = {
  id: string;
  schoolName: string;
  schoolCode: string;
  registrationNumber: string;
  affiliationNumber: string;
  board: "CBSE" | "ICSE" | "IB";
  subscriptionPlan: "Starter" | "Professional" | "Enterprise";
  licenseStatus: "Active" | "Expiring" | "Expired";
  totalCampuses: number;
  totalStudents: number;
  schoolAdmin: { principalName: string; email: string; phone: string; lastLogin: string };
  status: "Active" | "Suspended";
  createdDate: string;
  establishedYear: number;
  website: string;
  logo: string;
  email: string;
  phone: string;
  subscription: {
    currentPlan: string;
    startDate: string;
    expiryDate: string;
    billingCycle: "Monthly" | "Quarterly" | "Yearly";
    paymentStatus: "Paid" | "Due";
    studentLimit: number;
    campusLimit: number;
    featureFlags: string[];
  };
  license: {
    licenseKey: string;
    licenseType: string;
    activeUntil: string;
    renewalDate: string;
    history: string[];
  };
  branding: {
    themeColor: string;
    schoolDomain: string;
    emailBranding: string;
  };
  analytics: {
    students: number;
    teachers: number;
    campuses: number;
    revenue: string;
    activeUsers: number;
  };
  permissions: SchoolPermissionGroup[];
  auditLog: string[];
};

export const schools: SchoolRecord[] = [
  {
    id: "SCH-001",
    schoolName: "Delhi Public School",
    schoolCode: "DPS-NCR",
    registrationNumber: "REG-55210",
    affiliationNumber: "AFF-CBSE-0191",
    board: "CBSE",
    subscriptionPlan: "Enterprise",
    licenseStatus: "Active",
    totalCampuses: 4,
    totalStudents: 12340,
    schoolAdmin: {
      principalName: "Radhika Sharma",
      email: "principal@dpsncr.edu",
      phone: "+91 98XXXXXX21",
      lastLogin: "Today, 08:30 AM"
    },
    status: "Active",
    createdDate: "2026-01-14",
    establishedYear: 1998,
    website: "https://dpsncr.edu",
    logo: "DPS Crest",
    email: "contact@dpsncr.edu",
    phone: "+91 11XXXXXX12",
    subscription: {
      currentPlan: "Enterprise",
      startDate: "2026-01-15",
      expiryDate: "2027-01-14",
      billingCycle: "Yearly",
      paymentStatus: "Paid",
      studentLimit: 20000,
      campusLimit: 8,
      featureFlags: ["Multi-Campus", "Advanced Reports", "Custom Branding", "SSO"]
    },
    license: {
      licenseKey: "TRV-ENT-DPS-2026-9911",
      licenseType: "Annual Enterprise",
      activeUntil: "2027-01-14",
      renewalDate: "2026-12-28",
      history: ["Created on 2026-01-15", "Upgraded seats on 2026-04-09"]
    },
    branding: {
      themeColor: "#0f766e",
      schoolDomain: "portal.dpsncr.edu",
      emailBranding: "DPS NCR"
    },
    analytics: {
      students: 12340,
      teachers: 512,
      campuses: 4,
      revenue: "₹2.20L MRR",
      activeUsers: 3950
    },
    permissions: [
      {
        module: "Students",
        permissions: [
          { name: "View", enabled: true },
          { name: "Create", enabled: true },
          { name: "Promote", enabled: true },
          { name: "Delete", enabled: false }
        ]
      },
      {
        module: "Fees",
        permissions: [
          { name: "View Ledger", enabled: true },
          { name: "Collect Fees", enabled: true },
          { name: "Refund", enabled: true },
          { name: "Waive", enabled: false }
        ]
      },
      {
        module: "Exams",
        permissions: [
          { name: "Schedule", enabled: true },
          { name: "Publish Results", enabled: true },
          { name: "Lock Marks", enabled: true }
        ]
      }
    ],
    auditLog: [
      "School Created - Jan 2026",
      "License Renewed - Apr 2026",
      "Admin Changed - May 2026",
      "Plan Upgraded - Jun 2026"
    ]
  },
  {
    id: "SCH-002",
    schoolName: "Green Valley School",
    schoolCode: "GVS-LKO",
    registrationNumber: "REG-10210",
    affiliationNumber: "AFF-ICSE-0220",
    board: "ICSE",
    subscriptionPlan: "Professional",
    licenseStatus: "Expiring",
    totalCampuses: 2,
    totalStudents: 6210,
    schoolAdmin: {
      principalName: "Ankit Verma",
      email: "principal@gvschool.edu",
      phone: "+91 97XXXXXX44",
      lastLogin: "Yesterday, 07:12 PM"
    },
    status: "Active",
    createdDate: "2026-02-09",
    establishedYear: 2006,
    website: "https://gvschool.edu",
    logo: "Green Valley Crest",
    email: "office@gvschool.edu",
    phone: "+91 52XXXXXX98",
    subscription: {
      currentPlan: "Professional",
      startDate: "2026-02-10",
      expiryDate: "2026-08-10",
      billingCycle: "Quarterly",
      paymentStatus: "Due",
      studentLimit: 9000,
      campusLimit: 3,
      featureFlags: ["Attendance Insights", "Parent App", "Report Cards"]
    },
    license: {
      licenseKey: "TRV-PRO-GVS-2026-1322",
      licenseType: "Quarterly Professional",
      activeUntil: "2026-08-10",
      renewalDate: "2026-08-01",
      history: ["Created on 2026-02-10", "Renewed on 2026-05-10"]
    },
    branding: {
      themeColor: "#1d4ed8",
      schoolDomain: "apps.gvschool.edu",
      emailBranding: "Green Valley"
    },
    analytics: {
      students: 6210,
      teachers: 258,
      campuses: 2,
      revenue: "₹1.05L MRR",
      activeUsers: 2150
    },
    permissions: [
      {
        module: "Students",
        permissions: [
          { name: "View", enabled: true },
          { name: "Create", enabled: true },
          { name: "Promote", enabled: false },
          { name: "Delete", enabled: false }
        ]
      },
      {
        module: "Fees",
        permissions: [
          { name: "View Ledger", enabled: true },
          { name: "Collect Fees", enabled: true },
          { name: "Refund", enabled: false },
          { name: "Waive", enabled: false }
        ]
      },
      {
        module: "Exams",
        permissions: [
          { name: "Schedule", enabled: true },
          { name: "Publish Results", enabled: false },
          { name: "Lock Marks", enabled: false }
        ]
      }
    ],
    auditLog: [
      "School Created - Feb 2026",
      "License Renewed - May 2026",
      "Admin Changed - Jul 2026"
    ]
  },
  {
    id: "SCH-003",
    schoolName: "Ryan International",
    schoolCode: "RYN-JPR",
    registrationNumber: "REG-73210",
    affiliationNumber: "AFF-IB-0208",
    board: "IB",
    subscriptionPlan: "Starter",
    licenseStatus: "Expired",
    totalCampuses: 1,
    totalStudents: 1890,
    schoolAdmin: {
      principalName: "Maya Singh",
      email: "principal@ryanjpr.edu",
      phone: "+91 88XXXXXX22",
      lastLogin: "3 days ago"
    },
    status: "Suspended",
    createdDate: "2026-03-21",
    establishedYear: 2014,
    website: "https://ryanjpr.edu",
    logo: "Ryan Mark",
    email: "helpdesk@ryanjpr.edu",
    phone: "+91 14XXXXXX52",
    subscription: {
      currentPlan: "Starter",
      startDate: "2026-03-22",
      expiryDate: "2026-07-22",
      billingCycle: "Monthly",
      paymentStatus: "Due",
      studentLimit: 2500,
      campusLimit: 1,
      featureFlags: ["Core SIS", "Basic Reports"]
    },
    license: {
      licenseKey: "TRV-STA-RYN-2026-7788",
      licenseType: "Monthly Starter",
      activeUntil: "2026-07-22",
      renewalDate: "2026-07-15",
      history: ["Created on 2026-03-22", "Renewed on 2026-06-22", "Expired on 2026-07-22"]
    },
    branding: {
      themeColor: "#b45309",
      schoolDomain: "school.ryanjpr.edu",
      emailBranding: "Ryan Jaipur"
    },
    analytics: {
      students: 1890,
      teachers: 96,
      campuses: 1,
      revenue: "₹0.42L MRR",
      activeUsers: 710
    },
    permissions: [
      {
        module: "Students",
        permissions: [
          { name: "View", enabled: true },
          { name: "Create", enabled: false },
          { name: "Promote", enabled: false },
          { name: "Delete", enabled: false }
        ]
      },
      {
        module: "Fees",
        permissions: [
          { name: "View Ledger", enabled: true },
          { name: "Collect Fees", enabled: false },
          { name: "Refund", enabled: false },
          { name: "Waive", enabled: false }
        ]
      },
      {
        module: "Exams",
        permissions: [
          { name: "Schedule", enabled: false },
          { name: "Publish Results", enabled: false },
          { name: "Lock Marks", enabled: false }
        ]
      }
    ],
    auditLog: [
      "School Created - Mar 2026",
      "Plan Downgraded - Jun 2026",
      "License Expired - Jul 2026"
    ]
  },
  {
    id: "SCH-004",
    schoolName: "Lotus Valley Academy",
    schoolCode: "LVA-GGN",
    registrationNumber: "REG-21450",
    affiliationNumber: "AFF-CBSE-0781",
    board: "CBSE",
    subscriptionPlan: "Professional",
    licenseStatus: "Active",
    totalCampuses: 3,
    totalStudents: 7920,
    schoolAdmin: {
      principalName: "Neha Arora",
      email: "principal@lotusvalley.edu",
      phone: "+91 95XXXXXX11",
      lastLogin: "Today, 09:10 AM"
    },
    status: "Active",
    createdDate: "2026-04-11",
    establishedYear: 2002,
    website: "https://lotusvalley.edu",
    logo: "Lotus Emblem",
    email: "office@lotusvalley.edu",
    phone: "+91 12XXXXXX43",
    subscription: {
      currentPlan: "Professional",
      startDate: "2026-04-12",
      expiryDate: "2026-10-12",
      billingCycle: "Quarterly",
      paymentStatus: "Paid",
      studentLimit: 10000,
      campusLimit: 4,
      featureFlags: ["Attendance Insights", "Transport", "Custom Reports"]
    },
    license: {
      licenseKey: "TRV-PRO-LVA-2026-3456",
      licenseType: "Quarterly Professional",
      activeUntil: "2026-10-12",
      renewalDate: "2026-10-02",
      history: ["Created on 2026-04-12"]
    },
    branding: {
      themeColor: "#0f766e",
      schoolDomain: "erp.lotusvalley.edu",
      emailBranding: "Lotus Valley"
    },
    analytics: {
      students: 7920,
      teachers: 312,
      campuses: 3,
      revenue: "₹1.30L MRR",
      activeUsers: 2780
    },
    permissions: [
      {
        module: "Students",
        permissions: [
          { name: "View", enabled: true },
          { name: "Create", enabled: true },
          { name: "Promote", enabled: true },
          { name: "Delete", enabled: false }
        ]
      }
    ],
    auditLog: ["School Created - Apr 2026", "Admin Changed - Jun 2026"]
  }
];
