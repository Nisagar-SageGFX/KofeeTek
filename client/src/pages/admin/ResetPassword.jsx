import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  // Supabase puts the user into a temporary "recovery" session when they
  // click the emailed link. Wait for that session before allowing submit.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setReady(!!session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setReady(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully!");
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-brand-brownDark">
          Reset Password
        </h2>
        <p className="text-center text-xs sm:text-sm text-brand-brown/60 mb-6">
          Choose a new password for your admin account.
        </p>

        {!ready ? (
          <p className="text-center text-xs text-red-500">
            This link has expired or is invalid. Please request a new reset link from the login page.
          </p>
        ) : (
          <form onSubmit={updatePassword} className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
              minLength={6}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
              minLength={6}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}