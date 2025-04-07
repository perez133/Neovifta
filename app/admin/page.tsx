'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminPage() {
  const [isAllowed, setIsAllowed] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAllowed(true);
    }
  }, []);

  useEffect(() => {
    if (isAllowed) {
      fetch('/api/quiz/data')
        .then(res => res.json())
        .then(json => setData(json));
    }
  }, [isAllowed]);

  if (!isAllowed) return null;

  const quizCount = data.length;

  // ✅ Correction de la date "Invalid Date"
  const dates = data.map(d => new Date(d.created_at).toLocaleDateString('fr-FR'));

  const scores = data.map(d => d.score);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Score du quiz',
        data: scores,
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // vert
      }
    ]
  };

  // ✅ Données pour le graphique par âge
  const ageLabels = ['< 18', '18-24', '25-34', '35-44', '45-54', '55+'];
  const ageCounts = new Array(ageLabels.length).fill(0);

  data.forEach(entry => {
    if (typeof entry.age_group === 'number' && entry.age_group >= 0 && entry.age_group < ageLabels.length) {
      ageCounts[entry.age_group]++;
    }
  });

  const ageChartData = {
    labels: ageLabels,
    datasets: [
      {
        label: 'Répartition par âge',
        data: ageCounts,
        backgroundColor: 'rgba(15, 118, 110, 0.8)', // neogreen
      }
    ]
  };

  return (
    <main className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Espace Administrateur</h1>
        <Button
          variant="destructive"
          onClick={() => {
            localStorage.removeItem('isAdmin');
            router.push('/');
          }}
        >
          Se déconnecter
        </Button>
      </div>

      <div className="space-y-4">
        <Button
          onClick={() =>
            window.open('/api/export?password=' + process.env.NEXT_PUBLIC_EXPORT_PASSWORD)
          }
        >
          📥 Télécharger les réponses de contact
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            window.open('/api/quiz/export?password=' + process.env.NEXT_PUBLIC_EXPORT_PASSWORD)
          }
        >
          📤 Télécharger les résultats du quiz
        </Button>
      </div>

      <p className="text-lg">
        📊 Le quiz a été complété <strong>{quizCount}</strong> fois.
      </p>

      {/* ✅ Graphique des scores */}
      <div className="bg-white rounded-lg p-4 shadow">
        <Bar data={chartData} />
      </div>

      {/* ✅ Graphique des âges */}
      <div className="bg-white rounded-lg p-4 shadow">
        <Bar data={ageChartData} />
      </div>
    </main>
  );
}
