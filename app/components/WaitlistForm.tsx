'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Get environment variables (will be embedded at build time)
      const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

      if (!spreadsheetId || !apiKey) {
        throw new Error('Configuration error. Please try again later.');
      }

      const timestamp = new Date().toISOString();
      const values = [[timestamp, formData.name, formData.email, formData.company || '']];

      // Call Google Sheets API directly
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:D:append?valueInputOption=RAW&key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Google Sheets API error:', errorData);
        throw new Error('Failed to submit. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Join the Waitlist
          </h2>
          <p className="text-lg text-foreground/70">
            Be among the first to access Preserve and revolutionize your synthetic data generation
          </p>
        </div>

        <div className="neomorph p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full neomorph-inset px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-transparent text-foreground"
                placeholder="Your full name"
                disabled={status === 'loading'}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full neomorph-inset px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-transparent text-foreground"
                placeholder="your.email@example.com"
                disabled={status === 'loading'}
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                Company <span className="text-foreground/50 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full neomorph-inset px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-transparent text-foreground"
                placeholder="Your company name"
                disabled={status === 'loading'}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full neomorph py-4 font-semibold text-lg rounded-lg transition-all duration-200 ${
                status === 'loading'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              }`}
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Join Waitlist'
              )}
            </button>

            {status === 'success' && (
              <div className="neomorph-inset p-4 rounded-lg bg-green-500/10 border-2 border-green-500/30">
                <p className="text-center text-green-600 dark:text-green-400 font-semibold flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Successfully joined! We'll be in touch soon.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="neomorph-inset p-4 rounded-lg bg-red-500/10 border-2 border-red-500/30">
                <p className="text-center text-red-600 dark:text-red-400 font-semibold flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {errorMessage}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

