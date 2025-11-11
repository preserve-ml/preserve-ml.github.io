"use client";

import { useMemo, useState } from "react";

const DEFAULT_GENERATE_URL =
  process.env.NEXT_PUBLIC_PRESERVE_API_GENERATE_URL ||
  "https://achinth-b--synthetic-api-generate.modal.run";
const DEFAULT_HEALTH_URL =
  process.env.NEXT_PUBLIC_PRESERVE_API_HEALTH_URL ||
  "https://achinth-b--synthetic-api-health.modal.run";

function parseSentences(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function TryAPIClient() {
  const [sentences, setSentences] = useState<string>(
    [
      "Machine learning is transforming how we approach complex problems.",
      "It enables computers to learn from data without explicit programming.",
      "Deep learning models can identify patterns in images and text.",
      "Natural language processing helps computers understand human language.",
      "These technologies are revolutionizing industries from healthcare to finance.",
    ].join("\n")
  );
  const [preset, setPreset] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [maxPerms, setMaxPerms] = useState<string>("");
  const [enableValidation, setEnableValidation] = useState<boolean>(true);
  const [onlyValid, setOnlyValid] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("perplexity_ratio");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const [loading, setLoading] = useState<boolean>(false);
  const [healthLoading, setHealthLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const body = useMemo(() => {
    const b: any = {
      sentences: parseSentences(sentences),
      enable_validation: enableValidation,
      only_valid: onlyValid,
      sort_by: sortBy,
      sort_order: sortOrder,
    };
    const mp = parseInt(maxPerms, 10);
    if (preset) b.preset = preset;
    if (model) b.model_name = model;
    if (!Number.isNaN(mp) && mp > 0) b.max_permutations = mp;
    return b;
  }, [sentences, preset, model, maxPerms, enableValidation, onlyValid, sortBy, sortOrder]);

  async function onHealth() {
    setError("");
    setResult(null);
    try {
      setHealthLoading(true);
      const r = await fetch(DEFAULT_HEALTH_URL, { method: "GET" });
      const j = await r.json();
      setResult({ health: j });
    } catch (e: any) {
      setError(
        `Health check failed. If this is a CORS error, we can enable CORS on the API. Details: ${e?.message || String(e)}`
      );
    } finally {
      setHealthLoading(false);
    }
  }

  async function onGenerate() {
    setError("");
    setResult(null);
    if (!Array.isArray(body.sentences) || body.sentences.length < 2) {
      setError("Provide at least 2 sentences (one per line).");
      return;
    }
    try {
      setLoading(true);
      const r = await fetch(DEFAULT_GENERATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      if (j.error) throw new Error(j.error);
      setResult(j);
    } catch (e: any) {
      setError(
        `Request failed. If you see CORS errors in the console, we need to enable CORS on the API. Details: ${
          e?.message || String(e)
        }`
      );
    } finally {
      setLoading(false);
    }
  }

  function renderPerm(p: any, idx: number) {
    const v = p?.validation || {};
    const pr = v?.perplexity_ratio ?? "—";
    const sim = v?.similarity_score ?? "—";
    const dist = p?.distance ?? "—";
    return (
      <div key={idx} className="neomorph-flat p-4 my-2">
        <div className="text-sm opacity-70">
          #{idx + 1} | distance: <code>{String(dist)}</code> | perplexity_ratio:{" "}
          <code>{String(pr)}</code> | similarity: <code>{String(sim)}</code>
        </div>
        <div className="mt-2 whitespace-pre-wrap break-words">
          {String(p?.permuted_text || "")}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-3xl font-bold mb-2">Try the API</h1>
      <p className="opacity-70 mb-6">
        Paste sentences, choose options, and call your Modal endpoint directly from the
        browser.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="neomorph p-5 space-y-4">
          <div>
            <label className="block text-sm opacity-80 mb-1">Input sentences (one per line)</label>
            <textarea
              className="w-full neomorph-inset px-3 py-2 min-h-40"
              value={sentences}
              onChange={(e) => setSentences(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm opacity-80 mb-1">Preset</label>
              <select
                className="w-full neomorph-inset px-3 py-2"
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
              >
                <option value="">(none)</option>
                <option value="support">support</option>
                <option value="legal">legal</option>
                <option value="medical">medical</option>
                <option value="financial">financial</option>
                <option value="research">research</option>
                <option value="social">social</option>
                <option value="ecommerce">ecommerce</option>
              </select>
            </div>
            <div>
              <label className="block text-sm opacity-80 mb-1">Model</label>
              <select
                className="w-full neomorph-inset px-3 py-2"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="">(default: Qwen/Qwen2-0.5B)</option>
                <option value="Qwen/Qwen2-0.5B">Qwen/Qwen2-0.5B</option>
                <option value="Qwen/Qwen2-1.5B">Qwen/Qwen2-1.5B</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm opacity-80 mb-1">Max permutations</label>
              <input
                className="w-full neomorph-inset px-3 py-2"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="e.g. 5"
                value={maxPerms}
                onChange={(e) => setMaxPerms(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 text-sm opacity-80">
                <input
                  type="checkbox"
                  checked={enableValidation}
                  onChange={(e) => setEnableValidation(e.target.checked)}
                />
                Enable validation
              </label>
              <label className="flex items-center gap-2 text-sm opacity-80">
                <input
                  type="checkbox"
                  checked={onlyValid}
                  onChange={(e) => setOnlyValid(e.target.checked)}
                />
                Only valid
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm opacity-80 mb-1">Sort by</label>
              <select
                className="w-full neomorph-inset px-3 py-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="perplexity_ratio">perplexity_ratio</option>
                <option value="similarity">similarity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm opacity-80 mb-1">Sort order</label>
              <select
                className="w-full neomorph-inset px-3 py-2"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onHealth}
              disabled={healthLoading}
              className="px-4 py-2 neomorph-flat"
            >
              {healthLoading ? "Checking..." : "Check Health"}
            </button>
            <button
              onClick={onGenerate}
              disabled={loading}
              className="px-4 py-2 neomorph-flat"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {error && (
            <div className="mt-3 text-red-600 text-sm whitespace-pre-wrap">{error}</div>
          )}
        </div>

        <div className="neomorph p-5">
          {!result && (
            <div className="opacity-70 text-sm">
              Results will appear here. We show permutation text, distance, and
              validation metrics when available.
            </div>
          )}
          {result?.health && (
            <div className="neomorph-flat p-4 mb-3">
              <span className="text-xs opacity-60">health</span>
              <pre className="mt-2 text-sm whitespace-pre-wrap break-words">
                {JSON.stringify(result.health, null, 2)}
              </pre>
            </div>
          )}
          {result && !result.health && (
            <div>
              <div className="neomorph-flat p-4 mb-3 flex items-center gap-2 text-sm">
                <span className="px-2 py-1 neomorph-inset">granularity: {String(result?.dag?.granularity ?? "—")}</span>
                <span className="px-2 py-1 neomorph-inset">permutations: {Array.isArray(result?.permutations) ? result.permutations.length : 0}</span>
                <span className="px-2 py-1 neomorph-inset">sort: {result?.sorting ? `${result.sorting.by}/${result.sorting.order}` : "—"}</span>
              </div>
              <div>
                {Array.isArray(result?.permutations) && result.permutations.map(renderPerm)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}