import {
  useFormContext,
} from "react-hook-form";

import type {
  SchoolOnboardingForm,
} from "../../../types/school";
import { DataTable } from "../../common/DataTable";

interface Props {
  onEdit: (step: number) => void;
}

/* =========================================================
   EMPTY VALUE
   ========================================================= */

function EmptyValue() {
  return (
    <div className="review-empty">
      No data provided
    </div>
  );
}

/* =========================================================
   STEP 5 - REVIEW
   ========================================================= */

export default function Step5Review({
  onEdit,
}: Props) {
  const {
    watch,
  } = useFormContext<SchoolOnboardingForm>();

  const values = watch();

  const {
    school,
    address,
    contact,
    principal,
    management,
    academicSession,
    academicStatistics,
    classes,
    infrastructure,
    fees,
    bankAccounts,
    documents,
    erpConfiguration,
    loginConfiguration,
    communication,
    transport,
    hostel,
    library,
    sports,
    medical,
    compliance,
    integrations,
  } = values;

  return (
    <div className="review-container">

      {/* =====================================================
          STEP 1 - SCHOOL DETAILS
      ====================================================== */}

      <ReviewSection
        title="School Details"
        step={0}
        onEdit={onEdit}
      >

        {/* BASIC INFORMATION */}

        <ReviewGroup title="Basic Information">

          <ReviewItem
            label="School Name"
            value={school.schoolName}
          />

          <ReviewItem
            label="School Code"
            value={school.schoolCode}
          />

          <ReviewItem
            label="School Short Name"
            value={school.schoolShortName}
          />

          <ReviewItem
            label="School Type"
            value={school.schoolType}
          />

          <ReviewItem
            label="School Category"
            value={school.schoolCategory}
          />

          <ReviewItem
            label="Board"
            value={formatArray(school.boards)}
          />

          <ReviewItem
            label="Medium"
            value={formatArray(school.mediums)}
          />

          <ReviewItem
            label="Establishment Year"
            value={school.establishmentYear}
          />

          <ReviewItem
            label="UDISE Code"
            value={school.udiseCode}
          />

          <ReviewItem
            label="Affiliation Number"
            value={school.affiliationNumber}
          />

          <ReviewItem
            label="Affiliation Start Date"
            value={school.affiliationStartDate}
          />

          <ReviewItem
            label="Affiliation Valid Till"
            value={school.affiliationValidTill}
          />

          <ReviewItem
            label="School Status"
            value={school.schoolStatus}
          />

          <ReviewItem
            label="School Logo"
            value={
              school.schoolLogo
                ? "Uploaded"
                : "Not uploaded"
            }
          />

        </ReviewGroup>

        {/* ADDRESS */}

        <ReviewGroup title="Address Information">

          <ReviewItem
            label="Address Line 1"
            value={address.addressLine1}
          />

          <ReviewItem
            label="Address Line 2"
            value={address.addressLine2}
          />

          <ReviewItem
            label="Landmark"
            value={address.landmark}
          />

          <ReviewItem
            label="Village"
            value={address.village}
          />

          <ReviewItem
            label="City"
            value={address.city}
          />

          <ReviewItem
            label="District"
            value={address.district}
          />

          <ReviewItem
            label="State"
            value={address.state}
          />

          <ReviewItem
            label="Country"
            value={address.country}
          />

          <ReviewItem
            label="PIN Code"
            value={address.pinCode}
          />

          <ReviewItem
            label="Latitude"
            value={address.latitude}
          />

          <ReviewItem
            label="Longitude"
            value={address.longitude}
          />

        </ReviewGroup>

        {/* CONTACT */}

        <ReviewGroup title="Contact Information">

          <ReviewItem
            label="School Email"
            value={contact.schoolEmail}
          />

          <ReviewItem
            label="Alternate Email"
            value={contact.alternateEmail}
          />

          <ReviewItem
            label="Mobile Number"
            value={contact.mobileNumber}
          />

          <ReviewItem
            label="Alternate Mobile"
            value={contact.alternateMobile}
          />

          <ReviewItem
            label="Landline"
            value={contact.landline}
          />

          <ReviewItem
            label="STD Code"
            value={contact.stdCode}
          />

          <ReviewItem
            label="Website"
            value={contact.website}
          />

          <ReviewItem
            label="Facebook"
            value={contact.facebookUrl}
          />

          <ReviewItem
            label="Instagram"
            value={contact.instagramUrl}
          />

          <ReviewItem
            label="LinkedIn"
            value={contact.linkedinUrl}
          />

        </ReviewGroup>

        {/* PRINCIPAL */}

        <ReviewGroup title="Principal Details">

          <ReviewItem
            label="Principal Name"
            value={principal.principalName}
          />

          <ReviewItem
            label="Gender"
            value={principal.gender}
          />

          <ReviewItem
            label="Date of Birth"
            value={principal.dob}
          />

          <ReviewItem
            label="Mobile"
            value={principal.mobile}
          />

          <ReviewItem
            label="Email"
            value={principal.email}
          />

          <ReviewItem
            label="Qualification"
            value={principal.qualification}
          />

          <ReviewItem
            label="Experience"
            value={
              principal.experience !== undefined
                ? `${principal.experience} years`
                : undefined
            }
          />

          <ReviewItem
            label="Joining Date"
            value={principal.joiningDate}
          />

          <ReviewItem
            label="Aadhaar Number"
            value={maskValue(
              principal.aadhaarNumber
            )}
          />

          <ReviewItem
            label="PAN Number"
            value={principal.panNumber}
          />

          <ReviewItem
            label="Photo"
            value={
              principal.photo
                ? "Uploaded"
                : "Not uploaded"
            }
          />

        </ReviewGroup>

        {/* MANAGEMENT */}

        <ReviewGroup title="Management Details">

          <ReviewItem
            label="Trust Name"
            value={management.trustName}
          />

          <ReviewItem
            label="Society Name"
            value={management.societyName}
          />

          <ReviewItem
            label="Chairman"
            value={management.chairmanName}
          />

          <ReviewItem
            label="Director"
            value={management.directorName}
          />

          <ReviewItem
            label="Secretary"
            value={management.secretaryName}
          />

          <ReviewItem
            label="Management Email"
            value={management.managementEmail}
          />

          <ReviewItem
            label="Management Mobile"
            value={management.managementMobile}
          />

          <ReviewItem
            label="Registration Number"
            value={management.registrationNumber}
          />

          <ReviewItem
            label="Registration Date"
            value={management.registrationDate}
          />

          <ReviewItem
            label="GST Number"
            value={management.gstNumber}
          />

          <ReviewItem
            label="PAN Number"
            value={management.panNumber}
          />

        </ReviewGroup>

      </ReviewSection>


      {/* =====================================================
          STEP 2 - ACADEMIC
      ====================================================== */}

      <ReviewSection
        title="Academic"
        step={1}
        onEdit={onEdit}
      >

        {/* SESSION */}

        <ReviewGroup title="Academic Session">

          <ReviewItem
            label="Academic Session"
            value={
              academicSession.academicSession
            }
          />

          <ReviewItem
            label="Start Date"
            value={
              academicSession.startDate
            }
          />

          <ReviewItem
            label="End Date"
            value={
              academicSession.endDate
            }
          />

        </ReviewGroup>

        {/* STATISTICS */}

        <ReviewGroup title="School Statistics">

          <ReviewItem
            label="Boys"
            value={
              academicStatistics.boys
            }
          />

          <ReviewItem
            label="Girls"
            value={
              academicStatistics.girls
            }
          />

          <ReviewItem
            label="Total Students"
            value={
              academicStatistics.boys +
              academicStatistics.girls
            }
          />

          <ReviewItem
            label="Teachers"
            value={
              academicStatistics.teachers
            }
          />

          <ReviewItem
            label="Teaching Staff"
            value={
              academicStatistics.teachingStaff
            }
          />

          <ReviewItem
            label="Non Teaching Staff"
            value={
              academicStatistics.nonTeachingStaff
            }
          />

          <ReviewItem
            label="Student Teacher Ratio"
            value={calculateRatio(
              academicStatistics.boys +
                academicStatistics.girls,
              academicStatistics.teachers
            )}
          />

        </ReviewGroup>

        {/* CLASSES */}

        <ReviewGroup title="Class Configuration">

          {classes?.length ? (

            <div className="review-table-wrapper">
              <DataTable
                className="review-table"
                columns={[
                  { key: "className", header: "Class", render: (item) => item.className },
                  { key: "maximumStrength", header: "Maximum Strength", render: (item) => item.maximumStrength },
                  { key: "currentStrength", header: "Current Strength", render: (item) => item.currentStrength },
                  { key: "sections", header: "Sections", render: (item) => item.numberOfSections },
                  { key: "medium", header: "Medium", render: (item) => item.medium },
                  { key: "shift", header: "Shift", render: (item) => item.shift },
                ]}
                rows={classes}
                rowKey={(item) => `${item.className}-${item.medium}-${item.shift}`}
              />

            </div>

          ) : (

            <EmptyValue />

          )}

        </ReviewGroup>

      </ReviewSection>


      {/* =====================================================
          STEP 3 - OPERATIONS
      ====================================================== */}

      <ReviewSection
        title="Operations"
        step={2}
        onEdit={onEdit}
      >

        {/* INFRASTRUCTURE */}

        <ReviewGroup title="Infrastructure">

          <ReviewItem
            label="Campus Area"
            value={
              infrastructure.campusArea
            }
          />

          <ReviewItem
            label="Building Area"
            value={
              infrastructure.buildingArea
            }
          />

          <ReviewItem
            label="Smart Classes"
            value={
              infrastructure.smartClasses
            }
          />

          <ReviewItem
            label="Computer Labs"
            value={
              infrastructure.computerLabs
            }
          />

          <ReviewItem
            label="Science Labs"
            value={
              infrastructure.scienceLabs
            }
          />

          <ReviewItem
            label="Library"
            value={yesNo(
              infrastructure.library
            )}
          />

          <ReviewItem
            label="Playground"
            value={yesNo(
              infrastructure.playground
            )}
          />

          <ReviewItem
            label="Auditorium"
            value={yesNo(
              infrastructure.auditorium
            )}
          />

          <ReviewItem
            label="Hostel"
            value={yesNo(
              infrastructure.hostel
            )}
          />

          <ReviewItem
            label="Transport"
            value={yesNo(
              infrastructure.transport
            )}
          />

          <ReviewItem
            label="CCTV Installed"
            value={yesNo(
              infrastructure.cctvInstalled
            )}
          />

          <ReviewItem
            label="Biometric Installed"
            value={yesNo(
              infrastructure.biometricInstalled
            )}
          />

          <ReviewItem
            label="Fire Safety Certificate"
            value={
              infrastructure.fireSafetyCertificate
                ? "Uploaded"
                : "Not uploaded"
            }
          />

          <ReviewItem
            label="Drinking Water"
            value={yesNo(
              infrastructure.drinkingWater
            )}
          />

          <ReviewItem
            label="Boys Toilets"
            value={
              infrastructure.toiletsBoys
            }
          />

          <ReviewItem
            label="Girls Toilets"
            value={
              infrastructure.toiletsGirls
            }
          />

          <ReviewItem
            label="Staff Rooms"
            value={
              infrastructure.staffRooms
            }
          />

          <ReviewItem
            label="Medical Room"
            value={yesNo(
              infrastructure.medicalRoom
            )}
          />

        </ReviewGroup>


        {/* FEES */}

        <ReviewGroup title="Fee Structure">

          <ReviewItem
            label="Admission Fee"
            value={fees.admissionFee}
          />

          <ReviewItem
            label="Tuition Fee"
            value={fees.tuitionFee}
          />

          <ReviewItem
            label="Annual Fee"
            value={fees.annualFee}
          />

          <ReviewItem
            label="Exam Fee"
            value={fees.examFee}
          />

          <ReviewItem
            label="Transport Fee"
            value={fees.transportFee}
          />

          <ReviewItem
            label="Hostel Fee"
            value={fees.hostelFee}
          />

          <ReviewItem
            label="Fee Frequency"
            value={fees.feeFrequency}
          />

        </ReviewGroup>


        {/* BANK ACCOUNTS */}

        <ReviewGroup title="Bank Accounts">

          {bankAccounts?.length ? (

            <div className="review-table-wrapper">
              <DataTable
                className="review-table"
                columns={[
                  { key: "bank", header: "Bank", render: (account) => account.bankName },
                  { key: "branch", header: "Branch", render: (account) => account.branch },
                  { key: "ifsc", header: "IFSC", render: (account) => account.ifsc },
                  { key: "number", header: "Account Number", render: (account) => maskValue(account.accountNumber) },
                  { key: "holder", header: "Account Holder", render: (account) => account.accountHolder },
                  { key: "cheque", header: "Cheque", render: (account) => account.cancelledCheque ? "Uploaded" : "Not uploaded" },
                ]}
                rows={bankAccounts}
                rowKey={(account) => `${account.bankName}-${account.accountNumber}`}
              />

            </div>

          ) : (

            <EmptyValue />

          )}

        </ReviewGroup>


        {/* TRANSPORT */}

        <ReviewGroup title="Transport">

          <ReviewItem
            label="Transport Available"
            value={yesNo(
              transport.transportAvailable
            )}
          />

          <ReviewItem
            label="Number of Buses"
            value={
              transport.numberOfBuses
            }
          />

          <ReviewItem
            label="GPS Enabled"
            value={yesNo(
              transport.gpsEnabled
            )}
          />

          <ReviewItem
            label="Drivers"
            value={
              transport.drivers?.length ?? 0
            }
          />

          <ReviewItem
            label="Routes"
            value={
              transport.routes?.length ?? 0
            }
          />

          <ReviewItem
            label="Vehicles"
            value={
              transport.vehicles?.length ?? 0
            }
          />

        </ReviewGroup>


        {/* HOSTEL */}

        <ReviewGroup title="Hostel">

          <ReviewItem
            label="Hostel Available"
            value={yesNo(
              hostel.hostelAvailable
            )}
          />

          <ReviewItem
            label="Boys Hostel"
            value={yesNo(
              hostel.boysHostel
            )}
          />

          <ReviewItem
            label="Girls Hostel"
            value={yesNo(
              hostel.girlsHostel
            )}
          />

          <ReviewItem
            label="Number of Rooms"
            value={
              hostel.numberOfRooms
            }
          />

          <ReviewItem
            label="Capacity"
            value={
              hostel.capacity
            }
          />

          <ReviewItem
            label="Wardens"
            value={
              hostel.wardens?.length ?? 0
            }
          />

        </ReviewGroup>


        {/* LIBRARY */}

        <ReviewGroup title="Library">

          <ReviewItem
            label="Total Books"
            value={
              library.totalBooks
            }
          />

          <ReviewItem
            label="E-Library"
            value={yesNo(
              library.eLibrary
            )}
          />

          <ReviewItem
            label="RFID Enabled"
            value={yesNo(
              library.rfidEnabled
            )}
          />

          <ReviewItem
            label="Library Software"
            value={
              library.librarySoftware
            }
          />

        </ReviewGroup>


        {/* SPORTS */}

        <ReviewGroup title="Sports">

          <ReviewItem
            label="Indoor Games"
            value={formatArray(
              sports.indoorGames
            )}
          />

          <ReviewItem
            label="Outdoor Games"
            value={formatArray(
              sports.outdoorGames
            )}
          />

          <ReviewItem
            label="Swimming Pool"
            value={yesNo(
              sports.swimmingPool
            )}
          />

          <ReviewItem
            label="Gymnasium"
            value={yesNo(
              sports.gymnasium
            )}
          />

          <ReviewItem
            label="Coach Available"
            value={yesNo(
              sports.coachAvailable
            )}
          />

        </ReviewGroup>


        {/* MEDICAL */}

        <ReviewGroup title="Medical">

          <ReviewItem
            label="Medical Room"
            value={yesNo(
              medical.medicalRoom
            )}
          />

          <ReviewItem
            label="Doctor Available"
            value={yesNo(
              medical.doctorAvailable
            )}
          />

          <ReviewItem
            label="Nurse Available"
            value={yesNo(
              medical.nurseAvailable
            )}
          />

          <ReviewItem
            label="Ambulance"
            value={yesNo(
              medical.ambulance
            )}
          />

          <ReviewItem
            label="Nearest Hospital"
            value={
              medical.nearestHospital
            }
          />

        </ReviewGroup>


        {/* COMPLIANCE */}

        <ReviewGroup title="Compliance">

          <ReviewItem
            label="Child Safety Policy"
            value={uploaded(
              compliance.childSafetyPolicy
            )}
          />

          <ReviewItem
            label="POSH Policy"
            value={uploaded(
              compliance.poshPolicy
            )}
          />

          <ReviewItem
            label="Anti Ragging Policy"
            value={uploaded(
              compliance.antiRaggingPolicy
            )}
          />

          <ReviewItem
            label="Disaster Management Plan"
            value={uploaded(
              compliance.disasterManagementPlan
            )}
          />

          <ReviewItem
            label="Insurance Details"
            value={uploaded(
              compliance.insuranceDetails
            )}
          />

        </ReviewGroup>

      </ReviewSection>


      {/* =====================================================
          STEP 4 - CONFIGURATION
      ====================================================== */}

      <ReviewSection
        title="Configuration"
        step={3}
        onEdit={onEdit}
      >

        {/* ERP */}

        <ReviewGroup title="ERP Configuration">

          <ReviewItem
            label="ERP Enabled"
            value={yesNo(
              erpConfiguration.erpEnabled
            )}
          />

          <ReviewItem
            label="LMS Enabled"
            value={yesNo(
              erpConfiguration.lmsEnabled
            )}
          />

          <ReviewItem
            label="Attendance"
            value={yesNo(
              erpConfiguration.attendanceModule
            )}
          />

          <ReviewItem
            label="Transport"
            value={yesNo(
              erpConfiguration.transportModule
            )}
          />

          <ReviewItem
            label="Hostel"
            value={yesNo(
              erpConfiguration.hostelModule
            )}
          />

          <ReviewItem
            label="Library"
            value={yesNo(
              erpConfiguration.libraryModule
            )}
          />

          <ReviewItem
            label="HR"
            value={yesNo(
              erpConfiguration.hrModule
            )}
          />

          <ReviewItem
            label="Payroll"
            value={yesNo(
              erpConfiguration.payrollModule
            )}
          />

          <ReviewItem
            label="Finance"
            value={yesNo(
              erpConfiguration.financeModule
            )}
          />

          <ReviewItem
            label="Parent App"
            value={yesNo(
              erpConfiguration.parentApp
            )}
          />

          <ReviewItem
            label="Student App"
            value={yesNo(
              erpConfiguration.studentApp
            )}
          />

          <ReviewItem
            label="Teacher App"
            value={yesNo(
              erpConfiguration.teacherApp
            )}
          />

        </ReviewGroup>


        {/* LOGIN */}

        <ReviewGroup title="Login Configuration">

          <ReviewItem
            label="Admin Username"
            value={
              loginConfiguration.adminUsername
            }
          />

          <ReviewItem
            label="Password Policy"
            value={
              loginConfiguration.passwordPolicy
            }
          />

          <ReviewItem
            label="Two Factor Authentication"
            value={yesNo(
              loginConfiguration.twoFactorAuthentication
            )}
          />

          <ReviewItem
            label="Password Expiry Days"
            value={
              loginConfiguration.passwordExpiryDays
            }
          />

        </ReviewGroup>


        {/* COMMUNICATION */}

        <ReviewGroup title="Communication">

          <ReviewItem
            label="SMS"
            value={yesNo(
              communication.smsEnabled
            )}
          />

          <ReviewItem
            label="WhatsApp"
            value={yesNo(
              communication.whatsappEnabled
            )}
          />

          <ReviewItem
            label="Email"
            value={yesNo(
              communication.emailEnabled
            )}
          />

          <ReviewItem
            label="Push Notification"
            value={yesNo(
              communication.pushNotification
            )}
          />

          <ReviewItem
            label="Language"
            value={
              communication.languagePreference
            }
          />

        </ReviewGroup>


        {/* INTEGRATIONS */}

        <ReviewGroup title="Integrations">

          <ReviewItem
            label="Payment Gateway"
            value={
              integrations.paymentGateway
            }
          />

          <ReviewItem
            label="SMS Provider"
            value={
              integrations.smsProvider
            }
          />

          <ReviewItem
            label="WhatsApp API"
            value={
              integrations.whatsappApi
            }
          />

          <ReviewItem
            label="Google Workspace"
            value={yesNo(
              integrations.googleWorkspace
            )}
          />

          <ReviewItem
            label="Microsoft 365"
            value={yesNo(
              integrations.microsoft365
            )}
          />

          <ReviewItem
            label="Zoom"
            value={yesNo(
              integrations.zoomIntegration
            )}
          />

          <ReviewItem
            label="Biometric Vendor"
            value={
              integrations.biometricVendor
            }
          />

        </ReviewGroup>

      </ReviewSection>


      {/* =====================================================
          DOCUMENTS
      ====================================================== */}

      <ReviewSection
        title="Documents"
        step={3}
        onEdit={onEdit}
      >

        <ReviewGroup title="Uploaded Documents">

          {documents?.length ? (

            <div className="review-table-wrapper">
              <DataTable
                className="review-table"
                columns={[
                  { key: "type", header: "Document Type", render: (document) => document.documentType },
                  { key: "status", header: "Status", render: (document) => document.file ? "Uploaded" : "Not uploaded" },
                ]}
                rows={documents}
                rowKey={(document) => document.documentType}
              />

            </div>

          ) : (

            <EmptyValue />

          )}

        </ReviewGroup>

      </ReviewSection>


      {/* =====================================================
          SUBMISSION NOTICE
      ====================================================== */}

      <div className="review-submit-notice">

        <strong>
          Ready for Approval
        </strong>

        <p>
          Please verify all information above.
          Once submitted, this school will be
          sent for approval.
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   REVIEW SECTION
========================================================= */

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="review-card">

      <div className="review-card-header">

        <div className="review-title">

          <span className="review-check">
            ✓
          </span>

          <h3>
            {title}
          </h3>

        </div>

        <button
          type="button"
          className="btn btn-ghost btn-xs"
          onClick={() => onEdit(step)}
        >
          Edit
        </button>

      </div>

      <div className="review-card-body">
        {children}
      </div>

    </section>
  );
}


