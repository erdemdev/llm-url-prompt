// Get current URL
const currentUrl = window.location.href;

// Find matching website configuration
const website = config.websites.find((site) =>
  currentUrl.startsWith(site.url),
);

if (website) {
  // Get prompt from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const prompt = urlParams.get("llm_prompt");

  if (prompt) {
    // Wait for input element to be available
    const checkElement = setInterval(() => {
      const element = document.evaluate(
        website.textAreaXPath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (element) {
        clearInterval(checkElement);

        // Handle textarea, contenteditable div, and p tag
        if (element.tagName.toLowerCase() === "textarea") {
          // Set prompt value for textarea
          element.value = prompt;
        } else {
          // Set prompt value for contenteditable elements (div or p)
          element.innerHTML = prompt;
          // Focus the element to ensure the cursor is placed
          element.focus();
        }

        // Trigger common events for all types
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));

        // Try multiple submission methods
        setTimeout(() => {
          // 1. Try finding and clicking the submit button
          const submitButton = document.evaluate(
            website.submitButtonXPath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
          ).singleNodeValue;

          if (submitButton) {
            submitButton.click();
          }

          // 2. Try Enter key event on the input element
          element.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "Enter",
              code: "Enter",
              keyCode: 13,
              which: 13,
              bubbles: true,
              cancelable: true,
            }),
          );

          // 3. Try form submission if element is in a form
          const form = element.closest("form");
          if (form) {
            form.dispatchEvent(
              new Event("submit", {
                bubbles: true,
                cancelable: true,
              }),
            );
          }
        }, 100); // Small delay to ensure the input event is processed
      }
    }, 500); // Check every 500ms
  }
}
