interface Env {
  DB: D1Database;
}

async function verifyAdmin(context: any) {
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];

  const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!googleRes.ok) return null;
  const googleData = await googleRes.json() as { email: string };

  const adminCheck = await context.env.DB.prepare(
    "SELECT role FROM authorized_users WHERE email = ? AND role = 'admin'"
  ).bind(googleData.email).first();

  return adminCheck ? googleData.email : null;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const adminEmail = await verifyAdmin(context);
    if (!adminEmail) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });

    const { newUserEmail, newUserName, newUserRole } = await context.request.json() as { 
      newUserEmail: string, 
      newUserName: string,
      newUserRole: string 
    };

    await context.env.DB.prepare(
      "INSERT INTO authorized_users (email, name, role) VALUES (?, ?, ?)"
    ).bind(newUserEmail, newUserName, newUserRole).run();

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const adminEmail = await verifyAdmin(context);
    if (!adminEmail) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });

    const { results } = await context.env.DB.prepare(
      "SELECT * FROM authorized_users ORDER BY created_at DESC"
    ).all();
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Gagal ambil data' }), { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const adminEmail = await verifyAdmin(context);
    if (!adminEmail) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });

    const { userId } = await context.request.json() as { userId: number };
    await context.env.DB.prepare("DELETE FROM authorized_users WHERE id = ?").bind(userId).run();

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  try {
    const adminEmail = await verifyAdmin(context);
    if (!adminEmail) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });

    const { userId, newRole } = await context.request.json() as { 
      userId: number, 
      newRole: string 
    };

    await context.env.DB.prepare("UPDATE authorized_users SET role = ? WHERE id = ?")
      .bind(newRole, userId)
      .run();

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
