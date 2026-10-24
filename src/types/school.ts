/* =========================================================
   SCHOOL ONBOARDING TYPES
   ========================================================= */

export type SchoolType =
  | "GOVERNMENT"
  | "PRIVATE"
  | "AIDED"
  | "TRUST"
  | "INTERNATIONAL";

export type SchoolCategory =
  | "PRIMARY"
  | "SECONDARY"
  | "SENIOR_SECONDARY";

export type Board =
  | "CBSE"
  | "ICSE"
  | "IB"
  | "IGCSE"
  | "STATE_BOARD";

export type Medium =
  | "ENGLISH"
  | "HINDI"
  | "MARATHI"
  | "OTHER";

export type SchoolStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING";

export type Shift =
  | "MORNING"
  | "AFTERNOON"
  | "EVENING";

export type Gender =
  | "MALE"
  | "FEMALE"
  | "OTHER";

export type Qualification =
  | "B_ED"
  | "M_ED"
  | "PHD"
  | "OTHER";

export type FeeFrequency =
  | "MONTHLY"
  | "QUARTERLY"
  | "HALF_YEARLY"
  | "YEARLY";


/* =========================================================
   SCHOOL
   ========================================================= */

export interface SchoolDetails {
  schoolName: string;
  schoolCode: string;
  schoolShortName?: string;

  schoolType: SchoolType;

  boards: Board[];

  schoolCategory: SchoolCategory;

  mediums: Medium[];

  establishmentYear: number;

  udiseCode: string;

  affiliationNumber?: string;

  affiliationValidTill?: string;

  affiliationStartDate?: string;

  schoolStatus: SchoolStatus;

  schoolLogo?: File | null;
}


/* =========================================================
   ADDRESS
   ========================================================= */

export interface SchoolAddress {
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  village?: string;

  city: string;
  district: string;
  state: string;
  country: string;

  pinCode: string;

  latitude?: number;
  longitude?: number;
}


/* =========================================================
   CONTACT
   ========================================================= */

export interface SchoolContact {
  schoolEmail: string;
  alternateEmail?: string;

  mobileNumber: string;
  alternateMobile?: string;

  landline?: string;
  stdCode?: string;

  website?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
}


/* =========================================================
   PRINCIPAL
   ========================================================= */

export interface PrincipalDetails {
  principalName: string;

  gender?: Gender;

  dob?: string;

  mobile: string;

  email: string;

  qualification?: Qualification;

  experience?: number;

  joiningDate?: string;

  aadhaarNumber?: string;

  panNumber?: string;

  photo?: File | null;
}


/* =========================================================
   MANAGEMENT
   ========================================================= */

export interface ManagementDetails {
  trustName?: string;
  societyName?: string;

  chairmanName?: string;
  directorName?: string;
  secretaryName?: string;

  managementEmail?: string;
  managementMobile?: string;

  registrationNumber?: string;
  registrationDate?: string;

  gstNumber?: string;
  panNumber?: string;
}


/* =========================================================
   ACADEMIC SESSION
   ========================================================= */

export interface AcademicSession {
  academicSession: string;
  startDate?: string;
  endDate?: string;
}


/* =========================================================
   ACADEMIC STATISTICS
   ========================================================= */

export interface AcademicStatistics {
  boys: number;
  girls: number;

  teachers: number;

  teachingStaff: number;

  nonTeachingStaff: number;
}


/* =========================================================
   CLASS
   ========================================================= */

export interface SchoolClass {
  className: string;

  maximumStrength: number;

  currentStrength: number;

  numberOfSections: number;

  medium: Medium;

  shift: Shift;

  sections: SchoolSection[];
}


/* =========================================================
   SECTION
   ========================================================= */

export interface SchoolSection {
  sectionName: string;

  capacity?: number;

  currentStrength?: number;
}


/* =========================================================
   INFRASTRUCTURE
   ========================================================= */

export interface InfrastructureDetails {

  campusArea?: number;

  buildingArea?: number;

  smartClasses: number;

  computerLabs: number;

  scienceLabs: number;

  library: boolean;

  playground: boolean;

  auditorium: boolean;

  cctvInstalled: boolean;

  biometricInstalled: boolean;

  fireSafetyCertificate?: File | null;

  drinkingWater: boolean;

  toiletsBoys: number;

  toiletsGirls: number;

  staffRooms: number;
}


/* =========================================================
   FEES
   ========================================================= */

export interface FeeStructure {
  admissionFee: number;

  tuitionFee: number;

  annualFee: number;

  examFee: number;

  transportFee: number;

  hostelFee: number;

  feeFrequency: FeeFrequency;
}


/* =========================================================
   BANK ACCOUNT
   ========================================================= */

export interface BankAccount {
  bankName: string;

  branch: string;

  ifsc: string;

  accountNumber: string;

  accountHolder: string;

  cancelledCheque?: File | null;
}


/* =========================================================
   DOCUMENT
   ========================================================= */

export interface SchoolDocument {
  documentType: string;

  file: File | null;

  documentNumber?: string;

  validTill?: string;
}


/* =========================================================
   ERP CONFIGURATION
   ========================================================= */

export interface ERPConfiguration {

  erpEnabled: boolean;

  lmsEnabled: boolean;

  attendanceModule: boolean;

  transportModule: boolean;

  hostelModule: boolean;

  libraryModule: boolean;

  hrModule: boolean;

  payrollModule: boolean;

  financeModule: boolean;

  parentApp: boolean;

  studentApp: boolean;

  teacherApp: boolean;
}


/* =========================================================
   LOGIN CONFIGURATION
   ========================================================= */

export interface LoginConfiguration {

  adminUsername: string;

  passwordPolicy: string;

  twoFactorAuthentication: boolean;

