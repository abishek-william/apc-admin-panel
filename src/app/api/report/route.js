// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongoose';
// import Report from '@/modals/ReportSchema';
// import Site from '@/modals/SiteSchema'; // Assuming you have this schema

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const reports = await Report.find().populate('siteId'); // Populate site details if needed
//     console.log("repots: " + reports);
//     return NextResponse.json(reports);
//   } catch (error) {
//     return NextResponse.error(new Error('Failed to fetch reports'));
//   }
// }

// export async function POST(request) {
//   try {
//     await connectToDatabase();
//     const data = await request.json();
//     const { siteId, categories } = data;

//     // Validate siteId
//     const site = await Site.findById(siteId);
//     if (!site) {
//       return NextResponse.error(new Error('Site not found'));
//     }

//     const newReport = new Report({ siteId, categories });
//     await newReport.save();
//     return NextResponse.json(newReport);
//   } catch (error) {
//     return NextResponse.error(new Error('Failed to create report'));
//   }
// }

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Report from '@/modals/ReportSchema';
import Site from '@/modals/SiteSchema';

export async function GET() {
  try {
    await connectToDatabase();
    const reports = await Report.find().populate('siteId');
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch reports'));
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const { siteId, categories } = data;

    // Validate siteId
    const site = await Site.findById(siteId);
    if (!site) {
      return NextResponse.error(new Error('Site not found'));
    }

    // Create new report
    const newReport = new Report({ siteId, categories });
    await newReport.save();

    // Update site data
    site.totaldays += 1; // Increment total days by 1
    site.totalmanpower += Object.values(categories).reduce((acc, val) => acc + Number(val), 0); // Sum up manpower values

    await site.save(); // Save updated site data

    return NextResponse.json(newReport);
  } catch (error) {
    return NextResponse.error(new Error('Failed to create report'));
  }
}
