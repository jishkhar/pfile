import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Define paths that don't require authentication
const publicPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/assets',
  '/api/market-pairs',
];

// Define paths that require admin role
const adminPaths = [
  '/api/admin',
];

export function middleware(request: NextRequest) {
  // Add CORS headers for all API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }
    
    return response;
  }
  
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Get the token from the request headers
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  // If no token is provided, return an error
  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    
    // Check if the path requires admin role
    if (adminPaths.some(path => pathname.startsWith(path))) {
      if (decoded.role !== 'admin') {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        );
      }
    }
    
    // Add the decoded user info to the request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-role', decoded.role);
    
    // Return the response with the modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // If the token is invalid, return an error
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
}; 