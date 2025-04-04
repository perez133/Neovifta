'use client';

import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { Building2, Users2, GraduationCap, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const desiredPartners = [
  {
    category: "Institutions Scientifiques",
    icon: GraduationCap,
    items: [
      {
        name: "Centres de Recherche",
        description: "Collaboration avec le CNRS et l'INSERM pour valider scientifiquement nos méthodologies et étudier l'impact de l'éco-anxiété",
        type: "Partenaire Recherche",
      },
      {
        name: "Universités",
        description: "Partenariats pour développer des programmes de soutien aux étudiants et participer à des études sur la santé mentale environnementale",
        type: "Partenaire Académique",
      },
    ]
  },
  {
    category: "Réseaux Médicaux",
    icon: HeartPulse,
    items: [
      {
        name: "Professionnels de Santé Mentale",
        description: "Psychologues et thérapeutes spécialisés dans l'accompagnement des jeunes face à l'éco-anxiété",
        type: "Partenaire Santé",
      },
      {
        name: "Centres de Santé",
        description: "Intégration de nos programmes dans les structures de santé existantes pour une meilleure accessibilité",
        type: "Partenaire Médical",
      },
    ]
  },
  {
    category: "Institutions Publiques",
    icon: Building2,
    items: [
      {
        name: "Établissements Scolaires",
        description: "94% des directeurs d'école signalent une augmentation de l'anxiété climatique chez les élèves. Nous proposons des solutions adaptées",
        type: "Partenaire Éducation",
      },
      {
        name: "Collectivités Locales",
        description: "Collaboration pour créer des programmes de soutien locaux et toucher les jeunes au niveau communautaire",
        type: "Partenaire Public",
      },
    ]
  },
  {
    category: "Entreprises Engagées",
    icon: Users2,
    items: [
      {
        name: "Startups Écologiques",
        description: "Partenariats avec des entreprises innovantes partageant notre vision d'un futur durable",
        type: "Partenaire Innovation",
      },
      {
        name: "Entreprises RSE",
        description: "78% des DRH observent une baisse de productivité liée au stress climatique. Nous proposons des solutions pour le bien-être des employés",
        type: "Partenaire Corporate",
      },
    ]
  },
];

export default function PartenairesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Devenir Partenaire"
        subtitle="Construisons ensemble un écosystème fort pour accompagner les jeunes face à l'éco-anxiété"
        className="text-center mb-12"
      />

      <div className="max-w-3xl mx-auto mb-12">
        <Card className="p-6 bg-green-50">
          <p className="text-center text-gray-700">
            Notre approche B2B/B2C nous permet d'avoir un impact social direct tout en assurant la viabilité économique de notre mission. Nous recherchons des partenaires partageant notre vision d'un accompagnement holistique de l'éco-anxiété.
          </p>
        </Card>
      </div>

      <div className="space-y-16">
        {desiredPartners.map((category, categoryIndex) => (
          <motion.section
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <category.icon className="h-8 w-8 text-neogreen" />
              <h2 className="text-2xl font-semibold">{category.category}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {category.items.map((partner, index) => (
                <Card key={partner.name} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {partner.name}
                      </h3>
                      <span className="inline-block px-3 py-1 text-sm font-medium text-neogreen bg-green-100 rounded-full">
                        {partner.type}
                      </span>
                      <p className="text-gray-600">
                        {partner.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Vous souhaitez contribuer à notre mission d'accompagnement des jeunes face à l'éco-anxiété ? Contactez-nous pour explorer les possibilités de collaboration.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-neogreen hover:bg-green-700 text-white">
            Nous contacter pour devenir partenaire
          </Button>
        </Link>
      </div>
    </main>
  );
}