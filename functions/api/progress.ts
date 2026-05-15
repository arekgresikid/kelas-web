interface Env {
  DB: D1Database;
}

async function verifyUser(context: any) {
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];

  const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!googleRes.ok) return null;
  const googleData = await googleRes.json() as { email: string };
  return googleData.email;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const verifiedEmail = await verifyUser(context);
    if (!verifiedEmail) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });

    const progress = await context.env.DB.prepare(
      "SELECT materi_slug FROM user_progress WHERE user_email = ?"
    ).bind(verifiedEmail).all();

    return new Response(JSON.stringify(progress.results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const verifiedEmail = await verifyUser(context);
    if (!verifiedEmail) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });

    const { slug, completed } = await context.request.json() as { slug: string, completed: boolean };

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
    }

    if (completed) {
      await context.env.DB.prepare(
        "INSERT OR IGNORE INTO user_progress (user_email, materi_slug) VALUES (?, ?)"
      ).bind(verifiedEmail, slug).run();
    } else {
      await context.env.DB.prepare(
        "DELETE FROM user_progress WHERE user_email = ? AND materi_slug = ?"
      ).bind(verifiedEmail, slug).run();
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
