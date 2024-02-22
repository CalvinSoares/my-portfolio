"use client";
import React, { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectTag from './ProjectTag';
import { motion, useInView } from 'framer-motion';

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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    const filteredProjects = projectData.filter((project) => 
        project.tag.includes(tag)
    );

    const cardVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1},
    }

  return (
    <section id="Projects" className='flex flex-col justify-center  m-2'>
      <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12'>
        My Projects
      </h2>
      <div className='text-white flex flex-row justify-center items-center gap-2 py-6'>
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
      <ul  ref={ref} className='grid md:grid-cols-3 gap-8 md:gap-12 cursor-pointer'>
        {filteredProjects.map((project, index) => 
            <motion.li 
            key={index}
            variants={cardVariants} 
            initial="initial" 
            animate={isInView ? "animate" : "inicial"}
            transition={{ duration: 0.3, delay: index * 0.4 }} 
            >
                <ProjectCard 
                    key={project.id} 
                    title={project.title}
                    description={project.description} 
                    imgUrl={project.image} 
                    tags={project.tag}
                    gitUrl={project.gitUrl}
                    previewUrl={project.previewUrl}
                />
            </motion.li>
        )}
      </ul>
    </section>
  )
}
