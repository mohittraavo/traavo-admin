import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAdminData } from "../components/admin/AdminDataProvider";
import { DataTable } from "../components/common/DataTable";
import { Pagination } from "../components/common/Pagination";
import { StatusBadge } from "../components/common/StatusBadge";
import {
  useCreateRoleCatalogMutation,
  useDeleteRoleCatalogMutation,
  useGetRoleCatalogQuery,
  useUpdateRoleCatalogMutation,
  type RoleCatalogRecord
} from "../store/tcmsApi";

type PermissionItem = {
  name: string;
  enabled: boolean;
};

type PermissionModule = {
  module: string;
  permissions: PermissionItem[];
};

type RoleFormValues = {
  roleName: string;
  description: string;
  status: "Active" | "Inactive";
  permissionState: Record<string, Record<string, boolean>>;
};

const pageSize = 4;

const permissionBlueprint: PermissionModule[] = [
  { module: "Dashboard", permissions: [{ name: "View Dashboard", enabled: false }] },
  { module: "School Management", permissions: [{ name: "View", enabled: false }, { name: "Create", enabled: false }, { name: "Edit", enabled: false }, { name: "Delete", enabled: false }, { name: "Export", enabled: false }] },
  { module: "Campus Management", permissions: [{ name: "View", enabled: false }, { name: "Create", enabled: false }, { name: "Edit", enabled: false }, { name: "Delete", enabled: false }, { name: "Export", enabled: false }] },
  { module: "User Management", permissions: [{ name: "View", enabled: false }, { name: "Create", enabled: false }, { name: "Edit", enabled: false }, { name: "Delete", enabled: false }, { name: "Reset Password", enabled: false }, { name: "Disable User", enabled: false }] },
  { module: "Roles & Permissions", permissions: [{ name: "View", enabled: false }, { name: "Create Role", enabled: false }, { name: "Edit Role", enabled: false }, { name: "Delete Role", enabled: false }, { name: "Assign Role", enabled: false }] },
  { module: "Subscription Management", permissions: [{ name: "View", enabled: false }, { name: "Create", enabled: false }, { name: "Upgrade", enabled: false }, { name: "Renew", enabled: false }, { name: "Cancel", enabled: false }] },
  { module: "Support Inbox", permissions: [{ name: "View", enabled: false }, { name: "Reply", enabled: false }, { name: "Assign", enabled: false }, { name: "Close", enabled: false }] },
  { module: "Reports", permissions: [{ name: "View", enabled: false }, { name: "Export", enabled: false }, { name: "Download", enabled: false }] },
  { module: "Settings", permissions: [{ name: "View", enabled: false }, { name: "Edit", enabled: false }, { name: "System Configuration", enabled: false }] },
  { module: "Billing", permissions: [{ name: "View", enabled: false }, { name: "Create Invoice", enabled: false }, { name: "Refund", enabled: false }, { name: "Export", enabled: false }] },
  { module: "Audit Logs", permissions: [{ name: "View", enabled: false }, { name: "Export", enabled: false }] }
];

function permissionsToState(modules: PermissionModule[]) {
  return modules.reduce<Record<string, Record<string, boolean>>>((acc, module) => {
    acc[module.module] = module.permissions.reduce<Record<string, boolean>>((inner, permission) => {
      inner[permission.name] = permission.enabled;
      return inner;
    }, {});
    return acc;
  }, {});
}

function stateToPermissions(state: Record<string, Record<string, boolean>>) {
  return Object.entries(state).map(([module, permissions]) => ({
    module,
    permissions: Object.entries(permissions).map(([name, enabled]) => ({ name, enabled }))
  }));
}

function countEnabledModules(modules: PermissionModule[]) {
  return modules.filter((module) => module.permissions.some((permission) => permission.enabled)).length;
}

