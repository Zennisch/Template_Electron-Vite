export const cn = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(" ")

export const DefaultSpinnerIcon = (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
)

export const DefaultCheckIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" 
      fill="currentColor" 
      fillRule="evenodd" 
      clipRule="evenodd"
    />
  </svg>
)

export const DefaultIndeterminateIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M4 8a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1z" 
      fill="currentColor" 
      fillRule="evenodd" 
      clipRule="evenodd"
    />
  </svg>
)