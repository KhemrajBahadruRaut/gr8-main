"use client"
import React, { useState, useEffect } from 'react';
import { User, Scale, Anchor, Rocket, Leaf, Target, Zap, HeartHandshake, Building, Linkedin, Mail, Twitter, Github, Palette, Code, PenTool, Megaphone, Users,  Shield, } from 'lucide-react';
import Image from 'next/image';

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

const TeamMember = React.memo(({ member, index, level = 0 }) => {
  const getBorderColor = () => {
    switch (level) {
      case 0: // Founders/CEO
        return 'group-hover:border-orange-500/70';
      case 1: // Department Heads
        return 'group-hover:border-blue-500/70';
      case 2: // Team Members
        return 'group-hover:border-emerald-500/70';
      default:
        return 'group-hover:border-orange-500/50';
    }
  };

  const getGlowColor = () => {
    switch (level) {
      case 0:
        return 'from-orange-500/5 via-orange-500/10 to-orange-500/5';
      case 1:
        return 'from-blue-500/5 via-blue-500/10 to-blue-500/5';
      case 2:
        return 'from-emerald-500/5 via-emerald-500/10 to-emerald-500/5';
      default:
        return 'from-orange-500/5 via-orange-500/10 to-orange-500/5';
    }
  };

  const getBadgeColor = () => {
    switch (level) {
      case 0:
        return 'bg-orange-500';
      case 1:
        return 'bg-blue-500';
      case 2:
        return 'bg-emerald-500';
      default:
        return 'bg-orange-500';
    }
  };

  const getRoleColor = () => {
    switch (level) {
      case 0:
        return 'text-orange-500';
      case 1:
        return 'text-blue-500';
      case 2:
        return 'text-emerald-500';
      default:
        return 'text-orange-500';
    }
  };

  return (
    <div 
      className={`group relative bg-linear-to-b from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50 ${getBorderColor()} transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl animate-fade-in-up flex flex-col items-center text-center h-full`}
      style={{ animationDelay: `${1200 + index * 100}ms` }}
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 bg-linear-to-r ${getGlowColor()} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`}></div>
      
      {/* Level indicator */}
      <div className="absolute top-4 right-4">
        <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor()}`}>
          {level === 0 ? 'Leadership' : level === 1 ? 'Management' : 'Team'}
        </div>
      </div>

      {/* Avatar container */}
      <div className="relative mb-6 z-10">
        <div className="w-32 h-32 rounded-full border-4 border-slate-700 group-hover:border-opacity-50 transition-all duration-500 overflow-hidden bg-linear-to-br from-slate-700 to-slate-800">
          {member.avatar ? (
            <Image
              src={member.avatar}
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
          <member.icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Member info */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors duration-300 z-10">
        {member.name}
      </h3>
      <p className={`${getRoleColor()} font-medium mb-3 z-10`}>{member.role}</p>
      <p className="text-slate-300 text-sm mb-6 leading-relaxed z-10 line-clamp-3">
        {member.bio}
      </p>

      {/* Department/Team */}
      {member.department && (
        <div className="mb-4 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
          <span className="text-xs text-slate-300">{member.department}</span>
        </div>
      )}

      {/* Social links */}
      <div className="flex gap-3 mt-auto z-10">
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:transform hover:scale-110 transition-all duration-300 group/link"
          >
            <Linkedin className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors" />
          </a>
        )}
        {member.social.twitter && (
          <a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:transform hover:scale-110 transition-all duration-300 group/link"
          >
            <Twitter className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors" />
          </a>
        )}
        {member.social.github && (
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:transform hover:scale-110 transition-all duration-300 group/link"
          >
            <Github className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors" />
          </a>
        )}
        {member.social.email && (
          <a
            href={`mailto:${member.social.email}`}
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:transform hover:scale-110 transition-all duration-300 group/link"
          >
            <Mail className="w-5 h-5 text-slate-400 group-hover/link:text-white transition-colors" />
          </a>
        )}
      </div>
    </div>
  );
});

