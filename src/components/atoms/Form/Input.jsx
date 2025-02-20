import React from "react"

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`border border-gray-300 rounded-md p-2 ${className || ''}`}
    {...props}
  />
))
