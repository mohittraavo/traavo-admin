import React, { useMemo, useRef, useState } from "react";
import {
  useGetSubscriptionPlansQuery,
  useGetSchoolsQuery,
  useCreateSubscriptionMutation,
  useCreateSubscriptionPlanMutation,
  useGetSubscriptionsQuery,
} from "../store/tcmsApi";
import { useAdminData } from "../components/admin/AdminDataProvider";
import { Modal } from "../components/common/Modal";
import { DataTable } from "../components/common/DataTable";
import { Pagination } from "../components/common/Pagination";
import "../styles/subscription.css";

const PLAN_MODULES = [
  "Admissions", "Students", "Academics", "Attendance", "Examination", "Fees",
  "HR", "Payroll", "Library", "Transport", "Inventory", "Communication", "Reports", "Analytics",
];

type SubscriptionFeature = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  billingCycle: "MONTHLY" | "QUARTERLY" | "YEARLY";
  status: "Active" | "Inactive";
};

const initialFeatureCatalog: SubscriptionFeature[] = [
  {
    id: "feat-attendance",
    name: "Attendance",
    category: "Academic",
    description: "Daily attendance tracking with alerts and reports.",
    price: 1999,
    billingCycle: "MONTHLY",
    status: "Active",
  },
  {
    id: "feat-fees",
    name: "Fees",
    category: "Finance",
    description: "Fee collection, reminders, and online payment workflows.",
    price: 3499,
    billingCycle: "MONTHLY",
    status: "Active",
  },
  {
    id: "feat-reports",
    name: "Reports",
    category: "Analytics",
    description: "Dashboards and exportable reports for school leaders.",
    price: 2799,
    billingCycle: "MONTHLY",
    status: "Active",
  },
  {
    id: "feat-parent-app",
    name: "Parent App",
    category: "Parent Engagement",
    description: "Mobile-first parent access to notices, results, and events.",
    price: 4999,
    billingCycle: "MONTHLY",
    status: "Active",
  },
  {
    id: "feat-transport",
    name: "Transport",
    category: "Operations",
    description: "GPS tracking, route planning, and transport notifications.",
    price: 6999,
    billingCycle: "YEARLY",
    status: "Active",
  },
];

