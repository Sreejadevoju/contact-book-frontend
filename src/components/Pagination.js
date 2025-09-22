import React from 'react';

export default function Pagination({ page, total, limit, onPageChange }) {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return (
        <div className="pagination">
            <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>Prev</button>
            <span>Page {page} of {totalPages} ({total} total)</span>
            <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</button>
        </div>
    );
}
