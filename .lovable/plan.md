
# Migratie van Resend naar Mailchimp met Traveler & Operator Flows

## Samenvatting

Er is momenteel **geen Resend-integratie** aanwezig in de codebase - er hoeft dus niets verwijderd te worden. De volgende stap is het implementeren van een complete Mailchimp-integratie met gescheiden flows voor Travelers en Operators.

---

## Wat wordt geimplementeerd

### 1. Supabase Edge Function: `mailchimp-subscribe`
Een nieuwe edge function die veilig communiceert met de Mailchimp API.

**Functionaliteit:**
- Accepteert email, naam en type (`traveler` of `operator`)
- Voegt subscriber toe aan Mailchimp audience met juiste tag
- Configureert double opt-in (status: `pending`)
- Retourneert succes/fout response

**Bestandslocatie:** `supabase/functions/mailchimp-subscribe/index.ts`

```text
+---------------------------+
|  Frontend Form Submit     |
+------------+--------------+
             |
             v
+---------------------------+
|  supabase.functions       |
|  .invoke('mailchimp-      |
|  subscribe')              |
+------------+--------------+
             |
             v
+---------------------------+
|  Edge Function            |
|  - Valideert input        |
|  - Bepaalt tag (traveler/ |
|    operator)              |
|  - Roept Mailchimp API    |
+------------+--------------+
             |
             v
+---------------------------+
|  Mailchimp                |
|  - Voegt toe aan audience |
|  - Stuurt opt-in email    |
|  - Triggert automation    |
+---------------------------+
```

### 2. Secret Configuratie
De Mailchimp API key wordt als secret opgeslagen (niet hardcoded).

**Secret naam:** `MAILCHIMP_API_KEY`

### 3. Frontend Component: `NewsletterSignup`
Herbruikbaar component voor beide flows.

**Props:**
- `type`: `'traveler'` | `'operator'`
- `className`: optionele styling

**Features:**
- Email input met validatie
- Loading state tijdens submit
- Succes/fout meldingen (specifiek per type)
- Nederlandse teksten

### 4. Integratie in bestaande pagina's

**Traveler Flow (publieke pagina's):**
- Homepage (`Index.tsx`) - onder DealsSection
- Optioneel: TopDeals pagina

**Operator Flow:**
- Nieuwe sectie in footer of aparte pagina
- Koppeling aan "For Operators" CTA's uit translations

---

## Technische Details

### Edge Function Structuur

```typescript
// supabase/functions/mailchimp-subscribe/index.ts

interface SubscribeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  type: 'traveler' | 'operator';
}

// Mailchimp API endpoint structuur:
// POST https://us22.api.mailchimp.com/3.0/lists/{list_id}/members

// Request body:
{
  email_address: email,
  status: 'pending',  // Double opt-in
  merge_fields: {
    FNAME: firstName,
    LNAME: lastName
  },
  tags: [type]  // 'traveler' of 'operator'
}
```

### Frontend Hook: `useMailchimpSubscribe`

```typescript
// src/hooks/useMailchimpSubscribe.ts
export const useMailchimpSubscribe = () => {
  const subscribe = async (
    email: string,
    type: 'traveler' | 'operator',
    firstName?: string,
    lastName?: string
  ) => {
    const { data, error } = await supabase.functions
      .invoke('mailchimp-subscribe', {
        body: { email, type, firstName, lastName }
      });
    return { data, error };
  };
  
  return { subscribe };
};
```

### Component Props & States

```typescript
// src/components/NewsletterSignup.tsx
interface NewsletterSignupProps {
  type: 'traveler' | 'operator';
  className?: string;
  showNameFields?: boolean;
}

// States:
// - email: string
// - firstName/lastName: string (optioneel)
// - isLoading: boolean
// - status: 'idle' | 'success' | 'error'
// - errorMessage: string
```

---

## Bestanden die worden aangemaakt

| Bestand | Beschrijving |
|---------|--------------|
| `supabase/functions/mailchimp-subscribe/index.ts` | Edge function voor Mailchimp API calls |
| `src/hooks/useMailchimpSubscribe.ts` | Custom hook voor subscribe functionaliteit |
| `src/components/NewsletterSignup.tsx` | Herbruikbaar signup component |

## Bestanden die worden aangepast

| Bestand | Wijziging |
|---------|-----------|
| `supabase/config.toml` | Nieuwe function config (`verify_jwt = false`) |
| `src/pages/Index.tsx` | Newsletter sectie toevoegen |
| `src/i18n/locales/*.json` | Nederlandse + andere vertalingen voor newsletter UI |

---

## Succes- en Foutmeldingen

### Traveler
- **Succes:** "Welkom reiziger! Controleer je inbox om je inschrijving te bevestigen."
- **Fout:** "Er ging iets mis. Probeer het opnieuw."
- **Al ingeschreven:** "Je bent al ingeschreven voor onze nieuwsbrief."

### Operator
- **Succes:** "Welkom partner! Controleer je inbox om je inschrijving te bevestigen."
- **Fout:** "Er ging iets mis. Probeer het opnieuw."
- **Al ingeschreven:** "Je bent al ingeschreven als operator."

---

## Mailchimp Configuratie Vereisten

**Let op:** Je moet in Mailchimp het volgende configureren:
1. Een **Audience** (lijst) aanmaken
2. De **List ID** van deze audience ophalen
3. **Automations** aanmaken:
   - "Traveler Welcome Email" getriggerd door tag `traveler`
   - "Operator Welcome Email" getriggerd door tag `operator`
4. **Double opt-in** staat standaard aan wanneer we `status: 'pending'` gebruiken

Ik zal je vragen om de **List ID** voordat de implementatie wordt afgerond.

---

## Volgorde van Implementatie

1. Secret toevoegen (`MAILCHIMP_API_KEY`)
2. Edge function maken (`mailchimp-subscribe`)
3. Config.toml updaten
4. Custom hook maken
5. NewsletterSignup component maken
6. Translations toevoegen
7. Integreren in Index.tsx
8. Testen beide flows
