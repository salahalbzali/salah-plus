export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "صلاح بلس",
    "description": "خدمات تصميم جرافيكي وهوية بصرية احترافية في اليمن",
    "url": "https://salah-plus-l7lb.vercel.app",
    "telephone": "+967775307315",
    "email": "salah201617@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "YE",
      "addressLocality": "اليمن"
    },
    "openingHours": "Sa-Th 09:00-21:30",
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
