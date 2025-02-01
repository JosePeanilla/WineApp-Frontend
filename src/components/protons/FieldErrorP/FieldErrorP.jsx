import "./FieldErrorP.css"

export const FieldErrorP = ({ error }) => {
  if (error) return <p className="forms_field_error">{error.message}</p>
  else return
}
