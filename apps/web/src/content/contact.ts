export const contactPage = {
  hero: {
    eyebrow: "CONTACT",
    headlineParts: [
      { text: "Start a", gold: false },
      { text: "Conversation.", gold: true },
    ],
    subhead: "One trip. One set of documents. See what structured governance looks like for your institution.",
    cta: null,
    ctaSecondary: null,
    image: "/images/hero-contact.png",
  },
  form: {
    fields: [
      { name: "name", label: "Name", type: "text" as const, required: true },
      { name: "email", label: "Email", type: "email" as const, required: true },
      { name: "organization", label: "Organization", type: "text" as const, required: true },
      { name: "role", label: "Role", type: "select" as const, required: true, options: [
        "Head of School",
        "Deputy Head",
        "Director of Operations",
        "Trip Coordinator",
        "Risk / Compliance Officer",
        "Trip Provider",
        "Other",
      ]},
      { name: "message", label: "Message", type: "textarea" as const, required: true },
    ],
    submitLabel: "Send Message",
  },
  whatToExpect: {
    eyebrow: "WHAT TO EXPECT",
    items: [
      "A response within two working days.",
      "An initial conversation about your institution's trip governance needs.",
      "If there is a fit, a proposal for a single trip assessment.",
      "No obligation. No sales process. A conversation.",
    ],
  },
};
