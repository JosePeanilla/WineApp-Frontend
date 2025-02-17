import { NavLink } from "react-router-dom"
export const HomePage = () => (
  <div className="hero bg-white min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold text-wineapp-muyfuerte">Bienvenidos</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <NavLink className="btn bg-wineapp-ligero text-white" to="/register">Registrarse</NavLink>
    </div>
  </div>

  <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-center">DaisyUI Form</h2>
        <form onSubmit>
          {/* Name Field */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Dropdown Field */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Select an Option</span>
            </label>
            <select
              className="select select-bordered w-full"
            >
              <option value="" disabled>Select one...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
</div>
)
