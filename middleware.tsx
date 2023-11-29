import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware (request: NextRequest) {
    const token = request.cookies.get('token')?.value
 
    if (!token) {
        return NextResponse.redirect(new URL('/logIn', request.url));
    } else {
        return NextResponse.next();
    }
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/about/:path*', '/blog/:path*','/album/:path*'],
};
