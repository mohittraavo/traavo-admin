import { useMemo, useState } from "react";
import { useAdminData } from "../components/admin/AdminDataProvider";
import { DataTable } from "../components/common/DataTable";
import { StatusBadge } from "../components/common/StatusBadge";

export function TicketsPage() {
  const { tickets, updateTicket, error, canAccess, rolePermissions } = useAdminData();
  const [ticketAction, setTicketAction] = useState<Record<number, { status: string; note: string }>>({});
  const hasAnyTicketPermission = Object.keys(rolePermissions).some((key) => key.startsWith("Support Inbox."));
  const canViewTickets = canAccess("Support Inbox.View");
  const canManageTickets = canAccess("Support Inbox.Reply") || canAccess("Support Inbox.Assign") || canAccess("Support Inbox.Close");

  const openTickets = useMemo(
    () => tickets.filter((ticket) => ticket.status === "OPEN" || ticket.status === "IN_PROGRESS"),
    [tickets]
  );

  const columns = [
    { key: "id", header: "ID", render: (ticket: typeof tickets[number]) => ticket.ticketId },
    { key: "tenant", header: "Tenant", render: (ticket: typeof tickets[number]) => ticket.tenantId },
    { key: "campus", header: "Campus", render: (ticket: typeof tickets[number]) => ticket.campusName },
    { key: "subject", header: "Subject", render: (ticket: typeof tickets[number]) => ticket.subject },
    { key: "priority", header: "Priority", render: (ticket: typeof tickets[number]) => ticket.priority },
    { key: "status", header: "Status", render: (ticket: typeof tickets[number]) => ticket.status }
  ];

  if (canManageTickets) {
    columns.push({
      key: "action",
      header: "Action",
      render: (ticket: typeof tickets[number]) => (
        <div className="action-cell">
          <select
            value={ticketAction[ticket.ticketId]?.status ?? ticket.status}
            onChange={(event) =>
              setTicketAction((prev) => ({
                ...prev,
                [ticket.ticketId]: {
                  status: event.target.value,
                  note: prev[ticket.ticketId]?.note ?? ""
                }
              }))
            }
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          <input
            placeholder="Resolution note"
            value={ticketAction[ticket.ticketId]?.note ?? ticket.resolutionNote}
            onChange={(event) =>
              setTicketAction((prev) => ({
                ...prev,
                [ticket.ticketId]: {
                  status: prev[ticket.ticketId]?.status ?? ticket.status,
                  note: event.target.value
                }
              }))
            }
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() =>
              void updateTicket(
                ticket.ticketId,
                ticketAction[ticket.ticketId]?.status ?? ticket.status,
                ticketAction[ticket.ticketId]?.note ?? ticket.resolutionNote
              )
            }
          >
            Save
          </button>
        </div>
      )
    });
  }

  if (!hasAnyTicketPermission) {
    return (
      <>
        <h1>School Support Inbox</h1>
        <section className="surface-panel">
          <h3>No Access</h3>
          <p className="lead">You do not have any Support Inbox permissions assigned.</p>
        </section>
      </>
    );
  }

  if (!canViewTickets) {
    return (
      <>
        <h1>School Support Inbox</h1>
        <section className="surface-panel">
          <h3>Access Restricted</h3>
          <p className="lead">You do not have permission to view tickets.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <h1>School Support Inbox</h1>
      <p className="lead">Tickets raised from school admin app are triaged here.</p>
      {error ? <p className="error-banner">{error}</p> : null}

      <div className="kpi-grid">
        <article className="kpi"><p>Total tickets</p><h2>{tickets.length}</h2></article>
        <article className="kpi"><p>Open + In progress</p><h2>{openTickets.length}</h2></article>
        <article className="kpi"><p>Resolved/Closed</p><h2>{tickets.length - openTickets.length}</h2></article>
      </div>

      <DataTable columns={columns} rows={tickets} rowKey={(ticket) => ticket.ticketId} />
    </>
  );
}
