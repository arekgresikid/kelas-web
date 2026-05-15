interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { adminEmail, newUserEmail, newUserName, newUserRole } = await context.request.json() as { 
      adminEmail: string, 
      newUserEmail: string, 
      newUserName: string,
      newUserRole: string 
    };

    // 1. Verifikasi apakah pengirim adalah Admin
    const adminCheck = await context.env.DB.prepare(
      "SELECT role FROM authorized_users WHERE email = ? AND role = 'admin'"
    ).bind(adminEmail).first();

    if (!adminCheck) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Hanya admin yang bisa menambah user.' }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Insert user baru ke D1
    await context.env.DB.prepare(
      "INSERT INTO authorized_users (email, name, role) VALUES (?, ?, ?)"
    ).bind(newUserEmail, newUserName, newUserRole).run();

    return new Response(JSON.stringify({ success: true, message: 'User berhasil ditambahkan.' }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    let message = 'Server Error';
    if (err.message.includes('UNIQUE constraint failed')) {
      message = 'Email sudah terdaftar sebelumnya.';
    }
    return new Response(JSON.stringify({ error: message, details: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    // Ambil semua daftar user
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM authorized_users ORDER BY created_at DESC"
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Gagal mengambil daftar user' }), { status: 500 });
  }
};
