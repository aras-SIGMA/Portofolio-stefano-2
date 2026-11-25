import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import GithubStats from "./components/GithubStats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default function App() {
  // Halaman di-mount setelah loading screen selesai,
  // supaya entrance animation hero terpasang tepat saat tirai terangkat.
  const [ready, setReady] = useState(false);

  return (
    <div className="min-h-screen scroll-smooth pt-16">
      <Loader onDone={() => setReady(true)} />
      {ready && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Certifications />
            <GithubStats />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
