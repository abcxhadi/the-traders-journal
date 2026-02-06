# The Trader's Journal — 10 Real-World Datasets With AI Conclusions

This document provides 10 realistic trade-reflection datasets modeled directly from the app’s questionnaire fields in `src/pages/Questionnaire.jsx` and the AI analysis format enforced in `src/services/ai.js`. Each dataset includes the exact input structure the app sends to the model and a corresponding AI conclusion formatted to match the app’s XML output contract.

---

## Dataset 1 — Momentum Breakout (Disciplined Win)

**Scenario:** Clean breakout on AAPL after volume confirmation.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "AAPL",
  "positionType": "long",
  "entryPrice": "187.40",
  "exitPrice": "189.85",
  "size": "200",
  "duration": "22",
  "thesis": "AAPL breaks 187.20 on 5m volume spike, target 190, stop 186.40, morning session only.",
  "emotionEntering": "Calm, focused, waiting for my level.",
  "emotionDuringTrade": "Steady. Let it work without micromanaging.",
  "exitReason": "Target hit at 189.85 after volume faded.",
  "emotionCheckboxes": ["Disciplined", "Satisfied"],
  "confidenceRating": 8,
  "pastPattern": "usually-win",
  "patternNotes": "Breakout setups work best for me 9:45-11:00.",
  "nextChange": "Keep the same checklist and avoid moving targets mid-trade."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
No account-destroying flags.
</red_flags>

<thesis_grade>A</thesis_grade>

<thesis_evaluation>
"AAPL breaks 187.20 on 5m volume spike, target 190, stop 186.40, morning session only."
Grade **A**—**falsifiable**, **time-bounded**, and includes **entry**, **target**, and **invalidation**. This is a complete thesis.
</thesis_evaluation>

<reality_gap>
No gap. You wrote **"Calm, focused"** and executed the plan without interference.
Pattern Classification: **Disciplined**
</reality_gap>

<execution>
Exit Type: **Planned**
Outcome Truth: **Skill**—thesis played out as designed and was executed cleanly.
</execution>

<pattern>
Their Claim: "Usually win — Breakout setups work best for me 9:45-11:00."
True Cycle: Confirmed. **Written thesis → calm hold → planned exit → satisfaction**.
Repeating Tell: **Pre-trade level clarity predicts execution quality**
</pattern>

<behavioral_rule>
**IF the breakout is confirmed by volume at your level**, THEN execute with the pre-written target and stop without adjustment.
</behavioral_rule>

<commitment>
Grade: **Actionable**
Their Commitment: "Keep the same checklist and avoid moving targets mid-trade."
</commitment>

</analysis>
```

---

## Dataset 2 — News-Driven FOMO (Loss)

**Scenario:** NVDA spike after unexpected news; trader chased late.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "NVDA",
  "positionType": "long",
  "entryPrice": "823.50",
  "exitPrice": "808.10",
  "size": "50",
  "duration": "17",
  "thesis": "Saw it ripping after headline, assumed it would keep running.",
  "emotionEntering": "Urgent and excited, didn’t want to miss the move.",
  "emotionDuringTrade": "Anxious watching pullbacks, kept hoping for bounce.",
  "exitReason": "Sold when it flushed and I panicked.",
  "emotionCheckboxes": ["Anxious", "Confused"],
  "confidenceRating": 4,
  "pastPattern": "mixed",
  "patternNotes": "When I chase news I usually regret it.",
  "nextChange": "Try to be more patient."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
- **Pure FOMO entry**: "Urgent and excited, didn’t want to miss the move"
- **No falsifiable thesis**: Chasing a headline without levels or invalidation
</red_flags>

<thesis_grade>F</thesis_grade>

<thesis_evaluation>
"Saw it ripping after headline, assumed it would keep running."
Grade **F**—this is **not a thesis**. **No entry criteria**, **no stop**, **no target**, **no timeframe**.
</thesis_evaluation>

<reality_gap>
You claimed a reason (“headline”) but your action was **impulse**: **"didn’t want to miss"** is FOMO, not analysis.
Pattern Classification: **FOMO-Driven**
</reality_gap>

<execution>
Exit Type: **Emotional**
Outcome Truth: **Execution failed**—you exited on **panic**, not a planned invalidation point.
</execution>

<pattern>
Their Claim: "Mixed — When I chase news I usually regret it."
True Cycle: **News spike → chase → anxiety → panic exit → regret**.
Repeating Tell: **Headline urgency triggers impulse entries**
</pattern>

<behavioral_rule>
**IF you feel urgency from news spikes**, THEN stand down until a written thesis with levels is complete.
</behavioral_rule>

<commitment>
Grade: **Vague**
Their Commitment: "Try to be more patient."
Rewrite: I will **not enter any trade** without a **written thesis** that includes **entry, target, stop, and timeframe**.
</commitment>

</analysis>
```

