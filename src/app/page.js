import Image from "next/image";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] container mx-auto px-12 py-4 ">
      <NavBar />
      <div className="container mt-24 mx-auto px-12 py-12">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </div>         
    </main>
  );
}
