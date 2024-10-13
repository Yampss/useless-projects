"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ExternalLink,
  Mail,
  Calendar,
  Phone,
  User,
  Menu,
  X,
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
import Logo from "@/assets/logo.png";
import WexronLogo from "@/assets/wexron.jpg";
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
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Component() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/tinkerhubmbcet",
      color: "bg-gradient-to-br from-purple-600 to-pink-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/tinkerhubmbcet",
      color: "bg-blue-600",
    },
  ];

  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const currentYear = new Date().getFullYear();

  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#000", "#0c111c", "#111827"]
  );

  return (
    <motion.div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0"></div>
      <div className="relative z-10">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-20"
        >
          <div className="container mx-auto p-4 flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Image
                src={image}
                alt="Tinkerhub Logo"
                width={80}
                height={80}
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
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-black/90 overflow-hidden"
              >
                {["home", "about", "contact"].map((tab) => (
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="block p-2"
                  >
                    <Button
                      variant="ghost"
                      className={`w-full text-left text-white hover:text-yellow-400 ${
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
          </AnimatePresence>
        </motion.header>

        <main className="container mx-auto px-4 pt-24">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-24"
              >
                <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
                  <div className="relative">
                    <Image
                      src={Logo}
                      alt="Useless Projects"
                      width={600}
                      height={300}
                      className="max-w-full h-auto rounded-lg mix-blend-difference"
                    />
                    {/* <div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-lg"
                    ></div> */}
                  </div>
                  <motion.p
                    className="text-xl text-white text-center max-w-2xl mb-4"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span
                      className="inline-block"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      ✨
                    </motion.span>{" "}
                    Tinkerhub MBCCET along with IEDC MBCCET organises{" "}
                    <motion.span
                      className="inline-block"
                      animate={{ rotate: [0, -5, 0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      ✨
                    </motion.span>
                  </motion.p>

                  <motion.p
                    className="text-3xl text-white text-center max-w-2xl font-bold"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    A first-of-a-kind, 18-hour make-a-thon for{" "}
                    <motion.span
                      className="text-yellow-400 inline-block"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      boundless creativity!
                    </motion.span>
                  </motion.p>
                </div>

                <AnimatedSection>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-700/50 transition-all duration-300 shadow-xl">
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

                <AnimatedSection className="space-y-8 mb-12">
                  <h2 className="text-4xl font-bold text-white text-center">
                    Why Participate ?
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 max-w-3xl mx-auto">
                    {[
                      {
                        icon: Zap,
                        text: "Experiment and learn without real-world constraints ",
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
                        className="flex items-center bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg"
                        whileHover={{ scale: 1.05, x: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <item.icon className="w-8 h-8 mr-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-lg">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatedSection>

                <motion.section
                  className="mb-12 p-8 rounded-2xl overflow-hidden relative bg-gray-800/50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative z-10">
                    <motion.h2
                      className="text-5xl font-extrabold mb-8 text-white text-center tracking-tight"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      Event Details
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <motion.div
                        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:bg-opacity-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar className="text-yellow-400 mb-4" size={36} />
                        <p className="text-2xl text-yellow-400 font-bold">
                          2nd - 3rd November
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:bg-opacity-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Clock className="text-yellow-400 mb-4" size={36} />
                        <p className="text-2xl text-yellow-400 font-bold">
                          2:00 PM - 8:00 AM
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:bg-opacity-20 md:col-span-2 lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Zap className="text-yellow-400 mb-4" size={36} />
                        <p className="text-2xl text-yellow-400 font-bold text-center">
                          18-hour Make-a-thon
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <div
                        onClick={() =>
                          window.open(
                            "hhttps://iedc.startupmission.in/",
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:bg-opacity-20"
                      >
                        <p className="text-lg text-yellow-400 mb-4 font-semibold">
                          Event Sponsor
                        </p>
                        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg mb-4">
                          <Link
                            href="https://iedc.startupmission.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className="text-3xl font-extrabold text-gray-800">
                              IEDC
                            </p>
                          </Link>
                        </div>
                        <p className="text-xl text-white font-semibold text-center">
                          Innovation and Entrepreneurship Development Centre -
                          MBCCET
                        </p>
                      </div>

                      <div
                        onClick={() =>
                          window.open(
                            "https://wexronhosting.com/",
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:bg-opacity-20"
                      >
                        <p className="text-lg text-yellow-400 mb-4 font-semibold">
                          Community Partner
                        </p>
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
                          <Link
                            href="https://wexronhosting.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={WexronLogo}
                              alt="Wexron Web Hosting Servies"
                              width={220}
                              height={80}
                              objectFit="contain"
                            />
                          </Link>
                        </div>
                        <p className="text-xl text-white font-semibold">
                          Wexron Web Hosting Services{" "}
                        </p>
                        <p>
                          {" "}
                          <a href="https://wexronhosting.com">
                            {" "}
                            www.wexronhosting.com
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.section>

                <AnimatedSection className="text-center">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                    >
                      <Link
                        href="https://noteforms.com/forms/useless-project-interest-form-mbccet-tinkerhub-fevn8t"
                        passHref
                      >
                        <Button
                          size="lg"
                          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50 relative overflow-hidden"
                        >
                          <motion.span
                            className="absolute inset-0 bg-white"
                            initial={{ x: "-100%", opacity: 0.5 }}
                            animate={{
                              x: isHovered ? "100%" : "-100%",
                              opacity: 0.5,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                          <Zap className="mr-2" />
                          Register Now!
                        </Button>
                      </Link>
                    </motion.div>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Alert
                            variant="default"
                            className="bg-yellow-500/10 border-yellow-500/50 text-yellow-500"
                          >
                            <Users className="h-4 w-4" />
                            <AlertTitle>Limited Spots Available!</AlertTitle>
                            <AlertDescription>
                              Only 100 registrations accepted. Act fast!
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.p
                      className="text-lg text-gray-300 text-center max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <motion.span
                        className="inline-block"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        🚀
                      </motion.span>{" "}
                      Don&apos;t miss out on this exciting opportunity to
                      showcase your creativity!
                      <br />
                      *Registration closes at 100 Participants
                    </motion.p>
                  </div>
                </AnimatedSection>
              </motion.div>
            )}

            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedSection className="space-y-8 text-gray-300">
                  <h2 className="text-5xl font-bold text-white mb-8">
                    About Useless Project
                  </h2>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-xl">
                    <p className="text-xl leading-relaxed mb-6">
                      Useless Project is an incredible opportunity to get your
                      hands dirty & tinker with ideas alongside thousands of
                      learners & makers. It&apos;s a safe & supportive space to
                      explore new technologies without worrying about real-world
                      relevance. This is a great platform for beginners and
                      experts alike to push the boundaries of their creativity
                      and create something for the sake of learning.
                    </p>
                    <p className="text-xl leading-relaxed">
                      It doesn&apos;t matter if it&apos;s practical or even
                      useful - what matters is the process, experimentation, and
                      fun that comes with it. Projects could range from quirky
                      to funny, serious to outrageous - what counts is the
                      effort and the creative spark.
                    </p>
                  </div>
                </AnimatedSection>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-12 p-8 bg-gray-900 rounded-lg shadow-2xl"
              >
                <motion.h2
                  className="text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Contact Us
                </motion.h2>

                <motion.p
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  For any queries, feel free to reach out to us!
                </motion.p>
                <div className="flex justify-center space-x-8 mb-12">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onHoverStart={() => setHoveredIcon(link.name)}
                      onHoverEnd={() => setHoveredIcon(null)}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 rounded-full transition-all duration-300 ${link.color}`}
                    >
                      <link.icon className="w-10 h-10 text-white" />
                    </motion.a>
                  ))}
                </div>

                <AnimatePresence>
                  {hoveredIcon && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-yellow-400 font-semibold"
                    >
                      Visit our {hoveredIcon} page
                    </motion.p>
                  )}
                </AnimatePresence>

                <Card className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm border-gray-700 text-white overflow-hidden">
                  <CardContent className="p-6">
                    <motion.h3
                      className="text-2xl font-bold mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      For more Information
                    </motion.h3>
                    <div className="space-y-4">
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <User className="w-6 h-6 mr-3 text-yellow-400" />
                        <span>Chriss Philip Saji</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      >
                        <Phone className="w-6 h-6 mr-3 text-yellow-400" />
                        <a
                          href="tel:+918826173157"
                          className="hover:text-yellow-400 transition-colors flex items-center"
                        >
                          +91 8826173157
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </motion.div>
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                      >
                        <Mail className="w-6 h-6 mr-3 text-yellow-400" />
                        <a
                          href="chrissattasseril16@gmail.com"
                          className="hover:text-yellow-400 transition-colors flex items-center"
                        >
                          chrissattasseril16@gmail.com
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </motion.div>
                      <motion.p
                        className="text-sm text-gray-400 mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                      >
                        TinkerHub MBCCET Campus Lead
                      </motion.p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-950 py-8 mt-16"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold text-yellow-400 mb-4"
              >
                Useless Projects
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-2"
              >
                Build literally anything - imagination is your limit.
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm"
              >
                &copy; {currentYear} TinkerHub MBCCET. All rights reserved.
              </motion.p>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
}
