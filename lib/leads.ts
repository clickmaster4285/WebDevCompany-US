// CRM lead submission shared by the site's contact forms.

export const LEADS_ENDPOINT = "https://crm.clickmasters.pk/api/leads";
export const LEAD_WEBSITE = "clickmasterswebdevelopmentcompany.com";
export const LEAD_SERVICE = "Software Development";

export function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
  };
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

/** Posts a lead to the CRM. Resolves with an error message, or null on success. */
export async function submitLead(lead: LeadInput): Promise<string | null> {
  try {
    const res = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone ?? "",
        message: lead.message ?? "",
        website: LEAD_WEBSITE,
        service: LEAD_SERVICE,
        landingPage: window.location.href,
        referrer: document.referrer,
        ...getUtmParams(),
      }),
    });
    if (res.ok) return null;
    const err = await res.json().catch(() => ({}));
    return err.error || "Submission failed. Please try again.";
  } catch {
    return "Network error. Please check your connection and try again.";
  }
}