---

## Dataset 3 — Revenge Trade (Loss)

**Scenario:** Trader shorted TSLA immediately after a prior loss.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "TSLA",
  "positionType": "short",
  "entryPrice": "214.80",
  "exitPrice": "223.20",
  "size": "120",
  "duration": "35",
  "thesis": "Wanted to make back my earlier loss; thought it would fade.",
  "emotionEntering": "Frustrated and trying to win it back quickly.",
  "emotionDuringTrade": "Tense and staring at every tick.",
  "exitReason": "Covered when it kept grinding higher and I felt trapped.",
  "emotionCheckboxes": ["Anxious", "Greedy"],
  "confidenceRating": 3,
  "pastPattern": "usually-loss",
  "patternNotes": "After a loss I tend to trade too fast.",
  "nextChange": "I need to control myself after red days."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
- **Revenge trading**: "Wanted to make back my earlier loss"
- **No falsifiable thesis**: No entry criteria or invalidation point
</red_flags>

<thesis_grade>F</thesis_grade>

<thesis_evaluation>
"Wanted to make back my earlier loss; thought it would fade."
Grade **F**—this is **emotion**, not a thesis. **No entry criteria**, **no stop**, **no target**.
</thesis_evaluation>

<reality_gap>
You said you "thought it would fade" but admitted the true driver: **"win it back quickly"**. That is **revenge**, not analysis.
Pattern Classification: **Revenge-Driven**
</reality_gap>

<execution>
Exit Type: **Emotional**
Outcome Truth: **Execution failed**—you exited because you felt **trapped**, not because a plan invalidated.
</execution>

<pattern>
Their Claim: "Usually lose — After a loss I tend to trade too fast."
True Cycle: **Loss → urgency → oversized emotional entry → panic exit**.
Repeating Tell: **Post-loss urgency triggers revenge entries**
</pattern>

<behavioral_rule>
**IF you take a loss**, THEN enforce a **30-minute cooldown** and require a written thesis before the next trade.
</behavioral_rule>

<commitment>
Grade: **Vague**
Their Commitment: "I need to control myself after red days."
Rewrite: After any loss, I will **wait 30 minutes** and **write a thesis with entry, stop, and target** before entering again.
</commitment>

</analysis>
```

---

## Dataset 4 — Mean Reversion Scalp (Small Win, Execution Risk)

**Scenario:** SPY dip-buy for a quick bounce; slight win but shaky execution.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "SPY",
  "positionType": "long",
  "entryPrice": "494.10",
  "exitPrice": "495.00",
  "size": "150",
  "duration": "9",
  "thesis": "Oversold on 1m, expected a quick bounce to VWAP.",
  "emotionEntering": "A little rushed but saw the bounce setup.",
  "emotionDuringTrade": "Nervous, watched every candle.",
  "exitReason": "Took profit early because I didn’t want it to reverse.",
  "emotionCheckboxes": ["Anxious", "Relieved"],
  "confidenceRating": 5,
  "pastPattern": "mixed",
  "patternNotes": "I scalp well but I cut winners early.",
  "nextChange": "Hold longer when the target is still intact."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
No account-destroying flags.
</red_flags>

<thesis_grade>C</thesis_grade>

<thesis_evaluation>
"Oversold on 1m, expected a quick bounce to VWAP."
Grade **C**—directional but **vague**: no clear **entry trigger**, **stop**, or **timeframe** beyond "quick".
</thesis_evaluation>

<reality_gap>
You said "bounce to VWAP" but exited early due to **fear** of reversal. That’s a mismatch between thesis and execution.
Pattern Classification: **Fear-Driven**
</reality_gap>

<execution>
Exit Type: **Emotional**
Outcome Truth: **Execution failed**—profit was taken based on **fear**, not the VWAP target.
</execution>

<pattern>
Their Claim: "Mixed — I scalp well but I cut winners early."
True Cycle: **Setup identified → anxiety → early exit → regret**.
Repeating Tell: **Nervous monitoring leads to premature exits**
</pattern>

<behavioral_rule>
**IF the VWAP target is intact**, THEN hold until VWAP or stop is hit—no discretionary exit.
</behavioral_rule>

<commitment>
Grade: **Actionable**
Their Commitment: "Hold longer when the target is still intact."
</commitment>

</analysis>
```

