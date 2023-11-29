
// import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    // 
    cookies().set('token', '', { expires: new Date(0) })

    return NextResponse.json({status:200, message: 'Logged out!!', success: true })
} 
