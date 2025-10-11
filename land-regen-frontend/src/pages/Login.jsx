import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) console.error(error);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Land ReGen Login</h1>
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Login with GitHub
      </button>
    </div>
  );
}
