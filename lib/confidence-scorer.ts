/**
 * lib/confidence-scorer.ts
 * 
 * Module for scoring the AI's confidence in its response.
 * 
 * The AI model (Gemini) is instructed to output a structured JSON object
 * containing the response text and a confidence score (0.0 to 1.0).
 */

// Define the structure of the AI's structured output
export interface ScoredResponse {
  response: string;
  confidence: number; // 0.0 to 1.0
}

/**
 * Parses the raw text output from the AI model to extract the structured
 * response and confidence score.
 * 
 * @param rawText The raw text response from the AI, expected to contain a JSON block.
 * @returns A ScoredResponse object.
 */
export function parseScoredResponse(rawText: string): ScoredResponse {
  try {
    // Attempt to find and parse a JSON block in the raw text.
    // This regex looks for a block starting with '{' and ending with '}'
    // which is common when models are instructed to output JSON.
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

    if (jsonMatch && jsonMatch[0]) {
      const jsonString = jsonMatch[0];
      const parsed = JSON.parse(jsonString);

      // Validate and extract fields
      const response = parsed.response || parsed.text || "";
      let confidence = parseFloat(parsed.confidence);

      // Ensure confidence is a valid number between 0 and 1
      if (isNaN(confidence) || confidence < 0 || confidence > 1) {
        console.warn(`Invalid confidence score parsed: ${parsed.confidence}. Defaulting to 0.5.`);
        confidence = 0.5;
      }

      return {
        response: response.trim(),
        confidence: confidence,
      };
    }
  } catch (e) {
    console.error("Error parsing scored response JSON:", e);
    // Fallback if parsing fails, assume medium confidence and use raw text
  }

  // Fallback: If parsing fails or no JSON is found, assume medium confidence (0.5)
  // and treat the entire raw text as the response.
  return {
    response: rawText.trim(),
    confidence: 0.5,
  };
}

/**
 * Helper function to determine if the confidence score is below the escalation threshold.
 * @param confidence The confidence score (0.0 to 1.0).
 * @param threshold The threshold for escalation (default 0.6).
 * @returns boolean
 */
export function requiresEscalationByConfidence(confidence: number, threshold: number = 0.6): boolean {
  return confidence < threshold;
}