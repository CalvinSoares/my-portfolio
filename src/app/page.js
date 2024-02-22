import { React } from 'react'
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import FooterSection from "./components/FooterSection";


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col bg-[#121212] container mx-auto px-12 py-4 ">
      <NavBar />
      <div className="container mt-24 mx-auto px-12 py-12">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection /> 
      </div>   
        <FooterSection />  
    </main>
  );
}
