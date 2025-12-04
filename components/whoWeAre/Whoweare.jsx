"use client";
import { useRef} from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const AnimatedText = ({ children, delay = 0, className = "" }) => {
  const words = children.split(" ");
  
  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: delay + (wordIndex * 0.05 + charIndex * 0.02),
                duration: 0.3,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

const ValueItem = ({ title, description, gradient, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="mb-10 flex-row md:flex gap-5 group"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <motion.h3 
        className="text-lg sm:text-2xl font-semibold mb-2 whitespace-nowrap bg-clip-text text-transparent min-w-[140px]"
        style={{ 
          backgroundImage: gradient 
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-300 leading-relaxed text-justify flex-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const Whoweare = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const values = [
    {
      title: "Our Mission",
      description: "To provide innovative digital solutions that drive measurable business growth, enhance online presence, and create meaningful connections with audiences — all with integrity and a customer-first approach.",
      gradient: "linear-gradient(135deg, #D79442 0%, #EFC27E 100%)"
    },
    {
      title: "Our Vision",
      description: "TTo be a leading digital solutions provider, transforming how businesses engage, connect, and succeed online through technology, creativity, and strategic innovation.",
      gradient: "linear-gradient(135deg, #B32723 0%, #E06666 100%)"
    },
    {
      title: "Our Values",
      description: "We embrace innovation by adopting cutting-edge technologies and creative solutions to deliver exceptional results. With integrity at the core of everything we do, we maintain transparency, honesty, and professionalism in all our actions. Our approach is deeply customer-centric, prioritizing our clients’ success and building strategies aligned with their goals. Committed to excellence, we ensure quality in every project to create impactful digital experiences.",
      gradient: "linear-gradient(135deg, #0E8A4D 0%, #4FBF87 100%)"
    }
  ];

  return (
    <section ref={sectionRef} className="bg-[#101820] text-white px-8 md:px-20 py-14 overflow-hidden relative">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY, opacity }}
      >
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F2D08A] rounded-full"
            animate={{ 
              y: [0, -30, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto flex-row md:flex gap-14 relative z-10">
        {/* Left Header Section */}
        <motion.div 
          className="sm:w-sm pb-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-[#F2D08A] uppercase tracking-wide text-sm font-semibold mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.p>
          <motion.h2 
            className="text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatedText delay={0.2}>
              Who We Are
            </AnimatedText>
          </motion.h2>

          {/* Decorative Line */}
          <motion.div 
            className="w-16 h-1 bg-linear-to-r from-[#D79442] to-[#EFC27E] mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.2, delay: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Right Content Section */}
        <motion.div 
          className="flex flex-col flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <ValueItem
              key={value.title}
              title={value.title}
              description={value.description}
              gradient={value.gradient}
              delay={0.2 + index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Whoweare;