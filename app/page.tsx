"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Globe } from "@/components/magicui/globe";
import { StatusBadge } from "@/components/ui/status-badge";
import { Code2, Mail, Github, Linkedin, Moon, Sun, Home as HomeIcon, FolderGit2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import Ability from '@/components/ui/skills';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Memoize projects data
  const projects = useMemo(() => [
    {
      title: 'Ensina+',
      description: 'Ensina+ is a digital educational platform developed for students of the SESI-SP network',
      image: 'https://raw.githubusercontent.com/caio-pellegrini/ensina-mais/main/.github/images/login.jpg',
      tech: ['PhP', 'Laravel', 'Tailwind CSS'],
      demo: '#',
      repo: 'https://github.com/caio-pellegrini/ensina-mais',
    },
    {
      title: 'Next Store',
      description: 'Computer peripherals e-commerce',
      image: '/project2.png',
      tech: ['React', 'Next.js', 'Prisma', 'Tailwind CSS'],
      demo: 'https://next-store-virid.vercel.app/',
      repo: 'https://github.com/GabrielSakoda/next-store',
    },
    {
      title: 'Hermann',
      description: 'Luxury car dealership website',
      image: '/project3.png',
      tech: ['JavaScript', 'Tailwind CSS'],
      demo: 'https://projeto-hermann-i7fh7dxc3-gabriel-sakodas-projects.vercel.app/',
      repo: 'https://github.com/GabrielSakoda/Projeto---Hermann',
    },
  ], []);

  // Memoize contacts data
  const contacts = useMemo(() => [
    { 
      icon: <Mail className="w-8 h-8" />, 
      label: 'Email',
      title: "Let's talk",
      description: "Send me an email",
      href: 'mailto:otanigabriel0@gmail.com?subject=Contact from Portfolio&body=Hi Gabriel,' 
    },
    { 
      icon: <Github className="w-8 h-8" />, 
      label: 'GitHub',
      title: "Check my code",
      description: "See my open source projects",
      href: 'https://github.com/GabrielSakoda' 
    },
    { 
      icon: <Linkedin className="w-8 h-8" />, 
      label: 'LinkedIn',
      title: "Let's connect",
      description: "Follow my professional journey",
      href: 'https://www.linkedin.com/in/gabriel-otani-sakoda-44018a28b/' 
    },
  ], []);

  // Memoize NAV_ITEMS
  const NAV_ITEMS = useMemo(() => [
    { id: 'hero', label: 'Home', icon: HomeIcon },
    { id: 'technologies', label: 'Tech', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ], []);

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const sections = ['hero', 'technologies', 'projects', 'contact'];
    
    if (window.scrollY < 100) {
      setActiveSection('hero');
      return;
    }

    const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (isNearBottom) {
      setActiveSection('contact');
      return;
    }

    const current = sections.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementHeight = rect.height;
        const elementMiddle = rect.top + elementHeight / 2;
        return Math.abs(elementMiddle - window.innerHeight / 2) < elementHeight / 2;
      }
      return false;
    });
    
    if (current) {
      setActiveSection(current);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Optimize theme toggle handler
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Optimize scroll to section handler
  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  // Add email handler
  const handleEmailClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = 'otanigabriel0@gmail.com';
    const subject = 'Contact from Portfolio';
    const body = 'Hi Gabriel,';
    
    // Try to open mail client
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Fallback for mobile devices
    setTimeout(() => {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }, 300);
  }, []);

  if (!mounted) return null;

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'} text-foreground overflow-hidden`}>
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-start"
          >
            <StatusBadge />
          </motion.div>

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mt-12">
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-4xl md:text-5xl font-bold leading-tight ${theme === 'dark' ? 'text-foreground' : 'text-gray-900'}`}
              >
                Hi, I'm Gabriel Sakoda <motion.span
                  animate={{
                    rotate: [0, 14, -8, 14, -4, 10, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  style={{ display: "inline-block", originX: 0.7, originY: 0.7 }}
                >
                  👋
                </motion.span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-xl md:text-2xl mt-4 ${theme === 'dark' ? 'text-muted-foreground' : 'text-gray-700'}`}
              >
                <AuroraText>Full-stack Developer</AuroraText>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`mt-6 md:mt-8 text-lg md:text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} max-w-2xl mx-auto md:mx-0`}
              >
                I'm a passionate developer dedicated to crafting effective solutions and intuitive interfaces.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-shrink-0 -mt-0 md:-mt-8"
            >
              <Avatar className={`w-32 h-32 md:w-48 md:h-48 rounded-full border-4 ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                <AvatarImage 
                  src="https://github.com/gabrielsakoda.png" 
                  alt="Gabriel Sakoda"
                  loading="eager"
                  fetchPriority="high"
                />
                <AvatarFallback>GS</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="technologies" className="py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Skills
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Ability />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${theme === 'dark' ? 'text-foreground' : 'text-gray-900'}`}
          >
            Projects
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group h-[450px] md:h-[500px]"
              >
                <div
                  className={`${theme === 'dark' ? 'bg-card/30' : 'bg-white'} shadow-lg backdrop-blur-sm overflow-hidden rounded-xl h-full flex flex-col`}
                >
                  <BorderBeam size={100} duration={8} delay={3} />
                  <BorderBeam duration={8} size={100} />
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    <div className="overflow-hidden h-40 md:h-48 relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading={index <= 1 ? "eager" : "lazy"}
                        quality={85}
                      />
                    </div>
                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-lg md:text-xl font-bold mb-2 ${theme === 'dark' ? 'text-foreground' : 'text-gray-900'}`}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`mb-4 text-sm md:text-base line-clamp-3 ${theme === 'dark' ? 'text-muted-foreground' : 'text-gray-700'}`}
                      >
                        {project.description}
                      </motion.p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -2 }}
                            transition={{ delay: 0.4 + techIndex * 0.1 }}
                            className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                              theme === 'dark' ? 'bg-secondary/50 text-foreground backdrop-blur-sm' : 'bg-gray-100 text-gray-800 backdrop-blur-sm'
                            }`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex space-x-4 mt-auto">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm md:text-base transition-colors ${
                            theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          Live Demo
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm md:text-base transition-colors ${
                            theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          Repository
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-center mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}
          >
            I'm always open to new opportunities and collaborations. Feel free to reach out through any of these channels.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`${
                  theme === 'dark' ? 'bg-card hover:bg-card/80' : 'bg-white hover:bg-white/90'
                } p-4 md:p-6 rounded-lg text-center transition-all backdrop-blur-sm relative overflow-hidden shadow-lg`}
                href={contact.href}
                onClick={contact.label === 'Email' ? handleEmailClick : undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BorderBeam duration={8} size={100} />
                <BorderBeam duration={8} delay={3} size={100} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                  className={`inline-block p-2 md:p-3 rounded-full ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'} mb-3 md:mb-4`}
                >
                  {contact.icon}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className={`text-lg md:text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                >
                  {contact.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  className={`text-sm md:text-base ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}
                >
                  {contact.description}
                </motion.p>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Navigation Bar */}
      <div className="fixed bottom-4 left-0 inset-x-0 right-0 mx-auto z-30 flex justify-center">
        <TooltipProvider>
          <Dock className={`${theme === 'dark' ? 'bg-black/20' : 'bg-white/70'} shadow-lg scale-90 md:scale-100`}>
            {NAV_ITEMS.map((item) => (
              <DockIcon key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-4 rounded-full",
                        theme === 'dark' 
                          ? (activeSection === item.id ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/10")
                          : (activeSection === item.id ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")
                      )}
                      aria-label={item.label}
                    >
                      <item.icon className="size-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className={theme === 'dark' ? 'bg-black/80 text-white' : 'bg-white text-gray-900 shadow-lg'}>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            <Separator orientation="vertical" className={`h-full ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleTheme}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full",
                      theme === 'dark' 
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent className={theme === 'dark' ? 'bg-black/80 text-white' : 'bg-white text-gray-900 shadow-lg'}>
                  <p>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
    </main>
  );
}