import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { UserPlus, Users, Shield, Trash2, Loader2 } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin-users');
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/admin-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: user?.email,
          newUserEmail: email,
          newUserName: name,
          newUserRole: role
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ text: 'User berhasil ditambahkan!', type: 'success' });
        setEmail('');
        setName('');
        fetchUsers();
      } else {
        setMessage({ text: data.error || 'Gagal menambah user.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Kesalahan jaringan.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: number, email: string) => {
    if (email === user?.email) {
      alert("Anda tidak bisa menghapus akun Anda sendiri!");
      return;
    }
    
    if (!window.confirm(`Hapus akses untuk ${email}?`)) return;

    try {
      const res = await fetch('/api/admin-users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: user?.email, userId })
      });

      if (res.ok) {
        setMessage({ text: 'User berhasil dihapus.', type: 'success' });
        fetchUsers();
      }
    } catch (err) {
      setMessage({ text: 'Gagal menghapus user.', type: 'error' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Tambah User */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-1 card h-fit"
        >
          <div className="flex items-center gap-2 mb-6">
            <UserPlus size={20} />
            <h2 className="font-bold">Tambah User</h2>
          </div>
          
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="text-xs uppercase font-bold text-black/40 dark:text-white/40">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-lg p-3 text-sm focus:ring-1 ring-black dark:ring-white outline-none"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-black/40 dark:text-white/40">Nama</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-lg p-3 text-sm focus:ring-1 ring-black dark:ring-white outline-none"
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-black/40 dark:text-white/40">Peran</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-lg p-3 text-sm focus:ring-1 ring-black dark:ring-white outline-none"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <button 
              disabled={submitting}
              className="w-full btn btn-primary py-3 text-sm flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="animate-spin" size={18} /> : 'Simpan User'}
            </button>

            {message.text && (
              <p className={`text-xs font-bold text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {message.text}
              </p>
            )}
          </form>
        </motion.div>

        {/* Daftar User */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 card"
        >
          <div className="flex items-center gap-2 mb-6">
            <Users size={20} />
            <h2 className="font-bold">Daftar User ({users.length})</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-black/20 dark:text-white/20" size={32} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="pb-3 font-bold">User</th>
                    <th className="pb-3 font-bold">Role</th>
                    <th className="pb-3 font-bold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {users.map((u) => (
                    <tr key={u.id} className="group">
                      <td className="py-4">
                        <div className="font-bold">{u.name}</div>
                        <div className="text-xs text-black/40 dark:text-white/40">{u.email}</div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          u.role === 'admin' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-black/5 dark:bg-white/5'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleDeleteUser(u.id, u.email)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
