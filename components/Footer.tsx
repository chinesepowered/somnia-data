"use client";

export function Footer() {
  return (
    <footer className="border-t border-somnia-purple/20 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gradient mb-1">Somnia Pulse</h3>
            <p className="text-sm text-gray-400">
              Built for Somnia Data Streams Mini Hackathon
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://docs.somnia.network/somnia-data-streams"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-somnia-purple transition-colors"
            >
              📚 SDS Docs
            </a>
            <a
              href="https://somnia.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-somnia-purple transition-colors"
            >
              🌐 Somnia Network
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-somnia-purple/10">
          <p className="text-center text-xs text-gray-500">
            Powered by Somnia Data Streams • Real-time blockchain visualization with zero latency
          </p>
        </div>
      </div>
    </footer>
  );
}
