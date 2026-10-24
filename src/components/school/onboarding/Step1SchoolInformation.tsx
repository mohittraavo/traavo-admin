import { useFormContext } from "react-hook-form";
import type { SchoolOnboardingForm } from "../../../types/school";

interface FieldErrorProps {
  message?: string;
}

function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;

  return <span className="field-error">{message}</span>;
}

export default function Step1SchoolInformation() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SchoolOnboardingForm>();

  const boards = watch("school.boards") || [];
  const mediums = watch("school.mediums") || [];

  const currentYear = new Date().getFullYear();

  return (
    <div className="onboarding-content">

      {/* =====================================================
          SCHOOL DETAILS
      ====================================================== */}

      <div className="form-section">
        <div className="form-grid">

          {/* School Name */}
          <label>
            School Name *
            <input
              {...register("school.schoolName", {
                required: "School name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Maximum 200 characters",
                },
              })}
              className={
                errors.school?.schoolName ? "input-error" : ""
              }
            />
            <FieldError
              message={errors.school?.schoolName?.message}
            />
          </label>

          {/* School Code */}
          <label>
            School Code *
            <input
              {...register("school.schoolCode", {
                required: "School code is required",
                maxLength: {
                  value: 50,
                  message: "Maximum 50 characters",
                },
              })}
              className={
                errors.school?.schoolCode ? "input-error" : ""
              }
            />
            <FieldError
              message={errors.school?.schoolCode?.message}
            />
          </label>

          {/* School Short Name */}
          <label>
            School Short Name
            <input
              {...register("school.schoolShortName", {
                maxLength: {
                  value: 50,
                  message: "Maximum 50 characters",
                },
              })}
              className={
                errors.school?.schoolShortName
                  ? "input-error"
                  : ""
              }
            />
            <FieldError
              message={errors.school?.schoolShortName?.message}
            />
          </label>

          {/* School Type */}
          <label>
            School Type *
            <select
              {...register("school.schoolType", {
                required: "School type is required",
              })}
              className={
                errors.school?.schoolType ? "input-error" : ""
              }
            >
              <option value="">Select</option>
              <option value="GOVERNMENT">Government</option>
              <option value="PRIVATE">Private</option>
              <option value="AIDED">Aided</option>
              <option value="TRUST">Trust</option>
              <option value="INTERNATIONAL">
                International
              </option>
            </select>

            <FieldError
              message={errors.school?.schoolType?.message}
            />
          </label>

          {/* School Category */}
          <label>
            School Category *
            <select
              {...register("school.schoolCategory", {
                required: "School category is required",
              })}
              className={
                errors.school?.schoolCategory
                  ? "input-error"
                  : ""
              }
            >
              <option value="">Select</option>
              <option value="PRIMARY">Primary</option>
              <option value="SECONDARY">Secondary</option>
              <option value="SENIOR_SECONDARY">
                Senior Secondary
              </option>
            </select>

            <FieldError
              message={errors.school?.schoolCategory?.message}
            />
          </label>

          {/* Establishment Year */}
          <label>
            Establishment Year *
            <input
              type="number"
              {...register("school.establishmentYear", {
                valueAsNumber: true,
                required: "Establishment year is required",
                min: {
                  value: 1800,
                  message: "Year must be 1800 or later",
                },
                max: {
                  value: currentYear,
                  message: `Year cannot be greater than ${currentYear}`,
                },
              })}
              className={
                errors.school?.establishmentYear
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.school?.establishmentYear?.message
              }
            />
          </label>

          {/* UDISE */}
          <label>
            UDISE Code *
            <input
              {...register("school.udiseCode", {
                required: "UDISE code is required",
                pattern: {
                  value: /^\d{11}$/,
                  message:
                    "UDISE code must contain exactly 11 digits",
                },
              })}
              maxLength={11}
              inputMode="numeric"
              className={
                errors.school?.udiseCode ? "input-error" : ""
              }
            />

            <FieldError
              message={errors.school?.udiseCode?.message}
            />
          </label>

          {/* Affiliation Number */}
          <label>
            Affiliation Number
            <input
              {...register("school.affiliationNumber", {
                maxLength: {
                  value: 50,
                  message: "Maximum 50 characters",
                },
              })}
              className={
                errors.school?.affiliationNumber
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.school?.affiliationNumber?.message
              }
            />
          </label>

          {/* Affiliation Start Date */}
          <label>
            Affiliation Start Date
            <input
              type="date"
              {...register("school.affiliationStartDate")}
            />

            <FieldError
              message={
                errors.school?.affiliationStartDate?.message
              }
            />
          </label>

          {/* Affiliation Valid Till */}
          <label>
            Affiliation Valid Till
            <input
              type="date"
              {...register("school.affiliationValidTill", {
                validate: (value) => {
                  const startDate = watch(
                    "school.affiliationStartDate"
                  );

                  if (!value || !startDate) {
                    return true;
                  }

                  return (
                    value > startDate ||
                    "Affiliation validity must be after start date"
                  );
                },
              })}
              className={
                errors.school?.affiliationValidTill
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.school?.affiliationValidTill?.message
              }
            />
          </label>

          {/* School Status */}
          <label>
            School Status *
            <select
              {...register("school.schoolStatus", {
                required: "School status is required",
              })}
              className={
                errors.school?.schoolStatus
                  ? "input-error"
                  : ""
              }
            >
              <option value="">Select</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
            </select>

            <FieldError
              message={errors.school?.schoolStatus?.message}
            />
          </label>

          {/* School Logo */}
          <label>
            School Logo
            <input
              type="file"
              accept="image/png,image/jpeg"
              {...register("school.schoolLogo")}
            />

            <small className="field-help">
              JPG or PNG only
            </small>

            <FieldError
              message={errors.school?.schoolLogo?.message}
            />
          </label>

        </div>
      </div>


      {/* =====================================================
          BOARD
      ====================================================== */}

      <div className="form-section">

        <h3>Board *</h3>

        <input
          type="hidden"
          {...register("school.boards", {
            validate: (value) =>
              value?.length > 0 ||
              "Please select at least one board",
          })}
        />

        <div className="checkbox-grid">

          {[
            "CBSE",
            "ICSE",
            "IB",
            "IGCSE",
            "STATE_BOARD",
          ].map((board) => {

            const checked = boards.includes(board);

            return (
              <label
                key={board}
                className="checkbox-item"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => {

                    const updatedBoards =
                      event.target.checked
                        ? [...boards, board]
                        : boards.filter(
                            (item) => item !== board
                          );

                    setValue(
                      "school.boards",
                      updatedBoards,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      }
                    );
                  }}
                />

                <span>
                  {board === "STATE_BOARD"
                    ? "State Board"
                    : board}
                </span>
              </label>
            );
          })}

        </div>

        <FieldError
          message={errors.school?.boards?.message}
        />

      </div>


      {/* =====================================================
          MEDIUM
      ====================================================== */}

      <div className="form-section">

        <h3>Medium of Education *</h3>

        <input
          type="hidden"
          {...register("school.mediums", {
            validate: (value) =>
              value?.length > 0 ||
              "Please select at least one medium",
          })}
        />

        <div className="checkbox-grid">

          {[
            "ENGLISH",
            "HINDI",
            "MARATHI",
            "BENGALI",
            "OTHER",
          ].map((medium) => {

            const checked = mediums.includes(medium);

            return (
              <label
                key={medium}
                className="checkbox-item"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => {

                    const updatedMediums =
                      event.target.checked
                        ? [...mediums, medium]
                        : mediums.filter(
                            (item) => item !== medium
                          );

                    setValue(
                      "school.mediums",
                      updatedMediums,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      }
                    );
                  }}
                />

                <span>
                  {medium}
                </span>
              </label>
            );
          })}

        </div>

        <FieldError
          message={errors.school?.mediums?.message}
        />

      </div>


      {/* =====================================================
          ADDRESS INFORMATION
      ====================================================== */}

      <div className="form-section">

        <h3>Address Information</h3>

        <div className="form-grid">

          {/* Address Line 1 */}
          <label className="full-width">
            Address Line 1 *

            <input
              {...register("address.addressLine1", {
                required: "Address line 1 is required",
              })}
              className={
                errors.address?.addressLine1
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.address?.addressLine1?.message
              }
            />
          </label>

          {/* Address Line 2 */}
          <label>
            Address Line 2
            <input
              {...register("address.addressLine2")}
            />
          </label>

          {/* Landmark */}
          <label>
            Landmark
            <input
              {...register("address.landmark")}
            />
          </label>

          {/* Village */}
          <label>
            Village
            <input
              {...register("address.village")}
            />
          </label>

          {/* City */}
          <label>
            City *

            <input
              {...register("address.city", {
                required: "City is required",
              })}
              className={
                errors.address?.city
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={errors.address?.city?.message}
            />
          </label>

          {/* District */}
          <label>
            District *

            <input
              {...register("address.district", {
                required: "District is required",
              })}
              className={
                errors.address?.district
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.address?.district?.message
              }
            />
          </label>

          {/* State */}
          <label>
            State *

            <input
              {...register("address.state", {
                required: "State is required",
              })}
              className={
                errors.address?.state
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={errors.address?.state?.message}
            />
          </label>

          {/* Country */}
          <label>
            Country *

            <input
              {...register("address.country", {
                required: "Country is required",
              })}
              className={
                errors.address?.country
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={errors.address?.country?.message}
            />
          </label>

          {/* PIN */}
          <label>
            PIN Code *

            <input
              {...register("address.pinCode", {
                required: "PIN code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message:
                    "PIN code must contain exactly 6 digits",
                },
              })}
              maxLength={6}
              inputMode="numeric"
              className={
                errors.address?.pinCode
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={errors.address?.pinCode?.message}
            />
          </label>

          {/* Latitude */}
          <label>
            Latitude

            <input
              type="number"
              step="any"
              {...register("address.latitude", {
                valueAsNumber: true,
              })}
            />
          </label>

          {/* Longitude */}
          <label>
            Longitude

            <input
              type="number"
              step="any"
              {...register("address.longitude", {
                valueAsNumber: true,
              })}
            />
          </label>

        </div>
      </div>


      {/* =====================================================
          CONTACT INFORMATION
      ====================================================== */}

      <div className="form-section">

        <h3>Contact Information</h3>

        <div className="form-grid">

          {/* School Email */}
          <label>
            School Email

            <input
              type="email"
              {...register("contact.schoolEmail", {
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Enter a valid email address",
                },
              })}
              className={
                errors.contact?.schoolEmail
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.contact?.schoolEmail?.message
              }
            />
          </label>

          {/* Alternate Email */}
          <label>
            Alternate Email

            <input
              type="email"
              {...register("contact.alternateEmail", {
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Enter a valid email address",
                },
              })}
              className={
                errors.contact?.alternateEmail
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.contact?.alternateEmail?.message
              }
            />
          </label>

          {/* Mobile */}
          <label>
            Mobile Number

            <input
              {...register("contact.mobileNumber", {
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Enter a valid 10 digit mobile number",
                },
              })}
              maxLength={10}
              inputMode="numeric"
              className={
                errors.contact?.mobileNumber
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.contact?.mobileNumber?.message
              }
            />
          </label>

          {/* Alternate Mobile */}
          <label>
            Alternate Mobile

            <input
              {...register("contact.alternateMobile", {
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Enter a valid 10 digit mobile number",
                },
              })}
              maxLength={10}
              inputMode="numeric"
              className={
                errors.contact?.alternateMobile
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.contact?.alternateMobile?.message
              }
            />
          </label>

          {/* Landline */}
          <label>
            Landline
            <input
              {...register("contact.landline")}
            />
          </label>

          {/* STD Code */}
          <label>
            STD Code
            <input
              {...register("contact.stdCode")}
            />
          </label>

          {/* Website */}
          <label>
            Website

            <input
              type="url"
              {...register("contact.website", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/,
                  message:
                    "Enter a valid URL",
                },
              })}
              className={
                errors.contact?.website
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={errors.contact?.website?.message}
            />
          </label>

          {/* Facebook */}
          <label>
            Facebook URL
            <input
              type="url"
              {...register("contact.facebookUrl")}
            />
          </label>

          {/* Instagram */}
          <label>
            Instagram URL
            <input
              type="url"
              {...register("contact.instagramUrl")}
            />
          </label>

          {/* LinkedIn */}
          <label>
            LinkedIn URL
            <input
              type="url"
              {...register("contact.linkedinUrl")}
            />
          </label>

        </div>
      </div>


      {/* =====================================================
          PRINCIPAL DETAILS
      ====================================================== */}

      <div className="form-section">

        <h3>Principal Details</h3>

        <div className="form-grid">

          {/* Principal Name */}
          <label>
            Principal Name *

            <input
              {...register(
                "principal.principalName",
                {
                  required:
                    "Principal name is required",
                  minLength: {
                    value: 2,
                    message:
                      "Minimum 2 characters",
                  },
                }
              )}
              className={
                errors.principal?.principalName
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.principal?.principalName?.message
              }
            />
          </label>

          {/* Gender */}
          <label>
            Gender

            <select
              {...register("principal.gender")}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </label>

          {/* DOB */}
          <label>
            DOB

            <input
              type="date"
              {...register("principal.dob")}
            />
          </label>

          {/* Mobile */}
          <label>
            Mobile

            <input
              {...register("principal.mobile", {
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Enter a valid 10 digit mobile number",
                },
              })}
              maxLength={10}
              inputMode="numeric"
              className={
                errors.principal?.mobile
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.principal?.mobile?.message
              }
            />
          </label>

          {/* Email */}
          <label>
            Email

            <input
              type="email"
              {...register("principal.email", {
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Enter a valid email address",
                },
              })}
              className={
                errors.principal?.email
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.principal?.email?.message
              }
            />
          </label>

          {/* Qualification */}
          <label>
            Qualification

            <select
              {...register(
                "principal.qualification"
              )}
            >
              <option value="">Select</option>
              <option value="GRADUATE">
                Graduate
              </option>
              <option value="POST_GRADUATE">
                Post Graduate
              </option>
              <option value="B_ED">
                B.Ed
              </option>
              <option value="M_ED">
                M.Ed
              </option>
              <option value="PHD">
                PhD
              </option>
            </select>
          </label>

          {/* Experience */}
          <label>
            Experience

            <input
              type="number"
              min={0}
              {...register(
                "principal.experience",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Experience cannot be negative",
                  },
                }
              )}
              className={
                errors.principal?.experience
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.principal?.experience?.message
              }
            />
          </label>

          {/* Joining Date */}
          <label>
            Joining Date

            <input
              type="date"
              {...register(
                "principal.joiningDate"
              )}
            />
          </label>

          {/* Aadhaar */}
          <label>
            Aadhaar Number

            <input
              {...register(
                "principal.aadhaarNumber",
                {
                  pattern: {
                    value: /^\d{12}$/,
                    message:
                      "Aadhaar must contain exactly 12 digits",
                  },
                }
              )}
              maxLength={12}
              inputMode="numeric"
              className={
                errors.principal?.aadhaarNumber
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.principal?.aadhaarNumber?.message
              }
            />
          </label>

          {/* PAN */}
          <label>
            PAN Number

            <input
              {...register(
                "principal.panNumber",
                {
                  setValueAs: (value) =>
                    value?.toUpperCase(),
                  pattern: {
                    value:
                      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                    message:
                      "Enter a valid PAN number",
                  },
                }
              )}
              maxLength={10}
              className={
                errors.principal?.panNumber
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.principal?.panNumber?.message
              }
            />
          </label>

          {/* Principal Photo */}
          <label>
            Principal Photo

            <input
              type="file"
              accept="image/png,image/jpeg"
              {...register("principal.photo")}
            />

            <small className="field-help">
              JPG or PNG only
            </small>
          </label>

        </div>
      </div>


      {/* =====================================================
          MANAGEMENT DETAILS
      ====================================================== */}

      <div className="form-section">

        <h3>Management Details</h3>

        <div className="form-grid">

          {/* Trust */}
          <label>
            Trust Name
            <input
              {...register(
                "management.trustName"
              )}
            />
          </label>

          {/* Society */}
          <label>
            Society Name
            <input
              {...register(
                "management.societyName"
              )}
            />
          </label>

          {/* Chairman */}
          <label>
            Chairman Name
            <input
              {...register(
                "management.chairmanName"
              )}
            />
          </label>

          {/* Director */}
          <label>
            Director Name
            <input
              {...register(
                "management.directorName"
              )}
            />
          </label>

          {/* Secretary */}
          <label>
            Secretary Name
            <input
              {...register(
                "management.secretaryName"
              )}
            />
          </label>

          {/* Management Email */}
          <label>
            Management Email

            <input
              type="email"
              {...register(
                "management.managementEmail",
                {
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "Enter a valid email address",
                  },
                }
              )}
              className={
                errors.management?.managementEmail
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.management?.managementEmail?.message
              }
            />
          </label>

          {/* Management Mobile */}
          <label>
            Management Mobile

            <input
              {...register(
                "management.managementMobile",
                {
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message:
                      "Enter a valid 10 digit mobile number",
                  },
                }
              )}
              maxLength={10}
              inputMode="numeric"
              className={
                errors.management?.managementMobile
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.management?.managementMobile?.message
              }
            />
          </label>

          {/* Registration Number */}
          <label>
            Registration Number

            <input
              {...register(
                "management.registrationNumber"
              )}
            />
          </label>

          {/* Registration Date */}
          <label>
            Registration Date

            <input
              type="date"
              {...register(
                "management.registrationDate"
              )}
            />
          </label>

          {/* GST */}
          <label>
            GST Number

            <input
              {...register(
                "management.gstNumber",
                {
                  setValueAs: (value) =>
                    value?.toUpperCase(),
                  pattern: {
                    value:
                      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
                    message:
                      "Enter a valid GSTIN",
                  },
                }
              )}
              maxLength={15}
              className={
                errors.management?.gstNumber
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.management?.gstNumber?.message
              }
            />
          </label>

          {/* Management PAN */}
          <label>
            PAN Number

            <input
              {...register(
                "management.panNumber",
                {
                  setValueAs: (value) =>
                    value?.toUpperCase(),
                  pattern: {
                    value:
                      /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                    message:
                      "Enter a valid PAN number",
                  },
                }
              )}
              maxLength={10}
              className={
                errors.management?.panNumber
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.management?.panNumber?.message
              }
            />
          </label>

        </div>
      </div>

    </div>
  );
}