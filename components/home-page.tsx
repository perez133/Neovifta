'use client';

import { ArrowRight, Leaf, Heart, Users, Globe, BookOpen, Target, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionTitle } from '@/components/ui/section-title';
import { ServiceCard } from '@/components/ui/service-card';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const testimonials = [
  {
    name: "Marie D.",
    role: "Étudiante, 21 ans",
    testimonial: "Chaque nouvelle concernant le climat me paralyse. Je me sens impuissante face à l'ampleur des changements climatiques et j'ai du mal à me projeter dans l'avenir."
  },
  {
    name: "Lucas P.",
    role: "Lycéen, 17 ans",
    testimonial: "Je passe des heures à lire des articles sur l'environnement. Cette obsession affecte mon sommeil et mes études, mais je ne peux pas m'empêcher de m'inquiéter pour notre planète."
  },
  {
    name: "Chloé M.",
    role: "Étudiante en biologie, 23 ans",
    testimonial: "En tant qu'étudiante en sciences, je comprends les enjeux climatiques de manière très concrète. Cette connaissance approfondie rend mon anxiété encore plus intense au quotidien."
  }
];

export default function HomePage() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 16 },
      },
    },
    loop: true,
    mode: "snap",
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/video-poster.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/eco-anxiety.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 z-[1]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-[2] max-w-6xl mx-auto px-4 text-center text-white"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Retrouve la paix dans un monde éco-conscient
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            73% des jeunes de 16-25 ans sont touchés par l&apos;éco-anxiété. NeoVifta t&apos;aide à transformer cette préoccupation en action positive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/a-propos">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto"
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Key Pillars Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Nos Piliers"
            subtitle="Une approche holistique pour transformer l'éco-anxiété en force"
            className="mb-12"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={BookOpen}
              title="Éducation"
              description="Comprendre l'éco-anxiété et acquérir les outils pour naviguer ces émotions"
              delay={0.2}
            />
            <ServiceCard
              icon={Users}
              title="Communauté"
              description="Rejoindre un réseau de jeunes engagés qui se soutiennent mutuellement"
              delay={0.4}
            />
            <ServiceCard
              icon={Target}
              title="Action"
              description="Transformer la préoccupation en engagement concret pour l'environnement"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Notre Accompagnement"
            subtitle="Un soutien adapté à chaque étape de ton parcours"
            className="mb-12"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Heart}
              title="Soutien Psychologique"
              description="Techniques guidées par des experts pour canaliser l'éco-anxiété"
              delay={0.2}
            />
            <ServiceCard
              icon={Shield}
              title="Espace Sécurisé"
              description="Un environnement bienveillant pour exprimer tes inquiétudes"
              delay={0.4}
            />
            <ServiceCard
              icon={Globe}
              title="Impact Positif"
              description="Des actions concrètes pour contribuer au changement"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 px-4 bg-neogreen text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Notre Manifesto
            </h2>
            <p className="text-xl leading-relaxed">
              Chez NeoVifta, nous croyons que l&apos;éco-anxiété est un appel à agir, pas une faiblesse. Notre nom reflète notre vision : &quot;Neo&quot; signifie nouveau, &quot;Vita&quot; signifie vie, et le &quot;F&quot; est un hommage à nos fondateurs et à l&apos;unité de notre équipe. Ensemble, transformons les émotions climatiques en solutions humaines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Témoignages"
            subtitle="L'éco-anxiété vue par les jeunes"
            className="mb-12"
          />

          <div ref={sliderRef} className="keen-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="keen-slider__slide">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4">{testimonial.testimonial}</p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-neogreen text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rejoins le Mouvement
            </h2>
            <p className="text-xl mb-8">
              Ensemble, créons un impact positif pour notre planète et notre bien-être
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-white text-neogreen hover:bg-gray-100"
              >
                Nous contacter <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}