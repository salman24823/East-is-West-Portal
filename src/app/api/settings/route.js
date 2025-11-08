import { NextResponse } from 'next/server';
import connectDB from '@/config/dbConnection';
import Setting from '@/models/settingModel';

// GET /api/settings -> returns all settings as { key: value }
export async function GET() {
  await connectDB();
  try {
    const settings = await Setting.find({}).lean();
    const payload = {};
    settings.forEach((s) => (payload[s.key] = s.value));
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    console.error('GET /api/settings error', err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PATCH /api/settings -> body: { key, value }
export async function PATCH(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { key, value } = body;
    if (!key) return NextResponse.json({ message: 'Missing key' }, { status: 400 });

    const updated = await Setting.findOneAndUpdate(
      { key },
      { $set: { value } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: 'Updated', setting: { key: updated.key, value: updated.value } }, { status: 200 });
  } catch (err) {
    console.error('PATCH /api/settings error', err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
