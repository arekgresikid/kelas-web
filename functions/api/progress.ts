interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email missing' }), { status: 400 });
    }

    const progress = await context.env.DB.prepare(
      "SELECT materi_slug FROM user_progress WHERE user_email = ?"
    ).bind(email).all();

    return new Response(JSON.stringify(progress.results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { email, slug, completed } = await context.request.json() as { email: string, slug: string, completed: boolean };

    if (!email || !slug) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
    }

    if (completed) {
      await context.env.DB.prepare(
        "INSERT OR IGNORE INTO user_progress (user_email, materi_slug) VALUES (?, ?)"
      ).bind(email, slug).run();
    } else {
      await context.env.DB.prepare(
        "DELETE FROM user_progress WHERE user_email = ? AND materi_slug = ?"
      ).bind(email, slug).run();
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
