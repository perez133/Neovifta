"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Target, ArrowRight, Heart, Brain } from "lucide-react";
import { Line, Bar } from 'react-chartjs-2';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ImpactPage() {
  const ecoAnxietyByAgeData = {
    labels: ['18-24 ans', '25-34 ans', '35-44 ans', '45-54 ans'],
    datasets: [
      {
        label: 'Préoccupation pour l\'avenir climatique (%)',
        data: [73, 68, 54, 39],
        borderColor: 'rgb(46, 125, 50)',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const ecoAnxietyTypesData = {
    labels: ['Désenchantés mais actifs', 'Dépassés et paralysés', 'Optimistes et engagés'],
    datasets: [
      {
        label: 'Répartition des profils d\'éco-anxiété (%)',
        data: [38, 27, 35],
        backgroundColor: [
          'rgba(46, 125, 50, 0.7)',
          'rgba(211, 47, 47, 0.7)',
          'rgba(25, 118, 210, 0.7)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Notre Impact</h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
          Face à l'urgence climatique, nous développons des solutions innovantes pour accompagner les jeunes dans leur parcours face à l'éco-anxiété.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">État des Lieux</h3>
              <p className="text-gray-600 dark:text-gray-300">
                68% des jeunes ressentent un profond sentiment d'effondrement face à l'inaction climatique (CREDOC, 2021)
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Notre Réponse</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Une approche holistique combinant soutien psychologique et action environnementale
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-8 mb-16">
          <h3 className="text-2xl font-semibold mb-6">L'Éco-anxiété par Tranche d'Âge</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Les jeunes sont particulièrement touchés par l'éco-anxiété, avec des manifestations comme les troubles du sommeil et les crises d'angoisse.
          </p>
          <Line data={ecoAnxietyByAgeData} options={chartOptions} />
        </Card>

        <Card className="p-8 mb-16">
          <h3 className="text-2xl font-semibold mb-6">Profils d'Éco-anxiété</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Notre approche est adaptée aux différents profils identifiés dans nos études.
          </p>
          <Bar data={ecoAnxietyTypesData} options={chartOptions} />
        </Card>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plateforme Éducative</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Templates de formation pour sensibiliser dès le plus jeune âge
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Programme Digital</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Application mobile gamifiée pour encourager l'action positive
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Communauté Solidaire</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Espace d'échange et de soutien entre pairs
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-6">Notre Feuille de Route 2025-2026</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="h-2 w-2 bg-neogreen rounded-full mr-3"></div>
              <span>Phase 1 (Mai-Décembre 2025) : Lancement de la communauté Instagram et développement des premiers contenus éducatifs</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-neogreen rounded-full mr-3"></div>
              <span>Phase 2 (Janvier-Juin 2026) : Expansion du réseau d'écoles et validation du concept d'application</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-neogreen rounded-full mr-3"></div>
              <span>Phase 3 (Septembre 2026-2027) : Développement et lancement de l'application mobile</span>
            </li>
          </ul>
        </Card>

        <div className="text-center">
          <Link href="/contact">
            <Button size="lg" className="bg-neogreen hover:bg-green-700 text-white">
              Participer à notre mission <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}