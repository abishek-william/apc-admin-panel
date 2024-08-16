import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import SiteSchema from '@/modals/SiteSchema';

export async function GET() {
  try {
    await connectToDatabase();
    const sites = await SiteSchema.find({});
    return NextResponse.json(sites);
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch sites'));
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    console.log("Site: " + data);
    const newSite = new SiteSchema(data);
    await newSite.save();
    return NextResponse.json(newSite);
  } catch (error) {
    return NextResponse.error(new Error('Failed to create site'));
  }
}
