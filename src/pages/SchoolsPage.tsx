import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { DataTable } from "../components/common/DataTable";
import { Pagination } from "../components/common/Pagination";
import { StatusBadge } from "../components/common/StatusBadge";
import {
  useGetSchoolsQuery,
  useGetSubscriptionPlansQuery,
  useCreateSubscriptionMutation,
  type SchoolListRecord,
} from "../store/tcmsApi";
import { useAdminData } from "../components/admin/AdminDataProvider";
import { Modal } from "../components/common/Modal";

const ROWS_PER_PAGE = 10;

type SchoolFilters = {
  searchText: string;
  boardFilter: "ALL" | "CBSE" | "ICSE" | "IB";
  planFilter:
    | "ALL"
    | "Starter"
    | "Professional"
    | "Enterprise";
  statusFilter:
    | "ALL"
    | "Active"
    | "Suspended";
};

const DEFAULT_FILTERS: SchoolFilters = {
  searchText: "",
  boardFilter: "ALL",
  planFilter: "ALL",
  statusFilter: "ALL",
};

/* =========================================================
 * Helpers
 * ========================================================= */

const displayValue = (
  value: unknown,
  fallback = "—"
): string => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  return String(value);
};

const normalize = (value: unknown): string => {
  return String(value ?? "")
    .trim()
    .toLowerCase();
};

/* =========================================================
 * Component
 * ========================================================= */

