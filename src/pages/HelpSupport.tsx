import { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useTranslation } from 'react-i18next';

interface HelpSupportProps {
  onBack: () => void;
}

const HelpSupport = ({ onBack }: HelpSupportProps) => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqData = [
    {
      id: 'whatIsEmptyLeg',
      question: t('helpSupport.faq.whatIsEmptyLeg.question'),
      answer: t('helpSupport.faq.whatIsEmptyLeg.answer')
    },
    {
      id: 'howToBook',
      question: t('helpSupport.faq.howToBook.question'),
      answer: t('helpSupport.faq.howToBook.answer')
    },
    {
      id: 'afterBooking',
      question: t('helpSupport.faq.afterBooking.question'),
      answer: t('helpSupport.faq.afterBooking.answer')
    },
    {
      id: 'otherDestinations',
      question: t('helpSupport.faq.otherDestinations.question'),
      answer: t('helpSupport.faq.otherDestinations.answer')
    },
    {
      id: 'cancellationPolicy',
      question: t('helpSupport.faq.cancellationPolicy.question'),
      answer: t('helpSupport.faq.cancellationPolicy.answer')
    },
    {
      id: 'luggagePolicy',
      question: t('helpSupport.faq.luggagePolicy.question'),
      answer: t('helpSupport.faq.luggagePolicy.answer')
    },
    {
      id: 'paymentMethods',
      question: t('helpSupport.faq.paymentMethods.question'),
      answer: t('helpSupport.faq.paymentMethods.answer')
    },
    {
      id: 'flightChanges',
      question: t('helpSupport.faq.flightChanges.question'),
      answer: t('helpSupport.faq.flightChanges.answer')
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
            {t('helpSupport.title')}
          </h1>
          <p className="text-muted-foreground">{t('helpSupport.subtitle')}</p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card-jetleg p-6 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">{t('helpSupport.liveChat.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('helpSupport.liveChat.description')}</p>
            <button className="btn-jetleg-primary w-full">
              {t('helpSupport.liveChat.button')}
            </button>
          </div>

          <div className="card-jetleg p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">{t('helpSupport.phone.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('helpSupport.phone.hours')}</p>
            <a href="tel:+31201234567" className="btn-jetleg-outline w-full">
              +31 20 123 4567
            </a>
          </div>

          <div className="card-jetleg p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">{t('helpSupport.email.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('helpSupport.email.responseTime')}</p>
            <a href="mailto:support@jetleg.com" className="btn-jetleg-outline w-full">
              support@jetleg.com
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card-jetleg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">{t('helpSupport.faqTitle')}</h2>
          
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
          <h2 className="text-xl font-semibold text-foreground mb-6">{t('helpSupport.contactForm.title')}</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('helpSupport.contactForm.name')}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('helpSupport.contactForm.email')}</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t('helpSupport.contactForm.subject')}</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent">
                <option value="">{t('helpSupport.contactForm.selectSubject')}</option>
                <option value="booking">{t('helpSupport.contactForm.subjects.booking')}</option>
                <option value="payment">{t('helpSupport.contactForm.subjects.payment')}</option>
                <option value="cancellation">{t('helpSupport.contactForm.subjects.cancellation')}</option>
                <option value="technical">{t('helpSupport.contactForm.subjects.technical')}</option>
                <option value="other">{t('helpSupport.contactForm.subjects.other')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t('helpSupport.contactForm.message')}</label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                placeholder={t('helpSupport.contactForm.messagePlaceholder')}
              ></textarea>
            </div>

            <button type="submit" className="btn-jetleg-primary w-full">
              {t('helpSupport.contactForm.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;