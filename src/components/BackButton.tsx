import Link from "next/link";

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export const BackButton = ({ 
  href = "/", 
  label = "← Back to Home", 
  className = "" 
}: BackButtonProps) => (
  <Link 
    href={href} 
    className={`inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors ${className}`}
  >
    <svg 
      className="w-4 h-4 mr-2" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M15 19l-7-7 7-7" 
      />
    </svg>
    {label}
  </Link>
);

