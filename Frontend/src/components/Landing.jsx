import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Users,
  Brain,
  BarChart3,
  Shield,
  Calendar,
  ArrowRight,
  Star,
  Zap,
  Target,
  Code,
  Bot,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  };

  const handleGetStarted = () => {
    const token = getCookie("token"); // cookie name
    navigate(token ? "/profile" : "/login");
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Driven Task Categorization",
      description:
        "Automatically classify tasks as Bug, Feature, or Extension using advanced NLP",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Developer Performance Ratings",
      description:
        "AI-powered performance scoring based on completion time, accuracy, and quality",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Role-Based Access Control",
      description:
        "Secure task management with Admin, Manager, and Developer permissions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Interactive Kanban Interface",
      description:
        "Smooth drag-and-drop functionality for real-time task management",
      color: "from-orange-500 to-red-500",
    },
  ];

  const technologies = [
    { name: "React.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "Langchain", category: "AI/ML" },
    { name: "Express.js", category: "Backend" },
    { name: "JWT", category: "Auth" },
  ];

  const phases = [
    { phase: "Phase 1", title: "Architecture & Design", status: "completed" },
    { phase: "Phase 2", title: "Authentication & RBAC", status: "in-progress" },
    { phase: "Phase 3", title: "AI Integration", status: "upcoming" },
    { phase: "Phase 4", title: "Frontend Enhancement", status: "upcoming" },
    { phase: "Phase 5", title: "Testing & Optimization", status: "upcoming" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">


      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TaskPilot
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="hover:text-purple-300 transition-colors"
            >
              Features
            </a>
            <a
              href="#technology"
              className="hover:text-purple-300 transition-colors"
            >
              Technology
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Agile Kanban
              </span>
              <br />
              <span className="text-white">with Smart AI Insights</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionize your project management with AI-powered task
              categorization, performance analytics, and intelligent workflow
              optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started <ArrowRight className="inline ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Intelligent Features
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${
                  currentFeature === index
                    ? "ring-2 ring-purple-500/50 scale-105"
                    : ""
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 mx-auto`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section
        id="technology"
        className="relative z-10 px-6 py-20 bg-slate-800/20"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Built with Modern Tech
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm border border-slate-600/30 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="text-sm text-cyan-300 mb-1">
                  {tech.category}
                </div>
                <div className="font-semibold">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Modes */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Future Workflow Modes
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-400/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-orange-400 mr-3" />
                <h3 className="text-2xl font-bold text-orange-300">
                  Project Mode
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Long-term project tracking with comprehensive task records,
                progress monitoring, and resource allocation insights for
                managers and stakeholders.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold text-green-300">
                  Sprint Mode
                </h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Sprint-focused task management with automatic task carryover,
                ensuring continuous progress tracking and agile workflow
                optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Meet the Team
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Shriya Seth", id: "2210992353" },
              { name: "Akshit", id: "2210990090" },
              { name: "Aman Singh", id: "2210990098" },
              { name: "Kartikey Bartwal", id: "2210990492" },
            ].map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.id}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 TaskPilot - Bachelor of Engineering Project in Computer
            Science and Engineering
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Chitkara University, Punjab, India
          </p>
        </div>
      </footer>
    </div>
  );
}
