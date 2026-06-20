import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Save, KeyRound, User } from "lucide-react";
import Navbar from "../components/Navbar";
import { api } from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

interface FormFeedback {
  type: "success" | "error";
  message: string;
}

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [nameLoading, setNameLoading] = useState(false);
  const [nameFeedback, setNameFeedback] = useState<FormFeedback | null>(null);


  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<FormFeedback | null>(null);


  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);


  const handleNameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameFeedback({ type: "error", message: "Name cannot be empty." });
      return;
    }
    if (name.trim() === user?.name) {
      setNameFeedback({ type: "error", message: "That's already your name." });
      return;
    }
    setNameLoading(true);
    setNameFeedback(null);
    try {
      const res = await api.put("/profile", { name: name.trim() });
      updateUser(res.data.user);
      setNameFeedback({ type: "success", message: "Name updated successfully!" });
    } catch (err: any) {
      setNameFeedback({
        type: "error",
        message: err.response?.data?.message || "Failed to update name.",
      });
    } finally {
      setNameLoading(false);
    }
  };


  const validatePassword = () => {
    const errs: Record<string, string> = {};
    if (!passwordData.currentPassword) {
      errs.currentPassword = "Current password is required.";
    }
    if (!passwordData.newPassword) {
      errs.newPassword = "New password is required.";
    } else if (passwordData.newPassword.length < 8) {
      errs.newPassword = "New password must be at least 8 characters.";
    }
    if (!passwordData.confirmNewPassword) {
      errs.confirmNewPassword = "Please confirm your new password.";
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errs.confirmNewPassword = "Passwords do not match.";
    }
    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.currentPassword === passwordData.newPassword
    ) {
      errs.newPassword = "New password must differ from the current one.";
    }
    return errs;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setPasswordFeedback(null);
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validatePassword();
    if (Object.keys(errs).length > 0) {
      setPasswordErrors(errs);
      return;
    }
    setPasswordLoading(true);
    setPasswordFeedback(null);
    try {
      await api.put("/profile", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordFeedback({ type: "success", message: "Password changed successfully!" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err: any) {
      setPasswordFeedback({
        type: "error",
        message: err.response?.data?.message || "Failed to change password.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const feedbackClass = (fb: FormFeedback | null) =>
    fb
      ? `p-4 border-3 shadow-neo-sm font-extrabold text-sm ${
          fb.type === "success"
            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-400"
            : "bg-urgent text-white border-border-color dark:border-zinc-300"
        }`
      : "";

  const inputClass = (field: string) =>
    `w-full p-3 border-3 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary ${
      passwordErrors[field]
        ? "border-urgent"
        : "border-border-color dark:border-zinc-300"
    }`;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen dark:bg-zinc-900 transition-colors">
      <Navbar />

      <main className="max-w-[700px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight dark:text-zinc-100 transition-colors">
            <Link
              to="/tasks"
              className="text-text-main dark:text-zinc-100 flex hover:underline decoration-3 underline-offset-4 text-primary dark:hover:text-primary"
            >
              <ChevronLeft size={32} />
            </Link>
            My Profile
          </h1>
        </div>

        {/* Avatar card */}
        <div className="flex items-center gap-5 bg-card-bg dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] p-6 mb-8 transition-colors">
          <div className="w-16 h-16 rounded-full bg-primary border-3 border-border-color dark:border-zinc-300 flex items-center justify-center text-white text-2xl font-black shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-xl font-black dark:text-zinc-100">{user?.name}</p>
            <p className="text-sm font-semibold text-[#6b7280] dark:text-zinc-400">
              {user?.email}
            </p>
          </div>
        </div>

        <section className="mb-8 bg-card-bg dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] p-8 transition-colors">
          <h2 className="flex items-center gap-2 text-xl font-black mb-6 dark:text-zinc-100">
            <User size={22} />
            Update Name
          </h2>

          {nameFeedback && (
            <div className={`mb-5 ${feedbackClass(nameFeedback)}`}>
              {nameFeedback.message}
            </div>
          )}

          <form onSubmit={handleNameSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="profile-name"
                className="block font-extrabold mb-2 dark:text-zinc-100"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameFeedback(null);
                }}
                className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
              />
            </div>
            <Button
              id="profile-name-save"
              type="submit"
              disabled={nameLoading}
              size="sm"
              className="self-start"
            >
              <Save size={16} />
              {nameLoading ? "Saving..." : "Save Name"}
            </Button>
          </form>
        </section>

        {/* ── Change Password ── */}
        <section className="bg-card-bg dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] p-8 transition-colors">
          <h2 className="flex items-center gap-2 text-xl font-black mb-6 dark:text-zinc-100">
            <KeyRound size={22} />
            Change Password
          </h2>

          {passwordFeedback && (
            <div className={`mb-5 ${feedbackClass(passwordFeedback)}`}>
              {passwordFeedback.message}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="current-password"
                className="block font-extrabold mb-2 dark:text-zinc-100"
              >
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                name="currentPassword"
                autoComplete="current-password"
                placeholder="••••••••"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={inputClass("currentPassword")}
              />
              {passwordErrors.currentPassword && (
                <p className="mt-1 text-xs font-bold text-urgent">
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block font-extrabold mb-2 dark:text-zinc-100"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                name="newPassword"
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={inputClass("newPassword")}
              />
              {passwordErrors.newPassword && (
                <p className="mt-1 text-xs font-bold text-urgent">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm-new-password"
                className="block font-extrabold mb-2 dark:text-zinc-100"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-new-password"
                type="password"
                name="confirmNewPassword"
                autoComplete="new-password"
                placeholder="Repeat new password"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                className={inputClass("confirmNewPassword")}
              />
              {passwordErrors.confirmNewPassword && (
                <p className="mt-1 text-xs font-bold text-urgent">
                  {passwordErrors.confirmNewPassword}
                </p>
              )}
            </div>

            <Button
              id="profile-password-save"
              type="submit"
              disabled={passwordLoading}
              size="sm"
              className="self-start"
            >
              <KeyRound size={16} />
              {passwordLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
