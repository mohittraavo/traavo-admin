type StatusBadgeProps = {
  value: string;
  variant?: "success" | "warning" | "danger" | "neutral";
};

function getVariant(value: string): StatusBadgeProps["variant"] {
  const normalized = value.toLowerCase();
  if (["active", "created", "uploaded", "generated", "resolved"].includes(normalized)) return "success";
  if (["expiring", "pending", "open"].includes(normalized)) return "warning";
  if (["expired", "suspended", "disabled", "inactive", "failed"].includes(normalized)) return "danger";
  return "neutral";
}

export function StatusBadge({ value, variant }: StatusBadgeProps) {
  return <span className={`status-pill ${variant ?? getVariant(value)}`}>{value}</span>;
}