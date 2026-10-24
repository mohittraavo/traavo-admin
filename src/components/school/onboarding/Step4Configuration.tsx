import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import type {
  SchoolOnboardingForm,
} from "../../../types/school";

/* =========================================================
 * Helpers
 * ========================================================= */

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="field-error">
      {message}
    </p>
  );
}

/* =========================================================
 * STEP 4 - CONFIGURATION
 * ========================================================= */

export default function Step4Configuration() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SchoolOnboardingForm>();

  /* =======================================================
   * FEE HEADS
   * ======================================================= */

  const {
    fields: feeHeadFields,
    append: appendFeeHead,
    remove: removeFeeHead,
  } = useFieldArray({
    control,
    name: "feeHeads",
  });

  const handleAddFeeHead = () => {
    appendFeeHead({
      feeHeadName: "",
      amount: 0,
    });
  };

  return (
    <div className="onboarding-content">

      {/* =====================================================
       * FEE STRUCTURE
       * ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">
          <h3>Fee Structure</h3>

          <p>
            Configure the standard fee structure
            for the school.
          </p>
        </div>

        <div className="onboarding-form-grid three-columns">

          {/* Admission Fee */}

          <div
            className={`onboarding-form-group ${
              errors.fees?.admissionFee
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Admission Fee
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              {...register(
                "fees.admissionFee",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Admission fee cannot be negative.",
                  },
                }
              )}
            />

            <FieldError
              message={
                errors.fees?.admissionFee?.message
              }
            />
          </div>

          {/* Tuition Fee */}

          <div
            className={`onboarding-form-group ${
              errors.fees?.tuitionFee
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Tuition Fee
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              {...register(
                "fees.tuitionFee",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Tuition fee cannot be negative.",
                  },
                }
              )}
            />

            <FieldError
              message={
                errors.fees?.tuitionFee?.message
              }
            />
          </div>

          {/* Annual Fee */}

          <div
            className={`onboarding-form-group ${
              errors.fees?.annualFee
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Annual Fee
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              {...register(
                "fees.annualFee",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Annual fee cannot be negative.",
                  },
                }
              )}
            />

            <FieldError
              message={
                errors.fees?.annualFee?.message
              }
            />
          </div>

          {/* Exam Fee */}

          <div
            className={`onboarding-form-group ${
              errors.fees?.examFee
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Exam Fee
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              {...register(
                "fees.examFee",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Exam fee cannot be negative.",
                  },
                }
              )}
            />

            <FieldError
              message={
                errors.fees?.examFee?.message
              }
            />
          </div>

          {/* Transport Fee */}

          <div
            className={`onboarding-form-group ${
              errors.fees?.transportFee
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Transport Fee
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              {...register(
                "fees.transportFee",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Transport fee cannot be negative.",
                  },
                }
              )}
            />

            <FieldError
              message={
                errors.fees?.transportFee?.message
              }
            />
          </div>

          {/* Hostel Fee */}

          <div
            className={`onboarding-form-group ${
              errors.fees?.hostelFee
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Hostel Fee
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              {...register(
                "fees.hostelFee",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Hostel fee cannot be negative.",
                  },
                }
              )}
            />

            <FieldError
              message={
                errors.fees?.hostelFee?.message
              }
            />
          </div>

          {/* Fee Frequency */}

          <div
            className={`onboarding-form-group ${
              errors.fees?.feeFrequency
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Fee Frequency
              <span className="required">
                *
              </span>
            </label>

            <select
              {...register(
                "fees.feeFrequency",
                {
                  required:
                    "Fee frequency is required.",
                }
              )}
            >
              <option value="">
                Select Frequency
              </option>

              <option value="MONTHLY">
                Monthly
              </option>

              <option value="QUARTERLY">
                Quarterly
              </option>

              <option value="HALF_YEARLY">
                Half-Yearly
              </option>

              <option value="YEARLY">
                Yearly
              </option>
            </select>

            <FieldError
              message={
                errors.fees?.feeFrequency?.message
              }
            />
          </div>
        </div>

        {/* ===================================================
         * ADDITIONAL FEE HEADS
         * =================================================== */}

        <div className="section-title-row">

          <div>
            <h3>
              Additional Fee Heads
            </h3>

            <p className="section-description">
              Add custom fee heads such as Activity
              Fee, Lab Fee, Sports Fee, Smart Class
              Fee, etc.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddFeeHead}
          >
            + Add Fee Head
          </button>

        </div>

        {feeHeadFields.length === 0 && (
          <div className="empty-state">
            <p>
              No additional fee heads configured.
            </p>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddFeeHead}
            >
              + Add First Fee Head
            </button>
          </div>
        )}

        {feeHeadFields.map(
          (field, index) => {
            const feeError =
              errors.feeHeads?.[index];

            return (
              <div
                key={field.id}
                className="child-card"
              >

                <div className="child-card-header">

                  <h4>
                    Fee Head {index + 1}
                  </h4>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      removeFeeHead(index)
                    }
                  >
                    Remove
                  </button>

                </div>

                <div className="onboarding-form-grid">

                  {/* Fee Head Name */}

                  <div
                    className={`onboarding-form-group ${
                      feeError?.feeHeadName
                        ? "has-error"
                        : ""
                    }`}
                  >
                    <label>
                      Fee Head Name
                      <span className="required">
                        *
                      </span>
                    </label>

                    <input
                      placeholder="e.g. Activity Fee"
                      {...register(
                        `feeHeads.${index}.feeHeadName`,
                        {
                          required:
                            "Fee head name is required.",

                          minLength: {
                            value: 2,
                            message:
                              "Fee head name must contain at least 2 characters.",
                          },

                          maxLength: {
                            value: 100,
                            message:
                              "Fee head name cannot exceed 100 characters.",
                          },
                        }
                      )}
                    />

                    <FieldError
                      message={
                        feeError?.feeHeadName
                          ?.message
                      }
                    />
                  </div>

                  {/* Amount */}

                  <div
                    className={`onboarding-form-group ${
                      feeError?.amount
                        ? "has-error"
                        : ""
                    }`}
                  >
                    <label>
                      Amount
                      <span className="required">
                        *
                      </span>
                    </label>

                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      {...register(
                        `feeHeads.${index}.amount`,
                        {
                          valueAsNumber: true,

                          required:
                            "Fee amount is required.",

                          min: {
                            value: 0,
                            message:
                              "Fee amount cannot be negative.",
                          },
                        }
                      )}
                    />

                    <FieldError
                      message={
                        feeError?.amount?.message
                      }
                    />
                  </div>

                </div>
              </div>
            );
          }
        )}

      </section>

      {/* =====================================================
       * ERP CONFIGURATION
       * ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">
          <h3>
            ERP Configuration
          </h3>

          <p>
            Select the modules and applications
            enabled for this school.
          </p>
        </div>

        <div className="checkbox-grid">

          {[
            ["erpEnabled", "ERP Enabled"],
            ["lmsEnabled", "LMS Enabled"],
            ["attendanceModule", "Attendance"],
            ["transportModule", "Transport"],
            ["hostelModule", "Hostel"],
            ["libraryModule", "Library"],
            ["hrModule", "HR"],
            ["payrollModule", "Payroll"],
            ["financeModule", "Finance"],
            ["parentApp", "Parent App"],
            ["studentApp", "Student App"],
            ["teacherApp", "Teacher App"],
          ].map(([name, label]) => (
            <label
              key={name}
              className="checkbox-item"
            >
              <input
                type="checkbox"
                {...register(
                  `erpConfiguration.${name}` as
                    | "erpConfiguration.erpEnabled"
                    | "erpConfiguration.lmsEnabled"
                    | "erpConfiguration.attendanceModule"
                    | "erpConfiguration.transportModule"
                    | "erpConfiguration.hostelModule"
                    | "erpConfiguration.libraryModule"
                    | "erpConfiguration.hrModule"
                    | "erpConfiguration.payrollModule"
                    | "erpConfiguration.financeModule"
                    | "erpConfiguration.parentApp"
                    | "erpConfiguration.studentApp"
                    | "erpConfiguration.teacherApp"
                )}
              />

              <span>{label}</span>
            </label>
          ))}

        </div>

      </section>

      {/* =====================================================
       * LOGIN CONFIGURATION
       * ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">
          <h3>
            Login Configuration
          </h3>

          <p>
            Configure the school administrator
            login and security policy.
          </p>
        </div>

        <div className="onboarding-form-grid">

          {/* Admin Username */}

          <div
            className={`onboarding-form-group ${
              errors.loginConfiguration
                ?.adminUsername
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Admin Username
              <span className="required">
                *
              </span>
            </label>

            <input
              placeholder="school.admin"
              {...register(
                "loginConfiguration.adminUsername",
                {
                  required:
                    "Admin username is required.",

                  minLength: {
                    value: 4,
                    message:
                      "Username must contain at least 4 characters.",
                  },

                  maxLength: {
                    value: 50,
                    message:
                      "Username cannot exceed 50 characters.",
                  },

                  pattern: {
                    value:
                      /^[a-zA-Z0-9._-]+$/,
                    message:
                      "Username can contain letters, numbers, dot, underscore and hyphen only.",
                  },
                }
              )}
            />

            <FieldError
              message={
                errors.loginConfiguration
                  ?.adminUsername?.message
              }
            />
          </div>

          {/* Password Policy */}

          <div className="onboarding-form-group">

            <label>
              Password Policy
            </label>

            <select
              {...register(
                "loginConfiguration.passwordPolicy"
              )}
            >
              <option value="MIN_8_CHARACTERS">
                Minimum 8 Characters
              </option>

              <option value="STRONG">
                Strong
              </option>
            </select>

          </div>

          {/* Password Expiry */}

          <div
            className={`onboarding-form-group ${
              errors.loginConfiguration
                ?.passwordExpiryDays
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Password Expiry Days
              <span className="required">
                *
              </span>
            </label>

            <input
              type="number"
              min={0}
              {...register(
                "loginConfiguration.passwordExpiryDays",
                {
                  valueAsNumber: true,

                  required:
                    "Password expiry days is required.",

                  min: {
                    value: 0,
                    message:
                      "Password expiry cannot be negative.",
                  },

                  max: {
                    value: 3650,
                    message:
                      "Password expiry cannot exceed 3650 days.",
                  },
                }
              )}
            />

            <FieldError
              message={
                errors.loginConfiguration
                  ?.passwordExpiryDays?.message
              }
            />
          </div>

        </div>

        <label className="checkbox-item">

          <input
            type="checkbox"
            {...register(
              "loginConfiguration.twoFactorAuthentication"
            )}
          />

          <span>
            Enable Two Factor Authentication
          </span>

        </label>

      </section>

      {/* =====================================================
       * COMMUNICATION
       * ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">
          <h3>
            Communication Preferences
          </h3>

          <p>
            Configure the communication channels
            available to the school.
          </p>
        </div>

        <div className="checkbox-grid">

          <label className="checkbox-item">
            <input
              type="checkbox"
              {...register(
                "communication.smsEnabled"
              )}
            />
            <span>SMS</span>
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              {...register(
                "communication.whatsappEnabled"
              )}
            />
            <span>WhatsApp</span>
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              {...register(
                "communication.emailEnabled"
              )}
            />
            <span>Email</span>
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              {...register(
                "communication.pushNotification"
              )}
            />
            <span>
              Push Notification
            </span>
          </label>

        </div>

        <div className="onboarding-form-group">

          <label>
            Language Preference
          </label>

          <select
            {...register(
              "communication.languagePreference"
            )}
          >
            <option value="English">
              English
            </option>

            <option value="Hindi">
              Hindi
            </option>

          </select>

        </div>

      </section>

      {/* =====================================================
       * INTEGRATIONS
       * ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">
          <h3>
            Integration Details
          </h3>

          <p>
            Configure external services and
            third-party integrations.
          </p>
        </div>

        <div className="onboarding-form-grid">

          <div className="onboarding-form-group">
            <label>
              Payment Gateway
            </label>

            <select
              {...register(
                "integrations.paymentGateway"
              )}
            >
              <option value="">
                Select Payment Gateway
              </option>

              <option value="RAZORPAY">
                Razorpay
              </option>

              <option value="STRIPE">
                Stripe
              </option>
            </select>
          </div>

          <div className="onboarding-form-group">
            <label>
              SMS Provider
            </label>

            <select
              {...register(
                "integrations.smsProvider"
              )}
            >
              <option value="">
                Select SMS Provider
              </option>

              <option value="TWILIO">
                Twilio
              </option>

              <option value="MSG91">
                MSG91
              </option>
            </select>
          </div>

          <div className="onboarding-form-group">
            <label>
              WhatsApp API
            </label>

            <input
              placeholder="API identifier / configuration"
              {...register(
                "integrations.whatsappApi"
              )}
            />
          </div>

          <div className="onboarding-form-group">
            <label>
              Biometric Vendor
            </label>

            <input
              placeholder="e.g. eSSL"
              {...register(
                "integrations.biometricVendor"
              )}
            />
          </div>

        </div>

        <div className="checkbox-grid">

          <label className="checkbox-item">
            <input
              type="checkbox"
              {...register(
                "integrations.googleWorkspace"
              )}
            />
            <span>
              Google Workspace
            </span>
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              {...register(
                "integrations.microsoft365"
              )}
            />
            <span>
              Microsoft 365
            </span>
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              {...register(
                "integrations.zoomIntegration"
              )}
            />
            <span>
              Zoom
            </span>
          </label>

        </div>

      </section>

      {/* =====================================================
       * COMPLIANCE
       * ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">
          <h3>
            Compliance Documents
          </h3>

          <p>
            Upload the applicable compliance
            documents for the school.
          </p>
        </div>

        <div className="onboarding-form-grid">

          <div className="onboarding-form-group">
            <label>
              Child Safety Policy
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              {...register(
                "compliance.childSafetyPolicy"
              )}
            />
          </div>

          <div className="onboarding-form-group">
            <label>
              POSH Policy
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              {...register(
                "compliance.poshPolicy"
              )}
            />
          </div>

          <div className="onboarding-form-group">
            <label>
              Anti Ragging Policy
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              {...register(
                "compliance.antiRaggingPolicy"
              )}
            />
          </div>

          <div className="onboarding-form-group">
            <label>
              Disaster Management Plan
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              {...register(
                "compliance.disasterManagementPlan"
              )}
            />
          </div>

          <div className="onboarding-form-group">
            <label>
              Insurance Details
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              {...register(
                "compliance.insuranceDetails"
              )}
            />
          </div>

        </div>

      </section>

    </div>
  );
}