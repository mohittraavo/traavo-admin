import { useNavigate, useParams } from "react-router-dom";
import { useGetSchoolQuery } from "../store/tcmsApi";
import { DataTable } from "../components/common/DataTable";
import "../styles/school-details.css";
function display(value: unknown): string {
  if (value === undefined || value === null || value === "") {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

function yesNo(value?: boolean | null): string {
  if (value === undefined || value === null) {
    return "Not provided";
  }

  return value ? "Yes" : "No";
}

function formatArray(value?: unknown[] | null): string {
  if (!Array.isArray(value) || value.length === 0) {
    return "Not provided";
  }

  return value.map(String).join(", ");
}

function uploaded(value: unknown): string {
  if (!value) {
    return "Not uploaded";
  }

  if (Array.isArray(value) && value.length === 0) {
    return "Not uploaded";
  }

  return "Uploaded";
}

function maskValue(value?: string | null): string {
  if (!value) {
    return "Not provided";
  }

  if (value.length <= 4) {
    return "****";
  }

  return `${"*".repeat(value.length - 4)}${value.slice(-4)}`;
}

function calculateRatio(
  students?: number | null,
  teachers?: number | null,
): string {
  if (
    students === undefined ||
    students === null ||
    teachers === undefined ||
    teachers === null ||
    teachers <= 0
  ) {
    return "Not available";
  }

  return `1 : ${(students / teachers).toFixed(2)}`;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="school-detail-section">
      <div className="school-detail-section-header">
        <div>
          <h3>{title}</h3>
        </div>
      </div>

      <div className="school-detail-section-body">{children}</div>
    </section>
  );
}

function DetailCard({
  title,
  children,
  fullWidth = false,
}: {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <article
      className={`school-detail-card ${
        fullWidth ? "school-detail-card-full" : ""
      }`}
    >
      <div className="school-detail-card-header">
        <h4>{title}</h4>
      </div>

      <div className="school-detail-card-body">{children}</div>
    </article>
  );
}

function DetailGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="school-detail-grid">{children}</div>;
}

function DetailItem({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value?: unknown;
  fullWidth?: boolean;
}) {
  return (
    <div className={`school-detail-item ${fullWidth ? "span-2" : ""}`}>
      <span className="school-detail-label">{label}</span>
      <strong className="school-detail-value">{display(value)}</strong>
    </div>
  );
}

function StatusBadge({
  value,
}: {
  value?: unknown;
}) {
  const status = display(value);

  const normalized = status.toLowerCase();

  let className = "school-status-badge";

  if (
    normalized === "active" ||
    normalized === "approved" ||
    normalized === "paid"
  ) {
    className += " success";
  } else if (
    normalized === "inactive" ||
    normalized === "expired" ||
    normalized === "unpaid"
  ) {
    className += " danger";
  } else {
    className += " neutral";
  }

  return <span className={className}>{status}</span>;
}

function EmptyTable({
  message = "No records available",
}: {
  message?: string;
}) {
  return (
    <div className="school-detail-empty">
      <span>{message}</span>
    </div>
  );
}

