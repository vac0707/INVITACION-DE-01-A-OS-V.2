
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, Pause, Play, MapPin, Sparkles, Heart, Calendar, Clock, 
  ChevronLeft, ChevronRight, MessageCircle, Gift, Shirt, ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --- Components ---

const MagicOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Decorative Bubbles/Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-40 blur-sm"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Fairy icons or sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-pink-200"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <Sparkles size={Math.random() * 20 + 10} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const MusicButton: React.FC<{ isPlaying: boolean; toggle: () => void }> = ({ isPlaying, toggle }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 ${
        isPlaying ? 'bg-pink-400 text-white' : 'bg-white text-pink-500'
      } border border-pink-100 backdrop-blur-sm`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      <span className="font-semibold text-sm">🎵 Mi música</span>
      {isPlaying && (
        <motion.div
          className="flex gap-1 items-center ml-1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </motion.div>
      )}
    </motion.button>
  );
};

const Countdown: React.FC = () => {
  const targetDate = new Date("2027-04-15T17:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm mx-auto mb-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-white/40 backdrop-blur-md border border-white/60 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl md:text-3xl font-bold text-pink-500">{value}</span>
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-pink-400 font-bold mt-2">
            {unit === 'days' ? 'Días' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Min' : 'Seg'}
          </span>
        </div>
      ))}
    </div>
  );
};

const AddToCalendar: React.FC = () => {
  const googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cumpleaños+de+Emilia&details=Celebración+del+primer+añito+de+Emilia&location=Salón+de+Eventos+Zona+Sur&dates=20270415T170000/20270415T210000";

  return (
    <motion.a
      href={googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 text-pink-500 font-semibold text-sm hover:underline mt-4"
    >
      <Calendar size={16} />
      Agendar en mi Calendario
    </motion.a>
  );
};
const Gallery: React.FC = () => {
  const images = [
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1767983543/01_dhicui.jpg",
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1767983543/02_kcdqpz.jpg",
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1767983544/04_nealbk.jpg",
    "https://res.cloudinary.com/dcnynnstm/image/upload/v1767983544/05_fsj24h.jpg"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-sm mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white aspect-[3/4]">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover"
            alt={`Emilia ${index + 1}`}
          />
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={prev} className="p-3 rounded-full bg-white shadow-md text-pink-400 hover:bg-pink-50">
          <ChevronLeft />
        </button>
        <button onClick={next} className="p-3 rounded-full bg-white shadow-md text-pink-400 hover:bg-pink-50">
          <ChevronRight />
        </button>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-pink-400' : 'w-2 bg-pink-200'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`w-full py-12 px-6 ${className}`}
  >
    {children}
  </motion.section>
);

// --- Main App ---

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://res.cloudinary.com/dcnynnstm/video/upload/v1767983977/Y_con_la_primera_risa_de_un_beb%C3%A9_un_hada_m%C3%A1s_ha_de_nacer_ckg8zz.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startInvitation = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    
    // Magical Confetti Launch
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-[100] magic-bg flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-4 bg-pink-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <img 
            src="https://res.cloudinary.com/dcnynnstm/image/upload/v1767983543/03_rhs8eg.jpg" 
            className="w-48 h-48 rounded-full border-4 border-white shadow-xl relative object-cover"
            alt="Emilia"
          />
        </motion.div>
        
        <motion.h1 
          className="font-elegant text-5xl text-pink-500 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Invitación de Emilia
        </motion.h1>
        
        <motion.p className="text-pink-400 mb-8 italic">Estás invitado a un cumpleaños mágico</motion.p>
        
        <button 
          onClick={startInvitation}
          className="bg-pink-400 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-pink-500 transition-all flex items-center gap-3 active:scale-95"
        >
          <Sparkles className="animate-pulse" />
          Abrir Invitación
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen magic-bg overflow-x-hidden pb-24">
      <MagicOverlay />
      
      {/* 1. PORTADA */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          {/* Decorative Floating Elements */}
          <div className="absolute -top-20 -left-10 animate-float opacity-40">
            <div className="w-16 h-20 bg-pink-200 rounded-full blur-lg" />
          </div>
          <div className="absolute top-40 -right-20 animate-float-delayed opacity-30">
            <div className="w-24 h-24 bg-peach-200 rounded-full blur-xl" />
          </div>

          <h2 className="font-cursive text-2xl text-pink-400 mb-2">Estás invitado a un</h2>
          <h1 className="font-elegant text-6xl md:text-8xl text-pink-500 leading-tight mb-8">
            Cumpleaños <br /> Mágico
          </h1>
          
          <motion.div 
            className="relative inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-6 border-2 border-dashed border-pink-200 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-3 border border-peach-300 rounded-full" />
            <img 
              src="https://res.cloudinary.com/dcnynnstm/image/upload/v1767983543/03_rhs8eg.jpg" 
              className="w-56 h-56 md:w-72 md:h-72 rounded-full border-8 border-white shadow-2xl relative object-cover"
              alt="Emilia Protagonista"
            />
          </motion.div>
          
          <div className="mt-8">
            <motion.h2 
              initial={{ letterSpacing: "0px" }}
              animate={{ letterSpacing: "4px" }}
              className="font-elegant text-7xl text-pink-600 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]"
            >
              Emilia
            </motion.h2>
            <p className="text-xl text-pink-400 font-semibold mt-2 tracking-widest uppercase">Cumple 1 añito</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-1 h-12 bg-gradient-to-b from-pink-400 to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* 2. FRASE EMOTIVA */}
      <Section className="text-center">
        <div className="glass-card p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-2 right-2 text-pink-100"><Sparkles size={40} /></div>
          <div className="absolute bottom-2 left-2 text-pink-100 opacity-50"><Heart size={30} fill="currentColor" /></div>
          
          <motion.p 
            className="font-cursive text-3xl md:text-4xl text-pink-500 leading-relaxed italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            “Con la primera risa de un bebé, <br /> un hada más ha de nacer”
          </motion.p>
        </div>
      </Section>

      {/* 3. GALERÍA */}
      <Section className="text-center bg-white/30">
        <h3 className="font-elegant text-5xl text-pink-400 mb-8">Nuestros momentos</h3>
        <Gallery />
      </Section>

      {/* 4. DATOS DEL EVENTO */}
      <Section className="flex flex-col items-center">
        <Countdown />
        
        <div className="w-full max-w-md glass-card rounded-[40px] p-8 md:p-12 shadow-inner border-2 border-white/80">
          <h3 className="font-elegant text-5xl text-center text-pink-500 mb-10 underline decoration-peach-200 underline-offset-8 decoration-wavy">
            Detalles de la Fiesta
          </h3>

          <div className="mb-10 overflow-hidden rounded-2xl border-2 border-white shadow-md">
            <img 
              src="https://villaparaiso.com.ar/img/galeria/full/villaparaisorecepciones_p_1.jpg" 
              alt="Villa Paraiso Recepciones" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="bg-pink-100 p-4 rounded-2xl text-pink-500">
                <Calendar size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-pink-400 font-bold mb-1">Fecha</p>
                <p className="text-xl font-semibold text-gray-700">15 de Abril de 2027</p>
                <AddToCalendar />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-orange-50 p-4 rounded-2xl text-orange-400">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-1">Hora</p>
                <p className="text-xl font-semibold text-gray-700">5:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-purple-100 p-4 rounded-2xl text-purple-500">
                <MapPin size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-1">Lugar</p>
                <p className="text-xl font-semibold text-gray-700">Villa Paraiso Recepciones</p>
              </div>
            </div>
          </div>

          <motion.a
            href="https://maps.app.goo.gl/Pd1LYLEJUTij1ibm9"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 w-full bg-gradient-to-r from-pink-400 to-orange-300 text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 shadow-lg shadow-pink-200/50"
          >
            <MapPin size={20} />
            Ver ubicación en Mapa
          </motion.a>
        </div>
      </Section>

      {/* 4.5 DRESS CODE & GIFTS */}
      <Section className="grid md:grid-cols-2 gap-8 text-center max-w-4xl mx-auto">
        <div className="glass-card p-8 rounded-3xl group transition-all duration-500">
          <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 group-hover:scale-110 transition-transform">
            <Shirt size={32} />
          </div>
          <h4 className="font-elegant text-3xl text-pink-500 mb-2">Dress Code</h4>
          <p className="text-gray-600 font-medium">Formal / Semiformal</p>
          <p className="text-pink-400 text-sm mt-2 font-cursive text-xl">“Viste tu mejor sonrisa”</p>
        </div>

        <div className="glass-card p-8 rounded-3xl group transition-all duration-500">
          <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-400 group-hover:scale-110 transition-transform">
            <Gift size={32} />
          </div>
          <h4 className="font-elegant text-3xl text-orange-500 mb-2">Regalos</h4>
          <p className="text-gray-600 font-medium mb-1">Lluvia de Sobres</p>
          <p className="text-gray-500 text-xs leading-relaxed italic">
            Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, dispondremos de un baul para sobres.
          </p>
        </div>
      </Section>

      {/* 5. CONFIRMACIÓN */}
      <Section className="text-center">
        <div className="py-8">
          <Heart className="mx-auto text-pink-300 mb-6 animate-pulse" fill="currentColor" size={32} />
          <h4 className="font-cursive text-3xl text-pink-400 mb-6">Confirma tu asistencia:</h4>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <motion.a
                href="https://wa.me/1234567890?text=Hola!+Confirmo+mi+asistencia+al+cumpleaños+de+Emilia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-3"
              >
                <MessageCircle size={24} />
                Confirmar por WhatsApp
              </motion.a>
              <p className="text-pink-300 font-cursive text-2xl hidden sm:block">o</p>
              <p className="text-gray-500 text-sm">Por favor confirmar antes del 1 de Abril</p>
          </div>
        </div>
        
        <div className="mt-12">
          <h4 className="font-cursive text-3xl text-pink-400 mb-4">Con amor, sus papás:</h4>
          <div className="space-y-1">
            <p className="text-2xl font-elegant text-gray-700">David Alarcón Ramírez</p>
            <p className="text-2xl font-elegant text-gray-700">Daniela Zavala Mendoza</p>
          </div>
        </div>
      </Section>

      {/* 6. CIERRE FINAL */}
      <Section className="text-center pb-20">
        <motion.div 
          className="relative px-8 py-16 rounded-[50px] bg-gradient-to-b from-white/60 to-transparent"
          whileInView={{ 
            boxShadow: "0 20px 50px rgba(255, 182, 193, 0.2)"
          }}
        >
          <h2 className="font-elegant text-5xl text-pink-500 mb-6 leading-relaxed">
            Te esperamos para compartir este día tan especial
          </h2>
          <div className="flex justify-center gap-3">
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
               <Sparkles className="text-peach-400" size={30} />
             </motion.div>
             <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}>
               <Sparkles className="text-pink-300" size={20} />
             </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Music Control Floating */}
      <MusicButton isPlaying={isPlaying} toggle={toggleMusic} />

      {/* Bottom Decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-0">
         <div className="absolute inset-0 bg-gradient-to-t from-pink-50 to-transparent opacity-80" />
         <div className="flex justify-around items-end h-full px-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-12 h-16 rounded-t-full bg-pink-100 border-x border-pink-200"
                animate={{ height: [40, 60, 40] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
              />
            ))}
         </div>
      </div>
    </div>
  );
}
