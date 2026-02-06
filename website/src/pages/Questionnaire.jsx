import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";

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

const Questionnaire = ({
  reflectionData,
  setReflectionData,
  moveToNextStage,
  goBack,
  handleEmotionCheckbox,
  reflectionStage,
}) => {
  const currentStageConfig = stages[reflectionStage];

  return (
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
                          emotion
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
              ⚠ This is your commitment. R1T2 will evaluate it.
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
                ANALYZE WITH R1T2
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;