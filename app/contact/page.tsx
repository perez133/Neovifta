'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SectionTitle } from '@/components/ui/section-title';
import { Card } from '@/components/ui/card';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const teamEmails = [
  {
    name: 'Fatima Jamal',
    email: 'fatima.jamal@neovifta.fr',
    role: 'Psychologue en formation',
  },
  {
    name: 'Arnold Faho',
    email: 'arnoldperez.fahombatchou@etu.estia.fr',
    role: 'Ingénieur Big Data',
  },
  {
    name: 'Valentina Banzet',
    email: 'valentina.banzet@neovifta.fr',
    role: 'Cheffe de projet digital',
  },
];

const contactSubjects = [
  { value: 'eco-anxiety', label: 'Besoin de soutien pour l\'éco-anxiété' },
  { value: 'partnership', label: 'Proposition de partenariat' },
  { value: 'schools', label: 'Programme pour les écoles' },
  { value: 'media', label: 'Contact médias' },
  { value: 'other', label: 'Autre demande' },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: teamEmails.map(member => member.email),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: 'Message envoyé',
        description: 'Nous vous répondrons dans les plus brefs délais.',
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'envoi du message.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));
  };

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <SectionTitle
              title="Contactez-nous"
              subtitle="Nous sommes là pour vous écouter et vous accompagner"
              className="mb-8"
            />
            <Image
              src="/team-illustration.png"
              alt="Contact illustration"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>

          <div className="grid gap-6">
            {teamEmails.map((member) => (
              <Card key={member.email} className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 md:col-span-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-muted-foreground">ESTIA, 64210 Bidart, France</p>
              </div>
            </Card>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Nom
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Sujet
              </label>
              <Select
                value={formData.subject}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un sujet" />
                </SelectTrigger>
                <SelectContent>
                  {contactSubjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Votre message"
                rows={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Envoi en cours...'
              ) : (
                <>
                  Envoyer <MessageCircle className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}