import Hero from './components/Hero';
import Comparison from './components/Comparison';
import TechnicalDeepDive from './components/TechnicalDeepDive';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Comparison />
      <TechnicalDeepDive />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
