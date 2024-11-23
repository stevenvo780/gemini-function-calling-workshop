import { NextResponse } from "next/server";
import json from '@/data/db.json'
import { extactData } from '@/app/api/genia'

export async function GET() {
  return NextResponse.json(json);
}

export async function POST(request) {
  const formData = await request.formData();
  const description = formData.get('description');
  const picture = formData.get('picture');
  return await createdTransaction(description, picture);
}

export async function createdTransaction(description, picture) {
  try {
    const response = await extactData(description, picture);
    if (!response.date){
      response.date = new Date().toISOString();
    }
    return NextResponse.json({
      transaction: response
    })
  } catch (error) {
    return new NextResponse(
      null,
      {
        status: 500,
        statusText: error.message,
      }
    );
  }
}