---

## Dataset 5 — Earnings Gap Fade (Loss)

**Scenario:** META gapped up on earnings; trader faded without a plan.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "META",
  "positionType": "long",
  "entryPrice": "468.90",
  "exitPrice": "456.30",
  "size": "90",
  "duration": "41",
  "thesis": "Thought gap would fill quickly after the initial spike.",
  "emotionEntering": "Confident because I’ve seen gap fills before.",
  "emotionDuringTrade": "Stressed when it didn’t pull back.",
  "exitReason": "Stopped out mentally when it kept pushing higher.",
  "emotionCheckboxes": ["Confused", "Anxious"],
  "confidenceRating": 6,
  "pastPattern": "mixed",
  "patternNotes": "I overestimate how often gaps fill.",
  "nextChange": "Be more selective with gap fades."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
- **No falsifiable thesis**: "Thought gap would fill" without defined invalidation
</red_flags>

<thesis_grade>D</thesis_grade>

<thesis_evaluation>
"Thought gap would fill quickly after the initial spike."
Grade **D**—a **belief**, not a plan. Missing **entry trigger**, **stop**, and **target**.
</thesis_evaluation>

<reality_gap>
You called it confidence but admitted **stress** when it moved against you—this was conviction without a plan.
Pattern Classification: **Fear-Driven**
</reality_gap>

<execution>
Exit Type: **Emotional**
Outcome Truth: **Thesis failed**—the market didn’t fade, and there was no planned invalidation.
</execution>

<pattern>
Their Claim: "Mixed — I overestimate how often gaps fill."
True Cycle: **Assumption-based entry → stress → reactive exit**.
Repeating Tell: **Assuming a gap fill triggers premature fades**
</pattern>

<behavioral_rule>
**IF your gap thesis lacks a specific invalidation level**, THEN do not enter.
</behavioral_rule>

<commitment>
Grade: **Vague**
Their Commitment: "Be more selective with gap fades."
Rewrite: I will **only fade gaps** when I have **defined entry, stop, and target levels** written down.
</commitment>

</analysis>
```

---

## Dataset 6 — Overconfidence After Streak (Loss)

**Scenario:** AMD trade after a winning streak; oversized and impulsive.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "AMD",
  "positionType": "long",
  "entryPrice": "156.20",
  "exitPrice": "151.60",
  "size": "400",
  "duration": "28",
  "thesis": "Felt like momentum would carry it higher.",
  "emotionEntering": "Overconfident after three wins.",
  "emotionDuringTrade": "Started calm, then got anxious when it dropped.",
  "exitReason": "Sold to stop the bleeding.",
  "emotionCheckboxes": ["Anxious", "Confused"],
  "confidenceRating": 7,
  "pastPattern": "usually-loss",
  "patternNotes": "After a streak I size too big.",
  "nextChange": "Don’t size up just because I’m hot."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
- **Oversized position**: 400 shares after a streak without a defined stop
- **No falsifiable thesis**: "felt like momentum" is not criteria
</red_flags>

<thesis_grade>F</thesis_grade>

<thesis_evaluation>
"Felt like momentum would carry it higher."
Grade **F**—this is **gut feel**. **No entry trigger**, **no invalidation**, **no target**.
</thesis_evaluation>

<reality_gap>
You said **"overconfident"** and immediately sized up. That’s **overconfidence**, not edge.
Pattern Classification: **Fear-Driven**
</reality_gap>

<execution>
Exit Type: **Emotional**
Outcome Truth: **Execution failed**—you exited to stop pain, not because a plan said so.
</execution>

<pattern>
Their Claim: "Usually lose — After a streak I size too big."
True Cycle: **Win streak → overconfidence → oversized entry → anxious exit**.
Repeating Tell: **Win streaks trigger oversized risk**
</pattern>

<behavioral_rule>
**IF you’ve had 2+ consecutive wins**, THEN cap size at your baseline until a written thesis is complete.
</behavioral_rule>

<commitment>
Grade: **Actionable**
Their Commitment: "Don’t size up just because I’m hot."
</commitment>

</analysis>
```

