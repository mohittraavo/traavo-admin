import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import {
  useCreateUserMutation,
  useGetDashboardQuery,
  useGetTicketsQuery,
  useGetUsersQuery,
  useUpdateTicketMutation
} from "../../store/tcmsApi";
import { useAuth } from "../auth/AuthProvider";
import { DashboardSummary, Ticket, User } from "../../types/admin";

type AdminDataContextValue = {
  loading: boolean;
  error: string;
  dashboard: DashboardSummary | null;
  users: User[];
  rolePermissions: Record<string, boolean>;
  canAccess: (permissionKey: string) => boolean;
  tickets: Ticket[];
  refreshAll: () => Promise<void>;
  clearError: () => void;
  createUser: (payload: {
    tenantId: number;
    fullName: string;
    email: string;
    role: string;
    password: string;
  }) => Promise<void>;
  updateTicket: (ticketId: number, status: string, resolutionNote: string) => Promise<void>;
};

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

export function AdminDataProvider({ children }: PropsWithChildren) {
  const { token } = useAuth();
  const { user } = useAuth();
  const dashboardQuery = useGetDashboardQuery(undefined, { skip: !token });
  const usersQuery = useGetUsersQuery(undefined, { skip: !token });
  const ticketsQuery = useGetTicketsQuery(undefined, { skip: !token });
  const [createUserMutation] = useCreateUserMutation();
  const [updateTicketMutation] = useUpdateTicketMutation();

  const loading = dashboardQuery.isLoading || usersQuery.isLoading || ticketsQuery.isLoading;
  const error = dashboardQuery.error || usersQuery.error || ticketsQuery.error ? "Failed to load admin data." : "";
  const dashboard = dashboardQuery.data ?? null;
  const users = usersQuery.data ?? [];
  const rolePermissions = (user?.permissions ?? []).reduce<Record<string, boolean>>((permissions, permission) => {
    permissions[permission] = true;
    return permissions;
  }, {});

  function canAccess(permissionKey: string) {
    if (!permissionKey) return true;
    if (!user?.permissions) return true;
    return rolePermissions[permissionKey] === true;
  }
  const tickets = ticketsQuery.data ?? [];

  async function refreshAll() {
    await Promise.all([
      dashboardQuery.refetch(),
      usersQuery.refetch(),
      ticketsQuery.refetch()
    ]);
  }

  const value = useMemo<AdminDataContextValue>(
    () => ({
      loading,
      error,
      dashboard,
      users,
      rolePermissions,
      canAccess,
      tickets,
      refreshAll,
      clearError: () => undefined,
      async createUser(payload) {
        await createUserMutation(payload).unwrap();
      },
      async updateTicket(ticketId, status, resolutionNote) {
        await updateTicketMutation({ ticketId, status, resolutionNote }).unwrap();
      }
    }),
    [canAccess, createUserMutation, dashboard, error, loading, rolePermissions, tickets, users, updateTicketMutation]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within AdminDataProvider");
  }
  return context;
}
