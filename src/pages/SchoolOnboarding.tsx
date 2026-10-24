import { useState } from "react";
import {
  FormProvider,
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { OnboardingNavigation } from "../components/school/onboarding/OnboardingNavigation";
import OnboardingStepper from "../components/school/onboarding/SchoolStepper";

import Step1SchoolDetails from "../components/school/onboarding/Step1SchoolInformation";
import Step2Academic from "../components/school/onboarding/Step2Academic";
import Step3Operations from "../components/school/onboarding/Step3Operations";
import Step4Configuration from "../components/school/onboarding/Step4Configuration";
import Step5Review from "../components/school/onboarding/Step5Review";
import { useAppDispatch } from "../store/hooks";
import { operationSucceeded, requestFinished, requestStarted } from "../store/feedbackSlice";
import "../styles/school-onboarding.css";

/* =========================================================
 * Types
 * ========================================================= */

// export type SchoolOnboardingForm = {
//   school: {
//     schoolName: string;
//     schoolCode: string;
//     schoolShortName?: string;
//     schoolType: string;
//     boards: string[];
//     schoolCategory: string;
//     mediums: string[];
//     establishmentYear: number | null;
//     udiseCode: string;
//     affiliationNumber?: string;
//     affiliationValidTill?: string;
//     schoolStatus: string;
//     schoolLogo?: File | null;
//   };

//   address: {
//     addressLine1: string;
//     addressLine2?: string;
//     landmark?: string;
//     village?: string;
//     city: string;
//     district: string;
//     state: string;
//     country: string;
//     pinCode: string;
//     latitude?: number | null;
//     longitude?: number | null;
//   };

//   contact: {
//     schoolEmail: string;
//     alternateEmail?: string;
//     mobileNumber: string;
//     alternateMobile?: string;
//     landline?: string;
//     stdCode?: string;
//     website?: string;
//     facebookUrl?: string;
//     instagramUrl?: string;
//     linkedinUrl?: string;
//   };

//   principal: {
//     principalName: string;
//     gender?: string;
//     dob?: string;
//     mobile: string;
//     email: string;
//     qualification?: string;
//     experience?: number;
//     joiningDate?: string;
//     aadhaarNumber?: string;
//     panNumber?: string;
//     photo?: File | null;
//   };

//   management: {
//     trustName?: string;
//     societyName?: string;
//     chairmanName?: string;
//     directorName?: string;
//     secretaryName?: string;
//     managementEmail?: string;
//     managementMobile?: string;
//     registrationNumber?: string;
//     registrationDate?: string;
//     gstNumber?: string;
//     panNumber?: string;
//   };

//   // academic: {
//   //   academicSession: string;
//   //   classesAvailable: string[];
//   //   sections: number;
//   //   totalStudents: number;
//   //   boys: number;
//   //   girls: number;
//   //   teachers: number;
//   //   teachingStaff: number;
//   //   nonTeachingStaff: number;
//   //   studentTeacherRatio?: number;
//   // };
//   academicSession: {
//   academicSession: string;
//   startDate: string;
//   endDate: string;
// };

// academicStatistics: {
//   boys: number;
//   girls: number;
//   teachers: number;
//   teachingStaff: number;
//   nonTeachingStaff: number;
// };

// classes: Array<{
//   className: string;
//   maximumStrength: number;
//   currentStrength: number;
//   numberOfSections: number;
//   medium: string;
//   shift: string;
//   sections: Array<{
//     sectionName: string;
//   }>;
// }>;

//   infrastructure: {
//     campusArea?: number;
//     buildingArea?: number;
//     smartClasses: number;
//     computerLabs: number;
//     scienceLabs: number;
//     library: boolean;
//     playground: boolean;
//     auditorium: boolean;
//     hostel: boolean;
//     transport: boolean;
//     cctvInstalled: boolean;
//     biometricInstalled: boolean;
//     fireSafetyCertificate?: File | null;
//     drinkingWater: boolean;
//     toiletsBoys: number;
//     toiletsGirls: number;
//     staffRooms: number;
//     medicalRoom: boolean;
//   };

//   fees: {
//     admissionFee: 0,
//     tuitionFee: 0,
//     annualFee: 0,
//     examFee: 0,
//     transportFee: 0,
//     hostelFee: 0,
//     feeFrequency: "MONTHLY",
//   },

//   // feeHeads: [],

//   bankAccounts: Array<{
//     bankName: string;
//     branch: string;
//     ifsc: string;
//     accountNumber: string;
//     accountHolder: string;
//     cancelledCheque?: File | null;
//   }>;

//   documents: Array<{
//     documentType: string;
//     file: File | null;
//   }>;

//   erpConfiguration: {
//     erpEnabled: false,
//     lmsEnabled: false,
//     attendanceModule: false,
//     transportModule: false,
//     hostelModule: false,
//     libraryModule: false,
//     hrModule: false,
//     payrollModule: false,
//     financeModule: false,
//     parentApp: false,
//     studentApp: false,
//     teacherApp: false,
//   },


//   loginConfiguration: {
//     adminUsername: "",
//     passwordPolicy: "STRONG",
//     twoFactorAuthentication: false,
//     passwordExpiryDays: 90,
//   },

//   communication: {
//     smsEnabled: false,
//     whatsappEnabled: false,
//     emailEnabled: true,
//     pushNotification: false,
//     languagePreference: "English",
//   },

//   transport: {
//     transportAvailable: boolean;
//     numberOfBuses: number;
//     gpsEnabled: boolean;

//     drivers: Array<{
//       name: string;
//       mobile: string;
//       licenseNumber: string;
//     }>;

//     routes: Array<{
//       routeName: string;
//       startPoint: string;
//       endPoint: string;
//       stops: string[];
//     }>;

//     vehicles: Array<{
//       registrationNumber: string;
//       vehicleType: string;
//       capacity: number;
//     }>;
//   };

//   hostel: {
//     hostelAvailable: boolean;
//     boysHostel: boolean;
//     girlsHostel: boolean;
//     numberOfRooms: number;
//     capacity: number;

//     wardens: Array<{
//       name: string;
//       mobile: string;
//     }>;
//   };

//   library: {
//     totalBooks: number;
//     eLibrary: boolean;
//     rfidEnabled: boolean;
//     librarySoftware?: string;
//   };

//   sports: {
//     indoorGames: string[];
//     outdoorGames: string[];
//     swimmingPool: boolean;
//     gymnasium: boolean;
//     coachAvailable: boolean;
//   };

//   medical: {
//     medicalRoom: boolean;
//     doctorAvailable: boolean;
//     nurseAvailable: boolean;
//     ambulance: boolean;
//     nearestHospital?: string;
//   };

//   compliance: {
//     childSafetyPolicy: null,
//     poshPolicy: null,
//     antiRaggingPolicy: null,
//     disasterManagementPlan: null,
//     insuranceDetails: null,
//   };

//   integrations: {
//     paymentGateway: "",
//     smsProvider: "",
//     whatsappApi: "",
//     googleWorkspace: false,
//     microsoft365: false,
//     zoomIntegration: false,
//     biometricVendor: "",
//   };
// };

/* =========================================================
 * Steps
 * ========================================================= */

const STEPS = [
  "School Details",
  "Academic",
  "Operations",
  "Configuration",
  "Review",
];

/* =========================================================
 * Default Form
 * ========================================================= */

export type SchoolOnboardingForm = {
  school: {
    schoolName: string;
    schoolCode: string;
    schoolShortName?: string;
    schoolType: string;
    boards: string[];
    schoolCategory: string;
    mediums: string[];
    establishmentYear: number | null;
    udiseCode: string;
    affiliationNumber?: string;
    affiliationValidTill?: string;
    affiliationStartDate?: string;
    schoolStatus: string;
    schoolLogo?: File | null;
  };

  address: {
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    village?: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pinCode: string;
    latitude?: number | null;
    longitude?: number | null;
  };

  contact: {
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
  };

  principal: {
    principalName: string;
    gender?: string;
    dob?: string;
    mobile: string;
    email: string;
    qualification?: string;
    experience?: number;
    joiningDate?: string;
    aadhaarNumber?: string;
    panNumber?: string;
    photo?: File | null;
  };

  management: {
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
  };

  academicSession: {
    academicSession: string;
    startDate: string;
    endDate: string;
  };

  academicStatistics: {
    boys: number;
    girls: number;
    teachers: number;
    teachingStaff: number;
    nonTeachingStaff: number;
  };

  classes: Array<{
    className: string;
    maximumStrength: number;
    currentStrength: number;
    numberOfSections: number;
    medium: string;
    shift: string;
    sections: Array<{
      sectionName: string;
    }>;
  }>;

  infrastructure: {
    campusArea?: number;
    buildingArea?: number;
    smartClasses: number;
    computerLabs: number;
    scienceLabs: number;
    library: boolean;
    playground: boolean;
    auditorium: boolean;
    hostel: boolean;
    transport: boolean;
    cctvInstalled: boolean;
    biometricInstalled: boolean;
    fireSafetyCertificate?: File | null;
    drinkingWater: boolean;
    toiletsBoys: number;
    toiletsGirls: number;
    staffRooms: number;
    medicalRoom: boolean;
  };

  fees: {
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
  };

  bankAccounts: Array<{
    bankName: string;
    branch: string;
    ifsc: string;
    accountNumber: string;
    accountHolder: string;
    cancelledCheque?: File | null;
  }>;

  documents: Array<{
    documentType: string;
    file: File | null;
  }>;

  erpConfiguration: {
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
  };

  loginConfiguration: {
    adminUsername: string;
    passwordPolicy: "MIN_8_CHARACTERS" | "STRONG";
    twoFactorAuthentication: boolean;
    passwordExpiryDays: number;
  };

  communication: {
    smsEnabled: boolean;
    whatsappEnabled: boolean;
    emailEnabled: boolean;
    pushNotification: boolean;
    languagePreference: string;
  };

  transport: {
    transportAvailable: boolean;
    numberOfBuses: number;
    gpsEnabled: boolean;

    drivers: Array<{
      name: string;
      mobile: string;
      licenseNumber: string;
    }>;

    routes: Array<{
      routeName: string;
      startPoint: string;
      endPoint: string;
      stops: string[];
    }>;

    vehicles: Array<{
      registrationNumber: string;
      vehicleType: string;
      capacity: number;
    }>;
  };

  hostel: {
    hostelAvailable: boolean;
    boysHostel: boolean;
    girlsHostel: boolean;
    numberOfRooms: number;
    capacity: number;

    wardens: Array<{
      name: string;
      mobile: string;
    }>;
  };

  library: {
    totalBooks: number;
    eLibrary: boolean;
    rfidEnabled: boolean;
    librarySoftware?: string;
  };

  sports: {
    indoorGames: string[];
    outdoorGames: string[];
    swimmingPool: boolean;
    gymnasium: boolean;
    coachAvailable: boolean;
  };

  medical: {
    medicalRoom: boolean;
    doctorAvailable: boolean;
    nurseAvailable: boolean;
    ambulance: boolean;
    nearestHospital?: string;
  };

  compliance: {
    childSafetyPolicy: File | null;
    poshPolicy: File | null;
    antiRaggingPolicy: File | null;
    disasterManagementPlan: File | null;
    insuranceDetails: File | null;
  };

  integrations: {
    paymentGateway: string;
    smsProvider: string;
    whatsappApi: string;
    googleWorkspace: boolean;
    microsoft365: boolean;
    zoomIntegration: boolean;
    biometricVendor: string;
  };
};

const DEFAULT_VALUES: SchoolOnboardingForm = {
  school: {
    schoolName: "",
    schoolCode: "",
    schoolShortName: "",
    schoolType: "",
    boards: [],
    schoolCategory: "",
    mediums: [],
    establishmentYear: null,
    udiseCode: "",
    affiliationNumber: "",
    affiliationValidTill: "",
    schoolStatus: "PENDING",
    schoolLogo: null,
  },

  address: {
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    village: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    pinCode: "",
    latitude: null,
    longitude: null,
  },

  contact: {
    schoolEmail: "",
    alternateEmail: "",
    mobileNumber: "",
    alternateMobile: "",
    landline: "",
    stdCode: "",
    website: "",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
  },

  principal: {
    principalName: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    qualification: "",
    experience: 0,
    joiningDate: "",
    aadhaarNumber: "",
    panNumber: "",
    photo: null,
  },

  management: {
    trustName: "",
    societyName: "",
    chairmanName: "",
    directorName: "",
    secretaryName: "",
    managementEmail: "",
    managementMobile: "",
    registrationNumber: "",
    registrationDate: "",
    gstNumber: "",
    panNumber: "",
  },

  academicSession: {
    academicSession: "",
    startDate: "",
    endDate: "",
  },

  academicStatistics: {
    boys: 0,
    girls: 0,
    teachers: 0,
    teachingStaff: 0,
    nonTeachingStaff: 0,
  },

  classes: [],

  infrastructure: {
    campusArea: 0,
    buildingArea: 0,
    smartClasses: 0,
    computerLabs: 0,
    scienceLabs: 0,
    library: false,
    playground: false,
    auditorium: false,
    hostel: false,
    transport: false,
    cctvInstalled: false,
    biometricInstalled: false,
    fireSafetyCertificate: null,
    drinkingWater: false,
    toiletsBoys: 0,
    toiletsGirls: 0,
    staffRooms: 0,
    medicalRoom: false,
  },

  fees: {
    admissionFee: 0,
    tuitionFee: 0,
    annualFee: 0,
    examFee: 0,
    transportFee: 0,
    hostelFee: 0,
    feeFrequency: "MONTHLY",
  },

  feeHeads: [],

  bankAccounts: [],

  documents: [],

  erpConfiguration: {
    erpEnabled: false,
    lmsEnabled: false,
    attendanceModule: false,
    transportModule: false,
    hostelModule: false,
    libraryModule: false,
    hrModule: false,
    payrollModule: false,
    financeModule: false,
    parentApp: false,
    studentApp: false,
    teacherApp: false,
  },

  loginConfiguration: {
    adminUsername: "",
    passwordPolicy: "MIN_8_CHARACTERS",
    twoFactorAuthentication: false,
    passwordExpiryDays: 90,
  },

  communication: {
    smsEnabled: false,
    whatsappEnabled: false,
    emailEnabled: true,
    pushNotification: false,
    languagePreference: "English",
  },

  transport: {
    transportAvailable: false,
    numberOfBuses: 0,
    gpsEnabled: false,
    drivers: [],
    routes: [],
    vehicles: [],
  },

  hostel: {
    hostelAvailable: false,
    boysHostel: false,
    girlsHostel: false,
    numberOfRooms: 0,
    capacity: 0,
    wardens: [],
  },

  library: {
    totalBooks: 0,
    eLibrary: false,
    rfidEnabled: false,
    librarySoftware: "",
  },

  sports: {
    indoorGames: [],
    outdoorGames: [],
    swimmingPool: false,
    gymnasium: false,
    coachAvailable: false,
  },

  medical: {
    medicalRoom: false,
    doctorAvailable: false,
    nurseAvailable: false,
    ambulance: false,
    nearestHospital: "",
  },

  compliance: {
    childSafetyPolicy: null,
    poshPolicy: null,
    antiRaggingPolicy: null,
    disasterManagementPlan: null,
    insuranceDetails: null,
  },

  integrations: {
    paymentGateway: "",
    smsProvider: "",
    whatsappApi: "",
    googleWorkspace: false,
    microsoft365: false,
    zoomIntegration: false,
    biometricVendor: "",
  },
};

/* =========================================================
 * Component
 * ========================================================= */

export function SchoolOnboardingPage() {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<SchoolOnboardingForm>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    reset,
  } = methods;

  /* -------------------------------------------------------
   * Step validation
   * ------------------------------------------------------- */

  const getStepFields = (
    step: number
  ): string[] => {
    switch (step) {
      case 0:
        return [
          "school.schoolName",
          "school.schoolCode",
          "school.schoolType",
          "school.boards",
          "school.schoolCategory",
          "school.mediums",
          "school.establishmentYear",
          "school.udiseCode",

          "address.addressLine1",
          "address.city",
          "address.district",
          "address.state",
          "address.country",
          "address.pinCode",

          "contact.schoolEmail",
          "contact.mobileNumber",

          "principal.principalName",
          "principal.mobile",
          "principal.email",
        ];

      case 1:
        return [
          "academicSession.academicSession",
          "academicSession.startDate",
          "academicSession.endDate",

          "academicStatistics.boys",
          "academicStatistics.girls",
          "academicStatistics.teachers",
          "academicStatistics.teachingStaff",
          "academicStatistics.nonTeachingStaff",

          "classes",
        ];

      case 2:
        return [
          "infrastructure.smartClasses",
          "infrastructure.computerLabs",
          "infrastructure.scienceLabs",
          "fees.feeFrequency",
        ];

      case 3:
        return [
          "erpConfiguration.erpEnabled",
          "communication.emailEnabled",
        ];

      default:
        return [];
    }
  };

  /* -------------------------------------------------------
   * Next
   * ------------------------------------------------------- */

const handleNext = async () => {
  const fields = getStepFields(currentStep);

  console.log("STEP:", currentStep);
  console.log("FIELDS:", fields);
  console.log("VALUES:", getValues());

  for (const field of fields) {
    const result = await trigger(field as any);

    console.log(
      `[VALIDATION] ${field}:`,
      result,
      "value:",
      getValues(field as any)
    );
  }

  const isValid = await trigger(fields as any);

  console.log("FINAL VALID:", isValid);
  console.log("FINAL ERRORS:", methods.formState.errors);

  if (!isValid) {
    return;
  }

  setCurrentStep((step) =>
    Math.min(step + 1, STEPS.length - 1)
  );
};

  /* -------------------------------------------------------
   * Back
   * ------------------------------------------------------- */

  const handleBack = () => {
    setCurrentStep((step) =>
      Math.max(step - 1, 0)
    );
  };

  /* -------------------------------------------------------
   * Save Draft
   * ------------------------------------------------------- */

  const handleSaveDraft = () => {
    const data = getValues();

    console.log(
      "School draft:",
      data
    );

    /*
     * Later:
     *
     * await createSchoolDraft(data);
     *
     * or
     *
     * await updateSchoolDraft({
     *   schoolId,
     *   data
     * });
     */

    alert(
      "School draft saved successfully."
    );
  };

  /* -------------------------------------------------------
   * Final Submit
   * ------------------------------------------------------- */

  const handleCreateSchool: SubmitHandler<
    SchoolOnboardingForm
  > = async (data) => {
    console.log(
      "Complete school payload:",
      data
    );

    // Read auth token from localStorage (set by authSlice)
    const token = localStorage.getItem(
      "travo_tcms_auth_token"
    );

    // Remove File objects (and related binary data) so payload is JSON-serializable
    const cleanify = (obj: any): any => {
      if (obj instanceof File) return undefined;
      if (Array.isArray(obj)) return obj.map(cleanify);
      if (obj && typeof obj === "object") {
        const res: any = {};
        for (const k of Object.keys(obj)) {
          const v = (obj as any)[k];
          if (v instanceof File) continue;
          if (Array.isArray(v)) {
            res[k] = v.map((item: any) =>
              item instanceof File ? undefined : cleanify(item)
            );
          } else if (v && typeof v === "object") {
            res[k] = cleanify(v);
          } else {
            res[k] = v;
          }
        }
        return res;
      }
      return obj;
    };

    const payload = cleanify(data);

    dispatch(requestStarted());
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8083"}/admin/schools`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Create school failed:", res.status, text);
        alert("Failed to submit school. See console for details.");
        return;
      }

      const result = await res.json();
      console.log("School created:", result);
      dispatch(operationSucceeded("schoolOnboarding"));

      // Reset form after successful creation
      reset(DEFAULT_VALUES);
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error while submitting school.");
    } finally {
      dispatch(requestFinished());
    }
  };

  /* -------------------------------------------------------
   * Render Current Step
   * ------------------------------------------------------- */

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1SchoolDetails />;

      case 1:
        return <Step2Academic />;

      case 2:
        return <Step3Operations />;

      case 3:
        return <Step4Configuration />;

      case 4:
        return (
          <Step5Review
            onEdit={setCurrentStep}
          />
        );

      default:
        return null;
    }
  };

  /* -------------------------------------------------------
   * Render
   * ------------------------------------------------------- */

  return (
    <FormProvider {...methods}>
      <form
        className="school-onboarding-page"
        onSubmit={handleSubmit(
          handleCreateSchool
        )}
      >
        {/* Header */}

        <div className="page-header">
          <div>
            <h1>
              Create School
            </h1>

            <p>
              Complete school onboarding
              information to create a
              new school organization.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() =>
              window.history.back()
            }
          >
            Cancel
          </button>
        </div>

        {/* Stepper */}

        <OnboardingStepper
          currentStep={currentStep}
          steps={STEPS}
        />

        {/* Current Step */}

        <section className="surface-panel">
          <div className="panel-head">
            <div>
              <span className="step-label">
                Step {currentStep + 1} of{" "}
                {STEPS.length}
              </span>

              <h2>
                {STEPS[currentStep]}
              </h2>
            </div>
          </div>

          <div className="onboarding-content">
            {renderStep()}
          </div>
        </section>

        {/* Navigation */}

        <OnboardingNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onBack={handleBack}
          onNext={handleNext}
          onSaveDraft={
            handleSaveDraft
          }
        />
      </form>
    </FormProvider>
  );
}