import { useState } from 'react';
import { CreditCard, Plus, Trash2, Shield, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface PaymentDetailsProps {
  onBack: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  isDefault: boolean;
}

const PaymentDetails = ({ onBack }: PaymentDetailsProps) => {
  const { t } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '26',
      holderName: 'Jan Janssen',
      isDefault: true
    }
  ]);
  
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: ''
  });

  const getCardIcon = (type: string) => {
    const iconClass = "h-8 w-8";
    switch (type) {
      case 'visa':
        return <div className={`${iconClass} bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold`}>VISA</div>;
      case 'mastercard':
        return <div className={`${iconClass} bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold`}>MC</div>;
      case 'amex':
        return <div className={`${iconClass} bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold`}>AMEX</div>;
      default:
        return <CreditCard className={iconClass} />;
    }
  };

  const detectCardType = (number: string): 'visa' | 'mastercard' | 'amex' => {
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'visa';
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv || !newCard.holderName) {
      toast.error(t('paymentDetails.toast.fillAll'));
      return;
    }

    const cleanCardNumber = newCard.cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length < 16) {
      toast.error(t('paymentDetails.toast.invalidCard'));
      return;
    }

    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: detectCardType(cleanCardNumber),
      lastFour: cleanCardNumber.slice(-4),
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      holderName: newCard.holderName,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setNewCard({ cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '', holderName: '' });
    setShowAddCard(false);
    toast.success(t('paymentDetails.toast.added'));
  };

  const handleDeleteCard = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    toast.success(t('paymentDetails.toast.deleted'));
  };

  const setDefaultCard = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({ ...method, isDefault: method.id === id }))
    );
    toast.success(t('paymentDetails.toast.defaultSet'));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            {t('paymentDetails.title')}
          </h1>
          <p className="text-muted-foreground">{t('paymentDetails.subtitle')}</p>
        </div>

        {/* Security Notice */}
        <div className="card-jetleg p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">{t('paymentDetails.securityTitle')}</h3>
              <p className="text-sm text-blue-700">
                {t('paymentDetails.securityDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Saved Payment Methods */}
        <div className="space-y-4 mb-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className="card-jetleg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getCardIcon(method.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">•••• •••• •••• {method.lastFour}</span>
                      {method.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {t('paymentDetails.default')}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {method.holderName} • {method.expiryMonth}/{method.expiryYear}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefaultCard(method.id)}
                    >
                      {t('paymentDetails.setDefault')}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCard(method.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Card */}
        <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              {t('paymentDetails.addNew')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t('paymentDetails.addCardTitle')}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('paymentDetails.cardNumber')}</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    if (formatted.replace(/\s/g, '').length <= 16) {
                      setNewCard(prev => ({ ...prev, cardNumber: formatted }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('paymentDetails.month')}</label>
                  <select
                    value={newCard.expiryMonth}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiryMonth: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('paymentDetails.year')}</label>
                  <select
                    value={newCard.expiryYear}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiryYear: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                        {new Date().getFullYear() + i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('paymentDetails.cvv')}</label>
                <input
                  type="text"
                  placeholder="123"
                  maxLength={4}
                  value={newCard.cvv}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      setNewCard(prev => ({ ...prev, cvv: e.target.value }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('paymentDetails.holderName')}</label>
                <input
                  type="text"
                  placeholder="Jan Janssen"
                  value={newCard.holderName}
                  onChange={(e) => setNewCard(prev => ({ ...prev, holderName: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddCard(false)} className="flex-1">
                  {t('paymentDetails.cancel')}
                </Button>
                <Button onClick={handleAddCard} className="flex-1">
                  {t('paymentDetails.add')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PaymentDetails;