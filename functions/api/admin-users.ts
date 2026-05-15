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

    const adminCheck = await context.env.DB.prepare(
      "SELECT role FROM authorized_users WHERE email = ? AND role = 'admin'"
    ).bind(adminEmail).first();

    if (!adminCheck) {
      return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 403 });
    }

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
    const { adminEmail, userId } = await context.request.json() as { adminEmail: string, userId: number };

    const adminCheck = await context.env.DB.prepare(
      "SELECT role FROM authorized_users WHERE email = ? AND role = 'admin'"
    ).bind(adminEmail).first();

    if (!adminCheck) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });

    await context.env.DB.prepare("DELETE FROM authorized_users WHERE id = ?").bind(userId).run();

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
