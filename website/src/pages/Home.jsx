import { ChevronRight } from "lucide-react";

const Home = ({ setStage, trades }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-7xl title-grotesk glitch-hover leading-none">
              <strong>THE</strong>
              <br />
              <strong>TRADER'S</strong>
              <br />
              <span className="marker-underline">
                <strong>JOURNAL</strong>
              </span>
            </h1>
            <p className="text-xl handwriting text-[#FF006E]">
              not a form. a mirror.{" "}
              <span className="text-sm">(powered by R1T2)</span>
            </p>
          </div>

          <div className="torn-card p-8 rotate-1 max-w-lg mx-auto">
            <div className="tape-strip w-20 h-6 -top-3 left-8"></div>
            <div className="tape-strip w-20 h-6 -top-3 right-8"></div>

            <p className="text-sm leading-relaxed mb-4">
              Every trade tells a story. Your thesis. Your fears. Your
              discipline. Your mistakes.
            </p>
            <p className="text-xs italic opacity-70">
              <strong>8 questions. Honest answers.</strong> Then DeepSeek R1T2
              shows what you missed.
            </p>
          </div>

          <button
            onClick={() => {
              setStage("reflection-form");
            }}
            className="btn-marker px-8 py-4 text-lg wiggle-hover inline-flex items-center gap-2"
          >
            <strong>START LOGGING</strong>
            <ChevronRight size={20} />
          </button>

          {trades.length > 0 && (
            <button
              onClick={() => setStage("history")}
              className="btn-secondary px-6 py-3 block mx-auto mt-4"
            >
              <strong>VIEW JOURNAL ({trades.length})</strong>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
