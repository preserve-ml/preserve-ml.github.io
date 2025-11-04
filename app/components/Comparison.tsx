'use client';

export default function Comparison() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          Old vs New: Synthetic Data Generation
        </h2>
        <p className="text-center text-foreground/70 mb-12 text-lg">
          Why attention-based permutation beats token generation
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Old Method */}
          <div className="neomorph p-8 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
              <h3 className="text-2xl font-bold text-foreground">Old Method</h3>
            </div>
            <p className="text-sm text-foreground/60 mb-6">LLM-Driven Generation</p>
            
            <div className="space-y-4 mb-6">
              <div className="neomorph-inset p-4 rounded-lg">
                <div className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">
                  Document → LLM
                </div>
              </div>
              <div className="neomorph-inset p-4 rounded-lg">
                <div className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">
                  → [Generate token 1] ⏱️ 100ms
                </div>
              </div>
              <div className="neomorph-inset p-4 rounded-lg">
                <div className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">
                  → [Generate token 2] ⏱️ 100ms
                </div>
              </div>
              <div className="text-center text-foreground/60">...</div>
              <div className="neomorph-inset p-4 rounded-lg">
                <div className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">
                  → [Generate token N] ⏱️ 100ms
                </div>
              </div>
              <div className="neomorph-pressed p-4 rounded-lg bg-red-500/10">
                <div className="font-bold text-lg text-red-600 dark:text-red-400">
                  = 3-5 seconds
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-foreground/80"><strong>Slow:</strong> Sequential token generation</span>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-foreground/80"><strong>Expensive:</strong> $50K+ for 10B tokens</span>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-foreground/80"><strong>Not scalable:</strong> Full generation per example</span>
              </div>
            </div>
          </div>

          {/* New Method */}
          <div className="neomorph p-8 hover:scale-[1.02] transition-transform duration-300 border-2 border-green-500/20">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
              <h3 className="text-2xl font-bold text-foreground">New Method</h3>
            </div>
            <p className="text-sm text-foreground/60 mb-6">Attention-Based Permutation</p>
            
            <div className="space-y-4 mb-6">
              <div className="neomorph-inset p-4 rounded-lg">
                <div className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">
                  Document → Extract attention
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">⏱️ 50ms</div>
              </div>
              <div className="neomorph-inset p-4 rounded-lg">
                <div className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">
                  → Build DAG
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">⏱️ 10ms</div>
              </div>
              <div className="neomorph-inset p-4 rounded-lg">
                <div className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">
                  → Permute sentences
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">⏱️ 30ms</div>
              </div>
              <div className="neomorph-inset p-4 rounded-lg">
                <div className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">
                  → Validate permutations
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">⏱️ 40ms</div>
              </div>
              <div className="neomorph-pressed p-4 rounded-lg bg-green-500/10">
                <div className="font-bold text-lg text-green-600 dark:text-green-400">
                  = 160ms total
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-foreground/80"><strong>Fast:</strong> No token generation needed</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-foreground/80"><strong>Cheap:</strong> Only prefill, 25x cost reduction</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-foreground/80"><strong>Scalable:</strong> Multiple permutations instantly</span>
              </div>
            </div>
          </div>
        </div>

        <div className="neomorph p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Key Insight</h3>
          <p className="text-center text-foreground/90 text-lg leading-relaxed">
            Instead of generating new text token-by-token, we <strong>reuse existing sentences</strong> in valid orders based on their semantic dependencies extracted from attention patterns.
          </p>
        </div>
      </div>
    </section>
  );
}

