import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        // Handle both JSON and FormData
        const contentType = request.headers.get('content-type');
        let data: { name?: string; email?: string; message?: string };

        if (contentType?.includes('application/json')) {
            data = await request.json();
        } else {
            const formData = await request.formData();
            data = {
                name: formData.get('name')?.toString(),
                email: formData.get('email')?.toString(),
                message: formData.get('message')?.toString()
            };
        }

        // Validation check
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create contact with proper error handling
        const contact = await prisma.contact.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message
            }
        });

        return NextResponse.json(contact);
    } catch (error) {
        console.error('Database error:', error);  // Add logging
        return NextResponse.json(
            { error: 'Failed to create contact' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const contacts = await prisma.contact.findMany()
        return NextResponse.json(contacts)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        )
    }
}