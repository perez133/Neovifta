'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { useToast } from '@/hooks/use-toast';
import { Share2, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const questions = [
  {
    question: "À quelle fréquence pensez-vous aux problèmes environnementaux ?",
    options: [
      "Rarement ou jamais",
      "Quelques fois par mois",
      "Plusieurs fois par semaine",
      "Quotidiennement"
    ]
  },
  {
    question: "Comment réagissez-vous aux nouvelles concernant le climat ?",
    options: [
      "Je reste détaché(e)",
      "Je suis légèrement préoccupé(e)",
      "Je ressens de la peur ;inquiétude",
      "Je me sens très anxieux(se)"
    ]
  },
  {
    question: "Les problèmes environnementaux affectent-ils votre sommeil ?",
    options: ["Jamais", "Rarement", "Parfois", "Fréquemment"]
  },
  {
    question: "Comment vous sentez-vous face à l&apos;avenir de la planète ?",
    options: ["Optimiste", "Modérément inquiet(e)", "Préoccupé(e)", "Très anxieux(se)"]
  },
  {
    question: "À quelle fréquence discutez-vous des problèmes environnementaux avec votre entourage ?",
    options: ["Jamais", "Occasionnellement", "Régulièrement", "Très souvent"]
  },
  {
    question: "Comment réagissez-vous face aux comportements non-écologiques des autres ?",
    options: ["Cela m'est indifférent", "Je suis légèrement contrarié(e)", "Je me sens frustré(e)", "Je ressens une forte anxiété"]
  },
  {
    question: "Les enjeux climatiques influencent-ils vos décisions quotidiennes ?",
    options: ["Rarement", "Parfois", "Souvent", "Presque toujours"]
  },
  {
    question: "Ressentez-vous de la culpabilité concernant votre impact environnemental ?",
    options: ["Rarement ou jamais", "Occasionnellement", "Régulièrement", "Très fréquemment"]
  },
  {
    question: "Comment évaluez-vous votre capacité à agir face aux problèmes environnementaux ?",
    options: ["Je me sens capable d&apos;agir", "J'ai quelques doutes", "Je me sens souvent impuissant(e)", "Je me sens totalement dépassé(e)"]
  },
  {
    question: "Les problèmes environnementaux affectent-ils vos projets d'avenir ?",
    options: ["Pas du tout", "Un peu", "Significativement", "Très fortement"]
  }
];
const ageOptions = [
  { label: '< 18', value: 0 },
  { label: '18-24', value: 1 },
  { label: '25-34', value: 2 },
  { label: '35-44', value: 3 },
  { label: '45-54', value: 4 },
  { label: '55+', value: 5 }
];

export default function QuizPage() {
  const [ageGroup, setAgeGroup] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleStart = () => {
    if (ageGroup === null) {
      toast({ title: 'Veuillez choisir votre tranche d’âge.' });
    } else {
      setCurrentQuestion(0);
    }
  };

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      toast({ title: 'Quiz terminé !', description: 'Merci pour votre participation.' });
    }
  };

  useEffect(() => {
    if (showResults && ageGroup !== null) {
      const score = answers.reduce((acc, val) => acc + val, 0);
      fetch('/api/quiz/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, ageGroup }),
      });
    }
  }, [showResults]);

  const calculateScore = () => {
    const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
    return (totalScore / 30) * 100;
  };

  const getAnalysis = () => {
    const score = answers.reduce((acc, curr) => acc + curr, 0);
    if (score <= 9) {
      return {
        level: "Faible éco-anxiété",
        description: "Vous êtes conscient(e) des enjeux environnementaux tout en maintenant une perspective équilibrée.",
        suggestions: [
          "Informez-vous régulièrement sur les enjeux",
          "Commencez par des actions simples",
          "Parlez-en autour de vous"
        ]
      };
    } else if (score <= 19) {
      return {
        level: "Éco-anxiété modérée",
        description: "Vous ressentez une préoccupation légitime. Essayez de canaliser cela vers des actions constructives.",
        suggestions: [
          "Rejoignez des groupes locaux",
          "Apprenez à gérer le stress",
          "Concentrez-vous sur le concret"
        ]
      };
    } else if (score <= 24) {
      return {
        level: "Éco-anxiété élevée",
        description: "Votre inquiétude est importante. Il est essentiel de trouver un équilibre personnel.",
        suggestions: [
          "Utilisez nos ressources de soutien",
          "Participez à nos ateliers",
          "Fixez-vous des objectifs positifs"
        ]
      };
    } else {
      return {
        level: "Éco-anxiété très élevée",
        description: "Votre niveau d&apos;angoisse est élevé. Nous vous conseillons de demander du soutien.",
        suggestions: [
          "Prenez RDV avec un conseiller",
          "Participez à nos groupes de soutien",
          "Apprenez des techniques de gestion émotionnelle"
        ]
      };
    }
  };

  const shareResults = () => {
    const analysis = getAnalysis();
    const text = `J'ai fait le test d&apos;éco-anxiété sur NeoVifta ! Mon niveau : ${analysis.level}`;
    if (navigator.share) {
      navigator.share({
        title: "Mon résultat d'éco-anxiété",
        text,
        url: window.location.href,
      }).catch((err) => console.error(err));
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      toast({ title: "Lien copié", description: "Partagez-le avec vos proches." });
    }
  };

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Évaluez Votre Éco-anxiété"
          subtitle="Un questionnaire pour mieux comprendre votre relation avec les enjeux environnementaux"
          className="mb-12"
        />
  
        {/* Étape 1 : Choix de l’âge */}
        {ageGroup === null && !showResults ? (
          <Card className="p-8 space-y-6">
            <h3 className="text-lg font-medium">Sélectionnez votre tranche d’âge :</h3>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              onChange={(e) => setAgeGroup(Number(e.target.value))}
            >
              <option value="">Choisissez une tranche</option>
              {ageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button onClick={handleStart}>Commencer</Button>
          </Card>
  
        // Étape 2 : Questions du quiz
        ) : !showResults ? (
          <Card className="p-8">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold">
                  Question {currentQuestion + 1} sur {questions.length}
                </h3>
                <div className="w-64 h-2 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-full bg-neogreen rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
  
              <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
  
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto py-4 px-6 hover:bg-neogreen/10"
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </motion.div>
          </Card>
  
        // Étape 3 : Résultats
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Card className="p-8">
              <div className="text-center mb-8">
                <motion.div
                  className="w-32 h-32 mx-auto mb-6 relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-full h-full rounded-full border-8 border-gray-200" />
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-neogreen"
                    style={{ clipPath: `inset(0 ${100 - calculateScore()}% 0 0)` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-2xl font-bold">{Math.round(calculateScore())}%</span>
                  </div>
                </motion.div>
  
                <h3 className="text-2xl font-semibold mb-2">{getAnalysis().level}</h3>
                <p className="text-muted-foreground">{getAnalysis().description}</p>
              </div>
  
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-4">Suggestions personnalisées :</h4>
                  <ul className="space-y-2">
                    {getAnalysis().suggestions.map((suggestion, index) => (
                      <li key={index} className="text-muted-foreground">• {suggestion}</li>
                    ))}
                  </ul>
                </div>
  
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setAnswers([]);
                      setShowResults(false);
                      setAgeGroup(null); // pour relancer à zéro
                    }}
                    variant="outline"
                  >
                    Recommencer le quiz
                  </Button>
  
                  <Button onClick={shareResults}>
                    <Share2 className="mr-2 h-4 w-4" /> Partager mon résultat
                  </Button>
  
                  <Link href="/contact">
                    <Button variant="default">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contacter l&apos;équipe
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
  
}