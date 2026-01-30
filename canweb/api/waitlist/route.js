import { NextResponse } from 'next/server';
import db from '../../database/init.js';

// GET - Retrieve waitlist entries (for admin dashboard)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = (page - 1) * limit;

    // Get total count
    const countStmt = db.prepare('SELECT COUNT(*) as total FROM waitlist_entries');
    const { total } = countStmt.get();

    // Get entries with pagination
    const stmt = db.prepare(`
      SELECT * FROM waitlist_entries 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `);
    const entries = stmt.all(limit, offset);

    return NextResponse.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist entries' },
      { status: 500 }
    );
  }
}

// POST - Add new waitlist entry
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, variant, notes, agree } = body;

    // Validate required fields
    if (!name || !email || !agree) {
      return NextResponse.json(
        { error: 'Name, email, and agreement are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingStmt = db.prepare('SELECT id FROM waitlist_entries WHERE email = ?');
    const existing = existingStmt.get(email);
    
    if (existing) {
      return NextResponse.json(
        { error: 'Email already exists in waitlist' },
        { status: 409 }
      );
    }

    // Insert new entry
    const insertStmt = db.prepare(`
      INSERT INTO waitlist_entries (name, email, company, variant, notes, agree, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = insertStmt.run(
      name,
      email,
      company || null,
      variant || 'CAN FD',
      notes || null,
      agree ? 1 : 0,
      new Date().toISOString()
    );

    return NextResponse.json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Successfully added to waitlist'
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to waitlist' },
      { status: 500 }
    );
  }
}
