-- Waitlist database schema
CREATE TABLE IF NOT EXISTS waitlist_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    company TEXT,
    variant TEXT NOT NULL DEFAULT 'CAN FD',
    notes TEXT,
    agree BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_entries(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_variant ON waitlist_entries(variant);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_entries(created_at);