---

## Dataset 7 — Crypto Breakout Without Plan (Loss)

**Scenario:** BTC breakout attempt after social hype.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "BTCUSD",
  "positionType": "long",
  "entryPrice": "43820",
  "exitPrice": "42650",
  "size": "0.8",
  "duration": "54",
  "thesis": "Everyone on Twitter said breakout was coming.",
  "emotionEntering": "FOMO, felt like I had to be in it.",
  "emotionDuringTrade": "Anxious and checking Twitter constantly.",
  "exitReason": "Sold when it dumped below the range.",
  "emotionCheckboxes": ["Anxious", "Greedy"],
  "confidenceRating": 5,
  "pastPattern": "mixed",
  "patternNotes": "Social media hype gets me into trouble.",
  "nextChange": "Ignore Twitter more."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
- **Pure FOMO entry**: "Everyone on Twitter said breakout was coming"
- **Zero risk parameters**: No defined stop or invalidation
</red_flags>

<thesis_grade>F</thesis_grade>

<thesis_evaluation>
"Everyone on Twitter said breakout was coming."
Grade **F**—this is **external hype**, not a thesis. **No entry criteria**, **no exit plan**.
</thesis_evaluation>

<reality_gap>
You admitted **"FOMO"** and used Twitter as validation. That’s **impulse**, not analysis.
Pattern Classification: **FOMO-Driven**
</reality_gap>

<execution>
Exit Type: **Emotional**
Outcome Truth: **Execution failed**—you exited on fear after entering without a plan.
</execution>

<pattern>
Their Claim: "Mixed — Social media hype gets me into trouble."
True Cycle: **Hype → impulse entry → anxiety → panic exit**.
Repeating Tell: **Social media urgency triggers impulsive trades**
</pattern>

<behavioral_rule>
**IF the thesis relies on social media hype**, THEN do not trade until you define levels and invalidation.
</behavioral_rule>

<commitment>
Grade: **Vague**
Their Commitment: "Ignore Twitter more."
Rewrite: I will **not enter any crypto trade** without **written entry, stop, and target levels**.
</commitment>

</analysis>
```

---

## Dataset 8 — FX Trend Trade (Disciplined Win)

**Scenario:** EURUSD trend continuation with defined levels.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "EURUSD",
  "positionType": "long",
  "entryPrice": "1.0865",
  "exitPrice": "1.0902",
  "size": "50000",
  "duration": "120",
  "thesis": "Daily uptrend intact; entered on 15m higher low at 1.0865, target 1.0910, stop 1.0848.",
  "emotionEntering": "Calm and patient, waited for the higher low.",
  "emotionDuringTrade": "Steady, no urge to interfere.",
  "exitReason": "Target filled near 1.0902 as momentum slowed.",
  "emotionCheckboxes": ["Disciplined", "Satisfied"],
  "confidenceRating": 7,
  "pastPattern": "usually-win",
  "patternNotes": "Higher-low entries work well for me.",
  "nextChange": "Keep respecting the stop and target without tinkering."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
No account-destroying flags.
</red_flags>

<thesis_grade>A</thesis_grade>

<thesis_evaluation>
"Daily uptrend intact; entered on 15m higher low at 1.0865, target 1.0910, stop 1.0848."
Grade **A**—clear **entry trigger**, **target**, **stop**, and **timeframe**.
</thesis_evaluation>

<reality_gap>
No gap. Your emotions and actions match a planned execution.
Pattern Classification: **Disciplined**
</reality_gap>

<execution>
Exit Type: **Planned**
Outcome Truth: **Skill**—trade followed the thesis and exited at target.
</execution>

<pattern>
Their Claim: "Usually win — Higher-low entries work well for me."
True Cycle: Confirmed. **Plan → calm execution → planned exit → satisfaction**.
Repeating Tell: **Higher-low structure predicts controlled execution**
</pattern>

<behavioral_rule>
**IF the higher-low structure is confirmed**, THEN execute with pre-written levels only.
</behavioral_rule>

<commitment>
Grade: **Actionable**
Their Commitment: "Keep respecting the stop and target without tinkering."
</commitment>

</analysis>
```

---

## Dataset 9 — Late-Day Chop (Loss)

