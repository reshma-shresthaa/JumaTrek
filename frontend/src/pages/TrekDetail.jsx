import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Format price to USD with comma separators
const formatPrice = (priceInUsd) => {
  return `$${priceInUsd.toLocaleString()}`;
};

const TrekDetail = () => {
  const { id } = useParams();
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedItinerary, setExpandedItinerary] = useState(false);

  // Sample detailed trek data - in real app, this would come from API
  const trekDetails = {
    1: {
      id: 1,
      title: "Everest Base Camp Trek",
      description: "The classic trek to the base of the world's highest mountain, offering breathtaking views of Everest and surrounding peaks. This iconic journey takes you through Sherpa villages, ancient monasteries, and stunning Himalayan landscapes.",
      arrivalCity: "Kathmandu, Nepal",
      departureCity: "Kathmandu, Nepal",
      lodgingLevel: "Standard",
      meals: "All meals included",
      activity: "Trekking",
      styles: "Adventure, Nature",
      attractions: "Mountain Views, Local Culture",
      duration: 14,
      difficulty: "Challenging",
      maxAltitude: "5,545m (Kala Patthar)",
      region: "Khumbu",
      season: "Spring (Mar-May) & Autumn (Sep-Nov)",
      groupSize: "2-12 people",
      price: 1805,
      highlights: [
        "Spectacular views of Mount Everest",
        "Visit to Tengboche Monastery",
        "Kala Patthar sunrise view",
        "Explore Namche Bazaar",
        "Experience Sherpa culture"
      ],
      itinerary: [
        { day: 1, title: "Kathmandu to Lukla Flight", description: "Fly to Lukla and trek to Phakding" },
        { day: 2, title: "Phakding to Namche Bazaar", description: "Trek through beautiful pine forests" },
        { day: 3, title: "Acclimatization Day", description: "Hike to Everest View Hotel" },
      ],
      includes: [
        "All meals during trek",
        "Experienced English-speaking guide",
        "Porter service (1 porter per 2 trekkers)",
        "Accommodation in tea houses",
        "All necessary permits",
        "Airport transfers",
        "Medical kit and oxygen"
      ],
      excludes: [
        "International flights",
        "Nepal visa fee",
        "Travel insurance",
        "Personal expenses",
        "Tips for guide and porter",
        "Alcoholic beverages"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1551632811-561732d1e306",
        "https://images.unsplash.com/photo-1528181304800-259b08848526"
      ]
    },
    2: {
      id: 2,
      title: "Annapurna Circuit",
      description: "The Annapurna Circuit is a trek within the Annapurna mountain range of central Nepal. The total length of the route varies between 160–230 km, depending on where motor transportation is used and where the trek ends.",
      arrivalCity: "Kathmandu, Nepal",
      departureCity: "Pokhara, Nepal",
      lodgingLevel: "Hotel (Hotel Moonlight)",
      meals: "9 dinner, 10 breakfast, 8 lunch",
      activity: "Trekking and Hiking",
      styles: "Active Adventures",
      attractions: "Ghandruk, Pokhara, Annapurna Base Camp",
      duration: 11,
      difficulty: "Moderate+Demanding",
      tripGrade: "Moderate+Demanding",
      maxAltitude: "4,130m/13,551ft",
      region: "Annapurna",
      season: "Spring (Mar-May) & Autumn (Sep-Nov)",
      groupSize: "2-12 people",
      price: 1353,
      highlights: [
        "Annapurna Base Camp",
        "Machhapuchhre (Fishtail Mountain)",
        "Ghandruk village",
        "Hot springs at Jhinu Danda",
        "Spectacular mountain views"
      ],
      shortItinerary: [
        { day: 1, itinerary: "Arrival in Kathmandu and trip preparation", maxAltitude: "1,350m/4,429ft", walking: "-" },
        { day: 2, itinerary: "Fly to Pokhara; drive to Kimche & trek to Ghandruk", maxAltitude: "1,940m/6,365ft", walking: "50 min" },
        { day: 3, itinerary: "Ghandruk to Chhomrong", maxAltitude: "2,170m/7,120ft", walking: "5-6 hrs" },
        { day: 4, itinerary: "Chhomrong to Bamboo", maxAltitude: "2,310m/7,579ft", walking: "4-5 hrs" },
        { day: 5, itinerary: "Bamboo to Deurali", maxAltitude: "3,230m/10,598ft", walking: "3-4 hrs" },
        { day: 6, itinerary: "Deurali to Annapurna Base Camp via Machhapuchhre Base Camp", maxAltitude: "4,130m/13,551ft", walking: "5-6 hrs" },
        { day: 8, itinerary: "Bamboo to Jhinu Danda", maxAltitude: "1,760m/5,775ft", walking: "5-6 hrs" },
        { day: 9, itinerary: "Trek to Naya Pul; drive to Pokhara", maxAltitude: "827m/2,713ft", walking: "1 hour" },
        { day: 10, itinerary: "Fly to Kathmandu", maxAltitude: "1,350m/4,429ft", walking: "-" },
        { day: 11, itinerary: "Final Departure", maxAltitude: "-", walking: "-" }
      ],
      detailedItinerary: [
        { 
          day: 1,
          title: "Arrival in Kathmandu and trip preparation",
          description: "After arriving in Kathmandu, a representative from Juma will pick us up from the airport and take us to our hotel. In the afternoon, we may take a rest or visit a walk in Kathmandu Thamel. In the evening, there will be a welcome dinner hosted by Juma Trek. For dinner, you will be served authentic Nepalese cuisine which will introduce you to the country's food culture.",
          maxAltitude: "1,350m/4,429ft",
          accommodation: "Hotel",
          meal: "Welcome Dinner"
        },
        { 
          day: 2,
          title: "Fly to Pokhara trek to Ghandruk",
          description: "We take an early morning flight to Pokhara, the beautiful lake city and catch great views of the Himalayas from the right side of our aircraft. After landing in the Pokhara airport, we drive to Seuli Bazar (1 hour and 20 minutes) and start the trek. From Seuli, we trek to Ghandruk, a beautiful village mostly inhabited by the Gurung community. If time permits, we will also visit the Gurung museum today.",
          maxAltitude: "1,940m/6,365ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast, Lunch and Dinner"
        },
        { 
          day: 3,
          title: "Ghandruk to Chhomrong",
          description: "At this juncture, we climbed up for around an hour to Kimrungdanda. On the way, we can enjoy great views of Annapurna South, Hiunchuli, Fishtail Mountain (Machhapuchhre) and Ganggapurna. A steep descent takes us to the Kimrong Khola. After another steep ascent from Kimrong Khola to Chere Danda, we descend for a while and then it's a gentle walk to Chhomrong. Chhomrong is a beautiful village located on the lap of the giant Annapurna massive.",
          maxAltitude: "2,170m/7,120ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast, Lunch and Dinner"
        },
        { 
          day: 4,
          title: "Chhomrong to Bamboo",
          description: "We descend via 2500 stone steps and cross the bridge above Chhomrong Khola. From here it is an uphill climb to Sinuwa. Next, we pass through a beautiful forest to Kuldihar followed by an easy downhill walk to Bamboo.",
          maxAltitude: "2,310m/7,579ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast, Lunch and Dinner"
        },
        { 
          day: 5,
          title: "Bamboo to Deurali",
          description: "We pass through a bamboo forest which is damp and cold then ascend steadily with a few steep sections. It is only after reaching the Himalaya Hotel that the forest opens up and we are out in the sun again with astounding views of the glacial river below. It is a steep climb up through a much drier forest before reaching Hinku Cave. From here we can see the trail drop closer to the river before climbing again to Deurali, the most scenic stretch of the day. The vegetation is sparser, allowing magical views of the valley, the river below, and the sheer rock-face cliffs above with bands of wispy waterfalls.",
          maxAltitude: "3,230m/10,598ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast, Lunch and Dinner"
        },
        { 
          day: 6,
          title: "Deurali to Annapurna Base Camp via Machhapuchhre Base Camp",
          description: "Climb gently through a river bed then over a steep trail over to the mountain side. The hike from Bagar to Machhapuchhre Base Camp is somewhat strenuous. From Machhapuchhre base camp we get excellent views of the majestic Machhapuchhre along with Mt. Hiunchuli, Annapurna South, Annapurna I, Annapurna III, Gandharvachuli and Gangapurna which is certainly a rewarding experience. The vegetation disappears on our way to ABC and the path widens as we enter the Annapurna sanctuary. From here, we get sensational views of the near-vertical south face of Annapurna towering above us. The sanctuary boasts of a dynamic view without anything impeding the 360-degree panorama. From the base camp we again get to savor mesmerizing views of the Machhapuchhre, Annapurna South , Annapurna I, Hiunchuli and other peaks.",
          maxAltitude: "4,130m/13,551ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast, Lunch and Dinner"
        },
        { 
          day: 7,
          title: "Annapurna Base Camp to Bamboo",
          description: "From the Annapurna base camp we retrace our steps to Bamboo. Today's trek is downhill, so it shouldn't be very difficult. Besides, we will always have the company of the extraordinary landscape to cheer us up.",
          maxAltitude: "2,310m/7,579ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast, Lunch and Dinner"
        },
        { 
          day: 8,
          title: "Bamboo to Jhinu Danda",
          description: "From Bamboo, it is an uphill trek to Kuldighar followed by a downhill walk to Chhomrong Khola. Then we climb the stone steps to Chhomrong. The trail then descends to Jhinu Danda, where we will be resting for the night. Today we will have an opportunity to enjoy the hot springs which is just a 15-20 minute downhill walk from Jhinu Danda to soothe our aching body.",
          maxAltitude: "1,760m/5,775ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast, Lunch and Dinner"
        },
        { 
          day: 9,
          title: "Trek to Naya Pul then drive to Pokhara",
          description: "On our way to Naya Pul from Jhinu Danda, we get to enjoy the amazing hill landscape of western Nepal. We have lunch on the way. Our trek will end at Naya Pul where we board our vehicle to Pokhara. If the road construction connecting Jhinu Danda to Naya Pul is complete, driving from Jhinu Danda to Pokhara could be another option.",
          maxAltitude: "827m/2,713ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast and Lunch"
        },
        { 
          day: 10,
          title: "Fly to Kathmandu",
          description: "We fly to Kathmandu in the afternoon. After arriving in Kathmandu, we will be escorted to our hotel. We enjoy the day leisurely or catch up on some last minute shopping or explore any landmarks we missed during our first day in Kathmandu. To celebrate the successful completion of our journey, we will have a farewell dinner in the evening.",
          maxAltitude: "1,350m/4,429ft",
          accommodation: "Hotel/Tea House",
          meal: "Breakfast and Dinner"
        },
        { 
          day: 11,
          title: "Final Departure",
          description: "Our journey in Nepal comes to an end today! A Walk in Nepal representative will drop us off at the airport approximately 3 hours before our scheduled flight. On our way to home, we have plenty of time to plan our next adventure in the wonderful country of Nepal.",
          maxAltitude: "-",
          accommodation: "-",
          meal: "Breakfast"
        }
      ],
      includes: [
        "All meals during trek",
        "Experienced English-speaking guide",
        "Porter service",
        "Accommodation in tea houses",
        "All necessary permits",
        "Transportation as per itinerary"
      ],
      excludes: [
        "International flights",
        "Nepal visa fee",
        "Travel insurance",
        "Personal expenses",
        "Tips for guide and porter"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        "https://images.unsplash.com/photo-1551632811-561732d1e306",
        "https://images.unsplash.com/photo-1528181304800-259b08848526"
      ]
    },
    3: {
      id: 3,
      title: "Langtang Valley Trek",
      description: "The Langtang Valley Trek is a beautiful and less crowded trek in the Langtang region, offering stunning views of the Langtang range and an opportunity to experience Tamang culture.",
      arrivalCity: "Kathmandu, Nepal",
      departureCity: "Kathmandu, Nepal",
      lodgingLevel: "Standard",
      meals: "All meals included",
      activity: "Trekking",
      styles: "Nature, Culture",
      attractions: "Tamang Villages, Langtang National Park",
      duration: 8,
      difficulty: "Moderate",
      maxAltitude: "4,984m (Tserko Ri)",
      region: "Langtang",
      season: "Spring (Mar-May) & Autumn (Sep-Nov)",
      groupSize: "2-12 people",
      price: 902,
      highlights: [
        "Langtang National Park",
        "Kyanjin Gompa",
        "Tserko Ri",
        "Tamang culture and hospitality",
        "Cheese factory visit"
      ],
      itinerary: [
        { day: 1, title: "Drive to Syabrubesi", description: "Scenic drive from Kathmandu to Syabrubesi" },
        { day: 2, title: "Trek to Lama Hotel", description: "Walk through forests and along the Langtang River" },
      ],
      includes: [
        "All meals during trek",
        "Experienced English-speaking guide",
        "Porter service",
        "Accommodation in tea houses",
        "All necessary permits",
        "Transportation as per itinerary"
      ],
      excludes: [
        "International flights",
        "Nepal visa fee",
        "Travel insurance",
        "Personal expenses",
        "Tips for guide and porter"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        "https://images.unsplash.com/photo-1551632811-561732d1e306",
        "https://images.unsplash.com/photo-1528181304800-259b08848526"
      ]
    },
    45: {
      id: 45,
      title: "Upper Mustang Trek",
      description: "The Upper Mustang Trek takes you to the hidden kingdom of Lo Manthang, a remote region in the northern part of Nepal that was once an independent kingdom with its own culture and traditions.",
      arrivalCity: "Pokhara, Nepal",
      departureCity: "Pokhara, Nepal",
      lodgingLevel: "Standard",
      meals: "All meals included",
      activity: "Trekking",
      styles: "Adventure, Culture, Off the Beaten Path",
      attractions: "Lo Manthang, Tibetan Culture, Desert Landscapes",
      duration: 14,
      difficulty: "Moderate",
      maxAltitude: "4,200m (Lo La Pass)",
      region: "Mustang",
      season: "Spring (Mar-May) & Autumn (Sep-Nov)",
      groupSize: "2-12 people",
      price: 2105,
      highlights: [
        "The walled city of Lo Manthang",
        "Ancient Buddhist monasteries",
        "Tibetan culture and traditions",
        "Stunning desert landscapes",
        "Kali Gandaki Valley"
      ],
      itinerary: [
        { day: 1, title: "Fly to Pokhara", description: "Scenic flight to Pokhara and preparation day" },
        { day: 2, title: "Fly to Jomsom and trek to Kagbeni", description: "Flight to Jomsom and short trek to Kagbeni" },
      ],
      includes: [
        "All meals during trek",
        "Experienced English-speaking guide",
        "Porter service",
        "Accommodation in tea houses",
        "Special restricted area permit",
        "All necessary permits",
        "Domestic flights"
      ],
      excludes: [
        "International flights",
        "Nepal visa fee",
        "Travel insurance",
        "Personal expenses",
        "Tips for guide and porter"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
        "https://images.unsplash.com/photo-1551632811-561732d1e306",
        "https://images.unsplash.com/photo-1528181304800-259b08848526"
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const trekData = trekDetails[id];
      setTrek(trekData || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-mountain fa-spin"></i>
          <p>Loading trek details...</p>
        </div>
      </div>
    );
  }

  if (!trek) {
    return (
      <div className="not-found">
        <h2>Trek Not Found</h2>
        <p>The trek you're looking for doesn't exist.</p>
        <Link to="/all-treks" className="btn">Browse All Treks</Link>
      </div>
    );
  }

  return (
    <div className="trek-detail-page">
      <div className="trek-hero">
        <div className="trek-hero-content">
          <div className="trek-breadcrumb">
            <Link to="/all-treks">All Treks</Link> / <Link to={`/region/${trek.region.toLowerCase()}`}>{trek.region}</Link> / <span>{trek.title}</span>
          </div>
          <h1>{trek.title}</h1>
          <div className="trek-meta">
            <span><i className="fas fa-calendar-alt"></i> {trek.duration} days</span>
            <span><i className="fas fa-signal"></i> {trek.difficulty}</span>
            <span><i className="fas fa-mountain"></i> Max altitude: {trek.maxAltitude}</span>
            <span><i className="fas fa-users"></i> Group: {trek.groupSize}</span>
          </div>
          <div className="trek-price">
            <span className="price-label">Starting from</span>
            <span className="price-amount">{formatPrice(trek.price)}</span>
            <span className="price-person">per person</span>
          </div>
          <div className="trek-actions">
            <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn btn-primary">
              <i className="fas fa-calendar-check"></i> Book This Trek
            </Link>
            <button className="btn btn-outline">
              <i className="fas fa-download"></i> Download Itinerary
            </button>
          </div>
        </div>
        <div className="trek-hero-image">
          <img src={trek.gallery[0] + "?q=80&w=1200&auto=format&fit=crop"} alt={trek.title} />
        </div>
      </div>

      <div className="trek-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fas fa-info-circle"></i> Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
          onClick={() => setActiveTab('itinerary')}
        >
          <i className="fas fa-route"></i> Itinerary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'includes' ? 'active' : ''}`}
          onClick={() => setActiveTab('includes')}
        >
          <i className="fas fa-check-circle"></i> What's Included
        </button>
        <button 
          className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          <i className="fas fa-images"></i> Gallery
        </button>
      </div>

      <div className="trek-tab-content">
        {activeTab === 'overview' && (
          <div className="tab-pane">
            <div className="overview-grid">
              <div className="overview-description">
                <h3>About This Trek</h3>
                <p>{trek.description}</p>
                
                {/* Overview Grid matching the image exactly */}
                <div className="info-grid">
                  <h4>OVERVIEW</h4>
                  <div className="info-grid-columns">
                    <div className="info-column">
                      <div className="info-item">
                        <div className="info-label">ARRIVAL CITY</div>
                        <div className="info-value">{trek.arrivalCity}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">MEALS</div>
                        <div className="info-value">{trek.meals}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">ATTRACTIONS</div>
                        <div className="info-value">{trek.attractions}</div>
                      </div>
                    </div>
                    <div className="info-column">
                      <div className="info-item">
                        <div className="info-label">DEPARTURE CITY</div>
                        <div className="info-value">{trek.departureCity}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">TRIP GRADE</div>
                        <div className="info-value">{trek.tripGrade || trek.difficulty}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">ACTIVITY</div>
                        <div className="info-value">{trek.activity}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">LODGING LEVEL</div>
                        <div className="info-value">{trek.lodgingLevel}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">MAXIMUM ALTITUDE</div>
                        <div className="info-value">{trek.maxAltitude}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">STYLES</div>
                        <div className="info-value">{trek.styles}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4>Highlights</h4>
                <div className="highlights-grid">
                  {trek.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <h4>Best Time to Go</h4>
                <p>The best seasons for this trek are {trek.season}. During these periods, you can expect clear skies, moderate temperatures, and the best mountain views.</p>
              </div>

              <div className="overview-sidebar">
                <div className="quick-facts">
                  <h4>Quick Facts</h4>
                  <div className="fact-item">
                    <span className="fact-label">Duration</span>
                    <span className="fact-value">{trek.duration} days</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Difficulty</span>
                    <span className="fact-value">{trek.difficulty}</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Max Altitude</span>
                    <span className="fact-value">{trek.maxAltitude}</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Walking Hours</span>
                    <span className="fact-value">4-7 hours/day</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Accommodation</span>
                    <span className="fact-value">Tea Houses</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Meals</span>
                    <span className="fact-value">Full Board</span>
                  </div>
                </div>

                <div className="cta-box">
                  <h4>Ready to Book?</h4>
                  <p>Limited spots available for next season</p>
                  <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn" style={{ width: '100%' }}>
                    Check Availability
                  </Link>
                  <div className="contact-info">
                    <p><i className="fas fa-phone"></i> Call us: +977 01 5555 123</p>
                    <p><i className="fas fa-envelope"></i> trek@jumatrek.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
  <div className="tab-pane">
    <div className="itinerary-container">
      <div className="itinerary-header">
        <h3>Day-by-Day Itinerary</h3>
        <button 
          className="btn btn-outline itinerary-toggle"
          onClick={() => setExpandedItinerary(!expandedItinerary)}
        >
          {expandedItinerary ? (
            <>
              <i className="fas fa-chevron-up"></i> Hide Detailed Itinerary
            </>
          ) : (
            <>
              <i className="fas fa-chevron-down"></i> Show Detailed Itinerary
            </>
          )}
        </button>
      </div>

      {/* Short Itinerary Table (Always Visible) */}
      <div className="short-itinerary">
        <div className="itinerary-table-section">
          <h4>Kathmandu to Annapurna Base Camp</h4>
          <div className="itinerary-table">
            <div className="table-header">
              <div className="table-col">Itinerary</div>
              <div className="table-col">Maximum Altitude</div>
              <div className="table-col">Walking/Hiking</div>
            </div>
            {trek.shortItinerary?.slice(0, 6).map((item, index) => (
              <div key={index} className="table-row">
                <div className="table-col">
                  <span className="day-number">Day {item.day}:</span> {item.itinerary}
                </div>
                <div className="table-col">{item.maxAltitude}</div>
                <div className="table-col">{item.walking}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Itinerary (Conditionally Rendered) */}
      {expandedItinerary && trek.detailedItinerary && (
        <div className="detailed-itinerary">
          <div className="detailed-itinerary-content">
            {trek.detailedItinerary.map((day, index) => (
              <div key={index} className="detailed-day">
                <div className="day-header">
                  <h4>Day {day.day}: {day.title}</h4>
                </div>
                <div className="day-content">
                  <p className="day-description">{day.description}</p>
                  <div className="day-details">
                    <div className="detail-row">
                      <div className="detail-item">
                        <div className="detail-label">MAXIMUM ALTITUDE</div>
                        <div className="detail-value">{day.maxAltitude}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">ACCOMMODATION</div>
                        <div className="detail-value">{day.accommodation}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">MEALS</div>
                        <div className="detail-value">{day.meal}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)}

        {activeTab === 'includes' && (
          <div className="tab-pane">
            <div className="includes-container">
              <div className="includes-section">
                <h3><i className="fas fa-check-circle" style={{ color: 'var(--success)' }}></i> What's Included</h3>
                <div className="includes-list">
                  {trek.includes.map((item, index) => (
                    <div key={index} className="include-item">
                      <i className="fas fa-check"></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="excludes-section">
                <h3><i className="fas fa-times-circle" style={{ color: 'var(--danger)' }}></i> What's Not Included</h3>
                <div className="excludes-list">
                  {trek.excludes.map((item, index) => (
                    <div key={index} className="exclude-item">
                      <i className="fas fa-times"></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="tab-pane">
            <div className="gallery-container">
              <h3>Photo Gallery</h3>
              <div className="gallery-grid">
                {trek.gallery.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img 
                      src={`${image}?q=80&w=800&auto=format&fit=crop`} 
                      alt={`${trek.title} - ${index + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrekDetail;