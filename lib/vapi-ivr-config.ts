/**
 * VAPI IVR Configuration
 * Manages language selection and call routing
 * 
 * IVR Menu:
 * - Press 1 or say "English" for English
 * - Press 2 or say "Arabic" for Arabic
 */

import { getLanguageOptions, LanguageConfig } from "@/lib/language";

export interface IVROption {
  id: string;
  label: string;
  languageCode: string;
  keyCode?: string;
  voiceCommands: string[];
}

export interface IVRConfig {
  greeting: Record<string, string>;
  menu: IVROption[];
  maxRetries: number;
  timeoutMs: number;
}

/**
 * Build IVR menu from supported languages
 */
export function buildIVRMenu(): IVROption[] {
  const languages = getLanguageOptions();
  const options: IVROption[] = [];

  languages.forEach((lang: LanguageConfig, index: number) => {
    options.push({
      id: `option_${index + 1}`,
      label: lang.name,
      languageCode: lang.code,
      keyCode: String(index + 1),
      voiceCommands: getVoiceCommands(lang.code),
    });
  });

  return options;
}

/**
 * Get voice commands for a language
 */
function getVoiceCommands(languageCode: string): string[] {
  const commands: Record<string, string[]> = {
    "en-US": ["english", "one", "1", "select english", "yes"],
    "ar-SA": ["العربية", "arabic", "two", "2", "select arabic"],
  };

  return commands[languageCode] || [];
}

/**
 * Get IVR greeting for a language
 */
export function getIVRGreeting(languageCode: string): string {
  const greetings: Record<string, string> = {
    "en-US": `Welcome to Zoid AI Support. Press 1 for English or 2 for Arabic.`,
    "ar-SA": `مرحبا بك في دعم Zoid الذكي. اضغط 1 للعربية أو 2 للغة الإنجليزية.`,
  };

  return greetings[languageCode] || greetings["en-US"];
}

/**
 * Get IVR configuration
 */
export function getIVRConfig(): IVRConfig {
  return {
    greeting: {
      "en-US": "Welcome to Zoid AI Support.",
      "ar-SA": "مرحبا بك في دعم Zoid الذكي.",
    },
    menu: buildIVRMenu(),
    maxRetries: 3,
    timeoutMs: 5000,
  };
}

/**
 * Parse user selection (key press or voice command)
 * Returns language code if matched, null otherwise
 */
export function parseIVRSelection(input: string): string | null {
  const config = getIVRConfig();

  // Try to match voice commands or key codes
  for (const option of config.menu) {
    // Check key code
    if (option.keyCode === input.trim()) {
      return option.languageCode;
    }

    // Check voice commands
    const normalizedInput = input.toLowerCase().trim();
    if (
      option.voiceCommands.some(cmd =>
        normalizedInput === cmd || normalizedInput.includes(cmd)
      )
    ) {
      return option.languageCode;
    }
  }

  return null;
}

/**
 * Get voice prompt for invalid selection
 */
export function getInvalidSelectionPrompt(language: string = "en-US"): string {
  const prompts: Record<string, string> = {
    "en-US": "I didn't understand that. Please press 1 for English or 2 for Arabic.",
    "ar-SA": "لم أفهم ذلك. يرجى الضغط على 1 للعربية أو 2 للغة الإنجليزية.",
  };

  return prompts[language] || prompts["en-US"];
}

/**
 * Get confirmation prompt
 */
export function getConfirmationPrompt(language: string): string {
  const prompts: Record<string, string> = {
    "en-US": `You selected ${language === "en-US" ? "English" : "Arabic"}. How can I help you?`,
    "ar-SA": `اخترت ${language === "ar-SA" ? "العربية" : "الإنجليزية"}. كيف يمكنني مساعدتك؟`,
  };

  return prompts["en-US"];
}