import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Category from '@/modals/CategorySchema';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch categories'));
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    console.log("Site: " + data);
    const newCategory = new Category(data);
    await newCategory.save();
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.error(new Error('Failed to create site'));
  }
}
