'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Leaf } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '@/components/ui/section-title';
import { TeamMemberCard } from '@/components/ui/team-member-card';

const teamMembers = [
  {
    name: 'Fatima Jamal',
    role: 'Psychologue en formation',
    image: '/fatima.jpg',
    description: 'Spécialisée dans l\'accompagnement des jeunes face à l\'éco-anxiété, Fatima apporte son expertise en psychologie positive pour transformer les inquiétudes en actions constructives.',
  },
  {
    name: 'Arnold Faho',
    role: 'Ingénieur Big Data',
    image: '/arnold.jpg',
    description: 'Expert en analyse de données, Arnold développe des solutions innovantes pour mesurer et optimiser notre impact sur la communauté des jeunes éco-anxieux.',
  },
  {
    name: 'Valentina Banzet',
    role: 'Cheffe de projet digital',
    image: '/valentina.jpg',
    description: 'Passionnée par l\'innovation sociale, Valentina coordonne le développement de nos programmes et assure leur accessibilité au plus grand nombre.',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Soutien Bienveillant',
    description: 'Nous créons un espace sûr où chacun peut exprimer ses inquiétudes environnementales sans jugement.',
  },
  {
    icon: Leaf,
    title: 'Action Positive',
    description: 'Nous transformons l\'anxiété en initiatives concrètes pour la protection de l\'environnement.',
  },
  {
    icon: Users,
    title: 'Communauté Engagée',
    description: 'Nous rassemblons une communauté de jeunes motivés pour créer un impact positif ensemble.',
  },
];

export default function AboutPage() {
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Mission Section */}
        <motion.section
          ref={missionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={missionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionTitle
            title="Notre Mission pour un Avenir Serein"
            subtitle="Accompagner les jeunes dans leur parcours face à l'éco-anxiété"
            className="mb-8"
          />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chez NeoVifta, nous accompagnons les jeunes dans leur parcours face à l'éco-anxiété, 
            transformant leurs préoccupations en actions positives pour la planète.
          </p>
        </motion.section>

        {/* Values Section */}
        <motion.section
          ref={valuesRef}
          initial={{ opacity: 0 }}
          animate={valuesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionTitle
            title="Nos Valeurs"
            subtitle="Les principes qui guident nos actions"
            className="mb-12"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-card p-8 rounded-lg shadow-md"
              >
                <value.icon className="h-12 w-12 text-neogreen mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Story Section */}
        <motion.section
          ref={storyRef}
          initial={{ opacity: 0 }}
          animate={storyInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionTitle
            title="Notre Histoire"
            subtitle="De la prise de conscience à l'action"
            className="mb-12"
          />
          
          <div className="bg-card p-8 md:p-12 rounded-lg shadow-md">
            <p className="text-muted-foreground mb-4">
              NeoVifta est né d'une prise de conscience : l'éco-anxiété touche de plus en plus 
              de jeunes, mais peu de ressources existent pour les accompagner. Notre fondatrice, 
              elle-même concernée, a décidé de créer un espace où cette anxiété peut se transformer 
              en force motrice pour le changement.
            </p>
            <p className="text-muted-foreground">
              Aujourd'hui, nous sommes fiers d'avoir accompagné des centaines de jeunes dans leur 
              parcours, les aidant à trouver un équilibre entre conscience environnementale et 
              bien-être mental.
            </p>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          ref={teamRef}
          initial={{ opacity: 0 }}
          animate={teamInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="L'Équipe Fondatrice"
            subtitle="Des experts passionnés par l'accompagnement et l'action environnementale"
            className="mb-12"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                {...member}
                delay={index * 0.2}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}