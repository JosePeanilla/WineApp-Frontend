import "./LoginPage.css";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.msg);
            }

            alert("[SUCCESS] Login successful!");
            localStorage.setItem("token", result.token);
            navigate("/");
        } catch (error) {
            alert(`[ERROR] Login failed!\n${error}`);
        }
    };

    return (
        <section id="login_page">
            <h2>Iniciar Sesión</h2> 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>  
                    <input
                        type="email"    
                        {...register("email", { required: "Este campo es obligatorio." })}  
                    />
                    {formState.errors.email && ( 
                        <p className="forms_field_error">{formState.errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>  
                    <input
                        type="password"    
                        {...register("password", { required: "Este campo es obligatorio." })}  
                    />
                    {formState.errors.password && ( 
                        <p className="forms_field_error">{formState.errors.password.message}</p>
                    )}
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </section>
    )};
        
 