export function SchoolDetailPage() {
  const navigate = useNavigate();
  const { schoolId } = useParams();

  const {
    data: school,
    isLoading,
    isError,
  } = useGetSchoolQuery(schoolId ?? "", {
    skip: !schoolId,
  });

  if (isLoading) {
    return (
      <section className="surface-panel school-detail-loading">
        <div className="school-detail-spinner" />
        <h3>Loading School</h3>
        <p className="lead">
          Fetching school profile and configuration details...
        </p>
      </section>
    );
  }

  if (isError || !school) {
    return (
      <section className="surface-panel school-detail-not-found">
        <div className="school-detail-error-icon">!</div>

        <h3>School Not Found</h3>

        <p className="lead">
          The selected school record does not exist or could not be loaded.
        </p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            navigate("/school-management?tab=schools")
          }
        >
          Back to Listing
        </button>
      </section>
    );
  }

  const totalStudents =
    school.academicStatistics?.boys != null &&
    school.academicStatistics?.girls != null
      ? school.academicStatistics.boys +
        school.academicStatistics.girls
      : school.analytics?.students ?? 0;

  return (
    <div className="module-page-stack school-detail-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="surface-panel school-detail-hero">
        <div className="school-detail-hero-left">

          <div className="school-logo-large">
            {school.logo ? (
              <img
                src={school.logo}
                alt={`${school.schoolName} logo`}
              />
            ) : (
              <span>
                {school.schoolName?.charAt(0)?.toUpperCase() || "S"}
              </span>
            )}
          </div>

          <div className="school-detail-title">
            <div className="school-detail-title-row">
              <h2>{school.schoolName}</h2>

              <StatusBadge value={school.schoolStatus} />
            </div>

            <p>
              School Code:{" "}
              <strong>{display(school.schoolCode)}</strong>
            </p>

            <p>
              {display(school.board)} · Established{" "}
              {display(school.establishedYear)}
            </p>
          </div>

        </div>

        <div className="school-detail-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() =>
              navigate("/school-management?tab=schools")
            }
          >
            ← Back to Listing
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              navigate(`/school-management/${school.id}/edit`)
            }
          >
            Edit School
          </button>
        </div>
      </section>

      {/* =====================================================
          QUICK STATS
      ====================================================== */}

      <section className="school-detail-stats">

        <div className="school-stat-card">
          <span>Students</span>
          <strong>
            {school.analytics?.students ?? totalStudents}
          </strong>
        </div>

        <div className="school-stat-card">
          <span>Teachers</span>
          <strong>
            {school.analytics?.teachers ?? 0}
          </strong>
        </div>

        <div className="school-stat-card">
          <span>Campuses</span>
          <strong>
            {school.analytics?.campuses ?? 0}
          </strong>
        </div>

        <div className="school-stat-card">
          <span>Active Users</span>
          <strong>
            {school.analytics?.activeUsers ?? 0}
          </strong>
        </div>

        <div className="school-stat-card">
          <span>Subscription</span>
          <strong>
            {display(school.subscription?.currentPlan)}
          </strong>
        </div>

      </section>

      {/* =====================================================
          SCHOOL OVERVIEW
      ====================================================== */}

      <Section title="School Overview">

        <DetailGrid>

          <DetailCard title="Basic Information">

            <DetailGrid>
              <DetailItem
                label="School Name"
                value={school.schoolName}
              />

              <DetailItem
                label="School Code"
                value={school.schoolCode}
              />

              <DetailItem
                label="Registration Number"
                value={school.registrationNumber}
              />

              <DetailItem
                label="Affiliation Number"
                value={school.affiliationNumber}
              />

              <DetailItem
                label="Board"
                value={school.board}
              />

              <DetailItem
                label="Established Year"
                value={school.establishedYear}
              />

              <DetailItem
                label="Website"
                value={school.website}
              />

              <DetailItem
                label="Email"
                value={school.email}
              />

              <DetailItem
                label="Phone"
                value={school.phone}
              />

              <DetailItem
                label="Logo"
                value={uploaded(school.logo)}
              />
            </DetailGrid>

          </DetailCard>

          <DetailCard title="Address">

            <DetailGrid>

              <DetailItem
                label="Address Line 1"
                value={school.address?.addressLine1}
                fullWidth
              />

              <DetailItem
                label="Address Line 2"
                value={school.address?.addressLine2}
                fullWidth
              />

              <DetailItem
                label="Landmark"
                value={school.address?.landmark}
              />

              <DetailItem
                label="Village"
                value={school.address?.village}
              />

              <DetailItem
                label="City"
                value={school.address?.city}
              />

              <DetailItem
                label="District"
                value={school.address?.district}
              />

              <DetailItem
                label="State"
                value={school.address?.state}
              />

              <DetailItem
                label="Country"
                value={school.address?.country}
              />

              <DetailItem
                label="PIN Code"
                value={school.address?.pinCode}
              />

              <DetailItem
                label="Latitude"
                value={school.address?.latitude}
              />

              <DetailItem
                label="Longitude"
                value={school.address?.longitude}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard
            title="Contact Information"
            fullWidth
          >

            <DetailGrid>

              <DetailItem
                label="School Email"
                value={school.contact?.schoolEmail}
              />

              <DetailItem
                label="Alternate Email"
                value={school.contact?.alternateEmail}
              />

              <DetailItem
                label="Mobile Number"
                value={school.contact?.mobileNumber}
              />

              <DetailItem
                label="Alternate Mobile"
                value={school.contact?.alternateMobile}
              />

              <DetailItem
                label="Landline"
                value={school.contact?.landline}
              />

              <DetailItem
                label="STD Code"
                value={school.contact?.stdCode}
              />

              <DetailItem
                label="Website"
                value={school.contact?.website}
              />

              <DetailItem
                label="Facebook"
                value={school.contact?.facebookUrl}
              />

              <DetailItem
                label="Instagram"
                value={school.contact?.instagramUrl}
              />

              <DetailItem
                label="LinkedIn"
                value={school.contact?.linkedinUrl}
              />

            </DetailGrid>

          </DetailCard>

        </DetailGrid>

      </Section>

      {/* =====================================================
          ADMINISTRATION
      ====================================================== */}

      <Section title="Administration">

        <DetailGrid>

          <DetailCard title="School Admin">

            <DetailGrid>

              <DetailItem
                label="Principal Name"
                value={school.schoolAdmin?.principalName}
              />

              <DetailItem
                label="Email"
                value={school.schoolAdmin?.email}
              />

              <DetailItem
                label="Phone"
                value={school.schoolAdmin?.phone}
              />

              <DetailItem
                label="Last Login"
                value={school.schoolAdmin?.lastLogin}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Management">

            <DetailGrid>

              <DetailItem
                label="Trust Name"
                value={school.management?.trustName}
              />

              <DetailItem
                label="Society Name"
                value={school.management?.societyName}
              />

              <DetailItem
                label="Chairman"
                value={school.management?.chairmanName}
              />

              <DetailItem
                label="Director"
                value={school.management?.directorName}
              />

              <DetailItem
                label="Secretary"
                value={school.management?.secretaryName}
              />

              <DetailItem
                label="Management Email"
                value={school.management?.managementEmail}
              />

              <DetailItem
                label="Management Mobile"
                value={school.management?.managementMobile}
              />

              <DetailItem
                label="Registration Number"
                value={school.management?.registrationNumber}
              />

              <DetailItem
                label="Registration Date"
                value={school.management?.registrationDate}
              />

              <DetailItem
                label="GST Number"
                value={school.management?.gstNumber}
              />

              <DetailItem
                label="PAN Number"
                value={school.management?.panNumber}
              />

            </DetailGrid>

          </DetailCard>

        </DetailGrid>

      </Section>

      {/* =====================================================
          ACADEMIC
      ====================================================== */}

      <Section title="Academic">

        <DetailGrid>

          <DetailCard title="Academic Session">

            <DetailGrid>

              <DetailItem
                label="Academic Session"
                value={school.academicSession?.academicSession}
              />

              <DetailItem
                label="Start Date"
                value={school.academicSession?.startDate}
              />

              <DetailItem
                label="End Date"
                value={school.academicSession?.endDate}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="School Statistics">

            <DetailGrid>

              <DetailItem
                label="Boys"
                value={school.academicStatistics?.boys}
              />

              <DetailItem
                label="Girls"
                value={school.academicStatistics?.girls}
              />

              <DetailItem
                label="Total Students"
                value={
                  school.academicStatistics
                    ? totalStudents
                    : undefined
                }
              />

              <DetailItem
                label="Teachers"
                value={school.academicStatistics?.teachers}
              />

              <DetailItem
                label="Teaching Staff"
                value={
                  school.academicStatistics?.teachingStaff
                }
              />

              <DetailItem
                label="Non Teaching Staff"
                value={
                  school.academicStatistics?.nonTeachingStaff
                }
              />

              <DetailItem
                label="Student Teacher Ratio"
                value={calculateRatio(
                  school.academicStatistics?.boys != null &&
                    school.academicStatistics?.girls != null
                    ? totalStudents
                    : undefined,
                  school.academicStatistics?.teachers,
                )}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard
            title="Class Configuration"
            fullWidth
          >

            {school.classes?.length ? (
              <div className="school-detail-table-wrapper">
                <DataTable
                  className="school-detail-table"
                  columns={[
                    { key: "className", header: "Class", render: (item: any) => display(item.className) },
                    { key: "maximumStrength", header: "Maximum Strength", render: (item: any) => display(item.maximumStrength) },
                    { key: "currentStrength", header: "Current Strength", render: (item: any) => display(item.currentStrength) },
                    { key: "sections", header: "Sections", render: (item: any) => display(item.numberOfSections) },
                    { key: "medium", header: "Medium", render: (item: any) => display(item.medium) },
                    { key: "shift", header: "Shift", render: (item: any) => display(item.shift) },
                  ]}
                  rows={school.classes}
                  rowKey={(item: any) => `${item.className}-${item.medium}-${item.shift}`}
                />
              </div>
            ) : (
              <EmptyTable />
            )}

          </DetailCard>

        </DetailGrid>

      </Section>

      {/* =====================================================
          OPERATIONS
      ====================================================== */}

      <Section title="Operations">

        <DetailGrid>

          <DetailCard title="Infrastructure">

            <DetailGrid>

              <DetailItem
                label="Campus Area"
                value={school.infrastructure?.campusArea}
              />

              <DetailItem
                label="Building Area"
                value={school.infrastructure?.buildingArea}
              />

              <DetailItem
                label="Smart Classes"
                value={school.infrastructure?.smartClasses}
              />

              <DetailItem
                label="Computer Labs"
                value={school.infrastructure?.computerLabs}
              />

              <DetailItem
                label="Science Labs"
                value={school.infrastructure?.scienceLabs}
              />

              <DetailItem
                label="Library"
                value={yesNo(school.infrastructure?.library)}
              />

              <DetailItem
                label="Playground"
                value={yesNo(school.infrastructure?.playground)}
              />

              <DetailItem
                label="Auditorium"
                value={yesNo(school.infrastructure?.auditorium)}
              />

              <DetailItem
                label="Hostel"
                value={yesNo(school.infrastructure?.hostel)}
              />

              <DetailItem
                label="Transport"
                value={yesNo(school.infrastructure?.transport)}
              />

              <DetailItem
                label="CCTV Installed"
                value={yesNo(school.infrastructure?.cctvInstalled)}
              />

              <DetailItem
                label="Biometric Installed"
                value={yesNo(school.infrastructure?.biometricInstalled)}
              />

              <DetailItem
                label="Fire Safety Certificate"
                value={uploaded(
                  school.infrastructure?.fireSafetyCertificate,
                )}
              />

              <DetailItem
                label="Drinking Water"
                value={yesNo(
                  school.infrastructure?.drinkingWater,
                )}
              />

              <DetailItem
                label="Boys Toilets"
                value={school.infrastructure?.toiletsBoys}
              />

              <DetailItem
                label="Girls Toilets"
                value={school.infrastructure?.toiletsGirls}
              />

              <DetailItem
                label="Staff Rooms"
                value={school.infrastructure?.staffRooms}
              />

              <DetailItem
                label="Medical Room"
                value={yesNo(
                  school.infrastructure?.medicalRoom,
                )}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Fee Structure">

            <DetailGrid>

              <DetailItem
                label="Admission Fee"
                value={school.fees?.admissionFee}
              />

              <DetailItem
                label="Tuition Fee"
                value={school.fees?.tuitionFee}
              />

              <DetailItem
                label="Annual Fee"
                value={school.fees?.annualFee}
              />

              <DetailItem
                label="Exam Fee"
                value={school.fees?.examFee}
              />

              <DetailItem
                label="Transport Fee"
                value={school.fees?.transportFee}
              />

              <DetailItem
                label="Hostel Fee"
                value={school.fees?.hostelFee}
              />

              <DetailItem
                label="Fee Frequency"
                value={school.fees?.feeFrequency}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard
            title="Bank Accounts"
            fullWidth
          >

            {school.bankAccounts?.length ? (
              <div className="school-detail-table-wrapper">
                <DataTable
                  className="school-detail-table"
                  columns={[
                    { key: "bank", header: "Bank", render: (account: any) => display(account.bankName) },
                    { key: "branch", header: "Branch", render: (account: any) => display(account.branch) },
                    { key: "ifsc", header: "IFSC", render: (account: any) => display(account.ifsc) },
                    { key: "number", header: "Account Number", render: (account: any) => maskValue(account.accountNumber) },
                    { key: "holder", header: "Account Holder", render: (account: any) => display(account.accountHolder) },
                    { key: "cheque", header: "Cheque", render: (account: any) => uploaded(account.cancelledCheque) },
                  ]}
                  rows={school.bankAccounts}
                  rowKey={(account: any) => `${account.bankName}-${account.accountNumber}`}
                />
              </div>
            ) : (
              <EmptyTable />
            )}

          </DetailCard>

          <DetailCard title="Transport">

            <DetailGrid>

              <DetailItem
                label="Transport Available"
                value={yesNo(
                  school.transport?.transportAvailable,
                )}
              />

              <DetailItem
                label="Number of Buses"
                value={school.transport?.numberOfBuses}
              />

              <DetailItem
                label="GPS Enabled"
                value={yesNo(school.transport?.gpsEnabled)}
              />

              <DetailItem
                label="Drivers"
                value={school.transport?.drivers?.length}
              />

              <DetailItem
                label="Routes"
                value={school.transport?.routes?.length}
              />

              <DetailItem
                label="Vehicles"
                value={school.transport?.vehicles?.length}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Hostel">

            <DetailGrid>

              <DetailItem
                label="Hostel Available"
                value={yesNo(
                  school.hostel?.hostelAvailable,
                )}
              />

              <DetailItem
                label="Boys Hostel"
                value={yesNo(school.hostel?.boysHostel)}
              />

              <DetailItem
                label="Girls Hostel"
                value={yesNo(school.hostel?.girlsHostel)}
              />

              <DetailItem
                label="Number of Rooms"
                value={school.hostel?.numberOfRooms}
              />

              <DetailItem
                label="Capacity"
                value={school.hostel?.capacity}
              />

              <DetailItem
                label="Wardens"
                value={school.hostel?.wardens?.length}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Library">

            <DetailGrid>

              <DetailItem
                label="Total Books"
                value={school.library?.totalBooks}
              />

              <DetailItem
                label="E-Library"
                value={yesNo(school.library?.eLibrary)}
              />

              <DetailItem
                label="RFID Enabled"
                value={yesNo(school.library?.rfidEnabled)}
              />

              <DetailItem
                label="Library Software"
                value={school.library?.librarySoftware}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Sports">

            <DetailGrid>

              <DetailItem
                label="Indoor Games"
                value={formatArray(
                  school.sports?.indoorGames,
                )}
              />

              <DetailItem
                label="Outdoor Games"
                value={formatArray(
                  school.sports?.outdoorGames,
                )}
              />

              <DetailItem
                label="Swimming Pool"
                value={yesNo(
                  school.sports?.swimmingPool,
                )}
              />

              <DetailItem
                label="Gymnasium"
                value={yesNo(school.sports?.gymnasium)}
              />

              <DetailItem
                label="Coach Available"
                value={yesNo(
                  school.sports?.coachAvailable,
                )}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Medical">

            <DetailGrid>

              <DetailItem
                label="Medical Room"
                value={yesNo(
                  school.medical?.medicalRoom,
                )}
              />

              <DetailItem
                label="Doctor Available"
                value={yesNo(
                  school.medical?.doctorAvailable,
                )}
              />

              <DetailItem
                label="Nurse Available"
                value={yesNo(
                  school.medical?.nurseAvailable,
                )}
              />

              <DetailItem
                label="Ambulance"
                value={yesNo(
                  school.medical?.ambulance,
                )}
              />

              <DetailItem
                label="Nearest Hospital"
                value={school.medical?.nearestHospital}
              />

            </DetailGrid>

          </DetailCard>

        </DetailGrid>

      </Section>

      {/* =====================================================
          CONFIGURATION
      ====================================================== */}

      <Section title="Configuration">

        <DetailGrid>

          <DetailCard title="ERP Configuration">

            <DetailGrid>

              <DetailItem
                label="ERP Enabled"
                value={yesNo(
                  school.erpConfiguration?.erpEnabled,
                )}
              />

              <DetailItem
                label="LMS Enabled"
                value={yesNo(
                  school.erpConfiguration?.lmsEnabled,
                )}
              />

              <DetailItem
                label="Attendance"
                value={yesNo(
                  school.erpConfiguration?.attendanceModule,
                )}
              />

              <DetailItem
                label="Transport"
                value={yesNo(
                  school.erpConfiguration?.transportModule,
                )}
              />

              <DetailItem
                label="Hostel"
                value={yesNo(
                  school.erpConfiguration?.hostelModule,
                )}
              />

              <DetailItem
                label="Library"
                value={yesNo(
                  school.erpConfiguration?.libraryModule,
                )}
              />

              <DetailItem
                label="HR"
                value={yesNo(
                  school.erpConfiguration?.hrModule,
                )}
              />

              <DetailItem
                label="Payroll"
                value={yesNo(
                  school.erpConfiguration?.payrollModule,
                )}
              />

              <DetailItem
                label="Finance"
                value={yesNo(
                  school.erpConfiguration?.financeModule,
                )}
              />

              <DetailItem
                label="Parent App"
                value={yesNo(
                  school.erpConfiguration?.parentApp,
                )}
              />

              <DetailItem
                label="Student App"
                value={yesNo(
                  school.erpConfiguration?.studentApp,
                )}
              />

              <DetailItem
                label="Teacher App"
                value={yesNo(
                  school.erpConfiguration?.teacherApp,
                )}
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Login Configuration">

            <DetailGrid>

              <DetailItem
                label="Admin Username"
                value={school.loginConfiguration?.adminUsername}
              />

              <DetailItem
                label="Password Policy"
                value={school.loginConfiguration?.passwordPolicy}
              />

              <DetailItem
                label="Two Factor Authentication"
                value={yesNo(
                  school.loginConfiguration
                    ?.twoFactorAuthentication,
                )}
              />

              <DetailItem
                label="Password Expiry Days"
                value={
                  school.loginConfiguration
                    ?.passwordExpiryDays
                }
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Communication">

            <DetailGrid>

              <DetailItem
                label="SMS"
                value={yesNo(
                  school.communication?.smsEnabled,
                )}
              />

              <DetailItem
                label="WhatsApp"
                value={yesNo(
                  school.communication?.whatsappEnabled,
                )}
              />

              <DetailItem
                label="Email"
                value={yesNo(
                  school.communication?.emailEnabled,
                )}
              />

              <DetailItem
                label="Push Notification"
                value={yesNo(
                  school.communication?.pushNotification,
                )}
              />

              <DetailItem
                label="Language"
                value={
                  school.communication
                    ?.languagePreference
                }
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="Integrations">

            <DetailGrid>

              <DetailItem
                label="Payment Gateway"
                value={
                  school.integrations?.paymentGateway
                }
              />

              <DetailItem
                label="SMS Provider"
                value={
                  school.integrations?.smsProvider
                }
              />

              <DetailItem
                label="WhatsApp API"
                value={
                  school.integrations?.whatsappApi
                }
              />

              <DetailItem
                label="Google Workspace"
                value={yesNo(
                  school.integrations?.googleWorkspace,
                )}
              />

              <DetailItem
                label="Microsoft 365"
                value={yesNo(
                  school.integrations?.microsoft365,
                )}
              />

              <DetailItem
                label="Zoom"
                value={yesNo(
                  school.integrations?.zoomIntegration,
                )}
              />

              <DetailItem
                label="Biometric Vendor"
                value={
                  school.integrations?.biometricVendor
                }
              />

            </DetailGrid>

          </DetailCard>

        </DetailGrid>

      </Section>

      {/* =====================================================
          SUBSCRIPTION & LICENSE
      ====================================================== */}

      <Section title="Subscription & License">

        <DetailGrid>

          <DetailCard title="Subscription">

            <DetailGrid>

              <DetailItem
                label="Current Plan"
                value={school.subscription?.currentPlan}
              />

              <DetailItem
                label="Start Date"
                value={school.subscription?.startDate}
              />

              <DetailItem
                label="Expiry Date"
                value={school.subscription?.expiryDate}
              />

              <DetailItem
                label="Billing Cycle"
                value={school.subscription?.billingCycle}
              />

              <DetailItem
                label="Payment Status"
                value={school.subscription?.paymentStatus}
              />

              <DetailItem
                label="Student Limit"
                value={school.subscription?.studentLimit}
              />

              <DetailItem
                label="Campus Limit"
                value={school.subscription?.campusLimit}
              />

              <DetailItem
                label="Feature Flags"
                value={formatArray(
                  school.subscription?.featureFlags,
                )}
                fullWidth
              />

            </DetailGrid>

          </DetailCard>

          <DetailCard title="License">

            <DetailGrid>

              <DetailItem
                label="License Key"
                value={school.license?.licenseKey}
              />

              <DetailItem
                label="License Type"
                value={school.license?.licenseType}
              />

              <DetailItem
                label="Active Until"
                value={school.license?.activeUntil}
              />

              <DetailItem
                label="Renewal Date"
                value={school.license?.renewalDate}
              />

              <DetailItem
                label="License History"
                value={formatArray(
                  school.license?.history,
                )}
                fullWidth
              />

            </DetailGrid>

          </DetailCard>

        </DetailGrid>

      </Section>

      {/* =====================================================
          DOCUMENTS & COMPLIANCE
      ====================================================== */}

      <Section title="Documents & Compliance">

        <DetailGrid>

          <DetailCard
            title="Uploaded Documents"
            fullWidth
          >

            {school.documents?.length ? (
              <div className="school-detail-table-wrapper">
                <DataTable
                  className="school-detail-table"
                  columns={[
                    { key: "type", header: "Document Type", render: (document: any) => display(document.documentType) },
                    { key: "status", header: "Status", render: (document: any) => <StatusBadge value={document.file ? "Uploaded" : "Not uploaded"} /> },
                  ]}
                  rows={school.documents}
                  rowKey={(document: any) => document.documentType}
                />
              </div>
            ) : (
              <EmptyTable />
            )}

          </DetailCard>

          <DetailCard title="Compliance">

            <DetailGrid>

              <DetailItem
                label="Child Safety Policy"
                value={uploaded(
                  school.compliance?.childSafetyPolicy,
                )}
              />

              <DetailItem
                label="POSH Policy"
                value={uploaded(
                  school.compliance?.poshPolicy,
                )}
              />

              <DetailItem
                label="Anti Ragging Policy"
                value={uploaded(
                  school.compliance?.antiRaggingPolicy,
                )}
              />

              <DetailItem
                label="Disaster Management Plan"
                value={uploaded(
                  school.compliance
                    ?.disasterManagementPlan,
                )}
              />

              <DetailItem
                label="Insurance Details"
                value={uploaded(
                  school.compliance?.insuranceDetails,
                )}
              />

            </DetailGrid>

          </DetailCard>

        </DetailGrid>

      </Section>

      {/* =====================================================
          PERMISSIONS
      ====================================================== */}

      <Section title="Permissions">

        <DetailCard
          title="Configured Permissions"
          fullWidth
        >
          {school.permissions?.length ? (
            <div className="school-permission-list">
              {school.permissions.map(
                (permission: any, index: number) => (
                  <span
                    className="school-permission-chip"
                    key={index}
                  >
                    {typeof permission === "string"
                      ? permission
                      : JSON.stringify(permission)}
                  </span>
                ),
              )}
            </div>
          ) : (
            <EmptyTable />
          )}
        </DetailCard>

      </Section>

      {/* =====================================================
          AUDIT LOG
      ====================================================== */}

      <Section title="Activity & Audit">

        <DetailCard
          title="Audit Log"
          fullWidth
        >
          {school.auditLog?.length ? (
            <div className="school-audit-list">
              {school.auditLog.map(
                (item: any, index: number) => (
                  <div
                    className="school-audit-item"
                    key={index}
                  >
                    <div className="school-audit-dot" />

                    <div>
                      <strong>
                        {typeof item === "string"
                          ? item
                          : item.action ||
                            item.event ||
                            "Activity"}
                      </strong>

                      {typeof item !== "string" && (
                        <span>
                          {item.timestamp ||
                            item.createdAt ||
                            ""}
                        </span>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <EmptyTable message="No audit activity available" />
          )}
        </DetailCard>

      </Section>

    </div>
  );
}