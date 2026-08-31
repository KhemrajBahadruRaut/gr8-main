import Link from "next/link";

export default function StartProjectSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 py-20 rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #101820 0%, #26323D 100%)",
      }}
    >
      <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
        Start your project
      </h2>

      <p className="mt-4 max-w-md text-sm md:text-base text-white/50 leading-relaxed">
        Ut enim ad minim veniam, quis nos trud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      </p>

<Link href="/contact">
      <button className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#101820] transition-transform hover:scale-[1.03] active:scale-[0.98]">
        Book a consultation
      </button>
</Link>
    </section>
  );
}