'use client';

export default function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-8 inline-block">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Preserve
          </h1>
          <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-foreground">
          Synthetic Data Generation,
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            20-30x Faster
          </span>
        </h2>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Stop generating tokens. Start permuting sentences.
          <br />
          <span className="font-semibold">160ms</span> vs <span className="line-through">3-5 seconds</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={scrollToWaitlist}
            className="neomorph px-8 py-4 font-semibold text-lg hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
          >
            Join Waitlist
          </button>
          <a
            href="#how-it-works"
            className="neomorph-flat px-8 py-4 font-semibold text-lg hover:scale-105 transition-transform duration-200"
          >
            Learn More
          </a>
        </div>

        <div className="neomorph p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                25x
              </div>
              <div className="text-sm sm:text-base text-foreground/70">Cheaper</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                30x
              </div>
              <div className="text-sm sm:text-base text-foreground/70">Faster</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                O(n)
              </div>
              <div className="text-sm sm:text-base text-foreground/70">Complexity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