/* =========================================================
   REVIEW GROUP
========================================================= */

function ReviewGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="review-group">

      <h4>
        {title}
      </h4>

      <div className="review-grid">
        {children}
      </div>

    </div>
  );
}


/* =========================================================
   REVIEW ITEM
========================================================= */

function ReviewItem({
  label,
  value,
}: {
  label: string;
  value?: unknown;
}) {
  return (
    <div className="review-item">

      <span className="review-label">
        {label}
      </span>

      <span className="review-value">
        {formatValue(value)}
      </span>

    </div>
  );
}


/* =========================================================
   HELPERS
========================================================= */

function formatArray(
  value?: string[]
): string {
  if (
    !Array.isArray(value) ||
    value.length === 0
  ) {
    return "Not provided";
  }

  return value.join(", ");
}


function formatValue(
  value?: unknown
): string {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value
      ? "Yes"
      : "No";
  }

  return String(value);
}


function yesNo(
  value?: boolean
): string {
  if (
    value === undefined ||
    value === null
  ) {
    return "Not provided";
  }

  return value
    ? "Yes"
    : "No";
}


function uploaded(
  value?: unknown
): string {
  if (!value) {
    return "Not uploaded";
  }

  if (
    Array.isArray(value) &&
    value.length === 0
  ) {
    return "Not uploaded";
  }

  return "Uploaded";
}


function maskValue(
  value?: string
): string {
  if (!value) {
    return "Not provided";
  }

  if (value.length <= 4) {
    return "****";
  }

  return `${"*".repeat(
    value.length - 4
  )}${value.slice(-4)}`;
}


function calculateRatio(
  students?: number,
  teachers?: number
): string {
  if (
    students === undefined ||
    teachers === undefined ||
    teachers <= 0
  ) {
    return "Not available";
  }

  return `1 : ${(students / teachers).toFixed(2)}`;
}