import { NextResponse } from 'next/server';
import dbConnection from '@/config/dbConnection';
import Checkin from '@/models/checkinModel';
import Checkout from '@/models/checkoutModel';

export const revalidate = 0;

export async function GET() {
  await dbConnection();

  const checkins = await Checkin.find().lean();
  const checkouts = await Checkout.find().lean();

  const merged = {};

  checkins.forEach((entry) => {
    const key = `${entry.name}-${entry.date}`;
    merged[key] = {
      name: entry.name,
      date: entry.date,
      checkInTime: entry.time,
      location: entry.location,
      status: 'Checked-In',
    };
  });

  checkouts.forEach((entry) => {
    const key = `${entry.name}-${entry.date}`;
    if (!merged[key]) {
      merged[key] = {
        name: entry.name,
        date: entry.date,
        checkOutTime: entry.time,
        location: entry.location,
        status: 'Checked-Out',
      };
    } else {
      merged[key].checkOutTime = entry.time;
      merged[key].location = entry.location; // override with latest
      merged[key].status = 'Checked-Out';
    }
  });

  const result = Object.values(merged).sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  return NextResponse.json(result, { status: 200 });
}
