import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const writeToken = process.env.SANITY_WRITE_TOKEN;
        if (!writeToken) {
            return NextResponse.json(
                { error: "Sanity Write Token is not configured." },
                { status: 500 }
            );
        }

        const readClient = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            apiVersion: "2025-01-01",
            useCdn: false,
            token: writeToken,
        });

        // Retrieve all submissions sorted by newest first
        const submissions = await readClient.fetch(
            `*[_type == "contactSubmission"] | order(submittedAt desc)`
        );

        return NextResponse.json(submissions);
    } catch (err: any) {
        console.error("Error reading contact submissions:", err);
        return NextResponse.json(
            { error: err.message || "Failed to fetch submissions." },
            { status: 500 }
        );
    }
}
