export default function FooterBackground() {
  return (
    <div className="absolute w-full h-24 md:h-48 lg:h-64 xl:h-[25rem] bottom-0 right-0 -z-10">
      <svg
        className="block w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="footerGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#59453c", stopOpacity: "1" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#8f3a09", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#footerGradient)"
          d="M1440,64L1392,80C1344,96,1248,128,1152,138.7C1056,149,960,139,864,133.3C768,128,672,128,576,138.7C480,149,384,171,288,186.7C192,203,96,213,48,218.7L0,224L0,320L48,320C96,320,192,320,288,320C384,320,480,320,576,320C672,320,768,320,864,320C960,320,1056,320,1152,320C1248,320,1344,320,1392,320L1440,320Z"
        ></path>
      </svg>
    </div>
  );
}
