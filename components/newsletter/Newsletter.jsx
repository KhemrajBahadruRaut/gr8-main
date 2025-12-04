"use client";
import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="bg-[#101820] text-white py-16 px-6 flex justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-7xl bg-linear-to-r from-[#101820] to-[#26323D] rounded-2xl p-10 shadow-[0_0_25px_rgba(0,0,0,0.4)]"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-center text-2xl md:text-3xl font-semibold mb-8"
        >
          Subscribe to our newsletter
        </motion.h2>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex flex-col md:flex-row justify-center items-center gap-6"
        >
          {["First Name", "Email Address"].map((placeholder, index) => (
            <motion.input
              key={index}
              type={placeholder === "Email Address" ? "email" : "text"}
              placeholder={placeholder}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.02, borderColor: "#EFC27E" }}
              className="w-full md:w-1/5 px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#EFC27E] transition"
            />
          ))}

          <motion.button
            type="submit"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.08, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#EFC27E",
              color: "#000",
              boxShadow: "0px 0px 15px rgba(239, 194, 126, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-1/5 px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-[#EFC27E] hover:text-black transition"
          >
            Subscribe
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
