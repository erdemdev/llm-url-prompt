// Get current URL
const currentUrl = window.location.href;

// Find matching website configuration
const website = config.websites.find((site) => currentUrl.startsWith(site.url));

if (website) {
  // Get prompt from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const prompt = urlParams.get("llm_prompt");

  if (prompt) {
    // Wait for input element to be available
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds total with 500ms interval
    const checkElement = setInterval(() => {
      attempts++;
      const element = document.evaluate(
        website.textAreaXPath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (element) {
        clearInterval(checkElement);
        console.log(
          "[LLM-URL-Prompt] Found input element, attempting to enter text",
        );

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
          let submissionSuccess = false;

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
            submissionSuccess = true;
            console.log("[LLM-URL-Prompt] Submitted via button click");
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
          console.log("[LLM-URL-Prompt] Sent Enter key event");

          // 3. Try form submission if element is in a form
          const form = element.closest("form");
          if (form) {
            form.dispatchEvent(
              new Event("submit", {
                bubbles: true,
                cancelable: true,
              }),
            );
            submissionSuccess = true;
            console.log("[LLM-URL-Prompt] Submitted via form submission");
          }

          if (!submissionSuccess) {
            console.warn(
              "[LLM-URL-Prompt] Warning: No submission method was clearly successful",
            );
          }
        }, 100);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkElement);
        console.error(
          "[LLM-URL-Prompt] Failed to find input element after 10 seconds",
        );
      }
    }, 500);
  } else {
    console.error("[LLM-URL-Prompt] No prompt parameter found in URL");
  }
} else {
  console.error(
    "[LLM-URL-Prompt] No matching website configuration found for:",
    currentUrl,
  );
}
