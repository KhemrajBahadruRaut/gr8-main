"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState([]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 768;

      if (!isDesktop) {
        setShowHeader(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  const menuItems = [
    { name: "Home", hasSubmenu: false, link: "/" },
    { name: "About us", hasSubmenu: false, link: "/about" },
    { name: "Portfolio", hasSubmenu: false, link: "/portfolio" },
    {
      name: "Services",
      hasSubmenu: true,
      link: "/services",
      submenuItems: [
        { name: "Web Development", link: "/services/web-development" },
        {
          name: "Mobile App Development",
          link: "/services/mobile-app-development",
        },
        { name: "Graphics Designing", link: "/services/graphics-designing" },
        { name: "Email Marketing", link: "/services/email-marketing" },
        { name: "SEO Services", link: "/services/seo-services" },
        {
          name: "Social Media Marketing",
          link: "/services/social-media-marketing",
        },
        {
          name: "Printing and Publishing",
          link: "/services/printing-publishing",
        },
        { name: "Pay-Per-Click (PPC)", link: "/services/ppc" },
        { name: "Content writing", link: "/services/content-writing" },
      ],
    },
    {
      name: "Resources",
      hasSubmenu: true,
      link: "/resources",
      submenuItems: [
        { name: "Blog", link: "/blogs" },
        // { name: "News Letters", link: "/resources/newsletters" },
        { name: "Help Center", link: "/resources/help-center" },
        // {
        //   name: "Social Media Courses",
        //   link: "/resources/social-media-courses",
        // },
      ],
    },
    // { name: "Merchendise", hasSubmenu: false, link: "/merchendise" },
    { name: "Careers", hasSubmenu: false, link: "/careers" },
    { name: "Contact Us", hasSubmenu: false, link: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF className="text-[15px] text-white" />,
      link: "https://www.facebook.com/gr8nepal/",
      svg: "/icons/GR8-Nepal-fb.webp",
    },
    {
      icon: <FaInstagram className="text-[15px] text-white" />,
      link: "https://www.instagram.com/gr8nepal/",
      svg: "/icons/GR8-Nepal-ig.webp",
    },
    {
      icon: <FaYoutube className="text-[15px] text-white" />,
      link: "https://www.youtube.com/@GR8Nepal/",
      svg: "/icons/GR8-Nepal-yt.webp",
    },
    {
      icon: <FaTiktok className="text-[15px] text-white" />,
      link: "https://www.tiktok.com/@gr8nepal/",
      svg: "/icons/GR8-Nepal-tt.webp",
    },
    {
      icon: <FaLinkedinIn className="text-[15px] text-white" />,
      link: "https://www.linkedin.com/company/gr8-private-limited",
      svg: "/icons/GR8-Nepal-li.webp",
    },
  ];

  return (
    <div>
      <div
        className={`fixed 2xl:mx-auto 2xl:container top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between md:px-20 pb-1 backdrop-blur-sm">
          <div className="pl-2 pt-2" style={{ cursor: "pointer" }}>
            <Link href="/">
              <img
                src="/mainlogo/GR8-Nepal-Private-Limited-Logo.webp"
                className="cursor-pointer h-8 md:h-14 lg:h-20 max-w-full  object-contain"
                alt="gr8-Nepal-Private-Limited-Logo"
                title="gr8-Nepal-Private-Limited"
              />
            </Link>
          </div>

          <div className="flex justify-end items-center gap-4">
            {/* Social Icons - Desktop Only */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex gap-2">
                {socialLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group perspective"
                  >
                    <div className="relative w-9 h-9 transition-transform duration-500 transform-style-preserve-3d group-hover:transform-[rotateY(180deg)]">
                      <div className="absolute w-full h-full flex items-center justify-center backface-hidden">
                        <div className="border border-white rounded-full p-2">
                          {item.icon}
                        </div>
                      </div>
                      <div className="absolute w-full h-full flex items-center justify-center backface-hidden transform-[rotateY(180deg)]">
                        <div className="rounded-full">
                          <img
                            src={item.svg}
                            alt="GR8 Nepal Social Icon"
                            className="size-7"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Desktop Menu Button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="learn-more rounded-3xl"
              >
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <p className="button-text flex justify-center items-center">
                  Menu
                </p>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-2 pr-4"
              aria-label="Open menu"
            >
              <span className="w-6 h-0.5 bg-white transition-all"></span>
              <span className="w-6 h-0.5 bg-white transition-all"></span>
              <span className="w-6 h-0.5 bg-white transition-all"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-60 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-80 bg-slate-800 z-70 transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <img
              src="/mainlogo/GR8-Nepal-Private-Limited-Logo.webp"
              className="h-10 object-contain"
              alt="GR8 Nepal Logo"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-8">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.hasSubmenu ? (
                    <div>
                      <button
                        onClick={() => {
                          setOpenSubmenus((prev) =>
                            prev.includes(index)
                              ? prev.filter((i) => i !== index)
                              : [...prev, index]
                          );
                        }}
                        className="w-full flex items-center justify-between px-6 py-1 text-white hover:bg-slate-700 transition-colors group"
                      >
                        <span className="text-md">{item.name}</span>
                        <svg
                          className={`w-4 h-4 text-gray-400 group-hover:text-white transition-all ${
                            openSubmenus.includes(index) ? "rotate-90" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      {/* Submenu */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openSubmenus.includes(index) ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <ul className="bg-slate-900 py-1">
                          {item.submenuItems?.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.link}
                                className="block px-12 py-1 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                                onClick={() => setMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      className="flex items-center justify-between px-6 py-1 text-white hover:bg-slate-700 transition-colors group"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-md">{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Social Icons */}
          <div className="p-6 border-t border-slate-700">
            <div className="flex gap-4 justify-center">
              {socialLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="text-lg">
                    {item.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;