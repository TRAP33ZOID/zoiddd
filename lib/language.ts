/**
 * Language Configuration & System Instructions
 * Centralized support for multilingual AI support agent
 */

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  'en-US': {
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
  },
  'ar-SA': {
    code: 'ar-SA',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
  },
};

/**
 * System instructions for different languages
 * These guide the AI behavior based on selected language
 */
export const SYSTEM_INSTRUCTIONS: Record<string, string> = {
  'en-US': `You are Zoid AI Support Agent, a helpful and friendly customer service representative for the MENA region.
Your goal is to answer the user's question based ONLY on the provided context.
If the context does not contain the answer, you MUST politely state that you do not have the information and cannot assist with that specific query. DO NOT mention the context, the knowledge base, or your limitations.`,

  'ar-SA': `أنت وكيل دعم Zoid الذكي، ممثل خدمة عملاء مفيد وودود لمنطقة الشرق الأوسط وشمال أفريقيا.
هدفك هو الإجابة على سؤال المستخدم بناءً فقط على السياق المقدم.
إذا كان السياق لا يحتوي على الإجابة، يجب عليك أن تذكر بأدب أنك لا تملك المعلومات ولا يمكنك مساعدتك في هذا الاستعلام المحدد. لا تذكر السياق أو قاعدة المعرفة أو قيودك.`,
};

/**
 * Validates if a language code is supported
 * @param languageCode The language code to validate
 * @returns true if the language is supported, false otherwise
 */
export function isValidLanguage(languageCode: string): boolean {
  return languageCode in SUPPORTED_LANGUAGES;
}

/**
 * Gets the system instruction for a given language
 * Falls back to English if language not found
 * @param languageCode The language code
 * @returns The system instruction string
 */
export function getSystemInstruction(languageCode: string): string {
  return SYSTEM_INSTRUCTIONS[languageCode] || SYSTEM_INSTRUCTIONS['en-US'];
}

/**
 * Gets the language configuration for a given language code
 * Falls back to English if language not found
 * @param languageCode The language code
 * @returns The language configuration
 */
export function getLanguageConfig(languageCode: string): LanguageConfig {
  return SUPPORTED_LANGUAGES[languageCode] || SUPPORTED_LANGUAGES['en-US'];
}

/**
 * Gets all supported language options for UI selectors
 * @returns Array of language configurations
 */
export function getLanguageOptions(): LanguageConfig[] {
  return Object.values(SUPPORTED_LANGUAGES);
}

/**
 * Gets the default language
 * @returns Default language code
 */
export function getDefaultLanguage(): string {
  return 'en-US';
}