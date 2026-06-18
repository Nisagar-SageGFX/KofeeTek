import { Helmet } from 'react-helmet-async'
import Hero from '../components/home/Hero'
import ClientLogos from '../components/home/ClientLogos'
import WhyUs from '../components/home/WhyUs'
import MachineShowcase from '../components/home/MachineShowcase'
import Industries from '../components/home/Industries'
import ConsumableSection from '../components/home/ConsumableSection'
import Testimonials from '../components/home/Testimonials'
import ContactCTA from '../components/home/ContactCTA'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>KofeeTek – Coffee & Tea Vending Machines Chennai | Feel The Brews</title>
        <meta name="description"
          content="KofeeTek — South India's premier B2B coffee & tea vending machine manufacturer. Rental from ₹2,200/month. Serving IT companies, factories, hospitals & corporates in Chennai, Coimbatore, Bangalore. ISO & FSSAI certified." />
        <meta name="keywords"
          content="coffee vending machine Chennai, tea vending machine Coimbatore, coffee machine rental Bangalore, office vending machine Tamil Nadu, vending machine manufacturers South India" />
        <link rel="canonical" href="https://www.kofeetek.in" />
      </Helmet>

      <Hero />
      <ClientLogos />
      <WhyUs />
      <MachineShowcase />
       <Industries /> 
      <ConsumableSection />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
