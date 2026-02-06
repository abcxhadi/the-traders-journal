import { Plus } from "lucide-react";

const History = ({ trades, setCurrentTrade, setStage }) => {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl title-grotesk mb-2">YOUR JOURNAL</h2>
          <p className="handwriting text-xl text-[#FF006E]">
            {trades.length} trades logged • R1T2-analyzed
          </p>
        </div>

        {trades.length === 0 ? (
          <div className="text-center py-16">
            <div className="torn-card p-12 max-w-md mx-auto rotate-1">
              <p className="mb-6 text-sm">
                No trades yet. Start your first reflection.
              </p>
              <button
                onClick={() => {
                  setStage("reflection-form");
                }}
                className="btn-marker px-6 py-3 inline-flex items-center gap-2"
              >
                <Plus size={20} />
                START LOGGING
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {trades.map((trade, idx) => (
              <div
                key={trade.id}
                onClick={() => {
                  setCurrentTrade(trade);
                  setStage("analysis");
                }}
                className={`polaroid cursor-pointer rotate-${(idx % 3) + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold font-mono">
                        {trade.asset}
                      </h3>
                      <span
                        className={`text-xs px-3 py-1 font-bold uppercase border-2 border-[#1A1A1A] ${
                          trade.positionType === "long"
                            ? "bg-[#06FFA5]"
                            : "bg-[#FF006E] text-white"
                        }`}
                      >
                        {trade.positionType}
                      </span>
                    </div>
                    <p className="text-xs opacity-50 mb-3 font-mono">
                      {trade.timestamp} • {trade.duration}m
                    </p>
                    <p className="text-xs italic handwriting">
                      "{trade.thesis}"
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-bold font-mono ${
                        trade.pnl > 0
                          ? "highlighter-green"
                          : "cross-out-red"
                      }`}
                    >
                      {trade.pnl > 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p className="text-xs opacity-40 handwriting">
                    click to review →
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setStage("reflection-form");
            }}
            className="btn-marker px-6 py-4 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            LOG ANOTHER
          </button>
          <button
            onClick={() => setStage("welcome")}
            className="btn-secondary px-6 py-4"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;