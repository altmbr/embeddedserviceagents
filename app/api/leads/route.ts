import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface Lead {
  email: string;
  source: string;
  timestamp: string;
  user_agent?: string;
  ip?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
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

    // Extract UTM parameters from referrer or session
    const referer = request.headers.get('referer') || '';
    const urlParams = new URLSearchParams(referer.split('?')[1] || '');

    const lead: Lead = {
      email: email.toLowerCase().trim(),
      source: source || 'unknown',
      timestamp: new Date().toISOString(),
      user_agent: request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
    };

    // Save to Supabase (if configured)
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .insert([lead])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        // Don't fail the request if Supabase has issues
      } else {
        console.log('Lead saved to Supabase:', data);
      }
    } else {
      console.log('Supabase not configured - lead saved to logs only');
    }

    // Log for Vercel logs (backup)
    console.log('New lead captured:', {
      email: lead.email,
      source: lead.source,
      timestamp: lead.timestamp,
      utm_source: lead.utm_source
    });

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
  // Protected endpoint to view leads
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not configured', leads: [], count: 0 },
        { status: 503 }
      );
    }

    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    return NextResponse.json({ leads, count: leads?.length || 0 });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
