import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DataTable } from "../components/common/DataTable";
import { Pagination } from "../components/common/Pagination";
import { StatusBadge } from "../components/common/StatusBadge";
import { useGetCampusesQuery, type CampusListRecord } from "../store/tcmsApi";

const ROWS_PER_PAGE = 2;

type CampusFilters = {
  searchText: string;
  schoolFilter: "ALL" | "Delhi Public School" | "Green Valley School" | "Ryan International";
  cityFilter: "ALL" | "Noida" | "Delhi" | "Lucknow" | "Jaipur";
  statusFilter: "ALL" | "Active" | "Disabled";
};

const defaultFilters: CampusFilters = {
  searchText: "",
  schoolFilter: "ALL",
  cityFilter: "ALL",
  statusFilter: "ALL"
};

export function CampusesPage({ embedded = false }: { embedded?: boolean } = {}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: campuses = [] } = useGetCampusesQuery();
  const { register, watch, reset } = useForm<CampusFilters>({ defaultValues: defaultFilters });
  const searchText = watch("searchText");
  const schoolFilter = watch("schoolFilter");
  const cityFilter = watch("cityFilter");
  const statusFilter = watch("statusFilter");

  const filteredCampuses = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    return campuses.filter((campus) => {
      const matchesSearch =
        !search ||
        campus.campusName.toLowerCase().includes(search) ||
        campus.campusCode.toLowerCase().includes(search) ||
        campus.principal.name.toLowerCase().includes(search);
      const matchesSchool = schoolFilter === "ALL" || campus.schoolName === schoolFilter;
      const matchesCity = cityFilter === "ALL" || campus.city === cityFilter;
      const matchesStatus = statusFilter === "ALL" || campus.status === statusFilter;
      return matchesSearch && matchesSchool && matchesCity && matchesStatus;
    });
  }, [searchText, schoolFilter, cityFilter, statusFilter]);

  const totalPages = Math.max(Math.ceil(filteredCampuses.length / ROWS_PER_PAGE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * ROWS_PER_PAGE;
  const pageRows = filteredCampuses.slice(pageStart, pageStart + ROWS_PER_PAGE);

  function clearFilters() {
    reset(defaultFilters);
    setPage(1);
  }

  const columns = [
    { key: "campusName", header: "Campus Name", render: (campus: CampusListRecord) => campus.campusName },
    { key: "campusCode", header: "Campus Code", render: (campus: CampusListRecord) => campus.campusCode },
    { key: "schoolName", header: "School", render: (campus: CampusListRecord) => campus.schoolName },
    { key: "city", header: "City", render: (campus: CampusListRecord) => campus.city },
    { key: "principal", header: "Principal", render: (campus: CampusListRecord) => campus.principal },
    { key: "students", header: "Students", render: (campus: CampusListRecord) => campus.students },
    { key: "teachers", header: "Teachers", render: (campus: CampusListRecord) => campus.teachers },
    { key: "classes", header: "Classes", render: (campus: CampusListRecord) => campus.classes },
    {
      key: "status",
      header: "Status",
      render: (campus: CampusListRecord) => <StatusBadge value={campus.status} />
    },
    {
      key: "action",
      header: "Action",
      render: (campus: CampusListRecord) => (
        <button type="button" className="btn btn-ghost btn-xs" onClick={() => navigate(`/campus-management/${campus.id}`)}>
          View
        </button>
      )
    }
  ];

  return (
    <div className="module-page-stack">
      {!embedded ? (
        <section>
          <h1>Campus Management</h1>
          <p className="lead">Physical campus operations, capacity, academics, facilities, and day-to-day administration.</p>
        </section>
      ) : null}

      <section className="surface-panel">
        <div className="filters-bar campus-filters-bar">
          <label>
            Search
            <input
              {...register("searchText", { onChange: () => setPage(1) })}
              placeholder="Campus name, code, principal"
            />
          </label>
          <label>
            School
            <select {...register("schoolFilter", { onChange: () => setPage(1) })}>
              <option value="ALL">All</option>
              <option value="Delhi Public School">Delhi Public School</option>
              <option value="Green Valley School">Green Valley School</option>
              <option value="Ryan International">Ryan International</option>
            </select>
          </label>
          <label>
            City
            <select {...register("cityFilter", { onChange: () => setPage(1) })}>
              <option value="ALL">All</option>
              <option value="Noida">Noida</option>
              <option value="Delhi">Delhi</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Jaipur">Jaipur</option>
            </select>
          </label>
          <label>
            Status
            <select {...register("statusFilter", { onChange: () => setPage(1) })}>
              <option value="ALL">All</option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </label>
          <div className="filters-actions">
            <button type="button" className="btn btn-ghost" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <DataTable columns={columns} rows={pageRows} rowKey={(campus) => campus.id} emptyMessage="No campuses found for selected filters." />

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={filteredCampuses.length}
          pageSize={ROWS_PER_PAGE}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}
