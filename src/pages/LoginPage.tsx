import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/auth/AuthProvider";
import { TravoLogo } from "../components/common/TravoLogo";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { user, login } = useAuth();
  const location = useLocation();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "admin@travo.local",
      password: "Admin@123"
    }
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setError("");

    try {
      await login(values);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Login failed");
    }
  });

  return (
    <main className="login-shell">
      <section className="login-layout">
        <article className="login-left">
          <div className="brand-cluster login-logo">
            <TravoLogo size={54} />
            <div className="logo-shell">
              <span className="tra">Tra</span>
              <span className="avo">avo</span>
            </div>
          </div>

          <p className="login-kicker">Platform Workspace</p>
          <h1>Travo Central Monitoring System (TCMS)</h1>
          <p className="lead">
            Manage schools, subscriptions, licenses, campuses, and platform operations from a single secure workspace.
          </p>
        </article>

        <article className="login-right">
          <h2>Sign in</h2>
          <p className="lead">Use your credentials to continue.</p>

          {location.state ? (
            <p className="notice">Your session ended. Please sign in again.</p>
          ) : null}
          {error ? <p className="error-banner">{error}</p> : null}

          <form className="form-grid login-form" onSubmit={onSubmit}>
            <label>
              User Name
              <input type="email" autoComplete="email" {...register("email")} required />
            </label>

            <label>
              Password
              <input type="password" autoComplete="current-password" {...register("password")} required />
            </label>

            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
