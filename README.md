# LLM URL Prompt Chrome Extension

This Chrome extension automates the process of entering LLM prompts on specific websites by adding them via URL parameters.

## Features

- Automatically detects supported websites
- Extracts prompt from URL query parameters
- Inserts prompt into the correct textarea
- Automatically submits the prompt

## Supported Websites

- X (Twitter) Grok: https://x.com/i/grok
- Google AI Studio: https://aistudio.google.com/prompts/new_chat
- Claude AI: https://claude.ai/new
- Deepseek: https://chat.deepseek.com/

**Why is GPT not supported?**

GPT (also Perplexity) already supports URL parameters for prompts:
`https://chat.openai.com/?q=your prompt here`
`https://www.perplexity.ai/search?q=your prompt here`

## Installation

1. Clone this repository or download the files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Add `?llm_prompt=your prompt here` to any supported website URL
2. The extension will automatically insert and submit the prompt

**Example**

```
https://x.com/i/grok?llm_prompt=Tell me a joke
```

### Integration with Other Tools

Instead of installing CLI tools for each AI provider, you can create custom terminal commands to open browsers with pre-filled prompts using URL parameters. This approach simplifies interaction with multiple AI services from your command line.

## Configuration

The `config.js` file contains the configuration for supported websites. Each entry includes:

- `url`: The full URL of the supported website
- `textAreaXPath`: The XPath selector for the textarea element
- `submitButtonXPath`: The XPath selector for the submit button

## Contributing

Contributions are welcome! Here's how you can help:

1. **Adding Support for New Websites**

- Fork the repository
- Add a new website configuration to `config.js` and `manifest.json`
- Test the changes thoroughly
- Submit a pull request

2. **How to Add a New Website**

- Open the target website
- Use browser's developer tools (F12) to find:
  - The textarea/input element XPath
  - The submit button XPath
- Add a new entry to the `websites` array in `config.js`:

  ```javascript
  {
    url: "https://your-website.com/chat",
    textAreaXPath: "your-textarea-xpath",
    submitButtonXPath: "your-submit-button-xpath"
  }
  ```

- You may need to modify content.js to handle the new website's structure

3. **Reporting Issues**

- Check existing issues before creating a new one
- Include steps to reproduce the issue
- Specify your browser version and OS

4. **Code Improvements**

- Bug fixes
- Performance improvements
- Code cleanup
- Documentation updates

Please ensure your code follows the existing style and includes appropriate comments where necessary.

## Roadmap

- [ ] Create a UI for dynamically inserting new websites and XPaths, as website structures are constantly changing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
