import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
	ClerkProvider,
	
} from "@clerk/nextjs";

// Import Poppins font with the desired weights, styles, and subsets
const poppins = Poppins({
	weight: ["300", "400", "500", "600", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Project",
	description: "SaaS Project",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			appearance={{
				variables: { colorPrimary: "#624cf5" },
			}}
		>
			<html lang="en">
				<head>
					{/* Favicon link */}
					<link rel="icon" href="/favicon.ico" />
				</head>
				<body className={cn("font-poppins antialiased", poppins.variable)}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
