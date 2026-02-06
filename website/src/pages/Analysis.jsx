import { Download, Plus, Loader2 } from "lucide-react";

const Analysis = ({
  currentTrade,
  isAnalyzing,
  setStage,
  downloadTrade,
  renderMarkdownContent,
}) => {
  if (!currentTrade) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No trade selected for analysis.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl title-grotesk mb-2">
            {currentTrade.pnl > 0 ? "✓ R1T2 ANALYZED" : "✗ R1T2 REVIEWED"}
          </h2>
          <p className="handwriting text-xl text-[#FF006E]">
            what DeepSeek found in your trade
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 polaroid">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide mb-1 opacity-50">
                    Asset
                  </p>
                  <p className="text-3xl font-bold font-mono">
                    {currentTrade.asset}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide mb-1 opacity-50">
                    Position
                  </p>
                  <p className="text-3xl font-bold uppercase">
                    {currentTrade.positionType}
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-dashed border-[#1A1A1A] pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide mb-1 opacity-50">
                    Entry → Exit
                  </p>
                  <p className="text-lg font-mono">
                    ${parseFloat(currentTrade.entryPrice).toFixed(2)} → $
                    {parseFloat(currentTrade.exitPrice).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide mb-1 opacity-50">
                    Size
                  </p>
                  <p className="text-lg font-mono">
                    {currentTrade.size} shares
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-dashed border-[#1A1A1A] pt-4">
                <p className="text-xs uppercase tracking-wide mb-1 opacity-50">
                  Duration
                </p>
                <p className="text-lg font-mono">
                  {currentTrade.duration} min
                </p>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <p className="handwriting text-sm opacity-40">
                {currentTrade.timestamp}
              </p>
            </div>
          </div>

          <div
            className={`torn-card p-6 rotate-2 ${
              currentTrade.pnl > 0
                ? "border-[#06FFA5]"
                : "border-[#FF006E]"
            } border-4`}
          >
            <p className="text-xs uppercase tracking-wide mb-2 opacity-50">
              P/L
            </p>
            <p
              className={`text-4xl font-bold font-mono ${
                currentTrade.pnl > 0 ? "highlighter-green" : "cross-out-red"
              }`}
            >
              {currentTrade.pnl > 0 ? "+" : ""}$
              {Math.abs(currentTrade.pnl).toFixed(2)}
            </p>
            <p className="text-xs mt-2 font-bold">
              {currentTrade.pnl > 0 ? "✓ WIN" : "✗ LOSS"}
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {isAnalyzing ? (
            <div className="torn-card p-12 text-center rotate-1">
              <Loader2
                className="animate-spin text-[#FF006E] mx-auto mb-4"
                size={48}
              />
              <p className="handwriting text-2xl text-[#FF006E]">
                R1T2 is reading your bullshit...
              </p>
              <p className="text-xs opacity-50 mt-2">
                This takes 10-15 seconds
              </p>
            </div>
          ) : currentTrade.insights ? (
            currentTrade.insights.map((insight, idx) => {
              if (insight.type === "narrative") {
                return (
                  <div
                    key={idx}
                    className="torn-card p-6 rotate-1 border-4 border-[#1A1A1A]"
                  >
                    <p className="font-bold mb-3 uppercase text-sm tracking-wide">
                      {insight.title}
                    </p>
                    <div className="space-y-2 text-sm">
                      {insight.sections.map((section, i) => (
                        <p
                          key={i}
                          className="font-mono text-xs leading-relaxed"
                        >
                          {section}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }
              if (insight.type === "ai-analysis") {
                return (
                  <div
                    key={idx}
                    className="torn-card p-6 -rotate-1 border-4 border-[#1A1A1A]"
                  >
                    <h3 className="text-3xl title-grotesk flex items-center gap-2 mb-4">
                      {insight.title}
                      {isAnalyzing && (
                        <Loader2
                          className="animate-spin text-[#FF006E]"
                          size={24}
                        />
                      )}
                    </h3>
                    <div className="space-y-4">
                      {insight.sections.map((section, secIdx) => (
                        <div
                          key={secIdx}
                          className="border-t-2 border-dashed border-[#1A1A1A] pt-4"
                        >
                          <p className="font-bold mb-2 uppercase text-sm tracking-wide marker-underline inline-block">
                            {section.title}
                          </p>
                          <div
                            className="text-sm leading-relaxed whitespace-pre-line"
                            dangerouslySetInnerHTML={renderMarkdownContent(
                              section.content
                            )}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              if (insight.type === "warning") {
                return (
                  <div
                    key={idx}
                    className="torn-card p-6 rotate-1 border-4 border-[#FFBE0B]"
                  >
                    <p className="font-bold mb-2 uppercase text-sm tracking-wide">
                      {insight.title}
                    </p>
                    <p className="text-sm">{insight.content}</p>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div className="torn-card p-8 text-center">
              <p className="text-sm opacity-70">
                No AI insights available
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={downloadTrade}
            className="btn-green px-6 py-4 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            DOWNLOAD
          </button>
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
            onClick={() => setStage("history")}
            className="btn-secondary px-6 py-4"
          >
            VIEW JOURNAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;