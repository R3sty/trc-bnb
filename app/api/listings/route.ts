import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  for (const value of Object.keys(body)) {
    if (!body[value]) {
      return NextResponse.error();
    }
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
      categories: JSON.stringify(category),
    }
  });

  return NextResponse.json(listing);
}