export function RolesPage() {
  const { canAccess, rolePermissions } = useAdminData();
  const { data: roles = [] } = useGetRoleCatalogQuery();
  const [page, setPage] = useState(1);
  const [activeRole, setActiveRole] = useState<RoleCatalogRecord | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RoleCatalogRecord | null>(null);
  const [createRole] = useCreateRoleCatalogMutation();
  const [updateRole] = useUpdateRoleCatalogMutation();
  const [deleteRole] = useDeleteRoleCatalogMutation();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() =>
    permissionBlueprint.reduce<Record<string, boolean>>((acc, module, index) => {
      acc[module.module] = index < 3;
      return acc;
    }, {})
  );

  const defaultFormValues: RoleFormValues = {
    roleName: "",
    description: "",
    status: "Active",
    permissionState: permissionsToState(permissionBlueprint)
  };

  const { register, handleSubmit, reset, watch, setValue } = useForm<RoleFormValues>({
    defaultValues: defaultFormValues
  });

  const hasAnyRolePermission = Object.keys(rolePermissions).some((key) => key.startsWith("Roles & Permissions."));
  const canViewRoles = canAccess("Roles & Permissions.View");
  const canCreateRole = canAccess("Roles & Permissions.Create Role");
  const canEditRole = canAccess("Roles & Permissions.Edit Role");
  const canDeleteRole = canAccess("Roles & Permissions.Delete Role");
  const canAssignRole = canAccess("Roles & Permissions.Assign Role");

  const permissionState = watch("permissionState");
  const totalPages = Math.max(Math.ceil(roles.length / pageSize), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = roles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const permissionMatrixRows = useMemo(() => {
    const modules = ["School Management", "Campus Management", "Reports"];
    return modules.map((module) => {
      const role = roles[0];
      if (!role) {
        return { module, view: false, create: false, edit: false, delete: false, export: false, approve: false };
      }
      const moduleData = role.permissions.find((item) => item.module === module);
      const has = (name: string) => moduleData?.permissions.find((permission) => permission.name === name)?.enabled ?? false;
      return {
        module,
        view: has("View") || has("View Dashboard"),
        create: has("Create") || has("Generate License"),
        edit: has("Edit") || has("Renew License"),
        delete: has("Delete") || has("Revoke License"),
        export: has("Export") || has("Download"),
        approve: has("Assign Role") || has("Upgrade")
      };
    });
  }, [roles]);

  const columns = [
    { key: "roleName", header: "Role Name", render: (row: RoleCatalogRecord) => row.roleName },
    { key: "description", header: "Description", render: (row: RoleCatalogRecord) => row.description },
    { key: "createdBy", header: "Created By", render: (row: RoleCatalogRecord) => row.createdBy },
    { key: "createdDate", header: "Created Date", render: (row: RoleCatalogRecord) => row.createdDate },
    { key: "status", header: "Status", render: (row: RoleCatalogRecord) => <StatusBadge value={row.status} /> }
  ];

  if (canEditRole || canDeleteRole) {
    columns.push({
      key: "actions",
      header: "Actions",
      render: (row: RoleCatalogRecord) => (
        <div className="row-actions">
          {canEditRole ? (
            <button type="button" className="btn btn-ghost btn-xs btn-icon-only" aria-label="Edit role" title="Edit role" onClick={() => {
              setActiveRole(row);
              reset({ roleName: row.roleName, description: row.description, status: row.status, permissionState: permissionsToState(row.permissions) });
              setModalMode("edit");
            }}>✎</button>
          ) : null}
          {canDeleteRole ? (
            <button type="button" className="btn btn-ghost btn-xs btn-icon-only" aria-label="Delete role" title="Delete role" onClick={() => setDeleteTarget(row)}>🗑</button>
          ) : null}
        </div>
      )
    });
  }

  const permissionMatrixColumns = [
    { key: "module", header: "Module", render: (row: (typeof permissionMatrixRows)[number]) => row.module },
    { key: "view", header: "View", render: (row: (typeof permissionMatrixRows)[number]) => (row.view ? "✅" : "❌") },
    { key: "create", header: "Create", render: (row: (typeof permissionMatrixRows)[number]) => (row.create ? "✅" : "❌") },
    { key: "edit", header: "Edit", render: (row: (typeof permissionMatrixRows)[number]) => (row.edit ? "✅" : "❌") },
    { key: "delete", header: "Delete", render: (row: (typeof permissionMatrixRows)[number]) => (row.delete ? "✅" : "❌") },
    { key: "export", header: "Export", render: (row: (typeof permissionMatrixRows)[number]) => (row.export ? "✅" : "❌") },
    { key: "approve", header: "Approve", render: (row: (typeof permissionMatrixRows)[number]) => (row.approve ? "✅" : "❌") }
  ];

  function toggleModule(module: string) {
    setExpandedModules((prev) => ({ ...prev, [module]: !prev[module] }));
  }

  function openCreateRole() {
    if (!canCreateRole) {
      return;
    }
    reset(defaultFormValues);
    setActiveRole(null);
    setModalMode("create");
  }

  const submitRole = handleSubmit((values) => {
    if (activeRole?.id && !canEditRole) {
      return;
    }
    if (!activeRole?.id && !canCreateRole) {
      return;
    }
    const permissionModules = stateToPermissions(values.permissionState);
    const rolePayload = {
      roleName: values.roleName,
      description: values.description,
      status: values.status,
      permissions: permissionModules
    };

    if (activeRole?.id) {
      void updateRole({ id: activeRole.id, payload: rolePayload });
    } else {
      void createRole(rolePayload);
      setPage(1);
    }

    setModalMode(null);
    setActiveRole(null);
  });

  function saveDraft() {
    if (!canCreateRole) {
      return;
    }
    const values = watch();
    const permissionModules = stateToPermissions(values.permissionState);
    const draftRole: {
      roleName: string;
      description: string;
      status: "Inactive";
      permissions: PermissionModule[];
    } = {
      roleName: values.roleName || "Draft Role",
      description: values.description || "Saved as draft",
      status: "Inactive",
      permissions: permissionModules
    };
    void createRole(draftRole);
    setPage(1);
    setModalMode(null);
  }

  if (!hasAnyRolePermission) {
    return (
      <div className="module-page-stack">
        <section className="surface-panel">
          <h3>No Access</h3>
          <p className="lead">You do not have any Roles & Permissions access assigned.</p>
        </section>
      </div>
    );
  }

  if (!canViewRoles) {
    return (
      <div className="module-page-stack">
        <section className="surface-panel">
          <h3>Access Restricted</h3>
          <p className="lead">You do not have permission to view roles.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="module-page-stack">
      <section className="surface-panel">
        <div className="panel-head panel-head-top panel-head-actions-only">
          {canCreateRole ? <button type="button" className="btn btn-primary" onClick={openCreateRole}>+ Create Role</button> : null}
        </div>

        <DataTable columns={columns} rows={pageRows} rowKey={(row) => row.id} emptyMessage="No roles available." />
        <Pagination page={currentPage} totalPages={totalPages} totalItems={roles.length} pageSize={pageSize} onPageChange={setPage} />
      </section>

      {modalMode ? (
        <div className="modal-backdrop">
          <div className="modal-card modal-wide">
            <div className="panel-head">
              <h3>{modalMode === "create" ? "Create Role" : "Edit Role"}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-xs btn-icon-only"
                aria-label="Close modal"
                title="Close"
                onClick={() => setModalMode(null)}
              >
                ×
              </button>
            </div>

            <form className="module-page-stack" onSubmit={submitRole}>
              <section>
                <h4>Basic Information</h4>
                <div className="form-grid">
                  <label>
                    Role Name *
                    <input {...register("roleName")} required />
                  </label>
                  <label>
                    Status
                    <select {...register("status")}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>
                  <label className="span-2">
                    Description
                    <textarea rows={3} {...register("description")} />
                  </label>
                </div>
              </section>

              <section>
                <h4>Module Permissions</h4>
                <div className="role-accordion-stack">
                  {permissionBlueprint.map((module) => (
                    <section key={module.module} className="accordion-card">
                      <button type="button" className="accordion-toggle" onClick={() => toggleModule(module.module)}>
                        <strong>{module.module}</strong>
                        <span>{expandedModules[module.module] ? "▾" : "▸"}</span>
                      </button>
                      {expandedModules[module.module] ? (
                        <div className="accordion-body checkbox-grid">
                          {module.permissions.map((permission) => (
                            <label key={permission.name} className="check-pill">
                              <input
                                type="checkbox"
                                checked={permissionState?.[module.module]?.[permission.name] ?? false}
                                disabled={!canAssignRole}
                                onChange={(event) => setValue(`permissionState.${module.module}.${permission.name}`, event.target.checked)}
                              />
                              <span>{permission.name}</span>
                            </label>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  ))}
                </div>
              </section>

              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setModalMode(null)}>Cancel</button>
                {canCreateRole && modalMode === "create" ? <button type="button" className="btn btn-ghost" onClick={saveDraft}>Save as Draft</button> : null}
                {(modalMode === "create" ? canCreateRole : canEditRole) ? <button type="submit" className="btn btn-primary">{modalMode === "create" ? "Create Role" : "Save Role"}</button> : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="modal-backdrop">
          <div className="modal-card modal-sm">
            <h3>Delete Role</h3>
            <p className="lead">Remove {deleteTarget.roleName} from the role catalog?</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
              {canDeleteRole ? <button type="button" className="btn btn-primary btn-icon-only" aria-label="Delete role" title="Delete role" onClick={() => {
                void deleteRole(deleteTarget.id);
                setDeleteTarget(null);
              }}>🗑</button> : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
