import React, { useState } from "react";
import serviceDetailsImage from "../../assets/serviceImage/everyServices.png";
import CommonBanner from "../../components/common/CommonBanner";
import BrandingPart from "../HomePage/BrandingPart/BrandingPart";
import newImage from "../../assets/imgService11.png";
import Button from "../../components/common/Button";
import StatsPart from "../HomePage/StatsPart/StatsPart";
import { Link } from "react-router-dom";

const ServiceDetails = () => {
  // State for interactive tabs
  const [activeTab, setActiveTab] = useState("coastal");

  // Content for interactive tabs
  const tabContent = {
    coastal: {
      title: "Coastal Living Mastery",
      items: [
        "Climate-smart fabrics and finishes that maintain their beauty despite salt air and humidity.",
        "Furniture arrangements that harness Vizag's refreshing sea breezes.",
        "Indoor-outdoor styling that maximizes connection to Visakhapatnam's stunning vistas.",
        "Color schemes inspired by the Bay of Bengal's ever-changing hues.",
        "Moisture-resistant decorative elements that maintain their appeal year after year."
      ]
    },
    cultural: {
      title: "Vizag Cultural Artistry",
      items: [
        "Stunning contemporary adaptations of traditional Andhra Pradesh art forms.",
        "Custom furnishings crafted by the region's most talented artisans and woodworkers.",
        "Color palettes drawn from Vizag's spectacular natural landscapes and seascapes.",
        "Accent features that subtly celebrate our city's rich maritime heritage and naval connections.",
        "Thoughtful integration of local materials that tell the story of Visakhapatnam's unique character."
      ]
    },
    techniques: {
      title: "Innovative Design Techniques",
      items: [
        "3D visualization that helps you experience your new space before implementation.",
        "Material sampling that ensures perfect texture and color compatibility.",
        "Furniture and decor curation from both local craftspeople and global designers.",
        "Space planning that maximizes flow and functionality in your Vizag home.",
        "Lighting design that enhances both aesthetics and functionality across day and night."
      ]
    }
  };

  return (
    <div>
      <CommonBanner
        title={"Interior Design Excellence"}
        bread1={<Link to="/" className="hover:text-[#d6763e] transition-colors">Home</Link>}
        bread2={"Services"}
        bannerImage={serviceDetailsImage}
      />
      <div className="mt-[110px] mx-auto max-w-[360px] md:max-w-[660px] lg:max-w-[1200px] mb-[50px]">
        <h1 className="lg:w-[751px] text-[30px] lg:text-[50px] text-center leading-[43px] mx-auto">
          Where Bay of Bengal Beauty Meets Design Brilliance
        </h1>
        <p className="text-[#C16828] text-[25px] text-center mt-[48px]">
          Creating Breathtaking Interiors That Capture Visakhapatnam's Coastal Magic While Standing Up to Its Unique Climate
        </p>
        
        {/* Interactive Image Gallery Section */}
        <div className="mt-[85px] mx-5 lg:mx-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative overflow-hidden rounded-tl-[100px] group">
              <img 
                src={newImage} 
                alt="Coastal living room with sea view" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end">
                <div className="p-8 text-white transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-2xl font-semibold mb-2">Seaside Living Spaces</h3>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Our coastal living rooms blend comfort with Vizag's natural beauty
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-tr-[100px] group">
              <img 
                src={newImage} 
                alt="Contemporary bedroom with coastal elements" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end">
                <div className="p-8 text-white transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-2xl font-semibold mb-2">Serene Bedrooms</h3>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Peaceful retreats that harness Visakhapatnam's gentle sea breezes
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-bl-[100px] group">
              <img 
                src={newImage} 
                alt="Kitchen with local materials and craftsmanship" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end">
                <div className="p-8 text-white transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-2xl font-semibold mb-2">Culinary Spaces</h3>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Kitchens designed for both Andhra cuisine and modern entertaining
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-br-[100px] group">
              <img 
                src={newImage} 
                alt="Bathroom with coastal-inspired design" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end">
                <div className="p-8 text-white transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-2xl font-semibold mb-2">Spa-Like Bathrooms</h3>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Refreshing retreats with humidity-resistant materials and finishes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Text Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-[60px] mx-5 lg:mx-0">
          <p className="text-[22px] text-justify">
            Step into a world where interior design transcends the ordinary at Vizag Interiors. Our signature approach blends the mesmerizing beauty of Visakhapatnam's coastline with cutting-edge design principles to create spaces that feel like a natural extension of our breathtaking surroundings. From seafront apartments in Rushikonda to heritage homes in the Old Town, we craft interiors that celebrate the soul of our city while expressing your unique personality.
          </p>
          <p className="text-[22px] text-justify">
            Our designs aren't just beautiful—they're brilliantly practical for coastal living. Our team of local experts understands the challenges of Vizag's climate and transforms them into opportunities. We select fabrics and finishes that thrive in our humid environment, create furniture arrangements that maximize cooling sea breezes, and incorporate decorative elements that connect you to the natural beauty that makes our city special. The result? Stunning interiors that perform flawlessly year after year.
          </p>
        </div>
        
        <div className="mt-[160px]">
          <BrandingPart />
        </div>
        
        {/* Interactive Tabs Section */}
        <div className="mt-[80px]">
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button 
              onClick={() => setActiveTab('coastal')}
              className={`px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                activeTab === 'coastal' 
                  ? 'bg-[#C16828] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Coastal Living
            </button>
            <button 
              onClick={() => setActiveTab('cultural')}
              className={`px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                activeTab === 'cultural' 
                  ? 'bg-[#C16828] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cultural Elements
            </button>
            <button 
              onClick={() => setActiveTab('techniques')}
              className={`px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                activeTab === 'techniques' 
                  ? 'bg-[#C16828] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Design Techniques
            </button>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-[40px] mb-6">{tabContent[activeTab].title}</h2>
            <ol className="text-[22px] text-[#4D5053] grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
              {tabContent[activeTab].items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <h1 className="text-[20px] text-[#C16828] mt-1">{index + 1}.</h1> 
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        <div className="mt-[130px] grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
          <div className="h-[390px] overflow-hidden rounded-tr-[100px] relative group">
            <img
              src={newImage}
              alt="Stunning Visakhapatnam interior design project"
              className="h-full w-full object-fill transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <p className="text-white text-xl">View our portfolio of completed projects</p>
            </div>
          </div>
          <div>
            <h1 className="text-[35px] lg:text-[50px]">
              Transforming Vizag Homes Since 2015
            </h1>
            <p className="text-[22px] text-[#4D5053]">
              From hillside villas with panoramic ocean views to cozy apartments in the heart of the city, we've helped hundreds of Visakhapatnam families create interiors that feel like a perfect reflection of both their dreams and our beautiful coastal city.
            </p>
            <div className="mt-8">
              <Link to="/projects">
                <Button title={"Explore Our Vizag Transformations"} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <StatsPart />
    </div>
  );
};

export default ServiceDetails;