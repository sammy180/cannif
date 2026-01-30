import { NextResponse } from 'next/server';
import db from '../../../database/init.js';

// GET - Get waitlist statistics
export async function GET() {
  try {
    // Total entries
    const totalStmt = db.prepare('SELECT COUNT(*) as total FROM waitlist_entries');
    const { total } = totalStmt.get();

    // Entries by variant
    const variantStmt = db.prepare(`
      SELECT variant, COUNT(*) as count 
      FROM waitlist_entries 
      GROUP BY variant 
      ORDER BY count DESC
    `);
    const variants = variantStmt.all();

    // Recent entries (last 7 days)
    const recentStmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM waitlist_entries 
      WHERE created_at >= datetime('now', '-7 days')
    `);
    const { count: recent } = recentStmt.get();

    // Entries by day (last 30 days)
    const dailyStmt = db.prepare(`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM waitlist_entries 
      WHERE created_at >= datetime('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);
    const daily = dailyStmt.all();

    return NextResponse.json({
      total,
      recent,
      variants,
      daily
    });
  } catch (error) {
    console.error('Error fetching waitlist stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist statistics' },
      { status: 500 }
    );
  }
}
