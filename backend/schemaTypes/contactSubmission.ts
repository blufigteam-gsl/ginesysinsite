import { defineField, defineType } from "sanity";

export default defineType({
    name: "contactSubmission",
    title: "Contact Submissions",
    type: "document",

    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "email",
            title: "Email",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "phone",
            title: "Phone Number",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "company",
            title: "Company Name",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "numberOfStores",
            title: "Number of Stores",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "annualTurnover",
            title: "Annual Turnover",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "message",
            title: "Message",
            type: "text",
            readOnly: true,
        }),

        // UTM tracking fields
        defineField({
            name: "utmSource",
            title: "UTM Source",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "utmMedium",
            title: "UTM Medium",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "utmCampaign",
            title: "UTM Campaign",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "utmContent",
            title: "UTM Content",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "utmTerm",
            title: "UTM Term",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "firstLandingPage",
            title: "First Landing Page",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "softwareRequired",
            title: "Software Required",
            type: "array",
            of: [{ type: "string" }],
            readOnly: true,
        }),

        defineField({
            name: "formType",
            title: "Form Type",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "gstRequiredFor",
            title: "GST Required For",
            type: "array",
            of: [{ type: "string" }],
            readOnly: true,
        }),

        defineField({
            name: "partnerType",
            title: "Partner Type",
            type: "string",
            readOnly: true,
        }),

        defineField({
            name: "submittedAt",
            title: "Submitted At",
            type: "datetime",
            readOnly: true,
        }),
    ],

    preview: {
        select: {
            title: "name",
            subtitle: "company",
        },
    },
});
