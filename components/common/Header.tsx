"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
    const normalize = (p: string) => (p !== "/" ? p.replace(/\/+$/, "") : "/");

    const isActive = (href: string) => {
        const cur = normalize(pathname);
        const target = normalize(href);

        if (target === "/")
            return cur === "/";

        if (target === "/dashboard" && cur.startsWith("/detail")) {
            return true;
        }

        return cur === target || cur.startsWith(`${target}/`);
    };

    const navLinkClass = (href: string) =>
        `transition-colors ${
            isActive(href)
                ? "text-[#1e3a5f]"
                : "text-[#6b5a45] hover:text-[#1e3a5f]"
        }`;

    return (
        <header className="bg-[#f6f2e8] border-b border-[#e0d9c8]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-[#6b5a45] hover:text-[#1e3a5f] font-semibold">
                        <BookOpen className="h-6 w-6" />
                        <span className="hidden sm:inline text-lg">BookPulse</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex gap-8">
                        <Link href="/" className={navLinkClass("/")}>
                            <div className="font-semibold">
                                Home
                            </div>
                        </Link>
                        <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                            <div className="font-semibold">
                                Dashboard
                            </div>
                        </Link>
                        <Link href="/about" className={navLinkClass("/about")}>
                            <div className="font-semibold">
                                About
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
