export const Button = ({ children, className, variant = "primary", ...props }) => {
    const baseStyles = "text-white rounded-md py-2 px-4 transition-colors duration-300"
  
    const variants = {
      muyFuerte: "bg-[#211103] hover:bg-[#3d1308]",
      fuerte: "bg-[#3d1308] hover:bg-[#7b0d1e]",
      moderado: "bg-[#7b0d1e] hover:bg-[#9f2042]",
      ligero: "bg-[#9f2042] hover:bg-[#f8e5ee]",
      muyLigero: "bg-[#f8e5ee] hover:bg-[#9f2042] text-black",
    }
  
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    )
  }