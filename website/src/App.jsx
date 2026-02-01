import { useState } from "react";
import { ChevronRight, Plus, Download, ChevronLeft, Check } from "lucide-react";
import "./App.css";

function App() {
  const [stage, setStage] = useState("welcome");
  const [trades, setTrades] = useState([]);
  const [currentTrade, setCurrentTrade] = useState(null);
  const [reflectionStage, setReflectionStage] = useState(0);

  const [reflectionData, setReflectionData] = useState({
    thesis: "",
    emotionEntering: "",
    asset: "",
    positionType: "long",
    entryPrice: "",
    exitPrice: "",
    size: "",
    duration: "",
    emotionDuringTrade: "",
    exitReason: "",
    emotionNow: "",
    confidenceRating: 7,
    emotionCheckboxes: [],
    pastPattern: "first",
    patternNotes: "",
    nextChange: "",
  });

  const generateInsight = (trade) => {
    const insights = [];
    const pnl =
      (parseFloat(trade.exitPrice) - parseFloat(trade.entryPrice)) *
      parseFloat(trade.size);
    const isWin = pnl > 0;

    insights.push({
      type: "narrative",
      title: "What You Actually Said",
      sections: [
        `Entry thesis: "${trade.thesis}"`,
        `Entering emotion: ${trade.emotionEntering}`,
        `In-trade reality: ${trade.emotionDuringTrade}`,
        `Exit reason: "${trade.exitReason}"`,
        `Now feeling: ${trade.emotionCheckboxes.join(", ") || "reflecting"}`,
      ],
      severity: "neutral",
    });

    if (trade.thesis.toLowerCase().includes("breakout") && isWin) {
      insights.push({
        type: "insight",
        title: "Thesis Confirmed",
        message: "Your breakout thesis worked. This is a repeatable setup.",
        severity: "positive",
      });
    }

    const enterNervous =
      trade.emotionEntering.toLowerCase().includes("nervous") ||
      trade.emotionEntering.toLowerCase().includes("anxious");
    const didHold =
      trade.emotionDuringTrade.toLowerCase().includes("almost") ||
      trade.emotionDuringTrade.toLowerCase().includes("panic");

    if (enterNervous && didHold && isWin) {
      insights.push({
        type: "insight",
        title: "Discipline Wins",
        message:
          "You entered nervous, almost exited in fear, but held. That discipline is what won this trade.",
        severity: "positive",
      });
    }

    if (
      trade.emotionEntering.toLowerCase().includes("greedy") ||
      trade.emotionCheckboxes.some((e) => e.toLowerCase().includes("greedy"))
    ) {
      insights.push({
        type: "warning",
        title: "Greed Pattern Detected",
        message:
          "You admitted greed entering or now. Greedy trades often break your rules. Did you follow your exit plan or chase?",
        severity: "high",
      });
    }

    if (
      trade.exitReason.toLowerCase().includes("plan") ||
      trade.exitReason.toLowerCase().includes("target")
    ) {
      insights.push({
        type: "success",
        title: "Rules-Based Exit",
        message:
          "You exited by plan, not emotion. This is the edge. Stick to this.",
        severity: "positive",
      });
    } else if (
      trade.exitReason.toLowerCase().includes("fear") ||
      trade.exitReason.toLowerCase().includes("panic")
    ) {
      insights.push({
        type: "warning",
        title: "Emotional Exit",
        message:
          "You exited on emotion, not plan. Next time: set your exit BEFORE you enter.",
        severity: "high",
      });
    }

    if (trade.nextChange && trade.nextChange.length > 10) {
      insights.push({
        type: "insight",
        title: "You Know Your Fix",
        message: `You said: "${trade.nextChange}" — Check this before your next trade.`,
        severity: "positive",
      });
    }

    if (trade.pastPattern !== "first") {
      const pastLabel =
        trade.pastPattern === "usually-win"
          ? "usually win"
          : trade.pastPattern === "usually-loss"
            ? "usually lose"
            : "mixed results";
      insights.push({
        type: "insight",
        title: "Edge Recognition",
        message: `You've taken this setup before and ${pastLabel}. ${trade.patternNotes ? `You noted: "${trade.patternNotes}"` : "Track this pattern."}`,
        severity: "neutral",
      });
    }

    const similarTrades = trades.filter(
      (t) =>
        t.thesis &&
        trade.thesis &&
        t.thesis.substring(0, 15).toLowerCase() ===
          trade.thesis.substring(0, 15).toLowerCase(),
    );

    if (similarTrades.length > 0) {
      const wins = similarTrades.filter(
        (t) =>
          (parseFloat(t.exitPrice) - parseFloat(t.entryPrice)) *
            parseFloat(t.size) >
          0,
      ).length;
      const winRate = Math.round((wins / similarTrades.length) * 100);
      insights.push({
        type: "stats",
        title: "Your Edge Statistics",
        stats: {
          totalTrades: similarTrades.length + 1,
          winRate: winRate,
        },
        severity: "neutral",
      });
    }

    return insights;
  };

  const moveToNextStage = () => {
    if (reflectionStage < 7) {
      setReflectionStage(reflectionStage + 1);
    } else {
      const pnl =
        (parseFloat(reflectionData.exitPrice) -
          parseFloat(reflectionData.entryPrice)) *
        parseFloat(reflectionData.size);
      const newTrade = {
        id: Date.now(),
        ...reflectionData,
        pnl: pnl,
        timestamp: new Date().toLocaleString(),
      };

      const insights = generateInsight(newTrade);
      newTrade.insights = insights;

      setTrades([newTrade, ...trades]);
      setCurrentTrade(newTrade);
      setStage("analysis");
      setReflectionStage(0);
      setReflectionData({
        thesis: "",
        emotionEntering: "",
        asset: "",
        positionType: "long",
        entryPrice: "",
        exitPrice: "",
        size: "",
        duration: "",
        emotionDuringTrade: "",
        exitReason: "",
        emotionNow: "",
        confidenceRating: 7,
        emotionCheckboxes: [],
        pastPattern: "first",
        patternNotes: "",
        nextChange: "",
      });
    }
  };

  const goBack = () => {
    if (reflectionStage > 0) {
      setReflectionStage(reflectionStage - 1);
    }
  };

  const handleEmotionCheckbox = (emotion) => {
    setReflectionData((prev) => {
      const newCheckboxes = prev.emotionCheckboxes.includes(emotion)
        ? prev.emotionCheckboxes.filter((e) => e !== emotion)
        : [...prev.emotionCheckboxes, emotion];
      return { ...prev, emotionCheckboxes: newCheckboxes };
    });
  };

  const downloadTrade = () => {
    if (!currentTrade) return;

    let content = `╔════════════════════════════════════════════════╗
║     TRADER'S JOURNAL - RAW TRADE REVIEW       ║
║     Generated: ${new Date().toLocaleString()}                  
╚════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT YOU ACTUALLY SAID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENTRY THESIS:
"${currentTrade.thesis}"

EMOTIONAL STATE ENTERING:
"${currentTrade.emotionEntering}"

TRADE EXECUTION:
→ Asset: ${currentTrade.asset}
→ Position: ${currentTrade.positionType.toUpperCase()}
→ Entry: $${parseFloat(currentTrade.entryPrice).toFixed(2)}
→ Exit: $${parseFloat(currentTrade.exitPrice).toFixed(2)}
→ Size: ${currentTrade.size} shares
→ Duration: ${currentTrade.duration} minutes
→ P&L: ${currentTrade.pnl > 0 ? "+" : ""}$${currentTrade.pnl.toFixed(2)}

WHILE IN THE TRADE:
"${currentTrade.emotionDuringTrade}"

WHY YOU EXITED:
"${currentTrade.exitReason}"

HOW YOU FEEL NOW:
→ Confidence: ${currentTrade.confidenceRating}/10
→ Emotions: ${currentTrade.emotionCheckboxes.join(", ") || "reflecting"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PATTERN ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THIS SETUP BEFORE:
${currentTrade.pastPattern === "first" ? "✗ First time" : currentTrade.pastPattern === "usually-win" ? "✓ Usually win" : currentTrade.pastPattern === "usually-loss" ? "✗ Usually lose" : "~ Mixed results"}

${currentTrade.patternNotes ? `"${currentTrade.patternNotes}"` : ""}

YOUR COMMITMENT:
"${currentTrade.nextChange}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR BULLSHIT DETECTOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${currentTrade.insights
  .map((insight, idx) => {
    if (insight.type === "narrative") {
      return `NARRATIVE SUMMARY:
${insight.sections.map((s) => `  • ${s}`).join("\n")}`;
    } else if (insight.type === "stats") {
      return `EDGE STATISTICS (Similar Setups):
  • Total trades: ${insight.stats.totalTrades}
  • Win rate: ${insight.stats.winRate}%`;
    } else {
      return `[${insight.title.toUpperCase()}]
${insight.message}`;
    }
  })
  .join("\n\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This trade is data. Use it.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trade-review-${currentTrade.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stages = [
    {
      num: 1,
      title: "The Numbers",
      subtitle: "Just the facts",
      key: "trade-data",
      description: "No feelings yet. Just data.",
    },
    {
      num: 2,
      title: "The Setup",
      subtitle: "What was your thesis?",
      key: "thesis",
      description: "Before you entered, what pattern did you see?",
    },
    {
      num: 3,
      title: "Before Entry",
      subtitle: "How were you feeling?",
      key: "emotionEntering",
      description: "Doubts? Pressure? Confidence? Be honest.",
    },
    {
      num: 4,
      title: "In The Trade",
      subtitle: "What happened while holding?",
      key: "emotionDuringTrade",
      description: "Panic? Smooth? Almost exited?",
    },
    {
      num: 5,
      title: "The Exit",
      subtitle: "Why did you close?",
      key: "exitReason",
      description: "Hit target? Got scared? Momentum died?",
    },
    {
      num: 6,
      title: "Right Now",
      subtitle: "Rate your confidence",
      key: "emotion-now",
      description: "How confident are you about this trade?",
    },
    {
      num: 7,
      title: "Pattern Recognition",
      subtitle: "Have you done this before?",
      key: "past-pattern",
      description: "Taken this setup? How did those go?",
    },
    {
      num: 8,
      title: "The Fix",
      subtitle: "What changes next time?",
      key: "nextChange",
      description: "Based on this trade, what will you do differently?",
    },
  ];

  const currentStageConfig = stages[reflectionStage];

  return (
    <div className="indie-journal">
      {/* WELCOME SCREEN */}
      {stage === "welcome" && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-7xl title-grotesk glitch-hover leading-none">
                  THE
                  <br />
                  TRADER'S
                  <br />
                  <span className="marker-underline">JOURNAL</span>
                </h1>
                <p className="text-xl handwriting text-[#FF006E]">
                  not a form. a mirror.
                </p>
              </div>

              <div className="torn-card p-8 rotate-1 max-w-lg mx-auto">
                <div className="tape-strip w-20 h-6 -top-3 left-8"></div>
                <div className="tape-strip w-20 h-6 -top-3 right-8"></div>

                <p className="text-sm leading-relaxed mb-4">
                  Every trade tells a story. Your thesis. Your fears. Your
                  discipline. Your fuck-ups.
                </p>
                <p className="text-xs italic opacity-70">
                  8 questions. Honest answers. Then the mirror shows what you
                  missed.
                </p>
              </div>

              <button
                onClick={() => {
                  setStage("reflection-form");
                  setReflectionStage(0);
                }}
                className="btn-marker px-8 py-4 text-lg wiggle-hover inline-flex items-center gap-2"
              >
                START LOGGING
                <ChevronRight size={20} />
              </button>

              {trades.length > 0 && (
                <button
                  onClick={() => setStage("history")}
                  className="btn-secondary px-6 py-3 block mx-auto mt-4"
                >
                  VIEW JOURNAL ({trades.length})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REFLECTION FORM */}
      {stage === "reflection-form" && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="recording-dot"></div>
                  <p className="text-xs font-mono uppercase tracking-wider">
                    Question {reflectionStage + 1}/8
                  </p>
                </div>
                <p className="text-xs font-mono">
                  {Math.round(((reflectionStage + 1) / 8) * 100)}%
                </p>
              </div>
              <div className="progress-ruler">
                <div
                  className="progress-fill"
                  style={{ width: `${((reflectionStage + 1) / 8) * 100}%` }}
                ></div>
              </div>
            </div>

            {reflectionStage === 0 && (
              <div className="torn-card p-8 rotate-2">
                <div className="tape-strip w-24 h-6 -top-3 right-12"></div>

                <h2 className="text-4xl title-grotesk mb-2">
                  {currentStageConfig.title}
                </h2>
                <p className="handwriting text-lg text-[#FF006E] mb-6">
                  {currentStageConfig.subtitle}
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wide">
                        Ticker
                      </label>
                      <input
                        type="text"
                        placeholder="AAPL"
                        value={reflectionData.asset}
                        onChange={(e) =>
                          setReflectionData({
                            ...reflectionData,
                            asset: e.target.value.toUpperCase(),
                          })
                        }
                        className="w-full px-4 py-3 ink-bleed font-mono text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wide">
                        Direction
                      </label>
                      <select
                        value={reflectionData.positionType}
                        onChange={(e) =>
                          setReflectionData({
                            ...reflectionData,
                            positionType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 ink-bleed font-mono"
                      >
                        <option value="long">LONG ↗</option>
                        <option value="short">SHORT ↘</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wide">
                        Entry $
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={reflectionData.entryPrice}
                        onChange={(e) =>
                          setReflectionData({
                            ...reflectionData,
                            entryPrice: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 ink-bleed font-mono text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wide">
                        Exit $
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={reflectionData.exitPrice}
                        onChange={(e) =>
                          setReflectionData({
                            ...reflectionData,
                            exitPrice: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 ink-bleed font-mono text-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wide">
                        Shares
                      </label>
                      <input
                        type="number"
                        step="1"
                        placeholder="100"
                        value={reflectionData.size}
                        onChange={(e) =>
                          setReflectionData({
                            ...reflectionData,
                            size: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 ink-bleed font-mono text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wide">
                        Duration (min)
                      </label>
                      <input
                        type="number"
                        step="1"
                        placeholder="5"
                        value={reflectionData.duration}
                        onChange={(e) =>
                          setReflectionData({
                            ...reflectionData,
                            duration: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 ink-bleed font-mono text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={goBack} className="btn-secondary px-6 py-3">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={moveToNextStage}
                    disabled={
                      !reflectionData.asset ||
                      !reflectionData.entryPrice ||
                      !reflectionData.exitPrice ||
                      !reflectionData.size ||
                      !reflectionData.duration
                    }
                    className="flex-1 btn-marker py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {reflectionStage === 1 && (
              <div className="torn-card p-8 rotate-1">
                <div className="tape-strip w-24 h-6 -top-3 left-12"></div>

                <h2 className="text-4xl title-grotesk mb-2">
                  {currentStageConfig.title}
                </h2>
                <p className="handwriting text-lg text-[#FF006E] mb-4">
                  {currentStageConfig.subtitle}
                </p>
                <p className="text-xs opacity-70 mb-6">
                  {currentStageConfig.description}
                </p>

                <textarea
                  value={reflectionData.thesis}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      thesis: e.target.value,
                    })
                  }
                  placeholder="e.g., 'Breakout above 125 with volume' or 'Bull flag on 5min chart'"
                  rows="8"
                  className="w-full px-4 py-3 notebook-input ink-bleed text-sm resize-none"
                />

                <div className="flex gap-4 mt-6">
                  <button onClick={goBack} className="btn-secondary px-6 py-3">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={moveToNextStage}
                    disabled={!reflectionData.thesis.trim()}
                    className="flex-1 btn-marker py-3 disabled:opacity-50"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {reflectionStage === 2 && (
              <div className="torn-card p-8 rotate-2">
                <div className="tape-strip w-24 h-6 -top-3 right-12"></div>

                <h2 className="text-4xl title-grotesk mb-2">
                  {currentStageConfig.title}
                </h2>
                <p className="handwriting text-lg text-[#FF006E] mb-4">
                  {currentStageConfig.subtitle}
                </p>
                <p className="text-xs opacity-70 mb-6">
                  {currentStageConfig.description}
                </p>

                <textarea
                  value={reflectionData.emotionEntering}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      emotionEntering: e.target.value,
                    })
                  }
                  placeholder="Confident? Nervous? Greedy? Mechanical? Uncertain?"
                  rows="8"
                  className="w-full px-4 py-3 notebook-input ink-bleed text-sm resize-none"
                />

                <div className="flex gap-4 mt-6">
                  <button onClick={goBack} className="btn-secondary px-6 py-3">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={moveToNextStage}
                    disabled={!reflectionData.emotionEntering.trim()}
                    className="flex-1 btn-marker py-3 disabled:opacity-50"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {reflectionStage === 3 && (
              <div className="torn-card p-8 rotate-1">
                <div className="tape-strip w-24 h-6 -top-3 left-12"></div>

                <h2 className="text-4xl title-grotesk mb-2">
                  {currentStageConfig.title}
                </h2>
                <p className="handwriting text-lg text-[#FF006E] mb-4">
                  {currentStageConfig.subtitle}
                </p>
                <p className="text-xs opacity-70 mb-6">
                  {currentStageConfig.description}
                </p>

                <textarea
                  value={reflectionData.emotionDuringTrade}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      emotionDuringTrade: e.target.value,
                    })
                  }
                  placeholder="Almost panic sold? Smooth ride? Wanted out?"
                  rows="8"
                  className="w-full px-4 py-3 notebook-input ink-bleed text-sm resize-none"
                />

                <div className="flex gap-4 mt-6">
                  <button onClick={goBack} className="btn-secondary px-6 py-3">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={moveToNextStage}
                    disabled={!reflectionData.emotionDuringTrade.trim()}
                    className="flex-1 btn-marker py-3 disabled:opacity-50"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {reflectionStage === 4 && (
              <div className="torn-card p-8 rotate-2">
                <div className="tape-strip w-24 h-6 -top-3 right-12"></div>

                <h2 className="text-4xl title-grotesk mb-2">
                  {currentStageConfig.title}
                </h2>
                <p className="handwriting text-lg text-[#FF006E] mb-4">
                  {currentStageConfig.subtitle}
                </p>
                <p className="text-xs opacity-70 mb-6">
                  {currentStageConfig.description}
                </p>

                <textarea
                  value={reflectionData.exitReason}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      exitReason: e.target.value,
                    })
                  }
                  placeholder="Hit target? Got scared? Momentum died? Greed?"
                  rows="8"
                  className="w-full px-4 py-3 notebook-input ink-bleed text-sm resize-none"
                />

                <div className="flex gap-4 mt-6">
                  <button onClick={goBack} className="btn-secondary px-6 py-3">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={moveToNextStage}
                    disabled={!reflectionData.exitReason.trim()}
                    className="flex-1 btn-marker py-3 disabled:opacity-50"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {reflectionStage === 5 && (
              <div className="torn-card p-8 rotate-1">
                <div className="tape-strip w-24 h-6 -top-3 left-12"></div>

                <h2 className="text-4xl title-grotesk mb-2">
                  {currentStageConfig.title}
                </h2>
                <p className="handwriting text-lg text-[#FF006E] mb-6">
                  {currentStageConfig.subtitle}
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold mb-4 uppercase tracking-wide">
                      Confidence Level
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={reflectionData.confidenceRating}
                        onChange={(e) =>
                          setReflectionData({
                            ...reflectionData,
                            confidenceRating: parseInt(e.target.value),
                          })
                        }
                        className="flex-1"
                      />
                      <span className="text-3xl font-bold title-grotesk text-[#FF006E] w-16 text-center">
                        {reflectionData.confidenceRating}/10
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-3 uppercase tracking-wide">
                      How do you feel? (check all)
                    </label>
                    <div className="space-y-2">
                      {[
                        "Satisfied",
                        "Greedy",
                        "Lucky",
                        "Disciplined",
                        "Confused",
                        "Proud",
                        "Anxious",
                        "Relieved",
                      ].map((emotion) => (
                        <label
                          key={emotion}
                          className="flex items-center gap-3 p-2 hover:bg-[#FFFEF9] cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={reflectionData.emotionCheckboxes.includes(
                              emotion,
                            )}
                            onChange={() => handleEmotionCheckbox(emotion)}
                          />
                          <span className="text-sm">{emotion}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={goBack} className="btn-secondary px-6 py-3">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={moveToNextStage}
                    className="flex-1 btn-marker py-3"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {reflectionStage === 6 && (
              <div className="torn-card p-8 rotate-2">
                <div className="tape-strip w-24 h-6 -top-3 right-12"></div>

                <h2 className="text-4xl title-grotesk mb-2">
                  {currentStageConfig.title}
                </h2>
                <p className="handwriting text-lg text-[#FF006E] mb-6">
                  {currentStageConfig.subtitle}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-3 uppercase tracking-wide">
                      Taken this setup before?
                    </label>
                    <select
                      value={reflectionData.pastPattern}
                      onChange={(e) =>
                        setReflectionData({
                          ...reflectionData,
                          pastPattern: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 ink-bleed font-mono"
                    >
                      <option value="first">✗ First time</option>
                      <option value="usually-win">✓ Yes, usually win</option>
                      <option value="usually-loss">✗ Yes, usually lose</option>
                      <option value="mixed">~ Mixed results</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 uppercase tracking-wide">
                      Notes (optional)
                    </label>
                    <textarea
                      value={reflectionData.patternNotes}
                      onChange={(e) =>
                        setReflectionData({
                          ...reflectionData,
                          patternNotes: e.target.value,
                        })
                      }
                      placeholder="e.g., 'Scalp setup, works best 9-11am' or 'Taken 5x, won 3'"
                      rows="4"
                      className="w-full px-4 py-3 notebook-input ink-bleed text-sm resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button onClick={goBack} className="btn-secondary px-6 py-3">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={moveToNextStage}
                    className="flex-1 btn-marker py-3"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {reflectionStage === 7 && (
              <div className="torn-card p-8 rotate-1">
                <div className="tape-strip w-24 h-6 -top-3 left-12"></div>

                <h2 className="text-4xl title-grotesk mb-2">
                  {currentStageConfig.title}
                </h2>
                <p className="handwriting text-lg text-[#FF006E] mb-4">
                  {currentStageConfig.subtitle}
                </p>
                <p className="text-xs opacity-70 mb-2">
                  {currentStageConfig.description}
                </p>
                <p className="text-xs font-bold mb-6">
                  ⚠ This is your commitment. You'll see it next time.
                </p>

                <textarea
                  value={reflectionData.nextChange}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      nextChange: e.target.value,
                    })
                  }
                  placeholder="e.g., 'Add volume check before entry' or 'Set exit BEFORE entering' or 'Wait 1hr after losses'"
                  rows="8"
                  className="w-full px-4 py-3 notebook-input ink-bleed text-sm resize-none"
                />

                <div className="flex gap-4 mt-6">
                  <button onClick={goBack} className="btn-secondary px-6 py-3">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={moveToNextStage}
                    disabled={!reflectionData.nextChange.trim()}
                    className="flex-1 btn-green py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Check size={20} />
                    COMPLETE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ANALYSIS VIEW */}
      {stage === "analysis" && currentTrade && (
        <div className="min-h-screen px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl title-grotesk mb-2">
                {currentTrade.pnl > 0 ? "✓ ANALYZED" : "✗ REVIEWED"}
              </h2>
              <p className="handwriting text-xl text-[#FF006E]">
                what this trade reveals about you
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
                  currentTrade.pnl > 0 ? "border-[#06FFA5]" : "border-[#FF006E]"
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

            <div className="space-y-4 mb-8">
              <h3 className="text-3xl title-grotesk flex items-center gap-2">
                YOUR BULLSHIT DETECTOR
              </h3>

              {currentTrade.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`torn-card p-6 rotate-${(idx % 3) + 1} ${
                    insight.severity === "high"
                      ? "border-[#FF006E] border-4"
                      : insight.severity === "positive"
                        ? "border-[#06FFA5] border-4"
                        : "border-[#FFBE0B] border-4"
                  }`}
                >
                  {insight.type === "narrative" ? (
                    <div>
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
                  ) : insight.type === "stats" ? (
                    <div>
                      <p className="font-bold mb-3 uppercase text-sm tracking-wide">
                        {insight.title}
                      </p>
                      <p className="text-sm font-mono">
                        Similar setups: {insight.stats.totalTrades} trades •{" "}
                        {insight.stats.winRate}% win rate
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold mb-2 uppercase text-sm tracking-wide marker-underline inline-block">
                        {insight.title}
                      </p>
                      <p className="text-sm leading-relaxed">
                        {insight.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
                  setReflectionStage(0);
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
      )}

      {/* HISTORY VIEW */}
      {stage === "history" && (
        <div className="min-h-screen px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl title-grotesk mb-2">YOUR JOURNAL</h2>
              <p className="handwriting text-xl text-[#FF006E]">
                {trades.length} trades logged • building your edge
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
                      setReflectionStage(0);
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
                  setReflectionStage(0);
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
      )}
    </div>
  );
}

export default App;
