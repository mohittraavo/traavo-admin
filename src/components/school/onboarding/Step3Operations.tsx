import {
  Controller,
  useFormContext,
  useWatch,
} from "react-hook-form";

import type {
  SchoolOnboardingForm,
} from "../../../types/school";

/* =========================================================
   STEP 3 - OPERATIONS
   ========================================================= */

export default function Step3Operations() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SchoolOnboardingForm>();

  /* =========================================================
     CONDITIONAL SECTIONS
     ========================================================= */

  const transportAvailable = useWatch({
    control,
    name: "transport.transportAvailable",
  });

  const hostelAvailable = useWatch({
    control,
    name: "hostel.hostelAvailable",
  });

  /* =========================================================
     ERROR HELPER
     ========================================================= */

  const getError = (
    section: keyof SchoolOnboardingForm,
    field: string
  ): string | undefined => {
    const sectionErrors = errors[section];

    if (!sectionErrors) {
      return undefined;
    }

    const error = (sectionErrors as Record<string, any>)[field];

    return error?.message;
  };

  return (
    <div className="onboarding-content">

      {/* =====================================================
          INFRASTRUCTURE
      ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">
          <h3>Infrastructure</h3>

          <p>
            Provide the physical infrastructure and facilities
            available at the school.
          </p>
        </div>

        <div className="onboarding-form-grid three-columns">

          {/* Campus Area */}

          <div
            className={`onboarding-form-group ${
              getError("infrastructure", "campusArea")
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Campus Area
            </label>

            <input
              type="number"
              min={0}
              step="any"
              placeholder="e.g. 5.5"
              {...register(
                "infrastructure.campusArea",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Campus area cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "infrastructure",
              "campusArea"
            ) && (
              <p className="field-error">
                {getError(
                  "infrastructure",
                  "campusArea"
                )}
              </p>
            )}
          </div>

          {/* Building Area */}

          <div
            className={`onboarding-form-group ${
              getError("infrastructure", "buildingArea")
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Building Area
            </label>

            <input
              type="number"
              min={0}
              step="any"
              placeholder="e.g. 12000"
              {...register(
                "infrastructure.buildingArea",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Building area cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "infrastructure",
              "buildingArea"
            ) && (
              <p className="field-error">
                {getError(
                  "infrastructure",
                  "buildingArea"
                )}
              </p>
            )}
          </div>

          {/* Smart Classes */}

          <div
            className={`onboarding-form-group ${
              getError("infrastructure", "smartClasses")
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Smart Classes
            </label>

            <input
              type="number"
              min={0}
              placeholder="0"
              {...register(
                "infrastructure.smartClasses",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Smart classes cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "infrastructure",
              "smartClasses"
            ) && (
              <p className="field-error">
                {getError(
                  "infrastructure",
                  "smartClasses"
                )}
              </p>
            )}
          </div>

          {/* Computer Labs */}

          <div
            className={`onboarding-form-group ${
              getError("infrastructure", "computerLabs")
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Computer Labs
            </label>

            <input
              type="number"
              min={0}
              placeholder="0"
              {...register(
                "infrastructure.computerLabs",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Computer labs cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "infrastructure",
              "computerLabs"
            ) && (
              <p className="field-error">
                {getError(
                  "infrastructure",
                  "computerLabs"
                )}
              </p>
            )}
          </div>

          {/* Science Labs */}

          <div
            className={`onboarding-form-group ${
              getError("infrastructure", "scienceLabs")
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Science Labs
            </label>

            <input
              type="number"
              min={0}
              placeholder="0"
              {...register(
                "infrastructure.scienceLabs",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Science labs cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "infrastructure",
              "scienceLabs"
            ) && (
              <p className="field-error">
                {getError(
                  "infrastructure",
                  "scienceLabs"
                )}
              </p>
            )}
          </div>

          {/* Boys Toilets */}

          <div
            className={`onboarding-form-group ${
              getError("infrastructure", "toiletsBoys")
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Toilets - Boys
            </label>

            <input
              type="number"
              min={0}
              placeholder="0"
              {...register(
                "infrastructure.toiletsBoys",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Toilet count cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "infrastructure",
              "toiletsBoys"
            ) && (
              <p className="field-error">
                {getError(
                  "infrastructure",
                  "toiletsBoys"
                )}
              </p>
            )}
          </div>

          {/* Girls Toilets */}

          <div
            className={`onboarding-form-group ${
              getError("infrastructure", "toiletsGirls")
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Toilets - Girls
            </label>

            <input
              type="number"
              min={0}
              placeholder="0"
              {...register(
                "infrastructure.toiletsGirls",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Toilet count cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "infrastructure",
              "toiletsGirls"
            ) && (
              <p className="field-error">
                {getError(
                  "infrastructure",
                  "toiletsGirls"
                )}
              </p>
            )}
          </div>

          {/* Staff Rooms */}

          <div
            className={`onboarding-form-group ${
              getError("infrastructure", "staffRooms")
                ? "has-error"
                : ""
            }`}
          >
            <label>
              Staff Rooms
            </label>

            <input
              type="number"
              min={0}
              placeholder="0"
              {...register(
                "infrastructure.staffRooms",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Staff rooms cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "infrastructure",
              "staffRooms"
            ) && (
              <p className="field-error">
                {getError(
                  "infrastructure",
                  "staffRooms"
                )}
              </p>
            )}
          </div>

        </div>

        {/* =====================================================
            FACILITIES
        ===================================================== */}

        <div className="onboarding-section-header">
          <h3>Facilities</h3>
        </div>

        <div className="checkbox-grid">

          {[
            {
              name: "infrastructure.library",
              label: "Library",
            },
            {
              name: "infrastructure.playground",
              label: "Playground",
            },
            {
              name: "infrastructure.auditorium",
              label: "Auditorium",
            },
            {
              name: "infrastructure.cctvInstalled",
              label: "CCTV Installed",
            },
            {
              name: "infrastructure.biometricInstalled",
              label: "Biometric Installed",
            },
            {
              name: "infrastructure.drinkingWater",
              label: "Drinking Water",
            },
            {
              name: "infrastructure.medicalRoom",
              label: "Medical Room",
            },
          ].map((item) => (
            <label
              key={item.name}
              className="checkbox-item"
            >
              <input
                type="checkbox"
                {...register(item.name as any)}
              />

              <span>
                {item.label}
              </span>
            </label>
          ))}

        </div>

        {/* =====================================================
            FIRE SAFETY
        ===================================================== */}

        <div className="onboarding-form-group">

          <label>
            Fire Safety Certificate
          </label>

          <div className="file-upload">

            <label className="file-upload-box">

              <input
                type="file"
                accept=".pdf,application/pdf"
                {...register(
                  "infrastructure.fireSafetyCertificate"
                )}
                hidden
              />

              <span className="file-upload-text">
                Upload Fire Safety Certificate
                <br />
                PDF only
              </span>

            </label>

          </div>

        </div>

      </section>

      {/* =====================================================
          TRANSPORT
      ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">
          <h3>Transport</h3>

          <p>
            Configure school transportation facilities.
          </p>
        </div>

        <label className="checkbox-item">

          <input
            type="checkbox"
            {...register(
              "transport.transportAvailable"
            )}
          />

          <span>
            Transport Available
          </span>

        </label>

        {transportAvailable && (
          <div className="onboarding-form-grid">

            {/* Number of Buses */}

            <div
              className={`onboarding-form-group ${
                getError(
                  "transport",
                  "numberOfBuses"
                )
                  ? "has-error"
                  : ""
              }`}
            >

              <label>
                Number of Buses
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="number"
                min={1}
                {...register(
                  "transport.numberOfBuses",
                  {
                    valueAsNumber: true,
                    required: {
                      value: true,
                      message:
                        "Number of buses is required.",
                    },
                    min: {
                      value: 1,
                      message:
                        "At least one bus is required.",
                    },
                  }
                )}
              />

              {getError(
                "transport",
                "numberOfBuses"
              ) && (
                <p className="field-error">
                  {getError(
                    "transport",
                    "numberOfBuses"
                  )}
                </p>
              )}

            </div>

            {/* GPS */}

            <div className="onboarding-form-group">

              <label>
                GPS Tracking
              </label>

              <label className="checkbox-item">

                <input
                  type="checkbox"
                  {...register(
                    "transport.gpsEnabled"
                  )}
                />

                <span>
                  GPS Enabled
                </span>

              </label>

            </div>

          </div>
        )}

      </section>

      {/* =====================================================
          HOSTEL
      ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">

          <h3>
            Hostel
          </h3>

          <p>
            Configure residential facilities if the
            school provides hostel accommodation.
          </p>

        </div>

        <label className="checkbox-item">

          <input
            type="checkbox"
            {...register(
              "hostel.hostelAvailable"
            )}
          />

          <span>
            Hostel Available
          </span>

        </label>

        {hostelAvailable && (

          <div className="onboarding-form-grid">

            {/* Boys Hostel */}

            <div className="onboarding-form-group">

              <label>
                Boys Hostel
              </label>

              <label className="checkbox-item">

                <input
                  type="checkbox"
                  {...register(
                    "hostel.boysHostel"
                  )}
                />

                <span>
                  Available
                </span>

              </label>

            </div>

            {/* Girls Hostel */}

            <div className="onboarding-form-group">

              <label>
                Girls Hostel
              </label>

              <label className="checkbox-item">

                <input
                  type="checkbox"
                  {...register(
                    "hostel.girlsHostel"
                  )}
                />

                <span>
                  Available
                </span>

              </label>

            </div>

            {/* Number of Rooms */}

            <div
              className={`onboarding-form-group ${
                getError(
                  "hostel",
                  "numberOfRooms"
                )
                  ? "has-error"
                  : ""
              }`}
            >

              <label>
                Number of Rooms
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="number"
                min={1}
                {...register(
                  "hostel.numberOfRooms",
                  {
                    valueAsNumber: true,
                    required: {
                      value: true,
                      message:
                        "Number of rooms is required.",
                    },
                    min: {
                      value: 1,
                      message:
                        "At least one hostel room is required.",
                    },
                  }
                )}
              />

              {getError(
                "hostel",
                "numberOfRooms"
              ) && (
                <p className="field-error">
                  {getError(
                    "hostel",
                    "numberOfRooms"
                  )}
                </p>
              )}

            </div>

            {/* Capacity */}

            <div
              className={`onboarding-form-group ${
                getError(
                  "hostel",
                  "capacity"
                )
                  ? "has-error"
                  : ""
              }`}
            >

              <label>
                Total Capacity
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="number"
                min={1}
                {...register(
                  "hostel.capacity",
                  {
                    valueAsNumber: true,
                    required: {
                      value: true,
                      message:
                        "Hostel capacity is required.",
                    },
                    min: {
                      value: 1,
                      message:
                        "Hostel capacity must be greater than zero.",
                    },
                  }
                )}
              />

              {getError(
                "hostel",
                "capacity"
              ) && (
                <p className="field-error">
                  {getError(
                    "hostel",
                    "capacity"
                  )}
                </p>
              )}

            </div>

          </div>

        )}

      </section>

      {/* =====================================================
          LIBRARY
      ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">

          <h3>
            Library
          </h3>

          <p>
            Configure library resources and systems.
          </p>

        </div>

        <div className="onboarding-form-grid">

          {/* Total Books */}

          <div
            className={`onboarding-form-group ${
              getError(
                "library",
                "totalBooks"
              )
                ? "has-error"
                : ""
            }`}
          >

            <label>
              Total Books
            </label>

            <input
              type="number"
              min={0}
              {...register(
                "library.totalBooks",
                {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message:
                      "Total books cannot be negative.",
                  },
                }
              )}
            />

            {getError(
              "library",
              "totalBooks"
            ) && (
              <p className="field-error">
                {getError(
                  "library",
                  "totalBooks"
                )}
              </p>
            )}

          </div>

          {/* Library Software */}

          <div className="onboarding-form-group">

            <label>
              Library Software
            </label>

            <input
              placeholder="e.g. Koha"
              {...register(
                "library.librarySoftware"
              )}
            />

          </div>

        </div>

        {/* Library Options */}

        <div className="checkbox-grid">

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "library.eLibrary"
              )}
            />

            <span>
              E-Library
            </span>

          </label>

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "library.rfidEnabled"
              )}
            />

            <span>
              RFID Enabled
            </span>

          </label>

        </div>

      </section>

      {/* =====================================================
          SPORTS
      ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">

          <h3>
            Sports Facilities
          </h3>

          <p>
            Configure indoor and outdoor sports
            facilities available at the school.
          </p>

        </div>

        <div className="onboarding-form-grid">

          {/* =================================================
              INDOOR GAMES
          ================================================= */}

          <div className="onboarding-form-group">

            <label>
              Indoor Games
            </label>

            <Controller
              name="sports.indoorGames"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  value={
                    field.value?.join(", ") ?? ""
                  }
                  placeholder="e.g. Chess, Carrom, Table Tennis"
                  onChange={(event) => {

                    const games =
                      event.target.value
                        .split(",")
                        .map(
                          (item) =>
                            item.trim()
                        )
                        .filter(Boolean);

                    field.onChange(games);
                  }}
                />
              )}
            />

            <small className="form-help-text">
              Enter games separated by commas.
            </small>

          </div>

          {/* =================================================
              OUTDOOR GAMES
          ================================================= */}

          <div className="onboarding-form-group">

            <label>
              Outdoor Games
            </label>

            <Controller
              name="sports.outdoorGames"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  value={
                    field.value?.join(", ") ?? ""
                  }
                  placeholder="e.g. Football, Cricket, Basketball"
                  onChange={(event) => {

                    const games =
                      event.target.value
                        .split(",")
                        .map(
                          (item) =>
                            item.trim()
                        )
                        .filter(Boolean);

                    field.onChange(games);
                  }}
                />
              )}
            />

            <small className="form-help-text">
              Enter games separated by commas.
            </small>

          </div>

        </div>

        {/* Sports Options */}

        <div className="checkbox-grid">

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "sports.swimmingPool"
              )}
            />

            <span>
              Swimming Pool
            </span>

          </label>

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "sports.gymnasium"
              )}
            />

            <span>
              Gymnasium
            </span>

          </label>

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "sports.coachAvailable"
              )}
            />

            <span>
              Coach Available
            </span>

          </label>

        </div>

      </section>

      {/* =====================================================
          MEDICAL
      ===================================================== */}

      <section className="onboarding-section">

        <div className="onboarding-section-header">

          <h3>
            Medical Facilities
          </h3>

          <p>
            Provide information about medical support
            available at the school.
          </p>

        </div>

        <div className="checkbox-grid">

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "medical.medicalRoom"
              )}
            />

            <span>
              Medical Room
            </span>

          </label>

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "medical.doctorAvailable"
              )}
            />

            <span>
              Doctor Available
            </span>

          </label>

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "medical.nurseAvailable"
              )}
            />

            <span>
              Nurse Available
            </span>

          </label>

          <label className="checkbox-item">

            <input
              type="checkbox"
              {...register(
                "medical.ambulance"
              )}
            />

            <span>
              Ambulance
            </span>

          </label>

        </div>

        <div className="onboarding-form-group">

          <label>
            Nearest Hospital
          </label>

          <input
            placeholder="Hospital name / address"
            {...register(
              "medical.nearestHospital"
            )}
          />

        </div>

      </section>

    </div>
  );
}