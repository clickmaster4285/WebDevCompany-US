// components/services/KeyBenefits.tsx

interface KeyBenefitsProps {
  benefits: string[];
}

export function KeyBenefits({ benefits }: KeyBenefitsProps) {
  // Don't render anything if there are no benefits
  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Key Benefits
        </h2>
        <ul className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start bg-card p-6 rounded-lg shadow-soft border border-border transition-colors duration-200 hover:bg-surface-2"
            >
              <svg 
                className="h-6 w-6 text-violet mr-3 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span className="text-ink-soft leading-relaxed">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}