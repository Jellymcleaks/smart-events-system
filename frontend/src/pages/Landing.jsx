import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Users,
  BarChart3,
  Sparkles,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

/**
 * Landing Page - Professional Modern Design
 */
export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full mix-blend-screen filter blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/15 rounded-full mix-blend-screen filter blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl animate-float"
          style={{ animationDelay: "-4s" }}
        />
      </div>
      <div className="relative">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-float-in">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/40 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 backdrop-blur-md hover:bg-purple-500/20 transition cursor-pointer text-xs sm:text-sm">
              <Sparkles
                size={16}
                className="text-purple-400 animate-pulse flex-shrink-0"
              />
              <span className="text-purple-300 font-semibold">
                Next Generation Event Management
              </span>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Smart Event
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Management Platform
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed hover:text-gray-200 transition">
              Plan, predict, and optimize events with AI-powered analytics.
              Create stunning events and gain actionable insights.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
              {user ? (
                <>
                  <Link
                    to="/events"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition font-semibold text-sm sm:text-base md:text-lg shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/60 transform hover:scale-105 backdrop-blur-sm w-full xs:w-auto"
                  >
                    Browse Events
                    <ArrowRight className="ml-2" size={18} />
                  </Link>

                  {user.role === "organizer" && (
                    <Link
                      to="/create-event"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-md hover:from-white/15 hover:to-white/10 hover:border-purple-400/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 w-full xs:w-auto"
                    >
                      Create Event
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition font-semibold text-sm sm:text-base md:text-lg shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/60 transform hover:scale-105 backdrop-blur-sm w-full xs:w-auto"
                  >
                    Get Started
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center border-2 border-purple-400 text-purple-300 hover:bg-purple-400/10 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition font-semibold text-sm sm:text-base md:text-lg hover:border-purple-300 hover:text-purple-200 w-full xs:w-auto"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 pt-12 sm:pt-20 border-t border-purple-500/20">
              {[
                { number: "10K+", label: "Events Managed" },
                { number: "50K+", label: "Happy Users" },
                { number: "99.9%", label: "Uptime" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center group cursor-pointer transform hover:scale-110 transition"
                >
                  <p className="text-3xl md:text-4xl font-bold text-purple-400 group-hover:text-pink-400 transition">
                    {stat.number}
                  </p>
                  <p className="text-gray-400 mt-2 group-hover:text-purple-300 transition">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-24 lg:mt-32">
            {[
              {
                icon: <Zap size={32} />,
                title: "Smart Analytics",
                description:
                  "Real-time insights and attendance predictions with AI-powered recommendations",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Users size={32} />,
                title: "Easy Management",
                description:
                  "Create, manage, and track events all in one intuitive platform",
                color: "from-pink-500 to-purple-500",
              },
              {
                icon: <BarChart3 size={32} />,
                title: "Data Visualization",
                description:
                  "Beautiful dashboards with actionable insights and metrics",
                color: "from-purple-600 to-pink-600",
              },
              {
                icon: <Calendar size={32} />,
                title: "Smart Scheduling",
                description:
                  "Intelligent event scheduling with conflict detection",
                color: "from-pink-600 to-purple-600",
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Growth Tracking",
                description:
                  "Monitor event performance and audience growth over time",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Sparkles size={32} />,
                title: "Premium Features",
                description: "Advanced tools for professional event organizers",
                color: "from-pink-500 to-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative glass-card-hover p-6 sm:p-8 rounded-2xl transition duration-300 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden interactive-element h-full"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition duration-300`}
                />
                <div
                  className={`relative bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-4 inline-block group-hover:scale-110 transition flex-shrink-0`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-300 transition">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-200 transition">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 sm:mt-24 lg:mt-32 text-center px-3 xs:px-4 sm:px-6">
            <div className="glass-card hover:glass-card-hover backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 sm:p-8 md:p-12 transition transform hover:scale-105">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Transform Your Events?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 hover:text-gray-200 transition">
                Join thousands of event organizers using SmartEvents
              </p>
              {!user && (
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition font-semibold text-sm sm:text-base md:text-lg shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/60 transform hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
