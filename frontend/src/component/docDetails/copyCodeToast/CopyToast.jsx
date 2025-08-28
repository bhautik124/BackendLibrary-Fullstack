import React, { useEffect } from "react";

const CopyToast = ({ show, text = "Copied to clipboard!" }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {}, 1000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-2 rounded shadow-lg z-50">
      {text}
    </div>
  );
};

export default CopyToast;
