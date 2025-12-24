import React, { useState } from 'react';

const FAQ = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqData = [
    {
      question: "What fitness level do I need for trekking in Nepal?",
      answer: "Most treks require a good level of fitness. You should be comfortable walking 5-7 hours daily with a daypack. We offer treks for all fitness levels, from easy walks to challenging expeditions. Our training guide can help you prepare."
    },
    {
      question: "Do I need previous trekking experience?",
      answer: "While experience is helpful, it's not essential for many popular treks. Our expert guides will support you throughout the journey. For beginners, we recommend starting with easier treks like Ghorepani Poon Hill."
    },
    {
      question: "What is the accommodation like during treks?",
      answer: "Accommodation varies by trek. In popular areas like Everest and Annapurna, you'll stay in tea houses - basic lodges with private or shared rooms. In remote areas, we use camping with tents. All accommodation is arranged by our team."
    },
    {
      question: "How do I handle altitude sickness?",
      answer: "We design itineraries with proper acclimatization. Our guides are trained to recognize symptoms and respond appropriately. We recommend gradual ascent, staying hydrated, and considering preventive medication after consulting your doctor."
    },
    {
      question: "What happens in case of emergency?",
      answer: "All our treks include comprehensive emergency evacuation insurance. Our guides carry satellite phones for communication. In case of serious illness or injury, we can arrange helicopter evacuation to Kathmandu hospitals."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Trekking FAQs</h2>
        <p className="section-subtitle">Answers to common questions about trekking in Nepal</p>
      </div>
      
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <i className={`fas fa-chevron-${activeFAQ === index ? 'up' : 'down'}`}></i>
            </div>
            {activeFAQ === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;