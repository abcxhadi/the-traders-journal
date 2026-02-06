# Hackathon Demo & Q&A Preparation Guide

This document compiles the suggested demo video flow and potential hackathon questions with answers to help you prepare.

---

## Part 1: Demo Video Flow

A great demo tells a story. Your story is about a trader trying to overcome their psychological flaws. The demo should be fast, compelling, and focused on your unique value proposition (the AI analysis).

**The Story:** A trader makes an impulsive, losing trade and uses your tool to understand what went wrong.

**Video Flow (Aim for ~60 seconds):**

1.  **The Hook (5s):**
    *   **Scene:** Start on the Home page.
    *   **Action:** Have a few past journal entries already visible in the history list.
    *   **Narration:** "Every trader knows they should journal, but most journals just track P&L. They don't help you fix the real problem: your psychology. This tool does."

2.  **The Problem Entry (15s):**
    *   **Scene:** The Questionnaire.
    *   **Action:** Click "Start New Reflection". Quickly fill out the first stage with data for a losing trade (e.g., entered high, sold low). Don't narrate every field.
    *   **Narration:** "I just finished a trade that started well but ended poorly. I'm going to use the journal to figure out why."
    *   **Action:** Click rapidly through the next few stages, showing the different prompts for thesis, emotions, etc. The speed implies it's a quick process.
    *   **Narration:** "It guides me through a quick reflection—forcing me to be honest about my thesis, my emotions, and my mistakes."

3.  **The "Aha!" Moment - Your Unique Feature (25s):**
    *   **Scene:** The final questionnaire stage.
    *   **Action:** Pause, fill in the "What changes next time?" box, and click the big "ANALYZE" button.
    *   **Narration:** "But this is where it gets interesting. I'm sending my reflection to an AI trading coach..."
    *   **Scene:** The Analysis page with the loading spinner. Let it spin for 2-3 seconds for dramatic effect.
    *   **Action:** The analysis results load. Scroll slowly through the AI's feedback. Zoom in on a key insight, like a "Warning" or a specific psychological bias it identified.
    *   **Narration:** "...and it gives me immediate, personalized feedback. Here, it identified that I was 'revenge trading' and that my exit reason didn't match my initial thesis. This is the kind of insight that prevents future mistakes."

4.  **The Long-Term Value & Close (15s):**
    *   **Scene:** The History Page.
    *   **Action:** Click back to the "History" or "Dashboard" view. Click on the new entry you just created to show it's saved.
    *   **Narration:** "Every reflection is saved, building a personal database of my trading habits. Over time, the AI can identify my recurring patterns, good and bad."
    *   **Action:** End on the main dashboard, showing a list of trades.
    *   **Narration:** "It's not just a journal; it's a system for continuous improvement. That's The Trader's Journal."

---

## Part 2: Potential Hackathon Questions & Answers

Judges want to know about the tech, the vision, and the execution. Here are likely questions and strong answers you can adapt.

### 1. Technical Questions

*   **Q: What is your tech stack?**
    *   **A:** "The frontend is a modern React application built with Vite and styled using Tailwind CSS. The core AI analysis is powered by prompt-engineering the DeepSeek R1T2 model, which I connect to via an API."

*   **Q: How does the AI analysis actually work? Did you fine-tune a model?**
    *   **A:** "I'm not fine-tuning at this stage. The magic is in the prompt engineering. I've designed a detailed prompt that structures the user's journal entry and instructs the model to act as a trading coach. It's specifically tasked with identifying common cognitive biases—like FOMO, confirmation bias, or revenge trading—based on the user's own words. The quality of the questionnaire is what ensures the AI has rich, honest data to work with."

*   **Q: Where is the data stored? Is it secure?**
    *   **A:** "For this hackathon prototype, the journal entries are stored in the browser's web cache for a fast, offline-first feel. The immediate next step on the roadmap is to implement user authentication with Firebase Auth and store all data securely in Firestore, which will make it persistent and user-specific."

### 2. Product & Vision Questions

*   **Q: Who is your target user?**
    *   **A:** "My target users are developing retail traders who are serious about improving. They understand that psychology is a huge part of the game and are looking for a tool that goes deeper than a simple P&L tracker."

*   **Q: How is this different from just writing in a notebook or an Excel sheet?**
    *   **A:** "Three key ways: **1. Structure:** The guided questionnaire prevents lazy journaling and forces deep reflection. **2. Immediate Feedback:** The AI coach provides instant insights that a notebook can't. It acts as an objective second opinion. **3. Pattern Recognition:** Over time, this system is designed to programmatically find your personal 'bad habits' across dozens of trades, a task that's incredibly difficult to do manually."

*   **Q: What is the future vision for this project?**
    *   **A:** "The vision is to create a full-cycle trading psychology platform. The next features would be user accounts and then building a dashboard that analyzes your performance and emotional state over time. Imagine it telling you, 'You have a 90% loss rate when you trade after a big win'—that's the kind of powerful, data-driven insight I want to provide."

### 3. Business & Execution Questions

*   **Q: How would you monetize this?**
    *   **A:** "I see a clear path to a freemium model. A free tier would offer the core journaling and AI analysis for a limited number of entries (e.g., 20). A 'Pro' subscription would unlock unlimited entries, long-term pattern analysis, and more advanced AI insights. This allows anyone to benefit while creating a sustainable business from dedicated users."

*   **Q: What was the biggest challenge you overcame during the hackathon?**
    *   **A:** "The biggest challenge was designing the user experience to be both **honest and encouraging**. Trading can be a highly emotional activity, and while the AI's role is to deliver **objective and often critical analysis** of one's decisions and emotions, the app's vintage, easy-on-the-eyes interface is designed to provide a calm space for that intense self-reflection. Balancing the need for **unflinching feedback** with a supportive environment that fosters **constructive self-improvement** was key. Getting the right prompts in the questionnaire to extract meaningful data for this honest AI evaluation was also a significant part of the process."
