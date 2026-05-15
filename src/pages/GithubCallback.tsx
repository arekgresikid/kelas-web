import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const GithubCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  // const { isAuthorized } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGithubAuth = async () => {
      if (!code) return;

      try {
        const response = await fetch('/api/auth-github', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });

        const data = await response.json();

        if (data.authorized) {
          const newUser = {
            email: data.user.email,
            name: data.user.name,
            picture: data.user.picture,
            role: data.user.role
          };
          
          localStorage.setItem('user', JSON.stringify(newUser));
          localStorage.setItem('google_token', data.token); // Re-use the same key for simplicity
          
          window.location.href = '/';
        } else {
          navigate('/?error=' + encodeURIComponent(data.error || 'Akses GitHub Ditolak'));
        }
      } catch (err) {
        console.error('GitHub Auth Error:', err);
        navigate('/?error=Terjadi kesalahan sistem GitHub');
      }
    };

    if (code) {
      handleGithubAuth();
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-black dark:text-white" />
      <h1 className="text-xl font-bold">Memverifikasi Akun GitHub...</h1>
      <p className="text-sm opacity-50">Mohon tunggu sebentar.</p>
    </div>
  );
};

export default GithubCallback;
