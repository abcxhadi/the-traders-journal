import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import { generateAIInsight } from "./services/ai";
import { playClickSound } from "./utils/sounds";
import "./App.css";

const DEFAULT_REFLECTION_DATA = {
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
};

const STORAGE_KEYS = {
  reflectionData: "ttj_reflection_data",
  reflectionStep: "ttj_reflection_step",
  trades: "ttj_trades",
};

const isBrowser = typeof window !== "undefined";

const STEP_PATHS = [
  "/numbers",
  "/thesis",
  "/before-entry",
  "/in-trade",
  "/exit",
  "/confidence",
  "/pattern",
  "/commitment",
];

const PATH_TO_STEP = STEP_PATHS.reduce((acc, path, idx) => {
  acc[path] = idx;
  return acc;
}, {});

const normalizePath = (path) => {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const getEffectivePath = (locationPath) => {
  const normalized = normalizePath(locationPath);
  if (PATH_TO_STEP[normalized] !== undefined) return normalized;
  if (isBrowser) {
    const windowPath = normalizePath(window.location.pathname);
    if (PATH_TO_STEP[windowPath] !== undefined) return windowPath;
  }
  return normalized;
};

const loadStoredReflectionData = () => {
  if (!isBrowser) return { ...DEFAULT_REFLECTION_DATA };
  const raw = window.localStorage.getItem(STORAGE_KEYS.reflectionData);
  if (!raw) return { ...DEFAULT_REFLECTION_DATA };
  try {
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_REFLECTION_DATA, ...parsed };
  } catch (error) {
    return { ...DEFAULT_REFLECTION_DATA };
  }
};

const loadStoredStep = () => {
  if (!isBrowser) return null;
  const raw = window.localStorage.getItem(STORAGE_KEYS.reflectionStep);
  if (!raw) return null;
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed)) return null;
  if (parsed < 0 || parsed > 7) return null;
  return parsed;
};

const loadStoredTrades = () => {
  if (!isBrowser) return [];
  const raw = window.localStorage.getItem(STORAGE_KEYS.trades);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

function App() {
  const initialReflectionData = loadStoredReflectionData();
  const initialTrades = loadStoredTrades();
  const navigate = useNavigate();
  const location = useLocation();
  const initialPath = getEffectivePath(location.pathname);
  const initialStepFromPath = PATH_TO_STEP[initialPath];

  const [trades, setTrades] = useState(initialTrades);
  const [currentTrade, setCurrentTrade] = useState(null);
  const [reflectionStage, setReflectionStage] = useState(() => {
    if (initialStepFromPath !== undefined) return initialStepFromPath;
    const stored = loadStoredStep();
    return stored !== null ? stored : 0;
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reflectionData, setReflectionData] = useState(
    initialReflectionData,
  );

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

  useEffect(() => {
    if (!isBrowser) return;
    window.localStorage.setItem(
      STORAGE_KEYS.reflectionData,
      JSON.stringify(reflectionData),
    );
  }, [reflectionData]);

  useEffect(() => {
    if (!isBrowser) return;
    window.localStorage.setItem(
      STORAGE_KEYS.reflectionStep,
      String(reflectionStage),
    );
  }, [reflectionStage]);

  useEffect(() => {
    if (!isBrowser) return;
    window.localStorage.setItem(
      STORAGE_KEYS.trades,
      JSON.stringify(trades),
    );
  }, [trades]);

  useEffect(() => {
    const path = getEffectivePath(location.pathname);
    if (PATH_TO_STEP[path] !== undefined) {
      setReflectionStage(PATH_TO_STEP[path]);
    }
  }, [location.pathname, navigate]);

  const goToStep = (stepIndex) => {
    const clamped = Math.max(0, Math.min(7, stepIndex));
    setReflectionStage(clamped);
    navigate(STEP_PATHS[clamped], { replace: true });
  };

  const setStage = (nextStage) => {
    if (nextStage === "reflection-form") {
      goToStep(0);
      return;
    }
    if (nextStage === "history") {
      navigate("/history", { replace: true });
      return;
    }
    if (nextStage === "analysis") {
      navigate("/analysis", { replace: true });
      return;
    }
    navigate("/", { replace: true });
  };

  const clearReflectionDraft = () => {
    if (!isBrowser) return;
    window.localStorage.removeItem(STORAGE_KEYS.reflectionData);
    window.localStorage.removeItem(STORAGE_KEYS.reflectionStep);
  };

  const moveToNextStage = async () => {
    if (reflectionStage < 7) {
      goToStep(reflectionStage + 1);
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
      setIsAnalyzing(true);

      const insights = await generateAIInsight(newTrade);
      newTrade.insights = insights;

      setTrades([newTrade, ...trades]);
      setCurrentTrade(newTrade);
      setIsAnalyzing(false);
      navigate("/analysis", { replace: true });
      setReflectionStage(0);

      setReflectionData({ ...DEFAULT_REFLECTION_DATA });
      clearReflectionDraft();
    }
  };

  const goBack = () => {
    if (reflectionStage > 0) {
      goToStep(reflectionStage - 1);
    } else {
      navigate("/", { replace: true });
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

  const QuestionnaireRoute = ({ step }) => {
    useEffect(() => {
      if (reflectionStage !== step) {
        setReflectionStage(step);
      }
    }, [reflectionStage, step]);

    return (
      <Questionnaire
        reflectionData={reflectionData}
        setReflectionData={setReflectionData}
        moveToNextStage={moveToNextStage}
        goBack={goBack}
        handleEmotionCheckbox={handleEmotionCheckbox}
        reflectionStage={step}
        setStage={setStage}
      />
    );
  };

  return (
    <div className="indie-journal">
      <Routes>
        <Route path="/" element={<Home setStage={setStage} trades={trades} />} />
        <Route
          path="/history"
          element={
            <History
              trades={trades}
              setCurrentTrade={setCurrentTrade}
              setStage={setStage}
            />
          }
        />
        <Route
          path="/analysis"
          element={
            <Analysis
              currentTrade={currentTrade}
              isAnalyzing={isAnalyzing}
              setStage={setStage}
              downloadTrade={downloadTrade}
              renderMarkdownContent={renderMarkdownContent}
            />
          }
        />
        <Route path="/numbers" element={<QuestionnaireRoute step={0} />} />
        <Route path="/thesis" element={<QuestionnaireRoute step={1} />} />
        <Route path="/before-entry" element={<QuestionnaireRoute step={2} />} />
        <Route path="/in-trade" element={<QuestionnaireRoute step={3} />} />
        <Route path="/exit" element={<QuestionnaireRoute step={4} />} />
        <Route path="/confidence" element={<QuestionnaireRoute step={5} />} />
        <Route path="/pattern" element={<QuestionnaireRoute step={6} />} />
        <Route path="/commitment" element={<QuestionnaireRoute step={7} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
