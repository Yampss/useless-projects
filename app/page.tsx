"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Menu,
  Clock,
  Award,
  Users,
  Zap,
  Lightbulb,
  Trophy,
  Coffee,
  Instagram,
  Linkedin,
} from "lucide-react";
import image from "@/assets/TinkerHub_MBCCET Peermade.png";
function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative z-10">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-20"
        >
          <div className="container mx-auto p-4 flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Image
                src={image}
                alt="Tinkerhub Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {["home", "about", "contact"].map((tab) => (
                <motion.div
                  key={tab}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="inline-block"
                >
                  <Button
                    variant="ghost"
                    className={`text-white hover:text-yellow-400 ${
                      activeTab === tab ? "bg-gray-800" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden text-white"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-black/90 p-4"
            >
              {["home", "about", "contact"].map((tab) => (
                <motion.div
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block mb-2"
                >
                  <Button
                    variant="ghost"
                    className={`w-full text-white hover:text-yellow-400 ${
                      activeTab === tab ? "bg-gray-800" : ""
                    }`}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMenuOpen(false);
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </motion.header>
        <main className="container mx-auto px-4 pt-24">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-24"
              >
                <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-09-16%20at%2006.03.40_f2644ae0-cIbp4zgJaFke7yytmXp1Ms9FaVShAg.jpg"
                      alt="Useless Projects"
                      width={600}
                      height={300}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                  </motion.div>
                  <motion.p
                    className="text-2xl mt-8 text-white text-center max-w-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    A first-of-a-kind, 18-hour make-a-thon for boundless
                    creativity!
                  </motion.p>
                </div>

                <AnimatedSection>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {[
                      {
                        icon: Clock,
                        title: "18-Hour Challenge",
                        description:
                          "Build literally anything - imagination is your limit.",
                      },
                      {
                        icon: Award,
                        title: "Get Recognized",
                        description:
                          "Showcase projects to 10,000+ makers and win cash awards!",
                      },
                      {
                        icon: Users,
                        title: "Peer Support",
                        description:
                          "Join a 15,000+ strong community of learners and makers.",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors duration-300">
                          <CardContent className="p-6">
                            <item.icon className="w-12 h-12 mb-4 mx-auto text-yellow-400" />
                            <h3 className="text-xl font-semibold mb-2 text-white">
                              {item.title}
                            </h3>
                            <p className="text-gray-300">{item.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection className="space-y-4 mb-12">
                  <h2 className="text-3xl font-bold text-white text-center">
                    Why Participate?
                  </h2>
                  <ul className="list-none space-y-2 text-gray-300 max-w-md mx-auto">
                    {[
                      {
                        icon: Zap,
                        text: "Experiment and learn without real-world constraints",
                      },
                      {
                        icon: Lightbulb,
                        text: "Perfect nudge to start your maker journey",
                      },
                      {
                        icon: Trophy,
                        text: "Monthly scholarships for top builders",
                      },
                      {
                        icon: Coffee,
                        text: "Snacks will be provided to fuel your creativity!",
                      },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        whileHover={{ scale: 1.05, x: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <item.icon className="w-6 h-6 mr-2 text-yellow-400 flex-shrink-0" />
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatedSection>

                <AnimatedSection className="mb-12 text-center">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Event Details
                  </h2>
                  <p className="text-xl text-gray-300">
                    Dates: 2nd November 2pm to 3rd November 8am
                  </p>
                </AnimatedSection>

                <AnimatedSection className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="https://noteforms.com/forms/useless-project-interest-form-mbccet-tinkerhub-fevn8t"
                      passHref
                    >
                      <Button
                        size="lg"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition-transform hover:scale-105"
                      >
                        Register Now!
                      </Button>
                    </Link>
                  </motion.div>
                  <p className="mt-4 text-sm text-gray-300">
                    Hurry! Registration closes after the first 100 people.
                  </p>
                </AnimatedSection>
              </motion.div>
            )}

            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedSection className="space-y-8 text-gray-300">
                  <h2 className="text-4xl font-bold text-white">
                    About Useless Project
                  </h2>
                  <p className="text-lg">
                    Useless Project is an incredible opportunity to get your
                    hands dirty & tinker with ideas alongside thousands of
                    learners & makers. It&apos;s a safe & supportive space to
                    explore new technologies without worrying about real-world
                    relevance. This is a great platform for beginners and
                    experts alike to push the boundaries of their creativity and
                    create something for the sake of learning.
                  </p>
                  <p className="text-lg">
                    It doesn&apos;t matter if it&apos;s practical or even useful
                    - what matters is the process, experimentation, and fun that
                    comes with it. Projects could range from quirky to funny,
                    serious to outrageous - what counts is the effort and the
                    creative spark.
                  </p>
                </AnimatedSection>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <AnimatedSection>
                  <h2 className="text-3xl font-bold text-white">Contact Us</h2>
                  <p className="text-lg text-gray-300">
                    For any queries or sponsorship opportunities, feel free to
                    reach out to us!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://instagram.com/tinkerhubmbcet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400"
                    >
                      <Instagram className="w-8 h-8" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://linkedin.com/in/tinkerhubmbcet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400"
                    >
                      <Linkedin className="w-8 h-8" />
                    </motion.a>
                  </div>
                </AnimatedSection>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
