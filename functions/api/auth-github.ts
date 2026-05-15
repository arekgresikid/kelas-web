interface Env {
  DB: D1Database;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { code } = await context.request.json() as { code: string };

    if (!code) {
      return new Response(JSON.stringify({ error: 'Code missing' }), { status: 400 });
    }

    // 1. Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: context.env.GITHUB_CLIENT_ID,
        client_secret: context.env.GITHUB_CLIENT_SECRET,
        code
      })
    });

    const tokenData = await tokenRes.json() as { access_token: string, error?: string };
    
    if (tokenData.error || !tokenData.access_token) {
      return new Response(JSON.stringify({ error: tokenData.error || 'Failed to get GitHub access token' }), { status: 401 });
    }

    // 2. Get User Info
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'User-Agent': 'KelasWeb-App'
      }
    });

    const userData = await userRes.json() as { login: string, name: string, avatar_url: string, email: string | null };

    // GitHub might not return email if it's private. Get emails separately.
    let email = userData.email;
    if (!email) {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'User-Agent': 'KelasWeb-App'
        }
      });
      const emails = await emailRes.json() as { email: string, primary: boolean, verified: boolean }[];
      email = emails.find(e => e.primary && e.verified)?.email || emails[0]?.email;
    }

    if (!email) {
      return new Response(JSON.stringify({ error: 'Tidak dapat menemukan email GitHub yang terverifikasi.' }), { status: 400 });
    }

    // 3. Check Database
    const userInDb = await context.env.DB.prepare(
      "SELECT email, name, role FROM authorized_users WHERE email = ?"
    ).bind(email).first();

    if (userInDb) {
      return new Response(JSON.stringify({
        authorized: true,
        user: {
          email,
          name: userData.name || userData.login,
          picture: userData.avatar_url,
          role: userInDb.role
        },
        token: tokenData.access_token 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        authorized: false,
        error: `Email GitHub (${email}) tidak terdaftar. Hubungi Admin.`
      }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'GitHub Auth Bridge Error', details: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
