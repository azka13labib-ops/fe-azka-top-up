import React from 'react';
import { Zap, ShieldCheck, Headphones } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Instant Delivery',
      desc: 'Automated systems ensure your items are delivered to your account instantly upon payment confirmation.',
      icon: <Zap size={20} className="text-brand-navy" />,
    },
    {
      title: '100% Secure',
      desc: 'Bank-grade encryption and official publisher partnerships guarantee the safety of your account and funds.',
      icon: <ShieldCheck size={20} className="text-brand-navy" />,
    },
    {
      title: '24/7 Support',
      desc: 'Our dedicated customer service team is available around the clock to assist you with any inquiries.',
      icon: <Headphones size={20} className="text-brand-navy" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feat) => (
          <div
            key={feat.title}
            className="bg-surface-card border border-border-default rounded-xl p-6 flex flex-col items-center text-center"
          >
            {/* Icon Circle Container */}
            <div className="w-10 h-10 rounded-full bg-brand-navy-light flex items-center justify-center shrink-0">
              {feat.icon}
            </div>
            
            {/* Title */}
            <h4 className="text-base font-medium text-ink-primary mt-4 mb-2">
              {feat.title}
            </h4>
            
            {/* Description */}
            <p className="text-sm text-ink-muted leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
