import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const [cred, setCred] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const doLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const r = await login(cred.email, cred.password);

    setIsLoading(false);

    if (!r.ok) {
      setError(r.message);
      return;
    }

    navigate('/cuegua', { replace: true });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/cuegua" replace />;
  }

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
      <div className="card max-w-md w-full p-8">
        <div className="text-center text-2xl font-bold mb-6">Login Admin</div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={doLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={cred.email}
              onChange={(e) => setCred({ ...cred, email: e.target.value })}
              placeholder="admin@example.com"
              className="w-full border rounded-2xl px-4 py-3 dark:bg-slate-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={cred.password}
              onChange={(e) => setCred({ ...cred, password: e.target.value })}
              placeholder="Password"
              className="w-full border rounded-2xl px-4 py-3 dark:bg-slate-800"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="text-xs text-slate-500 mt-4 text-center">
          Login menggunakan akun yang terdaftar di Supabase
        </div>
      </div>
    </div>
  );
}
