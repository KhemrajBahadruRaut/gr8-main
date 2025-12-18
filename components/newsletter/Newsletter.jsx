"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!firstName || !email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        // "https://gr8.com.np/api/newsletter/subscribe.php",
        "http://localhost/gr8/api/newsletter/newsletter-subscriber.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Subscription failed");
      } else {
        setSuccess("Successfully subscribed to the newsletter");
        
        setFirstName("");
        setEmail("");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#101820] text-white py-16 px-6 flex justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-7xl bg-linear-to-r from-[#101820] to-[#26323D] rounded-2xl p-10 shadow-[0_0_25px_rgba(0,0,0,0.4)]"
      >
        <motion.h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
          Subscribe to our newsletter
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row justify-center items-center gap-6"
        >
          <motion.input
            type="text"
            placeholder="Full Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full md:w-1/5 px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#EFC27E]"
          />

          <motion.input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-1/5 px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#EFC27E]"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{
              scale: loading ? 1 : 1.05,
              backgroundColor: "#EFC27E",
              color: "#000",
            }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full md:w-1/5 px-6 py-3 bg-white text-black font-medium rounded-xl disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </motion.form>

        {error && (
          <p className="text-red-400 text-center mt-4">{error}</p>
        )}
        {success && (
          <p className="text-emerald-400 text-center mt-4">{success}</p>
        )}
      </motion.div>
    </section>
  );
};

export default Newsletter;
