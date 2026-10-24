type PaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }: PaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="pagination-bar">
      <p>
        Showing {start}-{end} of {totalItems}
      </p>
      <div className="pagination-actions">
        <button
          type="button"
          className="btn btn-ghost btn-xs btn-icon-only"
          aria-label="Previous page"
          title="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(page - 1, 1))}
        >
          ‹
        </button>
        <span className="page-chip">Page {page} / {totalPages}</span>
        <button
          type="button"
          className="btn btn-ghost btn-xs btn-icon-only"
          aria-label="Next page"
          title="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        >
          ›
        </button>
      </div>
    </div>
  );
}
