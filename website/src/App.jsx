import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import { generateAIInsight } from "./services/ai";
import { playClickSound } from "./utils/sounds";
import "./App.css";

function App() {
  const [stage, setStage] = useState("welcome");
  const [trades, setTrades] = useState([]);
  const [currentTrade, setCurrentTrade] = useState(null);
  const [reflectionStage, setReflectionStage] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Global click sound effect
  useEffect(() => {
    const handleMouseDown = (event) => {
      // Check if the clicked element or its parent is a clickable element
      const target = event.target.closest(
        'button, a, [role="button"], input[type="checkbox"], select'
      );
      if (target) {
        playClickSound();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

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

  const moveToNextStage = async () => {
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

      setCurrentTrade(newTrade);
      setStage("analysis");
      setReflectionStage(0);
      setIsAnalyzing(true);

      const insights = await generateAIInsight(newTrade);
      newTrade.insights = insights;

      setTrades([newTrade, ...trades]);
      setCurrentTrade(newTrade);
      setIsAnalyzing(false);

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
    } else {
      setStage("welcome");
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

    let content = `
╔════════════════════════════════════════════════╗
║     TRADER'S JOURNAL - AI TRADE ANALYSIS       ║
║     Powered by DeepSeek R1T2 Chimera           ║
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
${
  currentTrade.pastPattern === "first"
    ? "✗ First time"
    : currentTrade.pastPattern === "usually-win"
      ? "✓ Usually win"
      : currentTrade.pastPattern === "usually-loss"
        ? "✗ Usually lose"
        : "~ Mixed results"
}
${
  currentTrade.patternNotes
    ? `"${currentTrade.patternNotes}"
`
    : ""
}
YOUR COMMITMENT:
"${currentTrade.nextChange}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AI COACHING ANALYSIS (DeepSeek R1T2 Chimera)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${
  currentTrade.insights
    ? currentTrade.insights
        .map((insight) => {
          if (insight.type === "narrative") {
            return `YOUR NARRATIVE:\n${insight.sections
              .map((s) => `  • ${s}`)
              .join("\n")}`;
          } else if (insight.type === "ai-analysis") {
            const sectionsText = insight.sections
              .map((section) => {
                const cleanContent = section.content.replace(
                  /\*\*(.*?)\*\*/g,
                  "$1",
                );
                return `--- ${section.title.toUpperCase()} ---\n${cleanContent}`;
              })
              .join("\n\n");
            return `${insight.title.toUpperCase()}\n\n${sectionsText}`;
          } else if (insight.type === "warning") {
            return `[${insight.title.toUpperCase()}]\n${insight.content}`;
          }
          return `[${(
            insight.title || "Untitled"
          ).toUpperCase()}]\n${insight.content || insight.message || "No details."}`;
        })
        .join("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n")
    : "AI analysis not available for this trade."
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This trade is data. Use it.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trade-r1t2-analysis-${currentTrade.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMarkdownContent = (markdownText) => {
    if (!markdownText) return { __html: "" };
    const htmlText = markdownText.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>",
    );
    return { __html: htmlText };
  };

  const renderStage = () => {
    switch (stage) {
      case "reflection-form":
        return (
          <Questionnaire
            reflectionData={reflectionData}
            setReflectionData={setReflectionData}
            moveToNextStage={moveToNextStage}
            goBack={goBack}
            handleEmotionCheckbox={handleEmotionCheckbox}
            reflectionStage={reflectionStage}
            setStage={setStage}
          />
        );
      case "analysis":
        return (
          <Analysis
            currentTrade={currentTrade}
            isAnalyzing={isAnalyzing}
            setStage={setStage}
            downloadTrade={downloadTrade}
            renderMarkdownContent={renderMarkdownContent}
          />
        );
      case "history":
        return (
          <History
            trades={trades}
            setCurrentTrade={setCurrentTrade}
            setStage={setStage}
          />
        );
      case "welcome":
      default:
        return <Home setStage={setStage} trades={trades} />;
    }
  };

  return <div className="indie-journal">{renderStage()}</div>;
}

export default App;