export function SubscriptionsPage() {
  const {
    data: plans = [],
    isLoading: plansLoading,
    refetch: refetchPlans,
  } = useGetSubscriptionPlansQuery();

  const {
    data: schools = [],
    isLoading: schoolsLoading,
  } = useGetSchoolsQuery();

  const {
    data: subscriptions = [],
    isLoading: subsLoading,
    refetch: refetchSubscriptions,
  } = useGetSubscriptionsQuery();

  const [createSubscription, { isLoading: creating }] =
    useCreateSubscriptionMutation();

  const [createPlanMutation, { isLoading: creatingPlan }] =
    useCreateSubscriptionPlanMutation();

  const { canAccess } = useAdminData();

  const [showSendForm, setShowSendForm] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [studentLimit, setStudentLimit] = useState("");
  const [campusLimit, setCampusLimit] = useState("");
  const [featureFlags, setFeatureFlags] = useState("");
  const [billingCycle, setBillingCycle] = useState("MONTHLY");

  const [showPlanForm, setShowPlanForm] = useState(false);
  const featureCatalog = initialFeatureCatalog;

  const planFormRef = useRef<HTMLFormElement>(null);

  const [page, setPage] = useState(1);

  const ROWS_PER_PAGE = 10;

  async function handleSendSubscription(e?: React.FormEvent) {
    e?.preventDefault();

    if (!selectedSchool || !selectedPlan) {
      alert("Please choose a school and a plan.");
      return;
    }

    try {
      const result = await createSubscription({
        schoolId: selectedSchool,
        planId: selectedPlan,
        startDate: startDate || undefined,
        expiryDate: expiryDate || undefined,
        billingCycle: billingCycle || undefined,
        studentLimit: studentLimit
          ? Number(studentLimit)
          : undefined,
        campusLimit: campusLimit
          ? Number(campusLimit)
          : undefined,
        featureFlags: featureFlags
          ? featureFlags
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
      }).unwrap();

      const accessEmail = result?.schoolAccessEmail ? ` ${result.schoolAccessEmail}` : "";
      const portal = result?.portalUrl ? ` Sign in at ${result.portalUrl}.` : "";
      const password = result?.temporaryPassword ? ` Temporary password: ${result.temporaryPassword}` : "";
      alert(
        result?.emailSent
          ? `Subscription sent. School access details were emailed to${accessEmail}.${portal}${password}`
          : `Subscription saved, but the email could not be sent. School access email:${accessEmail}.${portal}${password}`
      );

      setShowSendForm(false);
      resetSubscriptionForm();

      void refetchSubscriptions();
    } catch (err) {
      console.error(err);
      const data = (err as { data?: { message?: string } })?.data;
      alert(data?.message || "Failed to send subscription. See console for details.");
    }
  }

  function resetSubscriptionForm() {
    setSelectedPlan("");
    setSelectedSchool("");
    setStartDate("");
    setExpiryDate("");
    setStudentLimit("");
    setCampusLimit("");
    setFeatureFlags("");
    setBillingCycle("MONTHLY");
  }

  async function handleCreatePlan(e: React.FormEvent) {
    e.preventDefault();

    const form = planFormRef.current;

    if (!form) return;

    const fd = new FormData(form);

    const payload: Record<string, any> = Object.fromEntries(fd.entries());

    payload.allowedSchoolTypes = fd.getAll("allowedSchoolTypes");
    payload.allowedPaymentMethods = fd.getAll("allowedPaymentMethods");
    payload.features = fd.getAll("features[]");
    payload.modules = fd.getAll("modules[]");
    payload.offerApplicableCycles = fd.getAll(
      "offerApplicableCycles"
    );

    const numericFields = [
      "basePrice",
      "trialDays",
      "offerPrice",
      "discountValue",
      "offerMaxRedemptions",
      "offerMaxRedemptionsPerSchool",
      "maxSchoolsInTenant",
      "maxStudents",
      "maxTeachers",
      "maxClasses",
      "maxAcademicYears",
      "maxParentsPerStudent",
      "maxUsersTotal",
      "smsPerMonth",
      "emailPerMonth",
      "whatsappPerMonth",
      "storageGb",
      "maxBulkUploadRows",
      "maxApiCallsPerDay",
      "dataRetentionDays",
      "taxRatePercent",
      "gracePeriodDays",
      "slaResponseHours",
      "trainingSessions",
    ];

    numericFields.forEach((key) => {
      if (payload[key] === "") {
        delete payload[key];
      } else if (payload[key] !== undefined) {
        payload[key] = Number(payload[key]);
      }
    });

    const booleanFields = [
      "isActive",
      "isLegacy",
      "offerPriceEnabled",
      "offerAutoExpire",
      "customCssEnabled",
      "whiteLabelEnabled",
      "sslEnforced",
      "ssoEnabled",
      "auditLogsEnabled",
      "autoInvoice",
      "paymentGatewayEnabled",
    ];

    booleanFields.forEach((key) => {
      if (payload[key] !== undefined) {
        payload[key] = String(payload[key]) === "true";
      }
    });

    if (payload.status === "ACTIVE" && payload.modules.length === 0) {
      alert("Select at least one module before activating a plan.");
      return;
    }

    if (payload.allowedIpRanges) {
      payload.allowedIpRanges = String(payload.allowedIpRanges)
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    try {
      await createPlanMutation(payload).unwrap();

      alert("Subscription plan created");

      setShowPlanForm(false);
      form.reset();

      void refetchPlans();
    } catch (err) {
      console.error(err);
      alert("Failed to create plan. See console for details.");
    }
  }

  const totalItems = subscriptions.length;

  const totalPages = Math.max(
    Math.ceil(totalItems / ROWS_PER_PAGE),
    1
  );

  const currentPage = Math.min(
    Math.max(page, 1),
    totalPages
  );

  const pageStart = (currentPage - 1) * ROWS_PER_PAGE;

  const pageRows = subscriptions.slice(
    pageStart,
    pageStart + ROWS_PER_PAGE
  );

  const columns = useMemo(
    () => [
      {
        key: "school",
        header: "School",
        render: (r: any) =>
          r.schoolName ??
          r.school?.schoolName ??
          "—",
      },
      {
        key: "plan",
        header: "Plan",
        render: (r: any) =>
          r.planName ??
          r.plan?.name ??
          "—",
      },
      {
        key: "start",
        header: "Start Date",
        render: (r: any) =>
          r.startDate ?? "—",
      },
      {
        key: "expiry",
        header: "Expiry Date",
        render: (r: any) =>
          r.expiryDate ?? "—",
      },
      {
        key: "billing",
        header: "Billing",
        render: (r: any) =>
          r.billingCycle ?? "—",
      },
      {
        key: "students",
        header: "Student Limit",
        render: (r: any) =>
          r.studentLimit ?? "—",
      },
      {
        key: "campuses",
        header: "Campus Limit",
        render: (r: any) =>
          r.campusLimit ?? "—",
      },
      {
        key: "flags",
        header: "Features",
        render: (r: any) =>
          r.featureFlags?.length
            ? r.featureFlags.join(", ")
            : "—",
      },
    ],
    []
  );

  const planColumns = useMemo(() => [
    {
      key: "name",
      header: "Name",
      render: (p: any) => p.name ?? p.planName ?? "—",
    },
    {
      key: "description",
      header: "Description",
      render: (p: any) => p.description ?? "—",
      className: "plan-desc",
    },
    {
      key: "features",
      header: "Included Features",
      render: (p: any) =>
        p.features?.length
          ? p.features.join(", ")
          : featureCatalog
              .slice(0, 3)
              .map((feature) => feature.name)
              .join(", "),
    },
    {
      key: "price",
      header: "Price",
      render: (p: any) => `₹${p.offerPrice ?? p.price ?? p.basePrice ?? 0}`,
      className: "plan-price",
    },
    {
      key: "billing",
      header: "Billing Cycle",
      render: (p: any) => p.billingCycle ?? "—",
    },
    {
      key: "status",
      header: "Status",
      render: (p: any) => (p.isActive ? "Active" : "Inactive"),
    },
    {
      key: "action",
      header: "Action",
      render: (p: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            className="btn btn-secondary btn-xs"
            onClick={() => openSendFormWithPlan(p.id ?? p.planId ?? p.name)}
          >
            Send
          </button>

          {canAccess && canAccess("Subscription Management.Create") ? (
            <button type="button" className="btn btn-ghost btn-xs">Edit</button>
          ) : null}
        </div>
      ),
    },
  ], [canAccess, featureCatalog]);

  const openSendFormWithPlan = (planId: string | number | undefined) => {
    setSelectedPlan(String(planId ?? ""));
    setShowSendForm(true);
  };

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-header">

        {canAccess("Subscription Management.Create") && (
          <div className="subscriptions-header-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowPlanForm(true)}
              disabled={creatingPlan}
            >
              Create Plan
            </button>

            {/* <button
              className="sub-btn sub-btn-primary"
              onClick={() => setShowSendForm(true)}
              disabled={creating}
            >
              Send Subscription
            </button> */}
          </div>
        )}
      </div>

      {/* =========================
          CREATE PLAN MODAL
      ========================= */}

      {showPlanForm && (
        <Modal
          title="Create subscription plan"
          onClose={() => setShowPlanForm(false)}
        >
          <form
            ref={planFormRef}
            onSubmit={handleCreatePlan}
            className="subscription-form"
          >
            {/* BASIC INFORMATION */}

            <div className="subscription-card">
              <div className="subscription-card-title">
                Basic Information
              </div>

              <div className="subscription-form-grid">
                <div className="subscription-form-row">
                  <label htmlFor="planCode">
                    Plan Code *
                  </label>

                  <input
                    id="planCode"
                    name="planCode"
                    type="text"
                    placeholder="e.g. SCHOOL_BASIC"
                    required
                  />

                  <div className="subscription-help">
                    Internal unique code for the plan.
                  </div>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="planName">
                    Plan Name *
                  </label>

                  <input
                    id="planName"
                    name="planName"
                    type="text"
                    placeholder="e.g. Basic, Pro, Enterprise"
                    required
                  />
                </div>

                <div className="subscription-form-row subscription-full-width">
                  <label htmlFor="description">
                    Description
                  </label>
 
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Short description of what's included in this plan"
                  />
                </div>

                <div className="subscription-form-row subscription-full-width">
                  <label>Included Features</label>
                  <div className="feature-checkbox-grid">
                    {featureCatalog.map((feature) => (
                      <label key={feature.id} className="feature-option">
                        <input type="checkbox" name="features[]" value={feature.name} />
                        <span>{feature.name}</span>
                        <small>₹{feature.price}</small>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="subscription-form-row subscription-full-width">
                  <label>Included Modules *</label>
                  <div className="feature-checkbox-grid">
                    {PLAN_MODULES.map((module) => (
                      <label key={module} className="feature-option">
                        <input type="checkbox" name="modules[]" value={module} />
                        <span>{module}</span>
                      </label>
                    ))}
                  </div>
                  <p className="subscription-help">Select at least one module before activating this plan.</p>
                </div>
              </div>
            </div>
 
            {/* PRICING */}

            <div className="subscription-card">
              <div className="subscription-card-title">
                Pricing & Billing
              </div>

              <div className="subscription-form-grid">
                <div className="subscription-form-row">
                  <label htmlFor="billingCycle">
                    Billing Cycle *
                  </label>

                  <select
                    id="billingCycle"
                    name="billingCycle"
                    required
                  >
                    <option value="">
                      Select cycle
                    </option>
                    <option value="MONTHLY">
                      Monthly
                    </option>
                    <option value="QUARTERLY">
                      Quarterly
                    </option>
                    <option value="YEARLY">
                      Yearly
                    </option>
                    <option value="CUSTOM">
                      Custom
                    </option>
                  </select>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="basePrice">
                    Base Price *
                  </label>

                  <input
                    id="basePrice"
                    name="basePrice"
                    type="number"
                    placeholder="e.g. 999"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="currency">
                    Currency *
                  </label>

                  <select
                    id="currency"
                    name="currency"
                    required
                  >
                    <option value="INR">
                      INR – Indian Rupee
                    </option>

                    <option value="USD">
                      USD – US Dollar
                    </option>

                    <option value="EUR">
                      EUR – Euro
                    </option>

                    <option value="GBP">
                      GBP – British Pound
                    </option>
                  </select>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="trialDays">
                    Trial Days
                  </label>

                  <input
                    id="trialDays"
                    name="trialDays"
                    type="number"
                    placeholder="e.g. 14"
                    min="0"
                  />
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="status">
                    Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    defaultValue="DRAFT"
                  >
                    <option value="DRAFT">
                      Draft
                    </option>

                    <option value="ACTIVE">
                      Active (sellable)
                    </option>

                    <option value="INACTIVE">
                      Inactive
                    </option>
                  </select>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="isLegacy">
                    Legacy Plan
                  </label>

                  <select
                    id="isLegacy"
                    name="isLegacy"
                    defaultValue="false"
                  >
                    <option value="false">
                      No
                    </option>

                    <option value="true">
                      Yes
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* OFFER */}

            <div className="subscription-card subscription-offer-card">
              <div className="subscription-card-title">
                Offer / Promotional Pricing
                <span className="subscription-badge">
                  OPTIONAL
                </span>
              </div>

              <p className="subscription-help offer-description">
                Configure an optional discounted/offer price
                for this plan.
              </p>

              <div className="subscription-form-grid">
                <div className="subscription-form-row">
                  <label htmlFor="offerPriceEnabled">
                    Offer Price Enabled
                  </label>

                  <select
                    id="offerPriceEnabled"
                    name="offerPriceEnabled"
                    defaultValue="false"
                  >
                    <option value="false">
                      No
                    </option>

                    <option value="true">
                      Yes
                    </option>
                  </select>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="offerPrice">
                    Offer Price
                  </label>

                  <input
                    id="offerPrice"
                    name="offerPrice"
                    type="number"
                    placeholder="e.g. 799"
                    min="0"
                    step="0.01"
                  />

                  <div className="subscription-help">
                    Final price after discount.
                  </div>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="discountType">
                    Discount Type
                  </label>

                  <select
                    id="discountType"
                    name="discountType"
                    defaultValue="NONE"
                  >
                    <option value="NONE">
                      None
                    </option>

                    <option value="PERCENT">
                      Percentage (%)
                    </option>

                    <option value="FIXED">
                      Fixed Amount
                    </option>
                  </select>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="discountValue">
                    Discount Value
                  </label>

                  <input
                    id="discountValue"
                    name="discountValue"
                    type="number"
                    placeholder="e.g. 20"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="offerStartDate">
                    Offer Start Date
                  </label>

                  <input
                    id="offerStartDate"
                    name="offerStartDate"
                    type="date"
                  />
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="offerEndDate">
                    Offer End Date
                  </label>

                  <input
                    id="offerEndDate"
                    name="offerEndDate"
                    type="date"
                  />
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="offerLabel">
                    Offer Label / Badge
                  </label>

                  <input
                    id="offerLabel"
                    name="offerLabel"
                    type="text"
                    placeholder="e.g. Launch Offer"
                  />
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="offerApplicableCycles">
                    Applicable Billing Cycles
                  </label>

                  <select
                    id="offerApplicableCycles"
                    name="offerApplicableCycles"
                    multiple
                  >
                    <option value="MONTHLY">
                      Monthly
                    </option>

                    <option value="QUARTERLY">
                      Quarterly
                    </option>

                    <option value="YEARLY">
                      Yearly
                    </option>

                    <option value="CUSTOM">
                      Custom
                    </option>
                  </select>

                  <div className="subscription-help">
                    Hold Ctrl/Cmd to select multiple.
                  </div>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="offerMaxRedemptions">
                    Max Redemptions
                  </label>

                  <input
                    id="offerMaxRedemptions"
                    name="offerMaxRedemptions"
                    type="number"
                    placeholder="Unlimited if empty"
                    min="1"
                  />
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="offerMaxRedemptionsPerSchool">
                    Max Per School
                  </label>

                  <input
                    id="offerMaxRedemptionsPerSchool"
                    name="offerMaxRedemptionsPerSchool"
                    type="number"
                    placeholder="e.g. 1"
                    min="1"
                  />
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="offerAutoExpire">
                    Auto-expire Offer
                  </label>

                  <select
                    id="offerAutoExpire"
                    name="offerAutoExpire"
                    defaultValue="false"
                  >
                    <option value="false">
                      No
                    </option>

                    <option value="true">
                      Yes
                    </option>
                  </select>
                </div>

                <div className="subscription-form-row subscription-full-width">
                  <label htmlFor="offerTerms">
                    Offer Terms & Conditions
                  </label>

                  <textarea
                    id="offerTerms"
                    name="offerTerms"
                    placeholder="e.g. Valid for new schools only"
                  />
                </div>
              </div>
            </div>

            {/* TENANT */}

            <div className="subscription-card">
              <div className="subscription-card-title">
                Tenant & School Configuration
              </div>

              <div className="subscription-form-grid">
                <div className="subscription-form-row">
                  <label htmlFor="maxSchoolsInTenant">
                    Max Schools in Tenant
                  </label>

                  <input
                    id="maxSchoolsInTenant"
                    name="maxSchoolsInTenant"
                    type="number"
                    placeholder="Unlimited if empty"
                    min="1"
                  />
                </div>

<div className="subscription-form-row">
  <label htmlFor="allowedSchoolTypes">
    Allowed School Types
  </label>

  <select
    id="allowedSchoolTypes"
    name="allowedSchoolTypes"
    multiple
    defaultValue={[]}
    className="multi-select"
  >
    <option value="PRIVATE">
      Private School
    </option>

    <option value="GOVERNMENT">
      Government School
    </option>

    <option value="INTERNATIONAL">
      International School
    </option>

    <option value="CHAIN">
      School Chain / Group
    </option>

    <option value="COACHING">
      Coaching / Tuition Center
    </option>
  </select>

  <div className="subscription-help">
    Hold Ctrl/Cmd to select multiple school types.
  </div>
</div>

                <div className="subscription-form-row">
                  <label htmlFor="onboardingFlow">
                    Onboarding Flow
                  </label>

                  <select
                    id="onboardingFlow"
                    name="onboardingFlow"
                    defaultValue="STANDARD"
                  >
                    <option value="STANDARD">
                      Standard
                    </option>

                    <option value="ASSISTED">
                      Assisted
                    </option>

                    <option value="MINIMAL">
                      Minimal
                    </option>
                  </select>
                </div>

                <div className="subscription-form-row">
                  <label htmlFor="defaultLocale">
                    Default Locale / Language
                  </label>

                  <select
                    id="defaultLocale"
                    name="defaultLocale"
                    defaultValue="en"
                  >
                    <option value="en">
                      English
                    </option>

                    <option value="hi">
                      Hindi
                    </option>

                    <option value="mr">
                      Marathi
                    </option>

                    <option value="ta">
                      Tamil
                    </option>

                    <option value="te">
                      Telugu
                    </option>

                    <option value="bn">
                      Bengali
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="subscription-actions">
              <button
                type="button"
                className="sub-btn sub-btn-secondary"
                onClick={() => setShowPlanForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={creatingPlan}
              >
                {creatingPlan
                  ? "Saving..."
                  : "Save Plan"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =========================
          SEND SUBSCRIPTION MODAL
      ========================= */}

      {showSendForm && (
        <Modal
          title="Send subscription to school"
          onClose={() => {
            setShowSendForm(false);
            resetSubscriptionForm();
          }}
        >
          <form
            onSubmit={handleSendSubscription}
            className="send-subscription-form"
          >
            <div className="send-form-grid">
              <div className="subscription-form-row">
                <label htmlFor="selectedSchool">
                  School
                </label>

                <select
                  id="selectedSchool"
                  value={selectedSchool}
                  onChange={(e) =>
                    setSelectedSchool(e.target.value)
                  }
                  disabled={schoolsLoading}
                  required
                >
                  <option value="">
                    {schoolsLoading
                      ? "Loading schools..."
                      : "Select a school"}
                  </option>

                  {schools.map((s: any) => (
                    <option
                      key={s.id}
                      value={s.id}
                    >
                      {s.schoolName} ({s.schoolCode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="subscription-form-row">
                <label htmlFor="selectedPlan">
                  Plan
                </label>

                <select
                  id="selectedPlan"
                  value={selectedPlan}
                  onChange={(e) =>
                    setSelectedPlan(e.target.value)
                  }
                  required
                >
                  <option value="">
                    Select a plan
                  </option>

                  {plans.map((p: any) => (
                    <option
                      key={
                        p.id ??
                        p.planId ??
                        p.name
                      }
                      value={
                        p.id ??
                        p.planId ??
                        p.name
                      }
                    >
                      {p.name ??
                        p.planName}{" "}
                      — ₹
                      {p.offerPrice ??
                        p.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="subscription-form-row">
                <label htmlFor="sendBillingCycle">
                  Billing Cycle
                </label>

                <select
                  id="sendBillingCycle"
                  value={billingCycle}
                  onChange={(e) =>
                    setBillingCycle(e.target.value)
                  }
                  required
                >
                  <option value="MONTHLY">
                    Monthly
                  </option>

                  <option value="QUARTERLY">
                    Quarterly
                  </option>

                  <option value="YEARLY">
                    Yearly
                  </option>

                  <option value="CUSTOM">
                    Custom
                  </option>
                </select>
              </div>

              <div className="subscription-form-row">
                <label htmlFor="startDate">
                  Start Date
                </label>

                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                />
              </div>

              <div className="subscription-form-row">
                <label htmlFor="expiryDate">
                  Expiry Date
                </label>

                <input
                  id="expiryDate"
                  type="date"
                  value={expiryDate}
                  onChange={(e) =>
                    setExpiryDate(e.target.value)
                  }
                />
              </div>

              <div className="subscription-form-row">
                <label htmlFor="studentLimit">
                  Student Limit
                </label>

                <input
                  id="studentLimit"
                  type="number"
                  min="0"
                  value={studentLimit}
                  onChange={(e) =>
                    setStudentLimit(e.target.value)
                  }
                  placeholder="e.g. 1000"
                />
              </div>

              <div className="subscription-form-row">
                <label htmlFor="campusLimit">
                  Campus Limit
                </label>

                <input
                  id="campusLimit"
                  type="number"
                  min="0"
                  value={campusLimit}
                  onChange={(e) =>
                    setCampusLimit(e.target.value)
                  }
                  placeholder="e.g. 5"
                />
              </div>

              <div className="subscription-form-row send-full-width">
                <label htmlFor="featureFlags">
                  Feature Flags
                </label>

                <input
                  id="featureFlags"
                  value={featureFlags}
                  onChange={(e) =>
                    setFeatureFlags(e.target.value)
                  }
                  placeholder="attendance,fees,reports"
                />

                <div className="subscription-help">
                  Separate multiple features with commas.
                </div>
              </div>
            </div>

            <div className="send-form-actions">
              <button
                type="button"
                className="sub-btn sub-btn-secondary"
                onClick={() => {
                  setShowSendForm(false);
                  resetSubscriptionForm();
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="sub-btn sub-btn-primary"
                disabled={creating}
              >
                {creating
                  ? "Sending..."
                  : "Send Subscription"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =========================
          PLANS
      ========================= */}

      <section>

        {plansLoading ? (
          <div className="subscription-empty">
            Loading plans...
          </div>
        ) : plans.length === 0 ? (
          <div className="subscription-empty">
            No plans available.
          </div>
        ) : (
          <div className="subscription-table-wrapper">
            <DataTable
              columns={planColumns}
              rows={plans}
              rowKey={(p: any) =>
                String(p.id ?? p.planId ?? p.name)
              }
              emptyMessage="No plans available"
            />
          </div>
        )}
      </section>
    </div>
  );
}