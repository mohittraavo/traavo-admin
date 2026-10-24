import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { DataTable } from "../components/common/DataTable";
import { Pagination } from "../components/common/Pagination";
import { useAdminData } from "../components/admin/AdminDataProvider";
import { StatusBadge } from "../components/common/StatusBadge";
import {
  useCreateInternalUserMutation,
  useDeleteInternalUserMutation,
  useGetInternalUsersQuery,
  useUpdateInternalUserMutation,
  type InternalUser
} from "../store/tcmsApi";

type InternalFilters = {
  search: string;
  role: string;
  department: string;
  status: string;
};

type InternalUserModalValues = {
  name: string;
  role: string;
  department: string;
  email: string;
  status: "Active" | "Suspended";
};

const pageSize = 4;

const internalFilterDefaults: InternalFilters = {
  search: "",
  role: "ALL",
  department: "ALL",
  status: "ALL"
};

export function UsersPage() {
  const { canAccess, rolePermissions = {} } = useAdminData();
  const [page, setPage] = useState(1);
  const [internalModalTarget, setInternalModalTarget] = useState<InternalUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null);
  const { data: internalUsers = [] } = useGetInternalUsersQuery();
  const [createInternalUser] = useCreateInternalUserMutation();
  const [updateInternalUser] = useUpdateInternalUserMutation();
  const [deleteInternalUser] = useDeleteInternalUserMutation();

  const hasAnyUserPermission = Object.keys(rolePermissions).some((key) => key.startsWith("User Management."));
  const canViewUsers = canAccess("User Management.View");
  const canCreateUsers = canAccess("User Management.Create");
  const canEditUsers = canAccess("User Management.Edit");
  const canDeleteUsers = canAccess("User Management.Delete");

  const internalFilters = useForm<InternalFilters>({ defaultValues: internalFilterDefaults });
  const internalModalForm = useForm<InternalUserModalValues>({
    defaultValues: {
      name: "",
      role: "Super Admin",
      department: "Operations",
      email: "",
      status: "Active"
    }
  });

  const internalWatch = internalFilters.watch();

  const filteredInternalUsers = useMemo(() => {
    const search = internalWatch.search.trim().toLowerCase();
    return internalUsers.filter((user) => {
      const matchesSearch = !search || user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
      const matchesRole = internalWatch.role === "ALL" || user.role === internalWatch.role;
      const matchesDepartment = internalWatch.department === "ALL" || user.department === internalWatch.department;
      const matchesStatus = internalWatch.status === "ALL" || user.status === internalWatch.status;
      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }, [internalUsers, internalWatch]);

  const totalPages = Math.max(Math.ceil(filteredInternalUsers.length / pageSize), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = filteredInternalUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function openCreateModal() {
    if (!canCreateUsers) {
      return;
    }
    setInternalModalTarget({ id: "", name: "", role: "Super Admin", department: "Operations", email: "", status: "Active", lastLogin: "Never" });
    internalModalForm.reset({ name: "", role: "Super Admin", department: "Operations", email: "", status: "Active" });
  }

  const columns = [
    { key: "name", header: "Name", render: (row: InternalUser) => row.name },
    { key: "role", header: "Role", render: (row: InternalUser) => row.role },
    { key: "department", header: "Department", render: (row: InternalUser) => row.department },
    { key: "email", header: "Email", render: (row: InternalUser) => row.email },
    { key: "status", header: "Status", render: (row: InternalUser) => <StatusBadge value={row.status} /> },
    { key: "lastLogin", header: "Last Login", render: (row: InternalUser) => row.lastLogin }
  ];

  if (canEditUsers || canDeleteUsers) {
    columns.push({
      key: "actions",
      header: "Actions",
      render: (row: InternalUser) => (
        <div className="row-actions">
          {canEditUsers ? (
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-icon-only"
              aria-label="Edit user"
              title="Edit user"
              onClick={() => {
                setInternalModalTarget(row);
                internalModalForm.reset({ name: row.name, role: row.role, department: row.department, email: row.email, status: row.status });
              }}
            >
              ✎
            </button>
          ) : null}
          {canDeleteUsers ? (
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-icon-only"
              aria-label="Delete user"
              title="Delete user"
              onClick={() => setDeleteTarget({ id: row.id, label: row.name })}
            >
              🗑
            </button>
          ) : null}
        </div>
      )
    });
  }

  const internalSubmit = internalModalForm.handleSubmit(async (values) => {
    if (internalModalTarget?.id) {
      if (!canEditUsers) {
        return;
      }
      await updateInternalUser({ id: internalModalTarget.id, payload: values }).unwrap();
    } else {
      if (!canCreateUsers) {
        return;
      }
      await createInternalUser(values).unwrap();
      setPage(1);
    }
    setInternalModalTarget(null);
  });

  async function confirmDelete() {
    if (!deleteTarget) {
      return;
    }
    if (!canDeleteUsers) {
      return;
    }
    await deleteInternalUser(deleteTarget.id).unwrap();
    setDeleteTarget(null);
  }

  if (!hasAnyUserPermission) {
    return (
      <div className="module-page-stack">
        <section>
          <h3>No Access</h3>
          <p className="lead">You do not have any User Management permissions assigned.</p>
        </section>
      </div>
    );
  }

  if (!canViewUsers) {
    return (
      <div className="module-page-stack">
        <section>
          <h3>Access Restricted</h3>
          <p className="lead">You do not have permission to view users.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="module-page-stack">
      <section>
        <div className="panel-head panel-head-top panel-head-actions-only">
          {canCreateUsers ? <button type="button" className="btn btn-primary" onClick={openCreateModal}>+ Create User</button> : null}
        </div>

        <div className="filters-bar user-filters-bar">
          <label>
            Search
            <input {...internalFilters.register("search", { onChange: () => setPage(1) })} placeholder="Name or email" />
          </label>
          <label>
            Role
            <select {...internalFilters.register("role", { onChange: () => setPage(1) })}>
              <option value="ALL">All</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Operations Manager">Operations Manager</option>
              <option value="Support Executive">Support Executive</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Customer Success">Customer Success</option>
            </select>
          </label>
          <label>
            Department
            <select {...internalFilters.register("department", { onChange: () => setPage(1) })}>
              <option value="ALL">All</option>
              <option value="Leadership">Leadership</option>
              <option value="Operations">Operations</option>
              <option value="Support">Support</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Customer Success">Customer Success</option>
            </select>
          </label>
          <label>
            Status
            <select {...internalFilters.register("status", { onChange: () => setPage(1) })}>
              <option value="ALL">All</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </label>
          <div className="filters-actions">
            <button type="button" className="btn btn-ghost" onClick={() => { internalFilters.reset(internalFilterDefaults); setPage(1); }}>
              Clear Filters
            </button>
          </div>
        </div>

        <DataTable 
            columns={columns} 
            rows={pageRows} 
            rowKey={(row) => row.id} 
            emptyMessage="No internal users found." 
        />
        <Pagination page={currentPage} totalPages={totalPages} totalItems={filteredInternalUsers.length} pageSize={pageSize} onPageChange={setPage} />
      </section>

      {internalModalTarget ? (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="panel-head">
              <h3>{internalModalTarget.id ? "Edit User" : "Create User"}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-xs btn-icon-only"
                aria-label="Close modal"
                title="Close"
                onClick={() => setInternalModalTarget(null)}
              >
                ×
              </button>
            </div>
            <form className="form-grid" onSubmit={internalSubmit}>
              <label>
                Full Name
                <input {...internalModalForm.register("name")} required />
              </label>
              <label>
                Role
                <select {...internalModalForm.register("role")}>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Support Executive">Support Executive</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Customer Success">Customer Success</option>
                </select>
              </label>
              <label>
                Department
                <select {...internalModalForm.register("department")}>
                  <option value="Leadership">Leadership</option>
                  <option value="Operations">Operations</option>
                  <option value="Support">Support</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Customer Success">Customer Success</option>
                </select>
              </label>
              <label>
                Email
                <input type="email" {...internalModalForm.register("email")} required />
              </label>
              <label>
                Status
                <select {...internalModalForm.register("status")}>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </label>
              <div className="modal-actions span-2">
                <button type="button" className="btn btn-ghost" onClick={() => setInternalModalTarget(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="modal-backdrop">
          <div className="modal-card modal-sm">
            <h3>Delete User</h3>
            <p className="lead">Remove {deleteTarget.label} from platform user management?</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button
                type="button"
                className="btn btn-primary btn-icon-only"
                aria-label="Delete user"
                title="Delete user"
                onClick={confirmDelete}
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
