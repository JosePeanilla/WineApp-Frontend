export const FormContainer = ({ children, onSubmit }) => (
    <section className="flex flex-col items-center mt-10">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 w-[300px]"
        noValidate
      >
        {children}
      </form>
    </section>
  )