// src/components/landing/Awards.jsx

const LaurelWreath = () => (
  <svg
    className="w-8 h-8 text-gray-400"
    fill="currentColor"
    viewBox="0 0 200 200"
  >
    <path d="M100 10c-49.7 0-90 40.3-90 90s40.3 90 90 90 90-40.3 90-90-40.3-90-90-90zm0 162c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z" opacity=".2" />
    <path d="M125.4 51.3c-2.4-1.2-5.1-.9-7.2 1.1l-25.8 25.8c-.6.6-1.5.6-2.1 0l-12.9-12.9c-2.4-2.4-6.2-2.4-8.5 0s-2.4 6.2 0 8.5l17.1 17.1c.6.6 1.5.6 2.1 0l30-30c2.1-2.2 2.5-5.5.9-7.6zm-50.8 77.4c2.4 1.2 5.1.9 7.2-1.1l25.8-25.8c.6-.6 1.5-.6 2.1 0l12.9 12.9c2.4 2.4 6.2 2.4 8.5 0s2.4-6.2 0-8.5l-17.1-17.1c-.6-.6-1.5-.6-2.1 0l-30 30c-2.1 2.2-2.5 5.5-.9 7.6z" />
  </svg>
);

const Award = ({ title, line1, line2 }) => (
  <div className="flex items-center gap-2">
    <LaurelWreath />
    <div className="text-left">
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <p className="text-lg font-bold text-neutral">{line1}</p>
      <p className="text-xs font-bold text-gray-400 -mt-1">{line2}</p>
    </div>
    <div className="transform scale-x-[-1]">
      <LaurelWreath />
    </div>
  </div>
);

const Awards = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      {/* We'll use feature-based awards since the app is new */}
      <Award title="Powered by" line1="Smart Matching" line2="ENGINE" />
      <Award title="Feature" line1="99% Match" line2="ACCURACY" />
    </div>
  );
};

export default Awards;