  passwordExpiryDays: number;
}


/* =========================================================
   COMMUNICATION
   ========================================================= */

export interface CommunicationPreferences {

  smsEnabled: boolean;

  whatsappEnabled: boolean;

  emailEnabled: boolean;

  pushNotification: boolean;

  languagePreference: string;
}


/* =========================================================
   TRANSPORT
   ========================================================= */

export interface TransportDriver {
  name: string;
  mobile: string;
  licenseNumber?: string;
}

export interface TransportRoute {
  routeName: string;
  startPoint: string;
  endPoint: string;
}

export interface TransportVehicle {
  vehicleNumber: string;
  vehicleType?: string;
  capacity?: number;
}

export interface TransportDetails {

  transportAvailable: boolean;

  numberOfBuses?: number;

  gpsEnabled: boolean;

  drivers: TransportDriver[];

  routes: TransportRoute[];

  vehicles: TransportVehicle[];
}


/* =========================================================
   HOSTEL
   ========================================================= */

export interface HostelWarden {
  name: string;
  mobile: string;
}

export interface HostelDetails {

  hostelAvailable: boolean;

  boysHostel: boolean;

  girlsHostel: boolean;

  numberOfRooms?: number;

  capacity?: number;

  wardens: HostelWarden[];
}


/* =========================================================
   LIBRARY
   ========================================================= */

export interface LibraryDetails {

  totalBooks: number;

  eLibrary: boolean;

  rfidEnabled: boolean;

  librarySoftware?: string;
}


/* =========================================================
   SPORTS
   ========================================================= */

export interface SportsDetails {

  indoorGames: string[];

  outdoorGames: string[];

  /*
   * UI helper fields.
   * Convert these into arrays before API submission.
   */
  indoorGamesText?: string;

  outdoorGamesText?: string;

  swimmingPool: boolean;

  gymnasium: boolean;

  coachAvailable: boolean;
}


/* =========================================================
   MEDICAL
   ========================================================= */

export interface MedicalDetails {

  medicalRoom: boolean;

  doctorAvailable: boolean;

  nurseAvailable: boolean;

  ambulance: boolean;

  nearestHospital?: string;
}


/* =========================================================
   COMPLIANCE
   ========================================================= */

export interface ComplianceDetails {

  childSafetyPolicy?: File | null;

  poshPolicy?: File | null;

  antiRaggingPolicy?: File | null;

  disasterManagementPlan?: File | null;

  insuranceDetails?: File | null;
}


/* =========================================================
   INTEGRATIONS
   ========================================================= */

export interface IntegrationDetails {

  paymentGateway?: string;

  smsProvider?: string;

  whatsappApi?: string;

  googleWorkspace: boolean;

  microsoft365: boolean;

  zoomIntegration: boolean;

  biometricVendor?: string;
}


/* =========================================================
   ROOT FORM
   ========================================================= */

export interface SchoolOnboardingForm {
  school: SchoolDetails;

  address: SchoolAddress;

  contact: SchoolContact;

  principal: PrincipalDetails;

  management: ManagementDetails;

  academicSession: AcademicSession;

  academicStatistics: AcademicStatistics;

  classes: SchoolClass[];

  infrastructure: InfrastructureDetails;

  fees: FeeStructure;

  bankAccounts: BankAccount[];

  documents: SchoolDocument[];

  erpConfiguration: ERPConfiguration;

  loginConfiguration: LoginConfiguration;

  communication: CommunicationPreferences;

  transport: TransportDetails;

  hostel: HostelDetails;

  library: LibraryDetails;

  sports: SportsDetails;

  medical: MedicalDetails;

  compliance: ComplianceDetails;

  integrations: IntegrationDetails;
}

export interface FeeStructure {
  admissionFee: number;
  tuitionFee: number;
  annualFee: number;
  examFee: number;
  transportFee: number;
  hostelFee: number;
  feeFrequency:
    | "MONTHLY"
    | "QUARTERLY"
    | "HALF_YEARLY"
    | "YEARLY";
}

export interface FeeHead {
  feeHeadName: string;
  amount: number;
}

export interface ERPConfiguration {
  erpEnabled: boolean;
  lmsEnabled: boolean;
  attendanceModule: boolean;
  transportModule: boolean;
  hostelModule: boolean;
  libraryModule: boolean;
  hrModule: boolean;
  payrollModule: boolean;
  financeModule: boolean;
  parentApp: boolean;
  studentApp: boolean;
  teacherApp: boolean;
}

export interface ERPConfiguration {
  erpEnabled: boolean;
  lmsEnabled: boolean;
  attendanceModule: boolean;
  transportModule: boolean;
  hostelModule: boolean;
  libraryModule: boolean;
  hrModule: boolean;
  payrollModule: boolean;
  financeModule: boolean;
  parentApp: boolean;
  studentApp: boolean;
  teacherApp: boolean;
}

export interface LoginConfiguration {
  adminUsername: string;

  passwordPolicy: string;

  twoFactorAuthentication: boolean;

  passwordExpiryDays: number;
}

export interface CommunicationPreferences {
  smsEnabled: boolean;
  whatsappEnabled: boolean;
  emailEnabled: boolean;
  pushNotification: boolean;
  languagePreference: string;
}

export interface IntegrationDetails {
  paymentGateway?: string;
  smsProvider?: string;
  whatsappApi?: string;

  googleWorkspace: boolean;
  microsoft365: boolean;
  zoomIntegration: boolean;

  biometricVendor?: string;
}

export interface ComplianceDetails {
  childSafetyPolicy?: FileList | null;
  poshPolicy?: FileList | null;
  antiRaggingPolicy?: FileList | null;
  disasterManagementPlan?: FileList | null;
  insuranceDetails?: FileList | null;
}

