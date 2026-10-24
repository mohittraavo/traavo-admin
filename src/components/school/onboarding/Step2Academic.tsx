import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import type {
  SchoolOnboardingForm,
} from "../../../types/school";

/* =========================================================
 * FIELD ERROR
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
    <span className="field-error">
      {message}
    </span>
  );
}

/* =========================================================
 * STEP 2 - ACADEMIC
 * ========================================================= */

export default function Step2Academic() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<SchoolOnboardingForm>();

  /* =========================================================
   * CLASS ARRAY
   * ========================================================= */

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "classes",
  });

  /* =========================================================
   * ACADEMIC STATISTICS
   * ========================================================= */

  const boys =
    Number(
      watch("academicStatistics.boys") || 0
    );

  const girls =
    Number(
      watch("academicStatistics.girls") || 0
    );

  const teachers =
    Number(
      watch("academicStatistics.teachers") || 0
    );

  const totalStudents =
    boys + girls;

  /*
   * Student Teacher Ratio is derived.
   *
   * IMPORTANT:
   * We do NOT store this in form state.
   */
  const studentTeacherRatio =
    teachers > 0
      ? (
          totalStudents / teachers
        ).toFixed(2)
      : "0.00";

  /* =========================================================
   * ADD CLASS
   * ========================================================= */

  function handleAddClass() {
    append({
      className: "",
      maximumStrength: 40,
      currentStrength: 0,
      numberOfSections: 1,
      medium: "",
      shift: "",
      sections: [],
    });
  }

  /* =========================================================
   * RENDER
   * ========================================================= */

  return (
    <div className="onboarding-content">

      {/* =====================================================
       * ACADEMIC SESSION
       * ===================================================== */}

      <div className="form-section">

        <div className="onboarding-section-header">
          <h3>
            Academic Session
          </h3>

          <p>
            Configure the academic session
            for this school.
          </p>
        </div>

        <div className="form-grid">

          {/* Academic Session */}

          <label>
            Academic Session *

            <input
              type="text"
              placeholder="2026-27"
              {...register(
                "academicSession.academicSession",
                {
                  required:
                    "Academic session is required",

                  pattern: {
                    value:
                      /^\d{4}-\d{2}$/,

                    message:
                      "Use format YYYY-YY, e.g. 2026-27",
                  },
                }
              )}

              className={
                errors.academicSession
                  ?.academicSession
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.academicSession
                  ?.academicSession
                  ?.message
              }
            />
          </label>

          {/* Start Date */}

          <label>
            Start Date *

            <input
              type="date"
              {...register(
                "academicSession.startDate",
                {
                  required:
                    "Start date is required",
                }
              )}

              className={
                errors.academicSession
                  ?.startDate
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.academicSession
                  ?.startDate
                  ?.message
              }
            />
          </label>

          {/* End Date */}

          <label>
            End Date *

            <input
              type="date"
              {...register(
                "academicSession.endDate",
                {
                  required:
                    "End date is required",

                  validate: (value) => {
                    const startDate =
                      watch(
                        "academicSession.startDate"
                      );

                    if (
                      !value ||
                      !startDate
                    ) {
                      return true;
                    }

                    return (
                      value > startDate ||
                      "End date must be after start date"
                    );
                  },
                }
              )}

              className={
                errors.academicSession
                  ?.endDate
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.academicSession
                  ?.endDate
                  ?.message
              }
            />
          </label>

        </div>
      </div>


      {/* =====================================================
       * SCHOOL STATISTICS
       * ===================================================== */}

      <div className="form-section">

        <div className="onboarding-section-header">

          <h3>
            School Statistics
          </h3>

          <p>
            Enter the student and staff
            strength for the academic session.
          </p>

        </div>

        <div className="form-grid">

          {/* Total Students */}

          <label>
            Total Students

            <input
              type="number"
              value={totalStudents}
              readOnly
            />

            <small className="field-help">
              Automatically calculated from
              boys + girls.
            </small>
          </label>


          {/* Boys */}

          <label>
            Boys *

            <input
              type="number"
              min={0}
              {...register(
                "academicStatistics.boys",
                {
                  valueAsNumber: true,

                  required:
                    "Boys count is required",

                  min: {
                    value: 0,
                    message:
                      "Value cannot be negative",
                  },
                }
              )}

              className={
                errors.academicStatistics
                  ?.boys
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.academicStatistics
                  ?.boys
                  ?.message
              }
            />
          </label>


          {/* Girls */}

          <label>
            Girls *

            <input
              type="number"
              min={0}
              {...register(
                "academicStatistics.girls",
                {
                  valueAsNumber: true,

                  required:
                    "Girls count is required",

                  min: {
                    value: 0,
                    message:
                      "Value cannot be negative",
                  },
                }
              )}

              className={
                errors.academicStatistics
                  ?.girls
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.academicStatistics
                  ?.girls
                  ?.message
              }
            />
          </label>


          {/* Teachers */}

          <label>
            Teachers *

            <input
              type="number"
              min={0}
              {...register(
                "academicStatistics.teachers",
                {
                  valueAsNumber: true,

                  required:
                    "Teachers count is required",

                  min: {
                    value: 0,
                    message:
                      "Value cannot be negative",
                  },
                }
              )}

              className={
                errors.academicStatistics
                  ?.teachers
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.academicStatistics
                  ?.teachers
                  ?.message
              }
            />
          </label>


          {/* Teaching Staff */}

          <label>
            Teaching Staff *

            <input
              type="number"
              min={0}
              {...register(
                "academicStatistics.teachingStaff",
                {
                  valueAsNumber: true,

                  required:
                    "Teaching staff count is required",

                  min: {
                    value: 0,
                    message:
                      "Value cannot be negative",
                  },
                }
              )}

              className={
                errors.academicStatistics
                  ?.teachingStaff
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.academicStatistics
                  ?.teachingStaff
                  ?.message
              }
            />
          </label>


          {/* Non Teaching Staff */}

          <label>
            Non Teaching Staff *

            <input
              type="number"
              min={0}
              {...register(
                "academicStatistics.nonTeachingStaff",
                {
                  valueAsNumber: true,

                  required:
                    "Non-teaching staff count is required",

                  min: {
                    value: 0,
                    message:
                      "Value cannot be negative",
                  },
                }
              )}

              className={
                errors.academicStatistics
                  ?.nonTeachingStaff
                  ? "input-error"
                  : ""
              }
            />

            <FieldError
              message={
                errors.academicStatistics
                  ?.nonTeachingStaff
                  ?.message
              }
            />
          </label>


          {/* Student Teacher Ratio */}

          <label>
            Student Teacher Ratio

            <input
              type="text"
              value={studentTeacherRatio}
              readOnly
            />

            <small className="field-help">
              Automatically calculated.
            </small>
          </label>

        </div>
      </div>


      {/* =====================================================
       * CLASS CONFIGURATION
       * ===================================================== */}

      <div className="form-section">

        <div className="section-title-row">

          <div>
            <h3>
              Class Configuration
            </h3>

            <p className="section-description">
              Configure classes, capacity,
              sections, medium and shift.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddClass}
          >
            + Add Class
          </button>

        </div>


        {/* ===================================================
         * NO CLASSES
         * =================================================== */}

        {fields.length === 0 && (
          <div className="empty-state">

            <p>
              No classes added yet.
            </p>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddClass}
            >
              + Add First Class
            </button>

          </div>
        )}


        {/* ===================================================
         * CLASSES
         * =================================================== */}

        {fields.map(
          (field, index) => {

            const classErrors =
              errors.classes?.[index];

            return (
              <div
                key={field.id}
                className="child-card"
              >

                {/* Class Header */}

                <div className="child-card-header">

                  <div>
                    <h4>
                      Class {index + 1}
                    </h4>

                    <span className="field-help">
                      Configure class capacity
                      and schedule.
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      remove(index)
                    }
                  >
                    Remove
                  </button>

                </div>


                {/* Class Fields */}

                <div className="form-grid">


                  {/* Class Name */}

                  <label>
                    Class Name *

                    <input
                      type="text"
                      placeholder="Class 1"
                      {...register(
                        `classes.${index}.className`,
                        {
                          required:
                            "Class name is required",

                          minLength: {
                            value: 1,
                            message:
                              "Class name is required",
                          },
                        }
                      )}

                      className={
                        classErrors
                          ?.className
                          ? "input-error"
                          : ""
                      }
                    />

                    <FieldError
                      message={
                        classErrors
                          ?.className
                          ?.message
                      }
                    />
                  </label>


                  {/* Maximum Strength */}

                  <label>
                    Maximum Strength *

                    <input
                      type="number"
                      min={1}
                      {...register(
                        `classes.${index}.maximumStrength`,
                        {
                          valueAsNumber: true,

                          required:
                            "Maximum strength is required",

                          min: {
                            value: 1,
                            message:
                              "Maximum strength must be at least 1",
                          },
                        }
                      )}

                      className={
                        classErrors
                          ?.maximumStrength
                          ? "input-error"
                          : ""
                      }
                    />

                    <FieldError
                      message={
                        classErrors
                          ?.maximumStrength
                          ?.message
                      }
                    />
                  </label>


                  {/* Current Strength */}

                  <label>
                    Current Strength *

                    <input
                      type="number"
                      min={0}
                      {...register(
                        `classes.${index}.currentStrength`,
                        {
                          valueAsNumber: true,

                          required:
                            "Current strength is required",

                          min: {
                            value: 0,
                            message:
                              "Current strength cannot be negative",
                          },

                          validate: (
                            value
                          ) => {
                            const maximum =
                              watch(
                                `classes.${index}.maximumStrength`
                              );

                            if (
                              value == null ||
                              maximum == null
                            ) {
                              return true;
                            }

                            return (
                              value <= maximum ||
                              "Current strength cannot exceed maximum strength"
                            );
                          },
                        }
                      )}

                      className={
                        classErrors
                          ?.currentStrength
                          ? "input-error"
                          : ""
                      }
                    />

                    <FieldError
                      message={
                        classErrors
                          ?.currentStrength
                          ?.message
                      }
                    />
                  </label>


                  {/* Number Of Sections */}

                  <label>
                    Number of Sections *

                    <input
                      type="number"
                      min={1}
                      {...register(
                        `classes.${index}.numberOfSections`,
                        {
                          valueAsNumber: true,

                          required:
                            "Number of sections is required",

                          min: {
                            value: 1,
                            message:
                              "At least one section is required",
                          },
                        }
                      )}

                      className={
                        classErrors
                          ?.numberOfSections
                          ? "input-error"
                          : ""
                      }
                    />

                    <FieldError
                      message={
                        classErrors
                          ?.numberOfSections
                          ?.message
                      }
                    />
                  </label>


                  {/* Medium */}

                  <label>
                    Medium *

                    <select
                      {...register(
                        `classes.${index}.medium`,
                        {
                          required:
                            "Medium is required",
                        }
                      )}

                      className={
                        classErrors
                          ?.medium
                          ? "input-error"
                          : ""
                      }
                    >

                      <option value="">
                        Select Medium
                      </option>

                      <option value="ENGLISH">
                        English
                      </option>

                      <option value="HINDI">
                        Hindi
                      </option>

                      <option value="MARATHI">
                        Marathi
                      </option>

                      <option value="BENGALI">
                        Bengali
                      </option>

                      <option value="OTHER">
                        Other
                      </option>

                    </select>

                    <FieldError
                      message={
                        classErrors
                          ?.medium
                          ?.message
                      }
                    />
                  </label>


                  {/* Shift */}

                  <label>
                    Shift *

                    <select
                      {...register(
                        `classes.${index}.shift`,
                        {
                          required:
                            "Shift is required",
                        }
                      )}

                      className={
                        classErrors
                          ?.shift
                          ? "input-error"
                          : ""
                      }
                    >

                      <option value="">
                        Select Shift
                      </option>

                      <option value="MORNING">
                        Morning
                      </option>

                      <option value="AFTERNOON">
                        Afternoon
                      </option>

                      <option value="EVENING">
                        Evening
                      </option>

                    </select>

                    <FieldError
                      message={
                        classErrors
                          ?.shift
                          ?.message
                      }
                    />
                  </label>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}