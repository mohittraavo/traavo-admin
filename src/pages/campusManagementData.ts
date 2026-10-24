export type CampusPermissionGroup = {
  module: string;
  permissions: Array<{ name: string; enabled: boolean }>;
};

export type CampusRecord = {
  id: string;
  schoolName: string;
  campusName: string;
  campusCode: string;
  city: string;
  principal: { name: string; mobile: string; email: string };
  students: number;
  teachers: number;
  classes: number;
  status: "Active" | "Disabled";
  basic: {
    address: string;
    state: string;
    city: string;
    pincode: string;
    latitude: string;
    longitude: string;
  };
  capacity: {
    maxStudents: number;
    currentStudents: number;
    maxTeachers: number;
    currentTeachers: number;
    buildings: number;
    classrooms: number;
  };
  academic: {
    session: string;
    classes: string;
    sections: number;
    streams: string;
    subjects: string;
  };
  facilities: string[];
  statistics: {
    attendance: string;
    feesCollection: string;
    pendingFees: string;
  };
  timings: {
    openingTime: string;
    closingTime: string;
    weeklyOff: string;
    holidays: string;
  };
  permissions: CampusPermissionGroup[];
};

export const campuses: CampusRecord[] = [
  {
    id: "CMP-001",
    schoolName: "Delhi Public School",
    campusName: "Noida Campus",
    campusCode: "DPS-NOI",
    city: "Noida",
    principal: { name: "Rohit Bansal", mobile: "+91 98XXXXXX77", email: "noida.principal@dpsncr.edu" },
    students: 4520,
    teachers: 202,
    classes: 84,
    status: "Active",
    basic: {
      address: "Sector 132, Expressway",
      state: "Uttar Pradesh",
      city: "Noida",
      pincode: "201304",
      latitude: "28.5123",
      longitude: "77.4011"
    },
    capacity: {
      maxStudents: 5000,
      currentStudents: 4520,
      maxTeachers: 240,
      currentTeachers: 202,
      buildings: 5,
      classrooms: 118
    },
    academic: {
      session: "2026-2027",
      classes: "Nursery-12",
      sections: 128,
      streams: "Science, Commerce, Humanities",
      subjects: "Math, Science, Accounts, CS, Arts"
    },
    facilities: ["Library", "Transport", "Cafeteria", "Smart Classes", "Laboratory", "Sports Complex"],
    statistics: {
      attendance: "93.4%",
      feesCollection: "₹1.24Cr",
      pendingFees: "₹12.6L"
    },
    timings: {
      openingTime: "07:30 AM",
      closingTime: "02:40 PM",
      weeklyOff: "Sunday",
      holidays: "Second Saturday + National"
    },
    permissions: [
      {
        module: "Attendance",
        permissions: [
          { name: "Mark Attendance", enabled: true },
          { name: "Edit Past Entries", enabled: true },
          { name: "Export Reports", enabled: true }
        ]
      },
      {
        module: "Fees",
        permissions: [
          { name: "Collect Fees", enabled: true },
          { name: "Apply Discount", enabled: true },
          { name: "Refund", enabled: false }
        ]
      },
      {
        module: "Transport",
        permissions: [
          { name: "Assign Routes", enabled: true },
          { name: "Track Vehicles", enabled: true }
        ]
      }
    ]
  },
  {
    id: "CMP-002",
    schoolName: "Delhi Public School",
    campusName: "Delhi Campus",
    campusCode: "DPS-DEL",
    city: "Delhi",
    principal: { name: "Aditi Rao", mobile: "+91 99XXXXXX53", email: "delhi.principal@dpsncr.edu" },
    students: 3890,
    teachers: 176,
    classes: 71,
    status: "Active",
    basic: {
      address: "Dwarka Sector 23",
      state: "Delhi",
      city: "Delhi",
      pincode: "110077",
      latitude: "28.5728",
      longitude: "77.0678"
    },
    capacity: {
      maxStudents: 4200,
      currentStudents: 3890,
      maxTeachers: 210,
      currentTeachers: 176,
      buildings: 4,
      classrooms: 97
    },
    academic: {
      session: "2026-2027",
      classes: "KG-12",
      sections: 112,
      streams: "Science, Commerce",
      subjects: "Physics, Chemistry, Math, Economics"
    },
    facilities: ["Library", "Hostel", "Transport", "Smart Classes", "Laboratory"],
    statistics: {
      attendance: "92.1%",
      feesCollection: "₹98L",
      pendingFees: "₹9.1L"
    },
    timings: {
      openingTime: "07:45 AM",
      closingTime: "02:30 PM",
      weeklyOff: "Sunday",
      holidays: "Second Saturday + National"
    },
    permissions: [
      {
        module: "Attendance",
        permissions: [
          { name: "Mark Attendance", enabled: true },
          { name: "Edit Past Entries", enabled: false },
          { name: "Export Reports", enabled: true }
        ]
      },
      {
        module: "Fees",
        permissions: [
          { name: "Collect Fees", enabled: true },
          { name: "Apply Discount", enabled: false },
          { name: "Refund", enabled: false }
        ]
      }
    ]
  },
  {
    id: "CMP-003",
    schoolName: "Green Valley School",
    campusName: "Lucknow Campus",
    campusCode: "GVS-LKO-1",
    city: "Lucknow",
    principal: { name: "Nikhil Tandon", mobile: "+91 93XXXXXX18", email: "principal@gvslucknow.edu" },
    students: 2410,
    teachers: 96,
    classes: 43,
    status: "Disabled",
    basic: {
      address: "Gomti Nagar Extension",
      state: "Uttar Pradesh",
      city: "Lucknow",
      pincode: "226010",
      latitude: "26.8500",
      longitude: "80.9499"
    },
    capacity: {
      maxStudents: 3000,
      currentStudents: 2410,
      maxTeachers: 130,
      currentTeachers: 96,
      buildings: 3,
      classrooms: 52
    },
    academic: {
      session: "2026-2027",
      classes: "Nursery-10",
      sections: 64,
      streams: "General",
      subjects: "Core K-10"
    },
    facilities: ["Library", "Cafeteria", "Smart Classes", "Sports Complex"],
    statistics: {
      attendance: "90.2%",
      feesCollection: "₹54L",
      pendingFees: "₹7.5L"
    },
    timings: {
      openingTime: "08:00 AM",
      closingTime: "02:10 PM",
      weeklyOff: "Sunday",
      holidays: "Second Saturday + National"
    },
    permissions: [
      {
        module: "Attendance",
        permissions: [
          { name: "Mark Attendance", enabled: false },
          { name: "Edit Past Entries", enabled: false },
          { name: "Export Reports", enabled: true }
        ]
      },
      {
        module: "Fees",
        permissions: [
          { name: "Collect Fees", enabled: false },
          { name: "Apply Discount", enabled: false },
          { name: "Refund", enabled: false }
        ]
      }
    ]
  },
  {
    id: "CMP-004",
    schoolName: "Ryan International",
    campusName: "Jaipur Campus",
    campusCode: "RYN-JPR-1",
    city: "Jaipur",
    principal: { name: "Madhav Joshi", mobile: "+91 94XXXXXX60", email: "principal@ryanjpr.edu" },
    students: 1890,
    teachers: 88,
    classes: 36,
    status: "Active",
    basic: {
      address: "Jagatpura Main Road",
      state: "Rajasthan",
      city: "Jaipur",
      pincode: "302017",
      latitude: "26.8467",
      longitude: "75.8475"
    },
    capacity: {
      maxStudents: 2400,
      currentStudents: 1890,
      maxTeachers: 118,
      currentTeachers: 88,
      buildings: 2,
      classrooms: 44
    },
    academic: {
      session: "2026-2027",
      classes: "Nursery-8",
      sections: 48,
      streams: "General",
      subjects: "Core K-8"
    },
    facilities: ["Library", "Transport", "Smart Classes", "Sports Complex"],
    statistics: {
      attendance: "91.8%",
      feesCollection: "₹41L",
      pendingFees: "₹4.2L"
    },
    timings: {
      openingTime: "07:50 AM",
      closingTime: "02:00 PM",
      weeklyOff: "Sunday",
      holidays: "Second Saturday + National"
    },
    permissions: [
      {
        module: "Attendance",
        permissions: [
          { name: "Mark Attendance", enabled: true },
          { name: "Edit Past Entries", enabled: false },
          { name: "Export Reports", enabled: true }
        ]
      },
      {
        module: "Transport",
        permissions: [
          { name: "Assign Routes", enabled: true },
          { name: "Track Vehicles", enabled: false }
        ]
      }
    ]
  }
];
