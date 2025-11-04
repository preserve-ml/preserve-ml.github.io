'use client';

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-foreground/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Preserve
            </h3>
            <p className="text-foreground/70 text-sm">
              Next-generation synthetic data generation through attention-based permutation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#waitlist" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <p className="text-foreground/70 text-sm">
              Questions? Reach out to us at{' '}
              <a href="mailto:hello@preserve.ml" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                hello@preserve.ml
              </a>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/10 text-center">
          <p className="text-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Preserve. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

