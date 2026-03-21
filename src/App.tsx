import { useState, useEffect, useRef, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const FaqItem = ({ 
  question, 
  answer, 
  index, 
  activeFaq, 
  toggleFaq,
  delay
}: { 
  question: string; 
  answer: ReactNode; 
  index: number; 
  activeFaq: number | null; 
  toggleFaq: (index: number | null) => void;
  delay: string;
}) => {
  const isActive = activeFaq === index;

  return (
    <div className="reveal" style={{ transitionDelay: delay }}>
      <div className={`faq-item ${isActive ? 'active' : ''}`}>
        <button className="faq-question" onClick={() => toggleFaq(isActive ? null : index)}>
          <span>{question}</span>
          <div className="faq-icon"></div>
        </button>
        <div className="faq-answer">
          <div className="faq-answer-inner">
            <div className="faq-answer-content">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const heroImages = [
  {
    desktop: 'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be7b9628f2e3da00c61ee0_Frame%208%20(7).png',
    mobile: 'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bbf5399a5fb21e4db20559_ENO_2005%20(2)%20(1).jpg'
  },
  {
    desktop: 'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be7b979103d77b3a569e4f_Frame%208%20(5).png',
    mobile: 'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc14251611af77e8c20449_ENO_2170%20(1).jpg'
  },
  {
    desktop: 'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be7b9676aba3c08af97596_Frame%208%20(6).png',
    mobile: 'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc142556bb6076830f849e_ENO_2196%20(1).jpg'
  }
];

const galleryImages = [
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be7623d18ab5e99e99c6b0_WhatsApp%20Image%202026-03-21%20at%2011.34.23.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be7623ad515e4387d02592_WhatsApp%20Image%202026-03-21%20at%2011.39.17.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be7444d4f024577925bc60_WhatsApp%20Image%202026-03-21%20at%2011.32.41.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be74446a1cc6567af64d68_WhatsApp%20Image%202026-03-21%20at%2011.32.40.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be7444c76cdbe1cd8e8cd5_WhatsApp%20Image%202026-03-21%20at%2011.32.41%20(1).jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69be74440152fd73dce4705f_WhatsApp%20Image%202026-03-21%20at%2011.32.41%20(2).jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc142556bb6076830f849e_ENO_2196%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc14250d179aa2621230a7_ENO_2258%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc142599d0d256ccf8f41c_ENO_2270%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc14251611af77e8c20449_ENO_2170%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc14265f87fc72d9196e38_ENO_2291%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc17e0186240a3252e0289_ENO_2078%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc179dc6887d09ff3a325d_ENO_2118%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc27ddaeb7dbb81e8d39d0_ENO_1923%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc27dd91a12ccd5a2cd429_ENO_1957%20(1).jpg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e68113dca5fc315e207_WhatsApp%20Image%202026-03-18%20at%2020.01.22%20(1).jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e68ffb25475e7cbc8f2_WhatsApp%20Image%202026-03-18%20at%2020.00.27.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e680480af5d9fcf5fc6_WhatsApp%20Image%202026-03-18%20at%2020.00.26.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e68fcaa2a7cce97f08c_WhatsApp%20Image%202026-03-18%20at%2020.00.30.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e6875058f0ad677a900_WhatsApp%20Image%202026-03-18%20at%2020.01.21%20(1).jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e68dceb22a62453a9c4_WhatsApp%20Image%202026-03-18%20at%2020.01.22.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e68de39e075c2e7199d_WhatsApp%20Image%202026-03-18%20at%2020.01.21.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e688ce21bd866731e61_WhatsApp%20Image%202026-03-18%20at%2020.01.22%20(2).jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e68ca541235ccd4208d_WhatsApp%20Image%202026-03-18%20at%2020.01.23.jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e67cbf25e10f9871237_WhatsApp%20Image%202026-03-18%20at%2020.01.23%20(2).jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e68f325dbebafa15e69_WhatsApp%20Image%202026-03-18%20at%2020.01.23%20(1).jpeg',
  'https://cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc3e68fbda6ac4e5b3314b_WhatsApp%20Image%202026-03-18%20at%2020.02.32.jpeg'
];

const expectData = [
  {
    icon: '✦',
    title: 'Career & Networking Sessions',
    shortDesc: 'Expert-led panels and mentorship circles to chart your path beyond house job.',
    longDesc: 'Featuring keynote speakers from top medical institutions, CV review workshops, and networking mixers with consultants and hospital directors. Learn about residency programs, alternative medical careers, and international pathways.'
  },
  {
    icon: '⚽',
    title: 'Sports & Wellness',
    shortDesc: 'Friendly inter-hospital competition across football, athletics, and more.',
    longDesc: 'Compete in the highly anticipated inter-hospital football tournament, track events, and board games. Includes wellness sessions focused on physician mental health and work-life balance.'
  },
  {
    icon: '🤝',
    title: 'Community Outreach',
    shortDesc: 'Give back to the communities we serve — a reminder of why we chose medicine.',
    longDesc: 'A medical mission providing free consultations, health screenings, and medications to underserved communities within Lagos Island, demonstrating our commitment to public health.'
  },
  {
    icon: '🎭',
    title: 'Costume & Memorials',
    shortDesc: 'Celebrate creativity and honour those who\'ve shaped our medical journey.',
    longDesc: 'A vibrant day of creative expression where doctors trade scrubs for costumes, alongside a solemn memorial honoring colleagues we\'ve lost and celebrating their contributions.'
  },
  {
    icon: '🏛️',
    title: 'Courtesy Visits',
    shortDesc: 'Engage with key stakeholders including the Lagos State Governor\'s office.',
    longDesc: 'Official visits to the Lagos State Governor\'s Office and the Oba of Lagos, strengthening the bond between healthcare providers and state leadership while advocating for better healthcare policies.'
  },
  {
    icon: '🍽️',
    title: 'Dinner & Awards',
    shortDesc: 'A grand closing evening of recognition, fine dining, and celebration.',
    longDesc: 'The grand finale featuring a red-carpet gala, three-course dinner, live entertainment, and awards recognizing outstanding house officers across various departments and hospitals.'
  }
];

const calculateTimeLeft = () => {
  const difference = +new Date('2026-04-26T00:00:00') - +new Date();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
};

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heroBgTranslate, setHeroBgTranslate] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [expandedExpect, setExpandedExpect] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      setHeroBgTranslate(window.scrollY * 0.4);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const openLightbox = (imgUrl: string) => {
    setLightboxImage(imgUrl);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setLightboxImage(null), 300);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* NAVIGATION */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">Lagos Island HOW '26</a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#timeline">Timeline</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#tickets" className="nav-cta">Get Your Ticket</a></li>
          </ul>
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
            id="hamburger" 
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#about" onClick={closeMobileMenu}>About</a>
        <a href="#timeline" onClick={closeMobileMenu}>Timeline</a>
        <a href="#gallery" onClick={closeMobileMenu}>Gallery</a>
        <a href="#tickets" onClick={closeMobileMenu}>Tickets</a>
        <a href="#faq" onClick={closeMobileMenu}>FAQ</a>
        <a href="#team" onClick={closeMobileMenu}>Team</a>
      </div>

      {/* HERO */}
      <section className="hero" id="hero">
        {heroImages.map((img, idx) => (
          <div 
            key={idx}
            className={`hero-bg-slide ${idx === currentHeroImage ? 'active' : ''}`}
            style={{ 
              transform: `translate3d(0, ${heroBgTranslate}px, 0)` 
            }}
          >
            <picture>
              <source media="(min-width: 768px)" type="image/webp" srcSet={`https://wsrv.nl/?url=${encodeURIComponent(img.desktop)}&output=webp&w=1600`} />
              <source media="(max-width: 767px)" type="image/webp" srcSet={`https://wsrv.nl/?url=${encodeURIComponent(img.mobile)}&output=webp&w=800`} />
              <img 
                src={`https://wsrv.nl/?url=${encodeURIComponent(img.mobile)}&w=800`} 
                alt="Lagos Island HOW '26" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
              />
            </picture>
          </div>
        ))}
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="section-label">26th April — 1st May 2026</div>
          <h1 className="hero-title">Lagos Island<br/>House Officers' Week</h1>
          <p className="hero-theme">Theme: The Island of Healthcare</p>
          
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.minutes}</span>
              <span className="countdown-label">Mins</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.seconds}</span>
              <span className="countdown-label">Secs</span>
            </div>
          </div>

          <p className="hero-meta">Lagos State &nbsp;·&nbsp; Nigeria</p>
          <a href="#about" className="hero-btn">Explore the Week</a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image reveal">
              <img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc11abf465330c42678c45_ENO_2004%20(1).jpg&output=webp&w=800" alt="About the Week" referrerPolicy="no-referrer" />
            </div>
            <div className="about-divider"></div>
            <div className="about-text reveal">
              <div className="section-label">About the Week</div>
              <h2>This Isn't Ordinary.</h2>
              <p className="tagline">There's no island of knowledge — but there's one Island of Healthcare.</p>
              <p>Lagos Island House Officers' Week is a cultural moment — six days where medicine meets Lagos's most storied geography. It's where camaraderie meets career growth, where sports meet celebration, and where the next generation of medical professionals come together to share stories worth telling.</p>
              <p>Across six curated days, house officers from three of Lagos Island's most historic hospitals will gather for career sessions, community outreach, sports, and an unforgettable closing dinner. You'll leave with more than memories — you'll leave with a network.</p>
              <div className="host-hospitals">
                General Hospital Odan<span className="dot">•</span>Lagos Island Maternity<span className="dot">•</span>Massey Street Children Hospital
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="expect" id="expect">
        <div className="container">
          <div className="expect-header reveal">
            <div className="section-label">What to Expect</div>
            <h2>Six Days, One Island</h2>
          </div>
          <div className="expect-grid">
            {expectData.map((item, idx) => (
              <div 
                key={idx} 
                className="reveal" 
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div 
                  className={`expect-card ${expandedExpect === idx ? 'expanded' : ''}`} 
                  onClick={() => setExpandedExpect(expandedExpect === idx ? null : idx)}
                >
                  <div className="expect-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.shortDesc}</p>
                  <div className="expect-details">
                    <p>{item.longDesc}</p>
                  </div>
                  <button className="expect-toggle">
                    {expandedExpect === idx ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline" id="timeline">
        <div className="container">
          <div className="timeline-header reveal">
            <div className="section-label">The Schedule</div>
            <h2>Six Days of Extraordinary</h2>
          </div>

          <div className="timeline-list">
            <div className="timeline-item reveal">
              <div className="timeline-date-block">
                <span className="timeline-day-num">26</span>
                <span className="timeline-month">Apr</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-day-label">Day 01</div>
                <h3 className="timeline-title">Courtesy Visit to the Lagos State Governor</h3>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date-block">
                <span className="timeline-day-num">27</span>
                <span className="timeline-month">Apr</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-day-label">Day 02</div>
                <h3 className="timeline-title">Career Conference</h3>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date-block">
                <span className="timeline-day-num">28</span>
                <span className="timeline-month">Apr</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-day-label">Day 03</div>
                <h3 className="timeline-title">Costume &amp; Memorials</h3>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date-block">
                <span className="timeline-day-num">29</span>
                <span className="timeline-month">Apr</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-day-label">Day 04</div>
                <h3 className="timeline-title">Outreach &amp; Giveback</h3>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date-block">
                <span className="timeline-day-num">30</span>
                <span className="timeline-month">Apr</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-day-label">Day 05</div>
                <h3 className="timeline-title">Sports</h3>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date-block">
                <span className="timeline-day-num">01</span>
                <span className="timeline-month">May</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-day-label">Day 06</div>
                <h3 className="timeline-title">Dinner &amp; Awards Ceremony</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="gallery-header reveal">
            <div className="section-label">The Gallery</div>
            <h2>Lagos Island House Officers</h2>
          </div>
          <div className="gallery-marquee-container">
            <div className="gallery-marquee-track">
              {galleryImages.map((src, idx) => (
                <div key={`set1-${idx}`} className="gallery-item" onClick={() => openLightbox(`https://wsrv.nl/?url=${encodeURIComponent(src)}&output=webp&w=1600`)}>
                  <img src={`https://wsrv.nl/?url=${encodeURIComponent(src)}&output=webp&w=800`} alt={`Gallery ${idx + 1}`} className="gallery-item-inner" referrerPolicy="no-referrer" />
                </div>
              ))}
              {galleryImages.map((src, idx) => (
                <div key={`set2-${idx}`} className="gallery-item" onClick={() => openLightbox(`https://wsrv.nl/?url=${encodeURIComponent(src)}&output=webp&w=1600`)}>
                  <img src={`https://wsrv.nl/?url=${encodeURIComponent(src)}&output=webp&w=800`} alt={`Gallery ${idx + 1}`} className="gallery-item-inner" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <div 
        className={`lightbox ${isLightboxOpen ? 'open' : ''}`} 
        id="lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        <button className="lightbox-close" onClick={closeLightbox}>✕</button>
        <div className="lightbox-content">
          {lightboxImage && <img src={lightboxImage} alt="Enlarged gallery view" referrerPolicy="no-referrer" />}
        </div>
      </div>

      {/* TICKETS */}
      <section className="tickets" id="tickets">
        <div className="container">
          <div className="tickets-header reveal">
            <div className="section-label">Tickets</div>
            <h2>Secure Your Spot</h2>
          </div>
          <div className="tickets-grid">
            <div className="ticket-card recommended reveal">
              <div className="ticket-badge">Recommended</div>
              <div className="section-label" style={{ marginTop: '8px' }}>Option A</div>
              <div className="ticket-price">₦50,000</div>
              <div className="ticket-desc">One-time full payment</div>
              <ul className="ticket-features">
                <li>Access to all six days of events</li>
                <li>Dinner &amp; Awards ceremony entry</li>
                <li>Official event merchandise</li>
                <li>Immediate confirmation</li>
              </ul>
              <a href="https://paystack.shop/pay/lagosislandhow26" target="_blank" rel="noopener noreferrer" className="ticket-btn">Pay Now</a>
            </div>
            <div className="ticket-card reveal" style={{ transitionDelay: '100ms' }}>
              <div className="ticket-badge grey">Flexible</div>
              <div className="section-label" style={{ marginTop: '8px' }}>Option B</div>
              <div className="ticket-price">₦25,000</div>
              <div className="ticket-desc">× 2 instalments</div>
              <ul className="ticket-features">
                <li>All events after 2nd payment</li>
                <li>Dinner &amp; Awards ceremony entry</li>
                <li>Official event merchandise</li>
                <li>Spread the cost over two payments</li>
              </ul>
              <a href="https://paystack.shop/pay/lagosislandhow26-installment" target="_blank" rel="noopener noreferrer" className="ticket-btn outline">Start Plan</a>
            </div>
          </div>
          <p className="tickets-note">Payment deadline: 24th April 2026. Payments are non-refundable.<br/>Open to Medical and Dental House Officers at General Hospital Lagos, Lagos Island Maternity Hospital, and Massey Street Children Hospital.</p>
        </div>
      </section>

      {/* SPONSOR */}
      <section className="sponsor" id="sponsor">
        <div className="container">
          <div className="sponsor-inner reveal">
            <div className="section-label">Partnership</div>
            <h2>Become a Sponsor Today</h2>
            <p>Put your brand in front of hundreds of young medical professionals across Lagos Island's three flagship hospitals. From career conferences to sports events to a headline dinner, our week offers unmatched visibility with Nigeria's next generation of healthcare leaders.</p>
            <div className="sponsor-ctas">
              <a href="mailto:sponsor@lagosislandhow.com" className="sponsor-btn primary">Email Us</a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="sponsor-btn secondary">Chat on WhatsApp</a>
            </div>
            <p className="sponsor-contact">Contact: Chiedozie Obianyor, Head of Sponsorships &amp; Partnerships</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="faq-header reveal">
            <div className="section-label">FAQ</div>
            <h2>Common Questions</h2>
          </div>
          <div className="faq-list">
            <FaqItem 
              index={0}
              activeFaq={activeFaq}
              toggleFaq={setActiveFaq}
              delay="0ms"
              question="Can I pay in instalments?"
              answer="Yes. Option B allows you to split the ₦50,000 fee into two payments of ₦25,000 each. Full access to all events is granted after the second instalment is confirmed."
            />
            <FaqItem 
              index={1}
              activeFaq={activeFaq}
              toggleFaq={setActiveFaq}
              delay="60ms"
              question="Who is eligible to attend?"
              answer="The event is open to Medical and Dental House Officers currently posted to General Hospital Odan, Lagos Island Maternity Hospital, or Massey Street Children Hospital."
            />
            <FaqItem 
              index={2}
              activeFaq={activeFaq}
              toggleFaq={setActiveFaq}
              delay="120ms"
              question="Is there a refund policy?"
              answer="All payments are non-refundable. Please ensure you're committed before completing your purchase."
            />
            <FaqItem 
              index={3}
              activeFaq={activeFaq}
              toggleFaq={setActiveFaq}
              delay="180ms"
              question="What is the payment deadline?"
              answer="All payments must be completed by 24th April 2026, two days before the event begins."
            />
            <FaqItem 
              index={4}
              activeFaq={activeFaq}
              toggleFaq={setActiveFaq}
              delay="240ms"
              question="Will I have to work during the week?"
              answer="Work schedules during House Officers' Week are coordinated with hospital management. The organising committee works to ensure maximum participation, but essential duties may still apply."
            />
            <FaqItem 
              index={5}
              activeFaq={activeFaq}
              toggleFaq={setActiveFaq}
              delay="300ms"
              question="How do I become a sponsor?"
              answer="Reach out to Chiedozie Obianyor, Head of Sponsorships & Partnerships, via the email or WhatsApp links in the Sponsor section above. We'd love to hear from you."
            />
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team" id="team">
        <div className="container">
          <div className="team-header reveal">
            <div className="section-label">The Committee</div>
            <h2>Meet the Team</h2>
          </div>
          <div className="team-grid">
            <div className="team-card reveal" style={{ transitionDelay: '0ms' }}>
              <div className="team-photo"><img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc1ca5e7b083e30ae4916c_Olushina%20O%20(1).%20Oladeji%20(Chief%20Medical%20House%20Officer)%20(1).webp&output=webp&w=400" alt="Olushina Oladeji" className="team-photo-inner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} referrerPolicy="no-referrer" /></div>
              <div className="team-name">Olushina Oladeji</div>
              <div className="team-title">Chief Medical House Officer</div>
            </div>
            <div className="team-card reveal" style={{ transitionDelay: '60ms' }}>
              <div className="team-photo"><img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc1abdfb6a26fc1443be40_Vivian%20Oyakhilome%20(Secretary)%20(1).jpg&output=webp&w=400" alt="Vivian Oyakhilome" className="team-photo-inner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} referrerPolicy="no-referrer" /></div>
              <div className="team-name">Vivian Oyakhilome</div>
              <div className="team-title">Secretary, HOW 2026</div>
            </div>
            <div className="team-card reveal" style={{ transitionDelay: '120ms' }}>
              <div className="team-photo"><img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc1abdcb526ee891b457a3_Chiedozie%20Obianyor%20(Head%20of%20Sponsorships)%20(1).jpg&output=webp&w=400" alt="Chiedozie Obianyor" className="team-photo-inner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} referrerPolicy="no-referrer" /></div>
              <div className="team-name">Chiedozie Obianyor</div>
              <div className="team-title">Head of Sponsorships</div>
            </div>
            <div className="team-card reveal" style={{ transitionDelay: '180ms' }}>
              <div className="team-photo"><img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc1abde7b083e30ae40ab2_Opeyemi%20Ilori%20(Co-Head%20of%20Events).jpg&output=webp&w=400" alt="Ilori Opeyemi" className="team-photo-inner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} referrerPolicy="no-referrer" /></div>
              <div className="team-name">Ilori Opeyemi</div>
              <div className="team-title">Co-Head of Events</div>
            </div>
            <div className="team-card reveal" style={{ transitionDelay: '240ms' }}>
              <div className="team-photo"><img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc1abd545739fe7770352e_Vivian%20Oyedapo%20(Co-Head%20of%20Events)%20(1).jpg&output=webp&w=400" alt="Vivian Oyedapo" className="team-photo-inner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} referrerPolicy="no-referrer" /></div>
              <div className="team-name">Vivian Oyedapo</div>
              <div className="team-title">Co-Head of Events</div>
            </div>
            <div className="team-card reveal" style={{ transitionDelay: '300ms' }}>
              <div className="team-photo"><img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc1abd9497fee6c1a198e9_Kolade%20Faleke%20(Head%20of%20Branding)%20(1).jpg&output=webp&w=400" alt="Kolade Faleke" className="team-photo-inner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} referrerPolicy="no-referrer" /></div>
              <div className="team-name">Kolade Faleke</div>
              <div className="team-title">Head of Branding</div>
            </div>
            <div className="team-card reveal" style={{ transitionDelay: '360ms' }}>
              <div className="team-photo"><img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc1abd60e293714acc0967_Ridwan%20Ajibola%20(Co-Head%20of%20Logistics)%20(1).jpg&output=webp&w=400" alt="Ridwan Ajibola" className="team-photo-inner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} referrerPolicy="no-referrer" /></div>
              <div className="team-name">Ridwan Ajibola</div>
              <div className="team-title">Co-Head of Logistics</div>
            </div>
            <div className="team-card reveal" style={{ transitionDelay: '420ms' }}>
              <div className="team-photo"><img src="https://wsrv.nl/?url=cdn.prod.website-files.com/69bbf48d2d81217887d76b48/69bc1abc86cae41b9a809152_Lanre%20Owolabi%20(Co-Head%20of%20Logistics)%20(1).jpg&output=webp&w=400" alt="Lanre Owolabi" className="team-photo-inner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} referrerPolicy="no-referrer" /></div>
              <div className="team-name">Lanre Owolabi</div>
              <div className="team-title">Co-Head of Logistics</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-hospitals">
              General Hospital Odan<span className="dot">•</span>Lagos Island Maternity<span className="dot">•</span>Massey Street Children Hospital
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
            </div>
            <p className="footer-tagline">Designed with pride on Lagos Island.</p>
            <p className="footer-copy">&copy; 2026 Lagos Island House Officers' Week. All rights reserved.</p>
            <a href="#hero" className="back-to-top">↑ Back to Top</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function ThankYou() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center', 
      padding: '2rem', 
      backgroundColor: 'var(--cream, #F9F6F0)',
      fontFamily: 'var(--sans, "Satoshi", sans-serif)'
    }}>
      <div style={{ 
        backgroundColor: 'var(--white, #FFFFFF)', 
        padding: '4rem 3rem', 
        borderRadius: '8px', 
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)', 
        maxWidth: '500px', 
        width: '100%',
        borderTop: '4px solid var(--gold, #8B6F47)'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: 'rgba(139, 111, 71, 0.1)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 2rem' 
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #8B6F47)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '400', 
          color: 'var(--black, #1A1A1A)', 
          marginBottom: '1rem',
          fontFamily: 'var(--serif, "Austin", serif)'
        }}>Payment Successful</h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--grey, #999999)', 
          marginBottom: '2.5rem', 
          lineHeight: '1.6' 
        }}>
          Thank you for securing your ticket to the Lagos Island House Officers' Week 2026. We can't wait to see you there!
        </p>
        <Link to="/" className="ticket-btn" style={{ textDecoration: 'none', maxWidth: '250px', margin: '0 auto' }}>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}
