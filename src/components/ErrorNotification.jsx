import { useEffect } from "react";

// Error component 🧩
function ErrorNotification({ error, setShowError }) {
  // Auto close 3s after the component mounts
  useEffect(
    function () {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      // Cleanup 🧹
      return () => {
        clearTimeout(timer);
      };
    },
    [setShowError],
  );

  return (
    <div className="fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between gap-4 rounded-lg bg-neutral-800 px-4 py-3 text-gray-200 shadow-lg">
      <p className="text-sm">
        {error ? error : "Something went wrong. Please try again 😥"}
      </p>
      <button
        onClick={() => setShowError(false)}
        className="cursor-pointer text-rose-300 transition-colors hover:text-rose-400"
      >
        ✕
      </button>
    </div>
  );
}

export default ErrorNotification;
