interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { token } = await context.request.json() as { token: string };

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token missing' }), { status: 400 });
    }

    // 1. VERIFIKASI TOKEN KE GOOGLE (Server-to-Server)
    // Kita menggunakan access_token untuk fetch userinfo
    const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!googleRes.ok) {
      return new Response(JSON.stringify({ error: 'Token Google tidak valid atau kadaluarsa.' }), { status: 401 });
    }

    const googleData = await googleRes.json() as { email: string, name: string, picture: string };

    // 2. CEK APAKAH EMAIL ADA DI DATABASE D1
    const userInDb = await context.env.DB.prepare(
      "SELECT email, name, role FROM authorized_users WHERE email = ?"
    ).bind(googleData.email).first();

    if (userInDb) {
      return new Response(JSON.stringify({
        authorized: true,
        user: {
          email: googleData.email,
          name: googleData.name,
          picture: googleData.picture,
          role: userInDb.role
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        authorized: false,
        error: 'Email Anda tidak terdaftar. Hubungi Admin untuk mendapatkan akses.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Auth Bridge Error', details: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
