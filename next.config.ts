import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    "@google/genai",
    "@langchain/textsplitters",
    "@supabase/supabase-js",
  ],
};

export default nextConfig;
