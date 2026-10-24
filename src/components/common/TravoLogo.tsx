type TravoLogoProps = {
  className?: string;
  size?: number;
};

export function TravoLogo({ className, size = 56 }: TravoLogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="34"
        y1="56"
        x2="170"
        y2="56"
        stroke="#1C2B4A"
        strokeWidth="24"
        strokeLinecap="round"
      />
      <line
        x1="110"
        y1="56"
        x2="110"
        y2="107"
        stroke="#1C2B4A"
        strokeWidth="24"
        strokeLinecap="round"
      />
      <path
        d="M110,107 C126,161 170,161 196,24"
        fill="none"
        stroke="#0F766E"
        strokeWidth="24"
        strokeLinecap="round"
      />
    </svg>
  );
}
