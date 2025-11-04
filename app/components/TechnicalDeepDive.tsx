'use client';

export default function TechnicalDeepDive() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          Technical Deep Dive
        </h2>
        <p className="text-center text-foreground/70 mb-16 text-lg">
          How we achieve O(n) speedup with adaptive constraint relaxation
        </p>

        <div className="space-y-12">
          {/* Pattern Extraction */}
          <div className="neomorph p-8 hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="neomorph-flat p-3 mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Pattern Extraction</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                We run a single forward pass through the model with <code className="neomorph-inset px-2 py-1 text-sm font-mono">output_attentions=True</code>, 
                then filter to only "structural" attention heads that have <strong>&gt;30% cross-sentence attention</strong>.
              </p>
              
              <div className="neomorph-inset p-6 rounded-lg">
                <p className="text-foreground/80 text-sm leading-relaxed">
                  These structural heads reveal which sentences semantically depend on which others. 
                  For example: <em>"It does X"</em> attends strongly to the sentence defining <em>"it"</em>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="neomorph-flat p-4">
                  <div className="text-sm font-semibold text-foreground/60 mb-2">Input</div>
                  <div className="text-foreground/90">Document text</div>
                </div>
                <div className="neomorph-flat p-4">
                  <div className="text-sm font-semibold text-foreground/60 mb-2">Output</div>
                  <div className="text-foreground/90">Dependency graph</div>
                </div>
              </div>
            </div>
          </div>

          {/* The Unique Solution */}
          <div className="neomorph p-8 hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="neomorph-flat p-3 mr-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">The Unique Solution</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                We convert dependencies into a <strong>DAG</strong> (Directed Acyclic Graph) where sentences are nodes and edges represent semantic dependencies. 
                Then we generate permutations via <strong>topological sorts</strong> of this DAG.
              </p>

              <div className="neomorph-inset p-6 rounded-lg space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">The Challenge: "Almost Linear" DAGs</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    When DAGs are too restrictive (avg &lt;2.5 dependencies/node), we get limited permutation diversity.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Our Innovation: Adaptive Constraint Relaxation</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    We dynamically detect restrictive DAGs and apply strategies:
                  </p>
                  <ul className="list-none space-y-2 mt-3">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">→</span>
                      <span className="text-sm text-foreground/80">Relax position constraints</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">→</span>
                      <span className="text-sm text-foreground/80">Allow "sibling" swaps (sentences sharing dependencies)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">→</span>
                      <span className="text-sm text-foreground/80">Use fallback strategies for diversity</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl">
                <p className="text-center text-foreground/90 font-semibold">
                  Result: <span className="text-purple-600 dark:text-purple-400">O(seqlen) speedup</span> while preventing semantic breakage and ensuring permutation diversity
                </p>
              </div>
            </div>
          </div>

          {/* Visual Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neomorph p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-bold text-foreground mb-2">Semantic Preservation</h4>
              <p className="text-sm text-foreground/70">Dependencies maintained</p>
            </div>
            <div className="neomorph p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-bold text-foreground mb-2">Lightning Fast</h4>
              <p className="text-sm text-foreground/70">No token generation</p>
            </div>
            <div className="neomorph p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-foreground mb-2">High Diversity</h4>
              <p className="text-sm text-foreground/70">Multiple valid permutations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

