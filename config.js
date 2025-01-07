const config = {
  websites: [
    {
      url: "https://x.com/i/grok",
      textAreaXPath:
        "/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div/div[1]/div/textarea",
      submitButtonXPath:
        "/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div/div[2]/div[2]/div/div/div/button[2]",
    },
    {
      url: "https://aistudio.google.com/prompts/new_chat",
      textAreaXPath:
        "/html/body/app-root/div/div/div[3]/div/span/ms-prompt-switcher/ms-chunk-editor/section/footer/div[1]/div[1]/ms-chunk-input/section/ms-text-chunk/ms-autosize-textarea/textarea",
      submitButtonXPath:
        "/html/body/app-root/div/div/div[3]/div/span/ms-prompt-switcher/ms-chunk-editor/section/footer/div[1]/div[3]/run-button/button",
    },
    {
      url: "https://claude.ai/new",
      textAreaXPath:
        "/html/body/div[3]/div/main/div[2]/div/fieldset/div[1]/div[1]/div/div/p",
      submitButtonXPath:
        "/html/body/div[3]/div/main/div[2]/div/fieldset/div[1]/div[1]/div[2]/div/div/button",
    },
  ],
};
