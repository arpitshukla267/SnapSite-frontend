"use client";

export default function TextEditable({ children, onClick, editable = true }) {
  if (!editable) {
    return (
      <span className="pointer-events-none select-none">
        {children}
      </span>
    );
  }

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      className="cursor-text hover:bg-yellow-100 transition px-1 rounded"
    >
      {children}
    </span>
  );
}
