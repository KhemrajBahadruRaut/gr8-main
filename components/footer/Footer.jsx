import React from 'react'

const Footer = () => {
   const footerData = {
    company: {
      title: "COMPANY",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Portfolio", href: "#" },
        { label: "Merchandise", href: "#" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" }
      ]
    },
    services: {
      title: "SERVICES",
      links: [
        { label: "Web development", href: "/services/web-development" },
        { label: "App Development", href: "/services/mobile-app-development" },
        { label: "Graphics Designing", href: "/services/graphics-designing" },
        { label: "Email Marketing", href: "/services/email-marketing" },
        { label: "Search Engine Optimization (SEO)", href: "/services/seo-services" },
        { label: "Social Media Marketing", href: "/services/social-media-marketing" },
        { label: "Printing and Publishing", href: "/services/printing-publishing" },
        { label: "Pay-Per-Click", href: "/services/pay-per-click" },
        { label: "Content writing", href: "/services/content-writing" }
      ]
    },
    resources: {
      title: "RESOURCES",
      links: [
        { label: "Blog", href: "/blogs" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Merchendise", href: "/merchendise" },
        { label: "Contact Us", href: "/contact" }
      ]
    },
    additionals: {
      title: "ADDITIONALS",
      links: [
        { label: "Terms & Conditions", href: "/terms-and-condition" },
        { label: "Privacy Policy", href: "/privacy" }
      ]
    }
  };
  return (
    <footer className="bg-[#101820] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              {footerData.company.title}
            </h3>
            <ul className="space-y-3">
              {footerData.company.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              {footerData.services.title}
            </h3>
            <ul className="space-y-3">
              {footerData.services.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              {footerData.resources.title}
            </h3>
            <ul className="space-y-3">
              {footerData.resources.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Additionals Column */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              {footerData.additionals.title}
            </h3>
            <ul className="space-y-3">
              {footerData.additionals.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700/50 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 All Rights Reserved. G R Eight Private Limited
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
