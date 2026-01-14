import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Simple file-based storage for leads
// In production, you'd use a database like Supabase, PlanetScale, or similar
const LEADS_FILE = path.join(process.cwd(), 'leads.json');

interface Lead {
  email: string;
  source: string;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}

async function getLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveLeads(leads: Lead[]): Promise<void> {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const lead: Lead = {
      email: email.toLowerCase().trim(),
      source: source || 'unknown',
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    };

    // Get existing leads and check for duplicates
    const leads = await getLeads();
    const existingLead = leads.find((l) => l.email === lead.email);

    if (!existingLead) {
      leads.push(lead);
      await saveLeads(leads);
    }

    // Log for Vercel logs
    console.log('New lead captured:', { email: lead.email, source: lead.source, timestamp: lead.timestamp });

    return NextResponse.json({ success: true, message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Protected endpoint to view leads (you'd add auth in production)
  try {
    const leads = await getLeads();
    return NextResponse.json({ leads, count: leads.length });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
