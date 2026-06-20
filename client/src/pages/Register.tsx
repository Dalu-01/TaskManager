import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { api } from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setServerError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(res.data.token, res.data.user);
      navigate("/tasks");
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full p-3 border-3 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary ${
      errors[field]
        ? "border-urgent"
        : "border-border-color dark:border-zinc-300"
    }`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffbeb] dark:bg-zinc-900 px-4 py-12 transition-colors">
      {/* Brand */}
      <Link
        to="/"
        className="flex items-center gap-2 mb-8 no-underline text-text-main dark:text-zinc-100 group"
      >
        <img
          src="/task-duty.svg"
          alt="TaskDuty"
          className="w-8 h-8 transition-transform group-hover:-translate-y-1"
        />
        <span className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
          TaskDuty
        </span>
      </Link>

      <div className="w-full max-w-md bg-white dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] p-8 transition-colors">
        <h1 className="text-3xl font-black tracking-tight mb-1 dark:text-zinc-100">
          Create account
        </h1>
        <p className="text-sm font-semibold text-[#6b7280] dark:text-zinc-400 mb-8">
          Get started — it's free. No credit card required!
        </p>

        {serverError && (
          <div className="mb-6 bg-urgent text-white border-3 border-border-color dark:border-zinc-300 shadow-neo-sm p-4 font-extrabold text-sm">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="reg-name"
              className="block font-extrabold mb-2 dark:text-zinc-100"
            >
              Full Name
            </label>
            <input
              id="reg-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs font-bold text-urgent">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="block font-extrabold mb-2 dark:text-zinc-100"
            >
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs font-bold text-urgent">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="block font-extrabold mb-2 dark:text-zinc-100"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                className={`${inputClass("password")} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-primary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs font-bold text-urgent">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="reg-confirm"
              className="block font-extrabold mb-2 dark:text-zinc-100"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="reg-confirm"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${inputClass("confirmPassword")} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-primary transition-colors"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs font-bold text-urgent">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            id="register-submit"
            type="submit"
            disabled={loading}
            fullWidth
            className="mt-2"
          >
            <UserPlus size={20} />
            {loading ? "Creating account..." : "SignUp"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm font-semibold dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-extrabold text-primary hover:underline decoration-2 underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
