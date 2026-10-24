import React from "react";

export function Modal({ children, title, onClose }: { children: React.ReactNode; title?: string; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-dialog" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-dialog-header">
          <h3>{title ?? ""}</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-dialog-body">
          {children}
        </div>
      </div>
    </div>
  );
}
