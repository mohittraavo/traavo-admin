import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { dismissSuccess } from "../../store/feedbackSlice";

const operationLabels: Record<string, string> = {
  login: "Signed in",
  logout: "Signed out",
  createUser: "User created",
  createInternalUser: "Internal user created",
  updateInternalUser: "User updated",
  deleteInternalUser: "User deleted",
  createRoleCatalog: "Role created",
  updateRoleCatalog: "Role updated",
  deleteRoleCatalog: "Role deleted",
  togglePermission: "Permission updated",
  updateTicket: "Ticket updated",
  createSubscriptionPlan: "Subscription plan created",
  createSubscription: "Subscription sent",
  createFeature: "Feature created",
  updateFeature: "Feature updated",
  deleteFeature: "Feature deleted",
  schoolOnboarding: "School created",
  updateSubscriptionPlan: "Plan updated",
  cloneSubscriptionPlan: "Plan cloned",
  updateSubscriptionPlanStatus: "Plan status updated",
  suspendSubscription: "Subscription suspended",
  reactivateSubscription: "Subscription reactivated",
  cancelSubscription: "Subscription cancelled",
  upgradeSubscription: "Subscription upgraded",
  downgradeSubscription: "Subscription downgraded",
};

export function ApiFeedback() {
  const dispatch = useAppDispatch();
  const { pendingRequests, successMessage } = useAppSelector((state) => state.feedback);
  const isLoading = pendingRequests > 0;

  return (
    <>
      {isLoading ? (
        <div className="api-loading-indicator" role="status" aria-live="polite">
          <span className="api-loading-spinner" aria-hidden="true" />
          <span>Processing request...</span>
        </div>
      ) : null}

      {successMessage ? (
        <div className="api-success-backdrop" role="presentation">
          <section className="api-success-dialog" role="alertdialog" aria-modal="true" aria-labelledby="api-success-title">
            <div className="api-success-icon" aria-hidden="true">✓</div>
            <h2 id="api-success-title">Success</h2>
            <p>{operationLabels[successMessage] ?? `${successMessage} completed successfully`}</p>
            <button type="button" className="btn btn-primary" onClick={() => dispatch(dismissSuccess())}>
              Done
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
