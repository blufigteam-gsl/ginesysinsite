import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            yourName,
            yourEmail,
            yourPhone,
            companyName,
            numberOfStores,
            annualTurnover,
            yourMessage,
            softwareRequired,
            formType,
            gstRequiredFor,
            partnerType,
            utmSource,
            utmMedium,
            utmCampaign,
            utmContent,
            utmTerm,
            firstLandingPage,
        } = body;

        const writeToken = process.env.SANITY_WRITE_TOKEN;
        if (!writeToken) {
            console.error("SANITY_WRITE_TOKEN is missing in environment variables.");
            return NextResponse.json(
                { error: "Sanity Write Token is not configured. Please add SANITY_WRITE_TOKEN to your .env.local file." },
                { status: 500 }
            );
        }

        const writeClient = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            apiVersion: "2025-01-01",
            useCdn: false,
            token: writeToken,
        });

        const doc = {
            _type: "contactSubmission",
            name: yourName,
            email: yourEmail,
            phone: yourPhone,
            company: companyName,
            numberOfStores: numberOfStores,
            annualTurnover: annualTurnover,
            message: yourMessage,
            softwareRequired: softwareRequired || [],
            formType: formType || "contact",
            gstRequiredFor: gstRequiredFor || [],
            partnerType: partnerType || "",
            utmSource: utmSource || "",
            utmMedium: utmMedium || "",
            utmCampaign: utmCampaign || "",
            utmContent: utmContent || "",
            utmTerm: utmTerm || "",
            firstLandingPage: firstLandingPage || "",
            submittedAt: new Date().toISOString(),
        };

        const result = await writeClient.create(doc);
        return NextResponse.json({ success: true, id: result._id });
    } catch (err: any) {
        console.error("Error creating contact submission in Sanity:", err);
        return NextResponse.json(
            { error: err.message || "Failed to submit request." },
            { status: 500 }
        );
    }
}
