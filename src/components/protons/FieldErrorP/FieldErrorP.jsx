import "./FieldErrorP.css"

// FieldErrorP Component
// Renders an error message if the 'error' prop is provided
export const FieldErrorP = ({ error }) => {
  // Check if there is an error
  if (error) return <p className="forms_field_error">{error.message}</p>
  else return // If no error, don't render anything
}
