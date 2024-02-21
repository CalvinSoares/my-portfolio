"use client";
import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag';

const projectData = [
    {
        id: 1,
        title: "React Notes Web Site",
        description: "creation of notes",
        image: "/images/projects/duNotes.png",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/CalvinSoares/DuNotes",
        previewUrl: "https://du-notes.vercel.app/",
    },
    {
        id: 2,
        title: "EiCode Web Site",
        description: "EiCode portfolio",
        image: "/images/projects/eicodee.png",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/CalvinSoares/EiCodeWebSite",
        previewUrl: "https://eicodee.com/",
    },
    {
        id: 3,
        title: "Search Game",
        description: "word search app",
        image: "/images/projects/searchGame.png",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/CalvinSoares/word-search-game",
        previewUrl: "/",
    }
];


export default function ProjectsSection() {
    const [tag, setTag] = useState("All");

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    const filteredProjects = projectData.filter((project) => 
        project.tag.includes(tag)
    );

  return (
    <section id="projects">
      <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12'>
        My Projects
      </h2>
      <div className='text-white flex flex-row justify-center items-center  gap-2 py-6'>
            <ProjectTag 
            onClick={handleTagChange} 
            name="All" 
            isSelected={tag == "All"} 
            />
            <ProjectTag 
            onClick={handleTagChange} 
            name="Web" 
            isSelected={tag == "Web"} 
            />
            <ProjectTag 
            onClick={handleTagChange} 
            name="Mobile" 
            isSelected={tag == "Mobile"} 
            />
      </div>  
      <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
        {filteredProjects.map((project) => 
            <ProjectCard 
                key={project.id} 
                title={project.title}
                description={project.description} 
                imgUrl={project.image} 
                tags={project.tag}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
            />
        )}
      </div>
    </section>
  )
}
