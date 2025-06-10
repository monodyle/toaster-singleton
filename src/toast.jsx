import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';

let _openToastFunction = undefined;

export function ToastRegion() {
  const [toasts, setToasts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openToast = useCallback((data) => {
    const newToast = { ...data, id: nanoid() };
    setToasts((prev) => [newToast, ...prev]);
  }, []);

  _openToastFunction = openToast;

  const closeToast = (id) =>
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

  if (!isMounted || toasts.length === 0) {
    return null;
  }

  return createPortal(
    <div className="fixed top-0 right-0 p-4 flex flex-col gap-2 items-end">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} data={toast} onClose={closeToast} />
      ))}
    </div>,
    document.body,
  );
}

function ToastItem({ data, onClose, ...props }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onClose(data.id)}
        {...props}
        className="border border-dashed border-sky-300/60 bg-sky-400/10 hover:bg-sky-400/15 dark:border-sky-300/30 px-2 py-1 text-sm/6 text-sky-800 dark:text-sky-300"
      >
        {data.message}
      </button>
      <svg
        width="5"
        height="5"
        viewBox="0 0 5 5"
        className="absolute fill-sky-300 dark:fill-sky-300/50 top-[-2px] left-[-2px]"
        aria-hidden="true"
      >
        <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z" />
      </svg>
      <svg
        width="5"
        height="5"
        viewBox="0 0 5 5"
        className="absolute fill-sky-300 dark:fill-sky-300/50 bottom-[-2px] right-[-2px]"
        aria-hidden="true"
      >
        <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z" />
      </svg>
    </div>
  );
}

export function toast(data) {
  if (
    _openToastFunction !== undefined &&
    typeof _openToastFunction === 'function'
  ) {
    _openToastFunction(data);
  } else {
    throw new Error('<ToastRegion /> component is not mounted.');
  }
}
