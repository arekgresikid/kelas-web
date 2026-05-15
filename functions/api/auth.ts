interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { email } = await context.request.json() as { email: string };

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Query ke database D1
    // Nama binding database harus 'DB'
    const user = await context.env.DB.prepare(
      "SELECT * FROM authorized_users WHERE email = ?"
    ).bind(email).first();

    if (user) {
      return new Response(JSON.stringify({ 
        authorized: true, 
        user: {
          email: user.email,
          name: user.name,
          role: user.role
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      authorized: false, 
      error: 'Email tidak terdaftar di database D1.' 
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ 
      error: 'Server Error', 
      details: err instanceof Error ? err.message : String(err) 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