export function SchoolsPage({
  embedded = false,
}: {
  embedded?: boolean;
} = {}) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const {
    data: schools = [],
    isLoading,
    isError,
    refetch,
  } = useGetSchoolsQuery();

  const { data: plans = [], isLoading: plansLoading } = useGetSubscriptionPlansQuery();
  const [createSubscription, { isLoading: creating }] = useCreateSubscriptionMutation();

  const [modalSchool, setModalSchool] = useState<SchoolListRecord | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { canAccess } = useAdminData();

  const openSubscriptionModal = (school: SchoolListRecord) => {
    if (!plans || plans.length === 0) {
      alert("No subscription plans available.");
      return;
    }
    setModalSchool(school);
    setSelectedPlan(null);
  };

  const closeSubscriptionModal = () => {
    setModalSchool(null);
    setSelectedPlan(null);
  };

  const handleSendSubscription = async () => {
    if (!modalSchool || !selectedPlan)
      return alert("Please select a plan");

    try {
      await createSubscription({
        schoolId: modalSchool.id,
        planId: selectedPlan,
      }).unwrap();

      closeSubscriptionModal();
    } catch (err) {
      console.error(err);
      alert("Failed to send subscription. See console for details.");
    }
  };

  const {
    register,
    watch,
    reset,
  } = useForm<SchoolFilters>({
    defaultValues: DEFAULT_FILTERS,
  });

  const searchText =
    watch("searchText") ?? "";

  const boardFilter =
    watch("boardFilter") ?? "ALL";

  const planFilter =
    watch("planFilter") ?? "ALL";

  const statusFilter =
    watch("statusFilter") ?? "ALL";

  /* =========================================================
   * Actions
   * ========================================================= */

  const handleAddSchool = () => {
    navigate("/school-management/create");
  };

  const handleViewSchool = (
    schoolId: string | number | null | undefined
  ) => {
    if (
      schoolId === null ||
      schoolId === undefined ||
      schoolId === ""
    ) {
      return;
    }

    navigate(
      `/school-management/${encodeURIComponent(
        String(schoolId)
      )}`
    );
  };

  const handleClearFilters = () => {
    reset(DEFAULT_FILTERS);
    setPage(1);
  };

  const handleFilterChange = () => {
    setPage(1);
  };

  /* =========================================================
   * Filtering
   * ========================================================= */

  const filteredSchools = useMemo(() => {
    const search = normalize(searchText);

    return (schools ?? []).filter(
      (school: SchoolListRecord) => {
        if (!school) {
          return false;
        }

        const schoolName =
          normalize(school.schoolName);

        const schoolCode =
          normalize(school.schoolCode);

        const principalName =
          normalize(
            school.schoolAdmin?.principalName
          );

        const principalEmail =
          normalize(
            school.schoolAdmin?.email
          );

        const board =
          normalize(school.board);

        const plan =
          normalize(
            school.subscriptionPlan
          );

        const status =
          normalize(school.status);

        const matchesSearch =
          !search ||
          schoolName.includes(search) ||
          schoolCode.includes(search) ||
          principalName.includes(search) ||
          principalEmail.includes(search);

        const matchesBoard =
          boardFilter === "ALL" ||
          board === normalize(boardFilter);

        const matchesPlan =
          planFilter === "ALL" ||
          plan === normalize(planFilter);

        const matchesStatus =
          statusFilter === "ALL" ||
          status === normalize(statusFilter);

        return (
          matchesSearch &&
          matchesBoard &&
          matchesPlan &&
          matchesStatus
        );
      }
    );
  }, [
    schools,
    searchText,
    boardFilter,
    planFilter,
    statusFilter,
  ]);

  /* =========================================================
   * Pagination
   * ========================================================= */

  const totalItems =
    filteredSchools.length;

  const totalPages =
    Math.max(
      Math.ceil(
        totalItems / ROWS_PER_PAGE
      ),
      1
    );

  /*
   * If filters reduce the number of pages,
   * automatically move back to a valid page.
   */
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const currentPage =
    Math.min(
      Math.max(page, 1),
      totalPages
    );

  const pageStart =
    (currentPage - 1) *
    ROWS_PER_PAGE;

  const pageRows =
    filteredSchools.slice(
      pageStart,
      pageStart + ROWS_PER_PAGE
    );

  /* =========================================================
   * Table Columns
   * ========================================================= */

  const columns = [
    {
      key: "schoolName",
      header: "School Name",
      render: (
        school: SchoolListRecord
      ) => (
        <div className="school-name-cell">
          <strong>
            {displayValue(
              school?.schoolName
            )}
          </strong>
        </div>
      ),
    },

    {
      key: "schoolCode",
      header: "School Code",
      render: (
        school: SchoolListRecord
      ) =>
        displayValue(
          school?.schoolCode
        ),
    },

    {
      key: "board",
      header: "Board",
      render: (
        school: SchoolListRecord
      ) =>
        displayValue(
          school?.board
        ),
    },

    {
      key: "plan",
      header: "Subscription Plan",
      render: (
        school: SchoolListRecord
      ) =>
        displayValue(
          school?.subscriptionPlan
        ),
    },


    {
      key: "campuses",
      header: "Total Campuses",
      render: (
        school: SchoolListRecord
      ) =>
        displayValue(
          school?.totalCampuses,
          "0"
        ),
    },

    {
      key: "students",
      header: "Total Students",
      render: (
        school: SchoolListRecord
      ) =>
        displayValue(
          school?.totalStudents,
          "0"
        ),
    },

    {
      key: "admin",
      header: "School Admin",
      render: (
        school: SchoolListRecord
      ) => {
        const principalName =
          displayValue(
            school?.schoolAdmin
              ?.principalName
          );

        const email =
          displayValue(
            school?.schoolAdmin?.email,
            ""
          );

        return (
          <div className="school-admin-cell">
            <div>
              {principalName}
            </div>

            {email && (
              <small>
                {email}
              </small>
            )}
          </div>
        );
      },
    },

    {
      key: "status",
      header: "Status",
      render: (
        school: SchoolListRecord
      ) => {
        return <StatusBadge value={displayValue(school?.status)} />;
      },
    },

    {
      key: "createdDate",
      header: "Created Date",
      render: (
        school: SchoolListRecord
      ) =>
        displayValue(
          school?.createdDate
        ),
    },

    {
      key: "action",
      header: "Action",
      render: (
        school: SchoolListRecord
      ) => {
        const hasId =
          school?.id !== null &&
          school?.id !== undefined &&
          school?.id !== "";

        return (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className="btn btn-ghost btn-icon-only"
              disabled={!hasId}
              onClick={() =>
                handleViewSchool(
                  school?.id
                )
              }
              aria-label={`View ${school?.schoolName ?? "school"}`}
              title="View school"
            >
              <span aria-hidden="true">◉</span>
            </button>

            {canAccess && canAccess("Subscription Management.Create") && !school?.subscriptionPlan ? (
              <button
                type="button"
                className="btn btn-secondary btn-icon-only"
                disabled={!hasId || !plans || plans.length === 0}
                onClick={() => openSubscriptionModal(school)}
                aria-label={`Subscribe ${school?.schoolName ?? "school"}`}
                title="Subscribe school"
              >
                <span aria-hidden="true">↗</span>
              </button>
            ) : null}
          </div>
        );
      },
    },
  ];

  /* =========================================================
   * Render
   * ========================================================= */
 
  return (
    <div className="page-container">
      {/* =====================================================
       * PAGE HEADER
       * ===================================================== */}
 
      <div className="page-header">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddSchool}
        >
          <span className="button-icon" aria-hidden="true">＋</span> Add School
        </button>
      </div>

      {/* Subscription modal */}
      {modalSchool ? (
        <Modal title={`Send subscription to ${modalSchool.schoolName}`} onClose={closeSubscriptionModal}>
          <div className="subscription-form-row">
            <label htmlFor="school-subscription-plan">Plan</label>
            <select
              id="school-subscription-plan"
              value={selectedPlan ?? ""}
              onChange={(event) => setSelectedPlan(event.target.value || null)}
              disabled={plansLoading || creating}
              required
            >
                <option value="">Select a plan</option>
                {plans.map((p: any) => (
                  <option key={p.id ?? p.planId ?? p.name} value={p.id ?? p.planId ?? p.name}>
                    {p.name ?? p.planName} — ₹{p.offerPrice ?? p.price}
                  </option>
                ))}
            </select>
          </div>

          <p className="subscription-help">
            The subscription dates will be calculated automatically from the selected plan's billing cycle.
          </p>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={closeSubscriptionModal} disabled={creating}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSendSubscription} disabled={!selectedPlan || creating || plansLoading}>
              {creating ? "Sending..." : "Send subscription"}
            </button>
          </div>
        </Modal>
      ) : null}

      {/* =====================================================
       * MAIN CONTENT
       * ===================================================== */}

      <section>
        {/* ===================================================
         * FILTERS
         * =================================================== */}

        <div className="filters-bar">
          {/* Search */}

          <label>
            Search

            <input
              type="text"
              {...register(
                "searchText",
                {
                  onChange:
                    handleFilterChange,
                }
              )}
              placeholder="School name, code, admin"
            />
          </label>

          {/* Board */}

          <label>
            Board

            <select
              {...register(
                "boardFilter",
                {
                  onChange:
                    handleFilterChange,
                }
              )}
            >
              <option value="ALL">
                All
              </option>

              <option value="CBSE">
                CBSE
              </option>

              <option value="ICSE">
                ICSE
              </option>

              <option value="IB">
                IB
              </option>
            </select>
          </label>

          {/* Plan */}

          <label>
            Plan

            <select
              {...register(
                "planFilter",
                {
                  onChange:
                    handleFilterChange,
                }
              )}
            >
              <option value="ALL">
                All
              </option>

              <option value="Starter">
                Starter
              </option>

              <option value="Professional">
                Professional
              </option>

              <option value="Enterprise">
                Enterprise
              </option>
            </select>
          </label>

          {/* Status */}

          <label>
            Status

            <select
              {...register(
                "statusFilter",
                {
                  onChange:
                    handleFilterChange,
                }
              )}
            >
              <option value="ALL">
                All
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Suspended">
                Suspended
              </option>
            </select>
          </label>

          {/* Filter Actions */}

          <div className="filters-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={
                handleClearFilters
              }
            >
              <span className="button-icon" aria-hidden="true">↺</span> Clear Filters
            </button>
          </div>
        </div>

        {/* ===================================================
         * LOADING
         * =================================================== */}

        {isLoading && (
          <div className="empty-state">
            Loading schools...
          </div>
        )}

        {/* ===================================================
         * ERROR
         * =================================================== */}

        {isError && (
          <div className="empty-state error">
            <p>
              Failed to load schools.
            </p>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                refetch()
              }
            >
              Retry
            </button>
          </div>
        )}

        {/* ===================================================
         * EMPTY RESULT
         * =================================================== */}

        {!isLoading &&
          !isError &&
          filteredSchools.length ===
            0 && (
            <div className="empty-state">
              {schools.length === 0
                ? "No schools available."
                : "No schools found for selected filters."}
            </div>
          )}

        {/* ===================================================
         * TABLE
         * =================================================== */}

        {!isLoading &&
          !isError &&
          filteredSchools.length >
            0 && (
            <DataTable
              columns={columns}
              rows={pageRows}
              rowKey={(school) =>
                String(
                  school.id ??
                    `${school.schoolCode ?? ""}-${school.schoolName ?? ""}`
                )
              }
              emptyMessage="No schools found for selected filters."
            />
          )}

        {/* ===================================================
         * PAGINATION
         * =================================================== */}

        {!isLoading &&
          !isError &&
          filteredSchools.length >
            0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={
                ROWS_PER_PAGE
              }
              onPageChange={
                setPage
              }
            />
          )}
      </section>
    </div>
  );
}