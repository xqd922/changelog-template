import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: [
        "Changelog",
        "Magic UI",
        "Magic UI Changelog",
        "Magic UI Changelog Template",
        "Magic UI Changelog Template Next.js",
        "Magic UI Changelog Template Tailwind",
        "Magic UI Changelog Template Shadcn",
    ],
    authors: [
        {
            name: "Dillion Verma",
            url: "https://magicui.design",
        },
    ],
    creator: "dillionverma",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        creator: "@dillionverma",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};