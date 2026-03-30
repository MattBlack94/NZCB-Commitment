import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NZCB Commitment Reporting Form | WorldGBC",
  description:
    "WorldGBC Net Zero Carbon Buildings Commitment annual reporting form for signatories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f3f3f3]" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {/* Header */}
        <header className="bg-[#1d4354] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 flex items-center justify-center">
                  <span className="text-lg font-bold">W</span>
                </div>
                <div>
                  <h1 className="text-base font-bold tracking-tight">
                    NZCB Commitment Reporting Form
                  </h1>
                  <p className="text-xs text-[#6fda44]">
                    World Green Building Council
                  </p>
                </div>
              </div>
              <div className="text-xs text-[#6fda44]">
                Net Zero Carbon Buildings
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-[#1d4354] text-white py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
            <p>
              World Green Building Council &mdash; Net Zero Carbon Buildings
              Commitment
            </p>
            <p className="mt-1 text-white/60">
              For technical support, contact{" "}
              <a
                href="mailto:nzcb@worldgbc.org"
                className="underline hover:text-[#6fda44]"
              >
                nzcb@worldgbc.org
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
