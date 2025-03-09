import React, { useState } from "react";
import servicesBanner from "../../assets/serviceBanner.png";
import CommonBanner from "../../components/common/CommonBanner";
import LastPart from "../HomePage/LastPart/LastPart";
import { Link } from "react-router-dom";
import { MdArrowForward, MdOutlineChair } from "react-icons/md";
import { FaRegLightbulb, FaCouch, FaPalette, FaHome, FaSwatchbook } from "react-icons/fa";
import SectionHeader from "../../components/common/SectionHeader";
import img1 from "../../assets/serviceImage/1.png";
import img2 from "../../assets/serviceImage/2.png";
import img3 from "../../assets/serviceImage/3.png";
import img4 from "../../assets/serviceImage/4.png";
import { serviceData } from "../../components/common/data";
import ServiceCard from "../../components/common/ServiceCard";
import Button from "../../components/common/Button";

const ServicesPage = () => {
  // State to track the currently selected service
  const [activeService, setActiveService] = useState(0);

  // Define detailed content for each interior design service
  const serviceDetails = [
    {
      id: 0,
      title: "Design Consultation",
      icon: <FaRegLightbulb className="text-[#C16828] text-4xl" />,
      description: "Our personalized consultation helps identify your style preferences, functional needs, and how to adapt them to Visakhapatnam's coastal environment.",
      features: [
        "Style assessment and inspiration gathering",
        "Space planning for optimal furniture placement",
        "Color palette development suited to coastal living",
        "Budget planning for interior elements",
        "Timeline development for your transformation"
      ],
      cta: "Book a Consultation",
      image: img1
    },
    {
      id: 1,
      title: "Space Planning",
      icon: <MdOutlineChair className="text-[#C16828] text-4xl" />,
      description: "We create functional layouts that maximize your space while addressing the unique considerations of coastal living in Visakhapatnam.",
      features: [
        "Traffic flow optimization for indoor-outdoor living",
        "Furniture arrangements that capture sea breezes",
        "Multi-purpose space solutions for Vizag homes",
        "Strategic placement to maximize views",
        "Scale and proportion planning for balanced interiors"
      ],
      cta: "Explore Our Space Planning",
      image: img2
    },
    {
      id: 2,
      title: "Custom Furnishings",
      icon: <FaCouch className="text-[#C16828] text-4xl" />,
      description: "We design and source bespoke furniture pieces crafted by local Andhra artisans that withstand Visakhapatnam's coastal climate.",
      features: [
        "Humidity-resistant custom furniture designs",
        "Collaborations with skilled Andhra craftspeople",
        "Pieces that reflect Vizag's coastal character",
        "Durability-focused material selection",
        "Functional storage solutions for coastal living"
      ],
      cta: "View Custom Furniture",
      image: img3
    },
    {
      id: 3,
      title: "Color & Material Selection",
      icon: <FaSwatchbook className="text-[#C16828] text-4xl" />,
      description: "We curate a palette of colors, fabrics, and finishes inspired by Visakhapatnam's natural beauty that perform beautifully in humid environments.",
      features: [
        "Coastal-inspired color schemes unique to Vizag",
        "Salt-air and humidity-resistant fabric selections",
        "Finishes that maintain beauty in coastal conditions",
        "Local material sourcing for authentic character",
        "Texture combinations that evoke seaside sensations"
      ],
      cta: "Discover Our Palettes",
      image: img4
    },
    {
      id: 4,
      title: "Styling & Accessories",
      icon: <FaPalette className="text-[#C16828] text-4xl" />,
      description: "We add the finishing touches that bring personality to your space while celebrating Visakhapatnam's rich cultural heritage.",
      features: [
        "Art selection featuring local Andhra artists",
        "Coastal-inspired decorative elements",
        "Textiles with regional significance",
        "Lighting that enhances your coastal aesthetic",
        "Seasonal styling recommendations for year-round beauty"
      ],
      cta: "See Our Styling Approach",
      image: img1
    },
    {
      id: 5, 
      title: "Project Implementation",
      icon: <FaHome className="text-[#C16828] text-4xl" />,
      description: "We coordinate every aspect of bringing your design to life, from ordering custom pieces to final placement and styling.",
      features: [
        "Vendor and craftsperson coordination",
        "Delivery and installation management",
        "Quality control for all design elements",
        "Final styling and accessorizing",
        "Reveal day experience and walkthrough"
      ],
      cta: "Learn About Implementation",
      image: img4
    }
  ];

  return (
    <div>
      <CommonBanner
        title={"Our Interior Design Services"}
        bannerImage={servicesBanner}
        bread1={<Link to="/" className="hover:text-[#d6763e] transition-colors">Home</Link>}
        bread2={"Services"}
      />
      
      {/* Service Selection Section */}
      <div className="mt-[60px] mx-auto max-w-[360px] md:max-w-[720px] lg:max-w-[1150px]">
        <SectionHeader
          title={"Interior Design Services for Coastal Living"}
          paragraph={
            "Discover our specialized interior design solutions tailored for Visakhapatnam's unique coastal environment"
          }
        />
        
        {/* Service Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-10">
          {serviceDetails.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={`px-5 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                activeService === index 
                  ? "bg-[#C16828] text-white shadow-lg transform scale-105" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {service.icon}
              <span className="font-medium">{service.title}</span>
            </button>
          ))}
        </div>
        
        {/* Active Service Details */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-20 shadow-lg transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-semibold text-gray-800 mb-4">{serviceDetails[activeService].title}</h2>
              <p className="text-xl text-gray-600 mb-6">{serviceDetails[activeService].description}</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-[#C16828] mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {serviceDetails[activeService].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C16828] mt-1">•</span>
                      <span className="text-lg text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link to={`/services/${serviceDetails[activeService].id}`}>
                <Button title={serviceDetails[activeService].cta} />
              </Link>
            </div>
            
            <div className="order-1 lg:order-2 h-[350px] lg:h-[450px] overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
              <img 
                src={serviceDetails[activeService].image} 
                alt={`${serviceDetails[activeService].title} service`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Process Section */}
      <div className="max-w-[1200px] mx-auto md:mt-20">
        <SectionHeader
          title={"Our Design Process"}
          paragraph={
            "Transforming Visakhapatnam interiors with our proven approach to coastal-inspired design excellence"
          }
        />
      </div>
      
      <div className="overflow-x-hidden mx-auto md:max-w-[700px] lg:max-w-[1200px] mt-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-[70px] lg:gap-[104px] items-end">
          <div className="md:h-[380px] lg:h-[480px] relative">
            <h1 className="text-[90px] text-[#d6763e] absolute md:top-[-28px] lg:top-0 top-[-24px] right-0 md:right-[-364px] lg:right-[-600px]">
              01
            </h1>
            <img
              src={img1}
              alt="Interior design consultation in Visakhapatnam"
              className="h-full w-full rounded-bl-[360px] rounded-tr-[300px] object-fill"
            />
          </div>
          <div className="mb-[60px] md:w-[356px] lg:w-[456px]">
            <h1 className="text-[35px]">Discover</h1>
            <p className="text-[22px] mt-[10px]">
              We begin by understanding your style preferences, functional needs, and lifestyle. Our designers analyze your existing space and discuss how to infuse it with coastal elegance while addressing Visakhapatnam's unique environmental considerations.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-[70px] lg:gap-[104px] items-end mt-[120px]">
          <div className="mb-[10px] lg:mb-[60px] md:w-[356px] lg:w-[456px]">
            <h1 className="text-[35px]">Design</h1>
            <p className="text-[22px] mt-[10px]">
              Our designers create detailed interior concepts including space plans, furniture layouts, color schemes, and material selections that reflect Vizag's coastal character. We present you with mood boards, material samples, and visual renderings of your transformed space.
            </p>
          </div>
          <div className="md:h-[380px] lg:h-[480px] relative">
            <h1 className="text-[90px] text-[#d6763e] absolute top-[187px] md:top-[-28px] lg:top-0 md:left-[-387px] lg:left-[-650px]">
              02
            </h1>
            <img
              src={img2}
              alt="Interior design concept development"
              className="h-full w-full rounded-bl-[360px] rounded-tr-[300px] object-fill"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-[70px] lg:gap-[104px] items-end mt-[120px]">
          <div className="md:h-[380px] lg:h-[480px] relative">
            <h1 className="text-[90px] text-[#d6763e] absolute md:top-[-28px] lg:top-0 top-[-24px] right-0 md:right-[-364px] lg:right-[-600px]">
              03
            </h1>
            <img
              src={img3}
              alt="Interior elements selection"
              className="h-full w-full rounded-bl-[360px] rounded-tr-[300px] object-fill"
            />
          </div>
          <div className="mb-[60px] md:w-[350px] lg:w-[456px]">
            <h1 className="text-[35px]">Detail</h1>
            <p className="text-[22px] mt-[10px]">
              We refine every aspect of your design, from custom furniture pieces crafted by local Andhra artisans to the perfect textiles that withstand Visakhapatnam's coastal climate. Every element is selected with care to create a cohesive, beautiful interior that functions perfectly for coastal living.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-[70px] lg:gap-[104px] items-end mt-[120px] mb-[150px]">
          <div className="mb-[60px] md:w-[356px] lg:w-[456px]">
            <h1 className="text-[35px]">Deliver</h1>
            <p className="text-[22px] mt-[10px]">
              Our team coordinates the transformation of your space, managing furniture delivery, installation, and final styling. We carefully place each element according to the design plan, adding those perfect finishing touches that bring your Vizag home to life with coastal-inspired beauty.
            </p>
          </div>
          <div className="md:h-[380px] lg:h-[480px] relative">
            <h1 className="text-[90px] text-[#d6763e] absolute top-[187px] md:top-[-28px] lg:top-0 md:left-[-387px] lg:left-[-650px]">
              04
            </h1>
            <img
              src={img4}
              alt="Completed interior design project in Visakhapatnam"
              className="h-full w-full rounded-bl-[360px] rounded-tr-[300px] object-fill"
            />
          </div>
        </div>
      </div>
      
      <LastPart />
    </div>
  );
};

export default ServicesPage;