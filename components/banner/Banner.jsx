export default function TrustedBySection() {
  const clients = [
    { name: "Deliver Mart", logo: "/banner/DeliveyMartLogo.webp" },
    { name: "Himalayan Thakali", logo: "/banner/HImalayanThakaliogo.webp" },
    { name: "Joy Travel and Tours", logo: "/banner/JoyTravelandToursLogo.webp" },
    // { name: "Karmasila Enterprises", logo: "/banner/KarmasilaEnterprisesLogo.webp" },
    { name: "Key Nova Group", logo: "/banner/KeyNovaGroupLogo.webp" },
    // { name: "NPP Burger", logo: "/banner/nppburgerLogo.webp" },
    { name: "Parijat Clinic", logo: "/banner/ParijatClinicLogo.webp" },
    { name: "PATAN Pathlab", logo: "/banner/PATAN-pathlab-Logo.webp" },
    { name: "Precision Diagnostic", logo: "/banner/PrecisionDiagnosticLogo.webp" },
    { name: "PTANA Health Lab", logo: "/banner/PTANA-HEALTH-LAB-LOGO.webp" },
    { name: "Reliable Care Pt", logo: "/banner/ReliableCarePtLogo.webp" },
    { name: "SEWA Home Care", logo: "/banner/SEWAHomeCareLOGO.webp" },
    { name: "Shree Ganapati Bappa Saw Mill", logo: "/banner/ShreeGanapatiBappaSawMillLogo.webp" },
    // { name: "Siddhi Skin Aesthetic", logo: "/banner/SiddhiSkinAestheticLogo.webp" },
    { name: "Suvekshya International Hospital", logo: "/banner/SuvekshyaInternationalHospitalLogo.webp" },
    { name: "Ticket Kaksha Travel and Tour", logo: "/banner/TicketKakshaTravelandTourLogo.webp" },
    { name: "Sewa The Foundation", logo: "/banner/SewaTheFoundationLogo.webp" },
    { name: "United Supreme", logo: "/banner/UnitedSupremeLogo.webp" },
  ];

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="bg-[#0f1821] text-white sm:pt-15 pt-5 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
            OUR VALUED CLIENTS
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">Trusted By</h1>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#0f1821] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#0f1821] to-transparent z-10"></div>

          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="shrink-0 sm:mx-8 mx-4 flex items-center justify-center sm:w-35 w-25"
                  // style={{ width: '140px' }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className=" opacity-70 hover:opacity-100 transition-opacity duration-300 "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
