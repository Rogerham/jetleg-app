import { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface HelpSupportProps {
  onBack: () => void;
}

const HelpSupport = ({ onBack }: HelpSupportProps) => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqData = [
    {
      id: 'what-is-empty-leg',
      question: 'Wat is een empty leg vlucht?',
      answer: 'Een empty leg vlucht is een privévlucht waarbij het vliegtuig leeg terugvliegt naar zijn basis of naar de volgende bestemming. Deze vluchten worden tegen gereduceerde tarieven aangeboden omdat ze anders leeg zouden vliegen.'
    },
    {
      id: 'how-to-book',
      question: 'Hoe boek ik een vlucht?',
      answer: 'Gebruik onze zoekfunctie om beschikbare vluchten te vinden. Selecteer je gewenste vlucht en volg de boekingsstappen. Je ontvangt een bevestiging via e-mail zodra je boeking is voltooid.'
    },
    {
      id: 'after-booking',
      question: 'Wat gebeurt er nadat ik een empty leg geboekt heb?',
      answer: 'Na je boeking ontvang je direct een bevestigingsmail met alle vliegdetails en je e-tickets. Onze klantenservice neemt indien nodig contact met je op voor eventuele bijzonderheden. Op de dag van vertrek kun je rechtstreeks naar de private terminal gaan - meld je 15-30 minuten voor vertrek. Na landing ontvang je een vragenlijst om je ervaring met ons te delen.'
    },
    {
      id: 'other-destinations',
      question: 'Zijn vluchten naar andere werelddelen ook beschikbaar?',
      answer: 'Momenteel richten we ons voornamelijk op Europa, Noord-Amerika en de VAE. Vluchten naar Azië, Zuid-Amerika, Afrika en Australië zijn in ontwikkeling en zullen in de nabije toekomst beschikbaar komen. We zijn volop bezig met het uitbreiden van onze partnerschappen wereldwijd om jou straks ook deze prachtige bestemmingen te kunnen aanbieden.'
    },
    {
      id: 'cancellation-policy',
      question: 'Wat is het annuleringsbeleid?',
      answer: 'Annuleringen zijn mogelijk tot 24 uur voor vertrek. Bij annulering binnen 24 uur kunnen kosten in rekening worden gebracht. Controleer de specifieke voorwaarden van je boeking.'
    },
    {
      id: 'luggage-policy',
      question: 'Hoeveel bagage mag ik meenemen?',
      answer: 'De bagageregels variëren per vliegtuigtype. Over het algemeen is handbagage altijd inbegrepen. Voor ruimbagage adviseren we contact op te nemen voor de exacte limieten.'
    },
    {
      id: 'payment-methods',
      question: 'Welke betaalmethoden accepteren jullie?',
      answer: 'We accepteren alle grote creditcards (Visa, Mastercard, American Express) en bankoverschrijvingen. Betaling gebeurt via een beveiligde verbinding.'
    },
    {
      id: 'flight-changes',
      question: 'Kan ik mijn vlucht wijzigen?',
      answer: 'Wijzigingen zijn mogelijk afhankelijk van beschikbaarheid en kunnen extra kosten met zich meebrengen. Neem contact met ons op voor wijzigingen.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <HelpCircle className="h-8 w-8" />
            Help & ondersteuning
          </h1>
          <p className="text-muted-foreground">Vind antwoorden op veelgestelde vragen of neem contact met ons op</p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card-jetleg p-6 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">Praat direct met onze klantenservice</p>
            <button className="btn-jetleg-primary w-full">
              Start chat
            </button>
          </div>

          <div className="card-jetleg p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Bel ons</h3>
            <p className="text-sm text-muted-foreground mb-4">Ma-vr: 9:00-18:00</p>
            <a href="tel:+31201234567" className="btn-jetleg-outline w-full">
              +31 20 123 4567
            </a>
          </div>

          <div className="card-jetleg p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">E-mail</h3>
            <p className="text-sm text-muted-foreground mb-4">We reageren binnen 2 uur</p>
            <a href="mailto:support@jetleg.com" className="btn-jetleg-outline w-full">
              support@jetleg.com
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card-jetleg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Veelgestelde vragen</h2>
          
          <div className="space-y-4">
            {faqData.map((faq) => (
              <Collapsible key={faq.id} open={openFaq === faq.id} onOpenChange={() => toggleFaq(faq.id)}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium text-foreground text-left">{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-3 text-muted-foreground">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="card-jetleg p-6 mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Nog een vraag?</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Naam</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Onderwerp</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent">
                <option value="">Selecteer een onderwerp</option>
                <option value="booking">Boeking</option>
                <option value="payment">Betaling</option>
                <option value="cancellation">Annulering</option>
                <option value="technical">Technische problemen</option>
                <option value="other">Anders</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bericht</label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                placeholder="Beschrijf je vraag of probleem..."
              ></textarea>
            </div>

            <button type="submit" className="btn-jetleg-primary w-full">
              Bericht verzenden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;