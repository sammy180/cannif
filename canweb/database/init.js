const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const dbPath = path.join(dbDir, 'waitlist.db');
const db = new Database(dbPath);

// Read and execute schema
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Split schema into individual statements and execute
schema.split(';').forEach(statement => {
  const trimmed = statement.trim();
  if (trimmed) {
    try {
      db.exec(trimmed);
    } catch (error) {
      console.error('Error executing schema statement:', trimmed);
      console.error(error);
    }
  }
});

console.log('Database initialized successfully');

module.exports = db;
