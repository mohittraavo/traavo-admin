import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import type { AuthResponse, LoginPayload } from "../types/auth";
import type { DashboardSummary, Permissions, Ticket, User } from "../types/admin";

export type InternalUser = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: "Active" | "Suspended";
  lastLogin: string;
};

export type InternalUserRequest = {
  name: string;
  role: string;
  department: string;
  email: string;
  status: "Active" | "Suspended";
};

export type RolePermissionItem = { name: string; enabled: boolean };
export type RoleModulePermission = { module: string; permissions: RolePermissionItem[] };
export type RoleCatalogRecord = {
  id: string;
  roleName: string;
  description: string;
  usersAssigned: number;
  modulesAssigned: number;
  createdBy: string;
  createdDate: string;
  status: "Active" | "Inactive";
  type: "System" | "Custom";
  permissions: RoleModulePermission[];
};

export type RoleCatalogRequest = {
  roleName: string;
  description: string;
  status: "Active" | "Inactive";
  permissions: Array<{ module: string; permissions: Array<{ name: string; enabled: boolean }> }>;
};

export type SchoolPermissionGroup = { module: string; permissions: RolePermissionItem[] };
export type SchoolListRecord = {
  id: string;
  schoolName: string;
  schoolCode: string;
  board: "CBSE" | "ICSE" | "IB";
  subscriptionPlan: "Starter" | "Professional" | "Enterprise";
  licenseStatus: "Active" | "Expiring" | "Expired";
  totalCampuses: number;
  totalStudents: number;
  schoolAdmin: { principalName: string; email: string; phone: string; lastLogin: string };
  status: "Active" | "Suspended";
  createdDate: string;
};

export type SchoolDetailRecord = {
  id: string;
  schoolName: string;
  schoolCode: string;
  registrationNumber: string;
  affiliationNumber: string;
  board: string;
  establishedYear: number;
  website: string;
  logo: string;
  email: string;
  phone: string;
  subscription: { currentPlan: string; startDate: string; expiryDate: string; billingCycle: string; paymentStatus: string; studentLimit: number; campusLimit: number; featureFlags: string[] };
  license: { licenseKey: string; licenseType: string; activeUntil: string; renewalDate: string; history: string[] };
  schoolAdmin: { principalName: string; email: string; phone: string; lastLogin: string };
  branding: { logo: string; themeColor: string; schoolDomain: string; emailBranding: string };
  analytics: { students: number; teachers: number; campuses: number; revenue: string; activeUsers: number };
  permissions: SchoolPermissionGroup[];
  auditLog: string[];
};

export type CampusListRecord = {
  id: string;
  campusName: string;
  campusCode: string;
  schoolName: string;
  city: string;
  principal: string;
  students: number;
  teachers: number;
  classes: number;
  status: "Active" | "Disabled";
};

export type CampusDetailRecord = {
  id: string;
  schoolName: string;
  campusName: string;
  campusCode: string;
  city: string;
  status: string;
  basic: { address: string; state: string; city: string; pincode: string; latitude: string; longitude: string };
  principal: { name: string; mobile: string; email: string };
  capacity: { maxStudents: number; currentStudents: number; maxTeachers: number; currentTeachers: number; buildings: number; classrooms: number };
  academic: { session: string; classes: string; sections: number; streams: string; subjects: string };
  facilities: string[];
  statistics: { students: number; teachers: number; attendance: string; feesCollection: string; pendingFees: string };
  timings: { openingTime: string; closingTime: string; weeklyOff: string; holidays: string };
  permissions: SchoolPermissionGroup[];
};

export type CampusCapacityRecord = {
  id: string;
  campusName: string;
  schoolName: string;
  maxStudents: number;
  currentStudents: number;
  maxTeachers: number;
  currentTeachers: number;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  code?: string;
  description?: string;
  type?: string;
  status?: string;
  price: number;
  offerPrice?: number;
  billingCycle?: string;
  studentLimit?: number;
  campusLimit?: number;
  features?: string[];
  modules?: string[];
};

