import json
import time
from pathlib import Path

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

BASE_URL = "http://localhost:5173/"
DATA_PATH = Path(__file__).parent / "datasets.json"
SCREENSHOT_DIR = Path(__file__).parent / "screenshots"


def fill_textarea_by_label(page, label_text, value):
    label = page.get_by_text(label_text, exact=True)
    textarea = label.locator("xpath=following::textarea[1]")
    textarea.fill(value)


def fill_input_by_label(page, label_text, value):
    label = page.get_by_text(label_text, exact=True)
    input_field = label.locator("xpath=following::input[1]")
    input_field.fill(str(value))


def select_by_label(page, label_text, option_text):
    label = page.get_by_text(label_text, exact=True)
    select = label.locator("xpath=following::select[1]")
    select.select_option(label=option_text)


def set_confidence_slider(page, value):
    page.wait_for_selector('input[type="range"]', timeout=10000)
    slider = page.query_selector('input[type="range"]')
    if slider is None:
        raise RuntimeError("Confidence slider not found")
    # Set range value via element handle for reliability
    slider.evaluate(
        """
        (el, val) => {
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        """,
        str(value),
    )


def toggle_emotions(page, emotions):
    for emotion in emotions:
        page.get_by_text(emotion, exact=True).click()


def wait_for_analysis(page):
    # Wait for the AI results card to appear and the loading text to disappear
    page.get_by_text("R1T2 Brutalist Analysis", exact=False).wait_for(timeout=120_000)


def take_screenshot(page, dataset_id):
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    filename = SCREENSHOT_DIR / f"{dataset_id}.png"
    page.screenshot(path=str(filename), full_page=True)
    return filename


def run_dataset(page, data):
    # Home
    page.get_by_text("START LOGGING", exact=False).click()

    # Stage 1: The Numbers
    fill_input_by_label(page, "Ticker", data["asset"])
    select_by_label(page, "Direction", "LONG ↗" if data["positionType"] == "long" else "SHORT ↘")
    fill_input_by_label(page, "Entry $", data["entryPrice"])
    fill_input_by_label(page, "Exit $", data["exitPrice"])
    fill_input_by_label(page, "Shares", data["size"])
    fill_input_by_label(page, "Duration (min)", data["duration"])
    page.get_by_text("NEXT →", exact=False).click()

    # Stage 2: Thesis
    page.locator("textarea").fill(data["thesis"])
    page.get_by_text("NEXT →", exact=False).click()

    # Stage 3: Emotion entering
    page.locator("textarea").fill(data["emotionEntering"])
    page.get_by_text("NEXT →", exact=False).click()

    # Stage 4: Emotion during trade
    page.locator("textarea").fill(data["emotionDuringTrade"])
    page.get_by_text("NEXT →", exact=False).click()

    # Stage 5: Exit reason
    page.locator("textarea").fill(data["exitReason"])
    page.get_by_text("NEXT →", exact=False).click()

    # Stage 6: Confidence + emotions
    set_confidence_slider(page, data["confidenceRating"])
    toggle_emotions(page, data["emotionCheckboxes"])
    page.get_by_text("NEXT →", exact=False).click()

    # Stage 7: Pattern recognition
    select_by_label(page, "Taken this setup before?", {
        "first": "✗ First time",
        "usually-win": "✓ Yes, usually win",
        "usually-loss": "✗ Yes, usually lose",
        "mixed": "~ Mixed results",
    }[data["pastPattern"]])
    if data.get("patternNotes"):
        page.get_by_text("Notes (optional)", exact=True).locator("xpath=following::textarea[1]").fill(data["patternNotes"])
    page.get_by_text("NEXT →", exact=False).click()

    # Stage 8: Commitment
    page.locator("textarea").fill(data["nextChange"])
    page.get_by_text("ANALYZE WITH R1T2", exact=False).click()

    # Wait for analysis to load
    try:
        wait_for_analysis(page)
    except PlaywrightTimeoutError:
        print(f"Warning: AI analysis did not load in time for {data['id']}")

    # Give a tiny pause for visual stability before screenshot
    time.sleep(1.0)


def main():
    datasets = json.loads(DATA_PATH.read_text())

    with sync_playwright() as p:
        browser = p.webkit.launch(headless=False)
        page = browser.new_page(viewport={"width": 1400, "height": 900})

        for idx, data in enumerate(datasets, start=1):
            page.goto(BASE_URL, wait_until="domcontentloaded")
            run_dataset(page, data)
            path = take_screenshot(page, data["id"])
            print(f"Saved screenshot: {path}")

            # Go to history so the next run starts cleanly
            page.get_by_text("VIEW JOURNAL", exact=False).click()
            page.get_by_text("LOG ANOTHER", exact=False).click()

        browser.close()


if __name__ == "__main__":
    main()