TeamMember.displayName = 'TeamMember';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsVisible(true));
  }, []);

  const values = [
        {
      icon: User,
      title: "Customer Focus",
      description: "We actively listen to, understand, and prioritize the unique needs of our clients, tenants, and users, ensuring exceptional service and customized solutions."
    },
    {
      icon: Scale,
      title: "Integrity",
      description: "We conduct business with honesty, ethics, and transparency, earning trust through consistent and responsible actions."
    },
    {
      icon: Anchor,
      title: "Reliability",
      description: "We provide reliable services both digital and physical that clients and tenants can trust."
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "We consistently embrace new technologies and innovative strategies to enhance property operations and digital experiences."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We are committed to environmentally responsible practices and sustainable solutions for long-term success."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in all our services, continuously improving and delivering quality results."
    },
    {
      icon: Zap,
      title: "Efficiency",
      description: "We optimize processes and leverage technology to deliver fast, effective solutions without compromising quality."
    },
    {
      icon: HeartHandshake,
      title: "Partnership",
      description: "We build long-term relationships based on mutual trust, collaboration, and shared success with our clients."
    },
    {
      icon: Building,
      title: "Growth",
      description: "We foster continuous growth and development for our company, clients, and community through innovative solutions."
    }
  ];

  // Hierarchical Team Structure
  const teamHierarchy = [
    // Level 0: Founders & Leadership
    {
      level: 0,
      title: "Founders & Leadership",
      members: [
        {
          name: "Sujata Tamrakar",
          role: "Founder",
          bio: "Visionary leader with 15+ years of experience in real estate technology and digital transformation. Drives company strategy and innovation.",
          icon: Rocket,
          avatar: "/team/s.png",
          department: "Founder",
          social: {
            linkedin: "https://www.linkedin.com/in/nilendra-tamrakar-876702270/",
            email: "sujata@gr8private.com"
          }
        },
      
      ]
    },
  
    // Level 1: leaders
    {
      level: 1,
      members:[
          {
          name: "Nilendra Tamrakar",
          role: "Managing Director",
          bio: "Strategic thinker with expertise in business development and market expansion. Oversees corporate governance and long-term vision.",
          icon: Shield,
          avatar: "/team/n.jpg",
          department: "Executive Leadership",
          social: {
            linkedin: "https://www.linkedin.com/in/nilendra-tamrakar-876702270/",
            email: "nilendra@gr8private.com"
          }
        },
        {
          name: "Dipak Maharjan",
          role: "Technical Director",
          bio: "Strategic thinker with expertise in business development and market expansion. Oversees corporate governance and long-term vision.",
          icon: Shield,
          avatar: "/team/d.jpg",
          department: "Executive Leadership",
          social: {
            linkedin: "https://www.linkedin.com/in/nilendra-tamrakar-876702270/",
            email: "nilendra@gr8private.com"
          }
        },
        {
          name: "Suraj Tamrakar",
          role: "Technical Director",
          bio: "Strategic thinker with expertise in business development and market expansion. Oversees corporate governance and long-term vision.",
          icon: Shield,
          avatar: "/team/su.webp",
          department: "Executive Leadership",
          social: {
            Facebook: "https://www.facebook.com/surajgr8realtor",
            email: "nilendra@gr8private.com"
          }
        }
      ]
    },
    // Level 2: Team Members
    {
      level: 2,
      title: "Team Members",
      members: [

        // Sales & Marketing Team
        {
          name: "Injol Shrestha",
          role: "Marketing Specialist, SEO",
          bio: "Implements digital marketing strategies and manages social media presence.",
          icon: Megaphone,
          avatar: "/team/i.jpg",
          department: "SEO Specialist",
          social: {
            linkedin: "https://www.linkedin.com/in/injol-shrestha/",
            email: "injol@gr8.com.np",
          }
        },
        // Development Team
        {
          name: "Khemraj Bahadur Raut",
          role: "Lead Developer",
          bio: "Full-stack developer specializing in property management platforms and digital solutions.",
          icon: Code,
          avatar: "/team/a.png",
          department: "Technology",
          social: {
            github: "https://github.com/KhemrajBahadruRaut",
            email: "khemraj@gr8.com.np"
          }
        },
        {
          name: "Ridima Tuladhar",
          role: "Developer",
          bio: "Specializes in creating responsive and user-friendly interfaces for web applications.",
          icon: Code,
          avatar: "/team/ri.jpg",
          department: "Technology",
          social: {
            github: "https://github.com/ridimatuladhar",
            email: "ridima@gr8.com.np"
          }
        },
     
        
        // Design & Creative Team
        {
          name: "Anup Shrestha",
          role: "Graphics Design Lead",
          bio: "Creative director specializing in branding, and visual communication.",
          icon: Palette,
          avatar: "/team/an.webp",
          department: "Creative",
          social: {
            linkedin: "https://www.linkedin.com/in/anup-shrestha-63515735b/",
            email: "anup@gr8private.com"
          }
        },
          {
          name: "Rahul Rajkanikar",
          role: "Business Development Officer",
          bio: "Creates engaging marketing and client communication content for business development.",
          icon: PenTool,
          avatar: "/team/r.jpg",
          department: "Business Development",
          social: {
            // linkedin: "https://linkedin.com",
            email: "rahul@gr8private.com"
          }
        },
        {
          name: "Prasuna Salike",
          role: "Business Development",
          bio: "Combines sales expertise with creative marketing to attract customers and grow revenue.",
          icon: Users,
          avatar: "/team/p.jpg",
          department: "Sales & Marketing",
          social: {
            linkedin: "https://linkedin.com",
            email: "prasuna@gr8private.com"
          }
        },
      ]
    }
  ];

  return (
    <section className="bg-slate-900 py-20 px-6 relative overflow-hidden lg:pt-32">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-slate-700/5 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in">
            ABOUT US
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Get to Know Us
          </h1>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Our Story */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Our Story
            </h2>
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                GR8 Private Limited is a dynamic company specializing in digital solutions and property management services.
              </p>
              <p className="text-slate-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                As a forward-thinking enterprise, GR8 Private Limited was founded with the vision of enhancing digital solutions and property management through innovative technology and reliable service.
              </p>
            </div>
          </div>

          {/* Right Column - Company Description */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30 hover:border-orange-500/30 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              <p className="text-slate-300 leading-relaxed">
                A pioneering initiative of GR8 Realtors USA, our company serves as a bridge between traditional practices and modern digital transformation. We are committed to delivering excellence, efficiency, and transparency in every aspect of our digital solutions and property management services.
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30 hover:border-orange-500/30 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <p className="text-slate-300 leading-relaxed">
                While our current focus is on delivering top-tier digital and property management solutions, we are continuously expanding our service portfolio to include a wider array of offerings that address the evolving needs of the market. With GR8 Private Limited, you are not just receiving a service; you are partnering with a brand committed to redefining the future of digital services and property management solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section - Hierarchical Display */}
        <div className="mb-20">
          <div className={`text-center mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in">
              OUR TEAM
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in-up" style={{ animationDelay: '900ms' }}>
              Meet Our Leadership & Team
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mt-4 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              A hierarchical structure of experts driving innovation and excellence across all departments.
            </p>
          </div>

         
          {/* Display Team Members by Level */}
          {teamHierarchy.map((levelGroup, groupIndex) => (
            <div key={groupIndex} className="mb-16 last:mb-0">
              <h3 className={`text-2xl font-bold mb-8 text-center ${
                levelGroup.level === 0 ? 'text-orange-400' : 
                levelGroup.level === 1 ? 'text-blue-400' : 
                'text-emerald-400'
              }`}>
                {levelGroup.title}
              </h3>
              <div className={`grid gap-8 ${
                levelGroup.level === 0 ? 'grid-cols-1 max-w-sm mx-auto' :
                levelGroup.level === 1 ? 'grid-cols-1 md:grid-cols-3' :
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {levelGroup.members.map((member, index) => (
                  <TeamMember 
                    key={index} 
                    member={member} 
                    index={index} 
                    level={levelGroup.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="mb-12">
          <div className={`text-center mb-12 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 animate-fade-in">
              OUR VALUES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
              What Drives Us
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="group h-full">
                <ValueCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-1300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-linear-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join numerous clients who trust GR8 Private Limited for innovative digital solutions and exceptional property management services.
            </p>
            <button className="px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translateY(-15px) scale(1.03);
            opacity: 0.08;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 3s;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          animation-fill-mode: both;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}