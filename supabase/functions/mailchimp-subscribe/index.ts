 import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers":
     "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 interface SubscribeRequest {
   email: string;
   firstName?: string;
   lastName?: string;
   type: "traveler" | "operator";
 }
 
 interface MailchimpError {
   title?: string;
   detail?: string;
   status?: number;
 }
 
 const MAILCHIMP_API_URL = "https://us22.api.mailchimp.com/3.0";
 const MAILCHIMP_LIST_ID = "dea962c53c";
 
 serve(async (req: Request): Promise<Response> => {
   // Handle CORS preflight
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const MAILCHIMP_API_KEY = Deno.env.get("MAILCHIMP_API_KEY");
     if (!MAILCHIMP_API_KEY) {
       console.error("MAILCHIMP_API_KEY is not configured");
       throw new Error("Mailchimp configuration error");
     }
 
     const { email, firstName, lastName, type }: SubscribeRequest = await req.json();
 
     // Validate required fields
     if (!email) {
       return new Response(
         JSON.stringify({ success: false, error: "email_required" }),
         { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
       );
     }
 
     if (!type || (type !== "traveler" && type !== "operator")) {
       return new Response(
         JSON.stringify({ success: false, error: "invalid_type" }),
         { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
       );
     }
 
     // Validate email format
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       return new Response(
         JSON.stringify({ success: false, error: "invalid_email" }),
         { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
       );
     }
 
     console.log(`Subscribing ${email} as ${type}`);
 
     // Add subscriber to Mailchimp with double opt-in (status: pending)
     const mailchimpResponse = await fetch(
       `${MAILCHIMP_API_URL}/lists/${MAILCHIMP_LIST_ID}/members`,
       {
         method: "POST",
         headers: {
           Authorization: `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           email_address: email,
           status: "pending", // Double opt-in
           merge_fields: {
             FNAME: firstName || "",
             LNAME: lastName || "",
           },
           tags: [type], // 'traveler' or 'operator'
         }),
       }
     );
 
     const responseData = await mailchimpResponse.json();
 
     if (!mailchimpResponse.ok) {
       const errorData = responseData as MailchimpError;
       console.error("Mailchimp API error:", errorData);
 
       // Handle "already subscribed" case
       if (errorData.title === "Member Exists") {
         return new Response(
           JSON.stringify({ success: false, error: "already_subscribed" }),
           { status: 409, headers: { "Content-Type": "application/json", ...corsHeaders } }
         );
       }
 
       // Handle invalid email (Mailchimp validation)
       if (errorData.title === "Invalid Resource") {
         return new Response(
           JSON.stringify({ success: false, error: "invalid_email" }),
           { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
         );
       }
 
       throw new Error(`Mailchimp error: ${errorData.detail || errorData.title}`);
     }
 
     console.log(`Successfully subscribed ${email} as ${type}`);
 
     return new Response(
       JSON.stringify({ 
         success: true, 
         message: "Subscription pending confirmation",
         type 
       }),
       { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
     );
   } catch (error: unknown) {
     console.error("Error in mailchimp-subscribe:", error);
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     return new Response(
       JSON.stringify({ success: false, error: errorMessage }),
       { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
     );
   }
 });