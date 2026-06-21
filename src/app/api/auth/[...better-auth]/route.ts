import { auth } from "@/lib/auth";

// Expose Better Auth API endpoints untuk Next.js App Router
export const GET = auth.handler;
export const POST = auth.handler;
