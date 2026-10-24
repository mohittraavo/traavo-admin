import { useState } from "react";
import { DataTable } from "../components/common/DataTable";
import { Modal } from "../components/common/Modal";
import { StatusBadge } from "../components/common/StatusBadge";
import {
  useCreateFeatureMutation,
  useDeleteFeatureMutation,
  useGetFeaturesQuery,
  useUpdateFeatureMutation,
  type Feature,
  type FeatureRequest,
} from "../store/tcmsApi";
import "../styles/subscription.css";

type FeatureForm = Omit<FeatureRequest, "price"> & { price: string };

const emptyForm: FeatureForm = { name: "", category: "Academic", description: "", billingCycle: "MONTHLY", price: "1499", status: "Active" };

export function FeaturesPage() {
  const { data: features = [], isLoading, isError } = useGetFeaturesQuery();
  const [createFeature, { isLoading: creating }] = useCreateFeatureMutation();
  const [updateFeature, { isLoading: updating }] = useUpdateFeatureMutation();
  const [deleteFeature, { isLoading: deleting }] = useDeleteFeatureMutation();
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [form, setForm] = useState<FeatureForm>(emptyForm);

  function openCreate() {
    setEditingFeature(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(feature: Feature) {
    setEditingFeature(feature);
    setForm({ ...feature, price: String(feature.price) });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingFeature(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) return;

    const values: FeatureRequest = {
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim() || "Feature included in the subscription plan.",
      price: Number(form.price) || 0,
      billingCycle: form.billingCycle,
      status: form.status,
    };

    try {
      if (editingFeature) {
        await updateFeature({ id: editingFeature.id, payload: values }).unwrap();
      } else {
        await createFeature(values).unwrap();
      }
      closeModal();
    } catch {
      window.alert("Unable to save this feature.");
    }
  }

  async function removeFeature(feature: Feature) {
    if (window.confirm(`Delete ${feature.name}?`)) {
      try {
        await deleteFeature(feature.id).unwrap();
      } catch {
        window.alert("Unable to delete this feature.");
      }
    }
  }

  const columns = [
    { key: "name", header: "Feature", render: (feature: Feature) => <strong>{feature.name}</strong> },
    { key: "category", header: "Category", render: (feature: Feature) => feature.category },
    { key: "description", header: "Description", render: (feature: Feature) => feature.description },
    { key: "price", header: "Price", render: (feature: Feature) => `₹${feature.price}` },
    { key: "billing", header: "Billing", render: (feature: Feature) => feature.billingCycle },
    { key: "status", header: "Status", render: (feature: Feature) => feature.status },
    { key: "actions", header: "Actions", render: (feature: Feature) => <div className="row-actions"><button type="button" className="btn btn-secondary btn-icon-only" onClick={() => openEdit(feature)} aria-label={`Edit ${feature.name}`} title="Edit feature">✎</button><button type="button" className="btn btn-ghost btn-icon-only" onClick={() => removeFeature(feature)} aria-label={`Delete ${feature.name}`} title="Delete feature" disabled={deleting}>🗑️</button></div> },
  ];

  function renderFeatureActions(feature: Feature) {
    return (
      <div className="row-actions">
        <button type="button" className="btn btn-ghost btn-icon-only" onClick={() => openEdit(feature)} aria-label={`Edit ${feature.name}`} title="Edit feature">✎</button>
        <button type="button" className="btn btn-ghost btn-icon-only" onClick={() => removeFeature(feature)} aria-label={`Delete ${feature.name}`} title="Delete feature" disabled={deleting}>🗑️</button>
      </div>
    );
  }

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-header">
        <div className="subscriptions-header-actions">
          <div className="view-toggle" aria-label="Feature display mode">
            <button type="button" className={viewMode === "list" ? "view-toggle-btn active" : "view-toggle-btn"} onClick={() => setViewMode("list")} aria-label="List view" aria-pressed={viewMode === "list"} title="List view">☷ <span>List</span></button>
            <button type="button" className={viewMode === "cards" ? "view-toggle-btn active" : "view-toggle-btn"} onClick={() => setViewMode("cards")} aria-label="Card view" aria-pressed={viewMode === "cards"} title="Card view">▦ <span>Cards</span></button>
          </div>
          <button type="button" className="btn btn-primary" onClick={openCreate}>Create Feature</button>
        </div>
      </div>

      {isLoading ? <div className="subscription-empty">Loading features...</div> : isError ? <div className="subscription-empty">Unable to load features.</div> : viewMode === "list" ? (
        <div className="subscription-table-wrapper feature-table-wrapper"><DataTable columns={columns} rows={features} rowKey={(feature) => feature.id} emptyMessage="No features available." /></div>
      ) : (
        <div className="feature-card-grid">
          {features.length === 0 ? <div className="subscription-empty">No features available.</div> : features.map((feature) => (
            <article className="feature-card" key={feature.id}>
              <div className="feature-card-header">
                <div><h3>{feature.name}</h3><span className="feature-card-category">{feature.category}</span></div>
                <StatusBadge value={feature.status} />
              </div>
              <p className="feature-card-description">{feature.description}</p>
              <div className="feature-card-meta">
                <div><span>Subscription price</span><strong>₹{feature.price}</strong></div>
                <div><span>Billing cycle</span><strong>{feature.billingCycle}</strong></div>
              </div>
              <div className="feature-card-actions">{renderFeatureActions(feature)}</div>
            </article>
          ))}
        </div>
      )}

      {modalOpen ? (
        <Modal title={editingFeature ? "Edit feature" : "Create feature"} onClose={closeModal}>
          <form className="subscription-form" onSubmit={handleSubmit}>
            <div className="subscription-form-grid">
              <div className="subscription-form-row"><label htmlFor="feature-name">Feature Name</label><input id="feature-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></div>
              <div className="subscription-form-row"><label htmlFor="feature-category">Category</label><select id="feature-category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option>Academic</option><option>Finance</option><option>Analytics</option><option>Parent Engagement</option><option>Operations</option><option>Security</option></select></div>
              <div className="subscription-form-row"><label htmlFor="feature-price">Price</label><input id="feature-price" type="number" min="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></div>
              <div className="subscription-form-row"><label htmlFor="feature-cycle">Billing Cycle</label><select id="feature-cycle" value={form.billingCycle} onChange={(event) => setForm({ ...form, billingCycle: event.target.value as FeatureForm["billingCycle"] })}><option value="MONTHLY">Monthly</option><option value="QUARTERLY">Quarterly</option><option value="YEARLY">Yearly</option></select></div>
              <div className="subscription-form-row"><label htmlFor="feature-status">Status</label><select id="feature-status" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as FeatureForm["status"] })}><option>Active</option><option>Inactive</option></select></div>
              <div className="subscription-form-row subscription-full-width"><label htmlFor="feature-description">Description</label><textarea id="feature-description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></div>
            </div>
            <div className="subscription-actions"><button type="button" className="sub-btn sub-btn-secondary" onClick={closeModal}>Cancel</button><button type="submit" className="btn btn-primary" disabled={creating || updating}>{creating || updating ? "Saving..." : editingFeature ? "Update Feature" : "Save Feature"}</button></div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}