export type SubscriptionRecord = {
  id: string;
  schoolExternalId?: string;
  schoolName?: string;
  planId: string;
  planName?: string;
  status: string;
  billingCycle?: string;
  startDate?: string;
  endDate?: string;
  studentLimit?: number;
  campusLimit?: number;
  featureFlags?: string[];
};

export type Feature = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  billingCycle: "MONTHLY" | "QUARTERLY" | "YEARLY";
  status: "Active" | "Inactive";
};

export type FeatureRequest = Omit<Feature, "id">;

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8083";

export const tcmsApi = createApi({
  reducerPath: "tcmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["Auth", "Dashboard", "Users", "Roles", "Permissions", "Tickets", "Schools", "Campuses", "Subscriptions", "Features"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (payload) => ({ url: "/auth/login", method: "POST", body: payload })
    }),
    getSession: builder.query<AuthResponse, void>({
      query: () => "/auth/session",
      providesTags: ["Auth"]
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" })
    }),
    getDashboard: builder.query<DashboardSummary, void>({
      query: () => "/admin/dashboard",
      providesTags: ["Dashboard"]
    }),
    getUsers: builder.query<User[], void>({
      query: () => "/admin/users",
      providesTags: ["Users"]
    }),
    createUser: builder.mutation<User, { tenantId: number; fullName: string; email: string; role: string; password: string }>({
      query: (payload) => ({ url: "/admin/users", method: "POST", body: payload }),
      invalidatesTags: ["Users", "Dashboard"]
    }),
    getInternalUsers: builder.query<InternalUser[], void>({
      query: () => "/admin/internal-users",
      providesTags: ["Users"]
    }),
    createInternalUser: builder.mutation<InternalUser, InternalUserRequest>({
      query: (payload) => ({ url: "/admin/internal-users", method: "POST", body: payload }),
      invalidatesTags: ["Users", "Dashboard"]
    }),
    updateInternalUser: builder.mutation<InternalUser, { id: string; payload: InternalUserRequest }>({
      query: ({ id, payload }) => ({ url: `/admin/internal-users/${id}`, method: "PUT", body: payload }),
      invalidatesTags: ["Users"]
    }),
    deleteInternalUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/internal-users/${id}`, method: "DELETE" }),
      invalidatesTags: ["Users", "Dashboard"]
    }),
    getRoles: builder.query<string[], void>({
      query: () => "/admin/roles",
      providesTags: ["Roles"]
    }),
    getRoleCatalog: builder.query<RoleCatalogRecord[], void>({
      query: () => "/admin/roles/catalog",
      providesTags: ["Roles"]
    }),
    createRoleCatalog: builder.mutation<RoleCatalogRecord, RoleCatalogRequest>({
      query: (payload) => ({ url: "/admin/roles/catalog", method: "POST", body: payload }),
      invalidatesTags: ["Roles", "Permissions"]
    }),
    updateRoleCatalog: builder.mutation<RoleCatalogRecord, { id: string; payload: RoleCatalogRequest }>({
      query: ({ id, payload }) => ({ url: `/admin/roles/catalog/${id}`, method: "PUT", body: payload }),
      invalidatesTags: ["Roles", "Permissions"]
    }),
    deleteRoleCatalog: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/roles/catalog/${id}`, method: "DELETE" }),
      invalidatesTags: ["Roles", "Permissions"]
    }),
    getPermissions: builder.query<Permissions, void>({
      query: () => "/admin/permissions",
      providesTags: ["Permissions"]
    }),
    togglePermission: builder.mutation<Permissions, { role: string; permissionKey: string; enabled: boolean }>({
      query: ({ role, permissionKey, enabled }) => ({ url: `/admin/permissions/${role}/${permissionKey}`, method: "PUT", body: { enabled } }),
      invalidatesTags: ["Permissions"]
    }),
    getTickets: builder.query<Ticket[], void>({
      query: () => "/admin/support/tickets",
      providesTags: ["Tickets"]
    }),
    updateTicket: builder.mutation<Ticket, { ticketId: number; status: string; resolutionNote: string }>({
      query: ({ ticketId, status, resolutionNote }) => ({ url: `/admin/support/tickets/${ticketId}`, method: "PATCH", body: { status, resolutionNote } }),
      invalidatesTags: ["Tickets", "Dashboard"]
    }),
    getSchools: builder.query<SchoolListRecord[], void>({
      query: () => "/admin/schools",
      providesTags: ["Schools"]
    }),
    getSchool: builder.query<SchoolDetailRecord, string>({
      query: (id) => `/admin/schools/${id}`,
      providesTags: ["Schools"]
    }),
    getCampuses: builder.query<CampusListRecord[], void>({
      query: () => "/admin/campuses",
      providesTags: ["Campuses"]
    }),
    getCampus: builder.query<CampusDetailRecord, string>({
      query: (id) => `/admin/campuses/${id}`,
      providesTags: ["Campuses"]
    }),
    getCampusCapacity: builder.query<CampusCapacityRecord[], void>({
      query: () => "/admin/campuses/capacity",
      providesTags: ["Campuses"]
    }),
    getSubscriptionPlans: builder.query<SubscriptionPlan[], void>({
      query: () => "/admin/subscription-plans",
      providesTags: ["Subscriptions"]
    }),
    updateSubscriptionPlan: builder.mutation<SubscriptionPlan, { id: string; payload: Record<string, unknown> }>({
      query: ({ id, payload }) => ({ url: `/admin/subscription-management/plans/${encodeURIComponent(id)}`, method: "PUT", body: payload }),
      invalidatesTags: ["Subscriptions"]
    }),
    cloneSubscriptionPlan: builder.mutation<SubscriptionPlan, string>({
      query: (id) => ({ url: `/admin/subscription-management/plans/${encodeURIComponent(id)}/clone`, method: "POST" }),
      invalidatesTags: ["Subscriptions"]
    }),
    updateSubscriptionPlanStatus: builder.mutation<SubscriptionPlan, { id: string; status: "DRAFT" | "ACTIVE" | "INACTIVE" }>({
      query: ({ id, status }) => ({ url: `/admin/subscription-management/plans/${encodeURIComponent(id)}/status`, method: "PUT", body: { status } }),
      invalidatesTags: ["Subscriptions"]
    }),
    getFeatures: builder.query<Feature[], void>({
      query: () => "/admin/features",
      providesTags: ["Features"]
    }),
    createFeature: builder.mutation<Feature, FeatureRequest>({
      query: (payload) => ({ url: "/admin/features", method: "POST", body: payload }),
      invalidatesTags: ["Features"]
    }),
    updateFeature: builder.mutation<Feature, { id: string; payload: FeatureRequest }>({
      query: ({ id, payload }) => ({ url: `/admin/features/${encodeURIComponent(id)}`, method: "PUT", body: payload }),
      invalidatesTags: ["Features"]
    }),
    deleteFeature: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/features/${encodeURIComponent(id)}`, method: "DELETE" }),
      invalidatesTags: ["Features"]
    }),
    getSubscriptions: builder.query<SubscriptionRecord[], void>({
      query: () => "/admin/subscriptions",
      providesTags: ["Subscriptions"]
    }),
    getSchoolSubscriptions: builder.query<SubscriptionRecord[], string>({
      query: (schoolId) => `/admin/schools/${encodeURIComponent(schoolId)}/subscriptions`,
      providesTags: ["Subscriptions"]
    }),
    createSubscriptionPlan: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/admin/subscription-plans",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Subscriptions", "Schools", "Dashboard"]
    }),
    createSubscription: builder.mutation<any, { schoolId: string; planId: string; startDate?: string; endDate?: string; billingCycle?: string; studentLimit?: number; campusLimit?: number; featureFlags?: string[] }>({
      query: ({ schoolId, planId, startDate, endDate, billingCycle, studentLimit, campusLimit, featureFlags }) => ({
        url: `/admin/schools/${encodeURIComponent(schoolId)}/subscriptions`,
        method: "POST",
        body: { planId, startDate, endDate, billingCycle, studentLimit, campusLimit, featureFlags }
      }),
      invalidatesTags: ["Schools", "Subscriptions", "Dashboard"]
    }),
    suspendSubscription: builder.mutation<any, string>({
      query: (id) => ({ url: `/admin/subscription-management/subscriptions/${encodeURIComponent(id)}/suspend`, method: "PUT" }),
      invalidatesTags: ["Subscriptions", "Schools"]
    }),
    reactivateSubscription: builder.mutation<any, string>({
      query: (id) => ({ url: `/admin/subscription-management/subscriptions/${encodeURIComponent(id)}/reactivate`, method: "PUT" }),
      invalidatesTags: ["Subscriptions", "Schools"]
    }),
    cancelSubscription: builder.mutation<any, string>({
      query: (id) => ({ url: `/admin/subscription-management/subscriptions/${encodeURIComponent(id)}/cancel`, method: "PUT" }),
      invalidatesTags: ["Subscriptions", "Schools"]
    }),
    upgradeSubscription: builder.mutation<any, { id: string; planId: string }>({
      query: ({ id, planId }) => ({ url: `/admin/subscription-management/subscriptions/${encodeURIComponent(id)}/upgrade`, method: "PUT", body: { planId } }),
      invalidatesTags: ["Subscriptions", "Schools"]
    }),
    downgradeSubscription: builder.mutation<any, { id: string; planId: string }>({
      query: ({ id, planId }) => ({ url: `/admin/subscription-management/subscriptions/${encodeURIComponent(id)}/downgrade`, method: "PUT", body: { planId } }),
      invalidatesTags: ["Subscriptions", "Schools"]
    }),
    getSubscriptionUsage: builder.query<any, string>({
      query: (id) => `/admin/subscription-management/subscriptions/${encodeURIComponent(id)}/usage`
    }),
    getSubscriptionAccess: builder.query<{ subscriptionId: string; status: string; modules: string[]; features: string[] }, string>({
      query: (id) => `/admin/subscription-management/subscriptions/${encodeURIComponent(id)}/access`
    }),
    getSubscriptionAudit: builder.query<any[], string>({
      query: (id) => `/admin/subscription-management/subscriptions/${encodeURIComponent(id)}/audit`
    }),
  })
});

export const {
  useLoginMutation,
  useGetSessionQuery,
  useLogoutMutation,
  useGetDashboardQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetInternalUsersQuery,
  useCreateInternalUserMutation,
  useUpdateInternalUserMutation,
  useDeleteInternalUserMutation,
  useGetRolesQuery,
  useGetRoleCatalogQuery,
  useCreateRoleCatalogMutation,
  useUpdateRoleCatalogMutation,
  useDeleteRoleCatalogMutation,
  useGetPermissionsQuery,
  useTogglePermissionMutation,
  useGetTicketsQuery,
  useUpdateTicketMutation,
  useGetSchoolsQuery,
  useGetSchoolQuery,
  useGetCampusesQuery,
  useGetCampusQuery,
  useGetCampusCapacityQuery,
  useGetSubscriptionsQuery,
  useGetSchoolSubscriptionsQuery,
  useGetSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
  useCloneSubscriptionPlanMutation,
  useUpdateSubscriptionPlanStatusMutation,
  useGetFeaturesQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
  useCreateSubscriptionPlanMutation,
  useCreateSubscriptionMutation,
  useSuspendSubscriptionMutation,
  useReactivateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useUpgradeSubscriptionMutation,
  useDowngradeSubscriptionMutation,
  useGetSubscriptionUsageQuery,
  useGetSubscriptionAccessQuery,
  useGetSubscriptionAuditQuery
} = tcmsApi;