**Scenario:** QQQ trade late in the day without clear plan.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "QQQ",
  "positionType": "long",
  "entryPrice": "421.60",
  "exitPrice": "418.90",
  "size": "140",
  "duration": "33",
  "thesis": "Thought it would bounce into the close.",
  "emotionEntering": "Bored and wanted one more trade.",
  "emotionDuringTrade": "Uncertain, kept second-guessing.",
  "exitReason": "Sold when it broke the prior low.",
  "emotionCheckboxes": ["Confused", "Anxious"],
  "confidenceRating": 4,
  "pastPattern": "usually-loss",
  "patternNotes": "Late-day trades are usually bad for me.",
  "nextChange": "Stop trading when I’m bored."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
- **No falsifiable thesis**: "Thought it would bounce" with no levels
- **Boredom trading**: "Bored and wanted one more trade"
</red_flags>

<thesis_grade>F</thesis_grade>

<thesis_evaluation>
"Thought it would bounce into the close."
Grade **F**—no **entry**, **stop**, **target**, or invalidation.
</thesis_evaluation>

<reality_gap>
Your stated driver was **boredom**, not edge. That is **impulse**, not strategy.
Pattern Classification: **FOMO-Driven**
</reality_gap>

<execution>
Exit Type: **Emotional**
Outcome Truth: **Thesis failed**—there was no defined bounce level to validate or invalidate.
</execution>

<pattern>
Their Claim: "Usually lose — Late-day trades are usually bad for me."
True Cycle: **Boredom → low-quality entry → uncertainty → exit**.
Repeating Tell: **Boredom triggers low-quality late trades**
</pattern>

<behavioral_rule>
**IF you feel bored or want “one more” trade**, THEN end the session immediately.
</behavioral_rule>

<commitment>
Grade: **Actionable**
Their Commitment: "Stop trading when I’m bored."
</commitment>

</analysis>
```

---

## Dataset 10 — News Catalyst With Plan (Win)

**Scenario:** XLE trade on oil inventory surprise with defined risk.

**AI Input Dataset (Trade Reflection):**

```json
{
  "asset": "XLE",
  "positionType": "long",
  "entryPrice": "93.40",
  "exitPrice": "95.10",
  "size": "180",
  "duration": "65",
  "thesis": "EIA inventory draw beat estimates; entered on breakout above 93.30, target 95.20, stop 92.70.",
  "emotionEntering": "Focused, waited for the break after the data.",
  "emotionDuringTrade": "Calm; respected the stop level.",
  "exitReason": "Target nearly hit and momentum slowed, exited at 95.10.",
  "emotionCheckboxes": ["Disciplined", "Proud"],
  "confidenceRating": 7,
  "pastPattern": "usually-win",
  "patternNotes": "News + breakout works if I wait for confirmation.",
  "nextChange": "Keep waiting for confirmation before entering."
}
```

**AI Conclusion (Expected Model Output):**

```xml
<analysis>

<red_flags>
No account-destroying flags.
</red_flags>

<thesis_grade>A</thesis_grade>

<thesis_evaluation>
"EIA inventory draw beat estimates; entered on breakout above 93.30, target 95.20, stop 92.70."
Grade **A**—clear **catalyst**, **entry trigger**, **target**, and **stop**.
</thesis_evaluation>

<reality_gap>
No gap. You waited for confirmation and executed the plan.
Pattern Classification: **Disciplined**
</reality_gap>

<execution>
Exit Type: **Planned**
Outcome Truth: **Skill**—news catalyst was paired with a defined risk plan.
</execution>

<pattern>
Their Claim: "Usually win — News + breakout works if I wait for confirmation."
True Cycle: Confirmed. **Catalyst → confirmation → planned entry → controlled exit**.
Repeating Tell: **Confirmation requirement reduces emotional errors**
</pattern>

<behavioral_rule>
**IF trading a catalyst**, THEN wait for confirmation before entering and honor the stop.
</behavioral_rule>

<commitment>
Grade: **Actionable**
Their Commitment: "Keep waiting for confirmation before entering."
</commitment>

</analysis>
```

---

## Notes On Schema Alignment

- Fields mirror `reflectionData` from `src/App.jsx` and prompts in `src/pages/Questionnaire.jsx`.
- Conclusions match the XML tag contract required by `parseAIResponse()` in `src/services/ai.js`.
- All datasets are grounded in realistic trading contexts (earnings, macro data, breakouts, scalps, trend trades).

