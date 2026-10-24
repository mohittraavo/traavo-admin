import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import feedbackReducer, { operationSucceeded, requestFinished, requestStarted } from "./feedbackSlice";
import { tcmsApi } from "./tcmsApi";

const operationNames: Record<string, string> = {
  login: "login",
  logout: "logout",
  createUser: "createUser",
  createInternalUser: "createInternalUser",
  updateInternalUser: "updateInternalUser",
  deleteInternalUser: "deleteInternalUser",
  createRoleCatalog: "createRoleCatalog",
  updateRoleCatalog: "updateRoleCatalog",
  deleteRoleCatalog: "deleteRoleCatalog",
  togglePermission: "togglePermission",
  updateTicket: "updateTicket",
  createSubscriptionPlan: "createSubscriptionPlan",
  createSubscription: "createSubscription",
  createFeature: "createFeature",
  updateFeature: "updateFeature",
  deleteFeature: "deleteFeature",
  updateSubscriptionPlan: "updateSubscriptionPlan",
  cloneSubscriptionPlan: "cloneSubscriptionPlan",
  updateSubscriptionPlanStatus: "updateSubscriptionPlanStatus",
  suspendSubscription: "suspendSubscription",
  reactivateSubscription: "reactivateSubscription",
  cancelSubscription: "cancelSubscription",
  upgradeSubscription: "upgradeSubscription",
  downgradeSubscription: "downgradeSubscription",
};

const feedbackMiddleware = (storeApi: { dispatch: (action: unknown) => unknown }) => (next: (action: unknown) => unknown) => (action: unknown) => {
  const apiAction = action as {
    type?: string;
    meta?: { arg?: { type?: string; endpointName?: string } };
  };
  const isApiLifecycle = apiAction.type?.startsWith(`${tcmsApi.reducerPath}/execute`);
  const requestType = apiAction.meta?.arg?.type;

  if (isApiLifecycle && requestType) {
    if (apiAction.type?.endsWith("/pending")) {
      storeApi.dispatch(requestStarted());
    } else if (apiAction.type?.endsWith("/fulfilled") || apiAction.type?.endsWith("/rejected")) {
      storeApi.dispatch(requestFinished());
      const endpointName = apiAction.meta?.arg?.endpointName;
      if (requestType === "mutation" && apiAction.type.endsWith("/fulfilled") && endpointName && operationNames[endpointName]) {
        storeApi.dispatch(operationSucceeded(operationNames[endpointName]));
      }
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    [tcmsApi.reducerPath]: tcmsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedbackMiddleware, tcmsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;