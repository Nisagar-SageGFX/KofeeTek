const clients = [
  { name: "BOTREE", logo: "/assets/client-logo/botree.png" },
  { name: "AJMERA", logo: "/assets/client-logo/Ajmera.png" },
  { name: "ResMed", logo: "/assets/client-logo/Resmed.png" },
  { name: "Microsense", logo: "/assets/client-logo/microsense.png" },
  { name: "Uber", logo: "/assets/client-logo/Uber.png" },
  { name: "Pegatron", logo: "/assets/client-logo/Pegatron.png" },
  { name: "Antares Vision", logo: "/assets/client-logo/antares.png" },
  { name: "Tesa Tapes", logo: "/assets/client-logo/Tesa tapes.png" },
  { name: "SRM", logo: "/assets/client-logo/SRM.png" },
  { name: "PAIX", logo: "/assets/client-logo/paix.png"},
];


export default function ClientLogoSection() {

  return (

    <section className="bg-white py-20 overflow-hidden">
      <div className="text-center mb-12 px-6">

        <p className="text-xs tracking-[5px] uppercase text-[#b09a86] mb-4">
          Trusted by South India's Leading Companies
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semiboldtext-[#2b211c]">
          Our Valued Clients
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative w-full">
        <div className="flex gap-6 animate-marquee w-max">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="w-48 h-38   rounded-xl border border-[#eee2d8] bg-white flex items-center justify-center p-5 transition-all duration-500

                hover:-translate-y-3
                hover:scale-110
                hover:shadow-2xl
                hover:border-[#c48b00]
              ">

              <img
                src={client.logo} alt={client.name}
                className="max-w-full  max-h-15  object-contain  opacity-95 transition duration-500 "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}