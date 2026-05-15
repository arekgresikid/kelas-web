-- Schema untuk Cloudflare D1
-- Tabel untuk menyimpan daftar email yang diizinkan mengakses modul

CREATE TABLE IF NOT EXISTS authorized_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'student', -- 'student' atau 'admin'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contoh memasukkan email yang diizinkan
-- Silakan jalankan perintah ini di Console D1 Anda
INSERT INTO authorized_users (email, name, role) 
VALUES ('admin@example.com', 'Administrator', 'admin');

INSERT INTO authorized_users (email, name, role) 
VALUES ('student@example.com', 'Siswa Terdaftar', 'student');

-- Query untuk mengecek email saat login:
-- SELECT * FROM authorized_users WHERE email = ?;

-- Tabel untuk menyimpan progres belajar user
CREATE TABLE IF NOT EXISTS user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    materi_slug TEXT NOT NULL,
    completed BOOLEAN DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_email, materi_slug)
);
