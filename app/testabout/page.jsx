"use client";
import React, { useState, useEffect } from "react";
import {
  User, Scale, Anchor, Rocket, Leaf, Target, Zap,
  HeartHandshake, Building, Linkedin, Mail, Twitter,
  Github, Palette, Code, PenTool, Megaphone, Users, Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Icon map (matches icon names stored in DB) ───────────────────────────────
const ICON_MAP = {
  User, Scale, Anchor, Rocket, Leaf, Target, Zap, HeartHandshake,
  Building, Palette, Code, PenTool, Megaphone, Users, Shield,
};
const resolveIcon = (name) => ICON_MAP[name] || User;

// ─── ValueCard ────────────────────────────────────────────────────────────────
const ValueCard = React.memo(({ icon: Icon, title, description, index }) => (
  <div
    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 animate-fade-in-up group h-full flex flex-col"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="w-12 h-12 rounded-lg border-2 border-orange-500 flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
      <Icon className="w-6 h-6 text-orange-500" strokeWidth={2} />
    </div>
    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2 min-h-14 flex items-center">
      {title}
    </h3>
    <p className="text-slate-300 leading-relaxed text-sm group-hover:text-slate-200 transition-colors duration-300 grow line-clamp-4">
      {description}
    </p>
  </div>
));

// ─── TeamMember ───────────────────────────────────────────────────────────────
const TeamMember = React.memo(({ member, index, level = 0 }) => {
  const getBorderColor = () => {
    switch (level) {
      case 0: return "group-hover:border-orange-500/70";
      case 1: return "group-hover:border-blue-500/70";
      case 2: return "group-hover:border-emerald-500/70";
      default: return "group-hover:border-orange-500/50";
    }
  };
  const getGlowColor = () => {
    switch (level) {
      case 0: return "from-orange-500/5 via-orange-500/10 to-orange-500/5";
      case 1: return "from-blue-500/5 via-blue-500/10 to-blue-500/5";
      case 2: return "from-emerald-500/5 via-emerald-500/10 to-emerald-500/5";
      default: return "from-orange-500/5 via-orange-500/10 to-orange-500/5";
    }
  };
  const getBadgeColor = () => {
    switch (level) {
      case 0: return "bg-orange-500";
      case 1: return "bg-blue-500";
      case 2: return "bg-emerald-500";
      default: return "bg-orange-500";
    }
  };
  const getRoleColor = () => {
    switch (level) {
      case 0: return "text-orange-500";
      case 1: return "text-blue-500";
      case 2: return "text-emerald-500";
      default: return "text-orange-500";
    }
  };

  const IconComponent = resolveIcon(member.icon);

  return (
    <div
      className={`group relative bg-linear-to-b from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50 ${getBorderColor()} transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl animate-fade-in-up flex flex-col items-center text-center h-full`}
      style={{ animationDelay: `${1200 + index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-linear-to-r ${getGlowColor()} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`} />

      {level !== 1 && (
        <div className="absolute top-4 right-4">
          <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor()}`}>
            {level === 0 ? "Co-Founder" : "Team"}
          </div>
        </div>
      )}

      {/* Avatar */}
      <div className="relative mb-6 z-10">
        <div className="w-32 h-32 rounded-full border-4 border-slate-700 group-hover:border-opacity-50 transition-all duration-500 overflow-hidden bg-linear-to-br from-slate-700 to-slate-800">
          {member.avatar_url ? (
            <Image
              src={member.avatar_url}
              alt={member.name}
              width={128}
              height={128}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-16 h-16 text-slate-400" />
            </div>
          )}
        </div>
        <div className={`absolute -bottom-2 -right-2 w-10 h-10 ${getBadgeColor()} rounded-full flex items-center justify-center border-2 border-slate-900`}>
          <IconComponent className="w-5 h-5 text-white" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors duration-300 z-10">{member.name}</h3>
      <p className={`${getRoleColor()} font-medium mb-3 z-10`}>{member.role}</p>
      <p className="text-slate-300 text-sm mb-6 leading-relaxed z-10">{member.bio}</p>

      {member.department && (
        <div className="mb-4 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
          <span className="text-xs text-slate-300">{member.department}</span>
        </div>
      )}

      {/* Social links */}
      <div className="flex gap-3 mt-auto z-10">
        {member.social_linkedin && (
          <a href={member.social_linkedin} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:transform hover:scale-110 transition-all duration-300 group/link">
            <Linkedin className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors" />
          </a>
        )}
        {member.social_twitter && (
          <a href={member.social_twitter} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:transform hover:scale-110 transition-all duration-300 group/link">
            <Twitter className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors" />
          </a>
        )}
        {member.social_github && (
          <a href={member.social_github} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:transform hover:scale-110 transition-all duration-300 group/link">
            <Github className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors" />
          </a>
        )}
        {member.social_email && (
          <a href={`mailto:${member.social_email}`}
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:transform hover:scale-110 transition-all duration-300 group/link">
            <Mail className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors" />
          </a>
        )}
      </div>
    </div>
  );
});
TeamMember.displayName = "TeamMember";

// ─── About Section ────────────────────────────────────────────────────────────
export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [teamHierarchy, setTeamHierarchy] = useState([
    { level: 0, title: "Founders & Leadership", members: [] },
    { level: 1, members: [] },
    { level: 2, title: "Team Members", members: [] },
  ]);

  useEffect(() => {
    Promise.resolve().then(() => setIsVisible(true));

    // Fetch active team members from API
    fetch("http://localhost/gr8/api/team/getTeam.php?active=1")
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        // Group into the same hierarchy structure
        setTeamHierarchy([
          { level: 0, title: "Founders & Leadership", members: data.filter(m => m.level === 0) },
          { level: 1, members: data.filter(m => m.level === 1) },
          { level: 2, title: "Team Members",          members: data.filter(m => m.level === 2) },
        ]);
      })
      .catch(console.error);
  }, []);

  const values = [
    { icon: User,          title: "Customer Focus",  description: "We actively listen to, understand, and prioritize the unique needs of our clients, tenants, and users, ensuring exceptional service and customized solutions." },
    { icon: Scale,         title: "Integrity",       description: "We conduct business with honesty, ethics, and transparency, earning trust through consistent and responsible actions." },
    { icon: Anchor,        title: "Reliability",     description: "We provide reliable services both digital and physical that clients and tenants can trust." },
    { icon: Rocket,        title: "Innovation",      description: "We consistently embrace new technologies and innovative strategies to enhance property operations and digital experiences." },
    { icon: Leaf,          title: "Sustainability",  description: "We are committed to environmentally responsible practices and sustainable solutions for long-term success." },
    { icon: Target,        title: "Excellence",      description: "We strive for the highest standards in all our services, continuously improving and delivering quality results." },
    { icon: Zap,           title: "Efficiency",      description: "We optimize processes and leverage technology to deliver fast, effective solutions without compromising quality." },
    { icon: HeartHandshake,title: "Partnership",     description: "We build long-term relationships based on mutual trust, collaboration, and shared success with our clients." },
    { icon: Building,      title: "Growth",          description: "We foster continuous growth and development for our company, clients, and community through innovative solutions." },
  ];

  return (
    <section className="bg-[#101820] py-20 px-6 relative overflow-hidden lg:pt-32">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-slate-700/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in">ABOUT US</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white animate-fade-in-up" style={{ animationDelay: "200ms" }}>Get to Know Us</h1>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <h2 className="text-3xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: "400ms" }}>Our Story</h2>
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                GR8 Private Limited is a premier digital agency specializing in comprehensive digital solutions including website development, digital marketing, SEO, software development, and creative design services.
              </p>
              <p className="text-slate-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: "600ms" }}>
                Founded with a vision to empower businesses in the digital age, we combine cutting-edge technology with creative excellence to deliver measurable results and exceptional digital experiences for our clients.
              </p>
            </div>
          </div>
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30 hover:border-orange-500/30 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
              <p className="text-slate-300 leading-relaxed">
                We bridge the gap between business goals and digital success through our comprehensive suite of services: from responsive website development and e-commerce solutions to strategic digital marketing campaigns, SEO optimization, social media management, and custom software applications.
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30 hover:border-orange-500/30 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
              <p className="text-slate-300 leading-relaxed">
                Our expertise extends to UI/UX design, content marketing, PPC advertising, analytics, and mobile app development. We stay ahead of digital trends to incorporate emerging technologies like AI-driven marketing automation, progressive web apps, and data-driven SEO strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className={`text-center mb-12 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in">OUR TEAM</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in-up" style={{ animationDelay: "900ms" }}>Meet Our Leadership & Team</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mt-4 animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
              A hierarchical structure of experts driving innovation and excellence across all departments.
            </p>
          </div>

          {teamHierarchy.map((levelGroup, groupIndex) =>
            levelGroup.members.length === 0 ? null : (
              <div key={groupIndex} className="mb-16 last:mb-0">
                {levelGroup.title && (
                  <h3 className={`text-2xl font-bold mb-8 text-center ${
                    levelGroup.level === 0 ? "text-orange-400" : levelGroup.level === 1 ? "text-blue-400" : "text-emerald-400"
                  }`}>
                    {levelGroup.title}
                  </h3>
                )}
                <div className={`grid gap-8 ${
                  levelGroup.level === 0
                    ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
                    : levelGroup.level === 1
                      ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}>
                  {levelGroup.members.map((member, index) => (
                    <TeamMember key={member.id} member={member} index={index} level={levelGroup.level} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Values Grid */}
        <div className="mb-12">
          <div className={`text-center mb-12 transition-all duration-1000 delay-1100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in">OUR VALUES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in-up" style={{ animationDelay: "1200ms" }}>What Drives Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="group h-full border">
                <ValueCard icon={value.icon} title={value.title} description={value.description} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-1300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="bg-linear-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join numerous clients who trust GR8 Private Limited for innovative digital solutions and exceptional property management services.
            </p>
            <Link href="/contact/" className="px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float { 0%,100%{transform:translateY(0) scale(1);opacity:.05}50%{transform:translateY(-15px) scale(1.03);opacity:.08} }
        @keyframes fadeIn { from{opacity:0}to{opacity:1} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
        .animate-float{animation:float 8s ease-in-out infinite}
        .animate-float-delayed{animation:float 8s ease-in-out infinite;animation-delay:3s}
        .animate-fade-in{animation:fadeIn 1s ease-out forwards}
        .animate-fade-in-up{animation:fadeInUp .8s ease-out forwards;opacity:0;animation-fill-mode:both}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-4{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>
    </section>
  );
}