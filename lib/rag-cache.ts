/**
 * RAG Cache
 * In-memory caching layer for frequently accessed documents
 * Reduces Supabase queries for common questions
 * 
 * Production: Replace with Redis
 */

interface CacheEntry {
  key: string;
  results: string[];
  timestamp: number;
  ttlMs: number;
}

class RAGCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize = 100;
  private defaultTTL = 3600000; // 1 hour

  set(key: string, results: string[], ttlMs: number = this.defaultTTL): void {
    // Implement LRU: remove oldest if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldest = Array.from(this.cache.entries()).reduce((a, b) =>
        a[1].timestamp < b[1].timestamp ? a : b
      );
      this.cache.delete(oldest[0]);
    }

    this.cache.set(key, {
      key,
      results,
      timestamp: Date.now(),
      ttlMs,
    });
  }

  get(key: string): string[] | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttlMs) {
      this.cache.delete(key);
      return null;
    }

    return entry.results;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const ragCache = new RAGCache();

/**
 * Generate cache key from query and language
 */
export function generateCacheKey(query: string, language: string): string {
  // Normalize query: lowercase, trim, remove punctuation
  const normalized = query.toLowerCase().trim().replace(/[^\w\s]/g, "");
  return `${language}:${normalized}`;
}

/**
 * Check cache before making embedding call
 */
export function checkRAGCache(query: string, language: string): string[] | null {
  const key = generateCacheKey(query, language);
  return ragCache.get(key);
}

/**
 * Store RAG results in cache
 */
export function cacheRAGResults(
  query: string,
  language: string,
  results: string[],
  ttlMs?: number
): void {
  const key = generateCacheKey(query, language);
  ragCache.set(key, results, ttlMs);
}