import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { MINISTRIES } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
export function MinistriesPage() {
  return (
    <ChurchLayout>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-display font-bold">Ministries Hub</h1>
          <p className="text-lg text-deep-ocean/70 max-w-2xl mx-auto italic font-script text-2xl">
            Finding your place in the family.
          </p>
          <div className="w-24 h-1.5 bg-terra-cotta mx-auto sketchy-border-sm"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MINISTRIES.map((ministry, index) => {
            const IconComponent = (LucideIcons as any)[ministry.icon] || LucideIcons.Users;
            return (
              <motion.div
                key={ministry.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={cn(
                  "p-8 sketchy-border hard-shadow flex flex-col h-full",
                  ministry.color,
                  "bg-opacity-20"
                )}
              >
                <div className="w-16 h-16 bg-white sketchy-border-sm hard-shadow-sm flex items-center justify-center mb-6 -rotate-6">
                  <IconComponent className="w-8 h-8 text-deep-ocean" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{ministry.title}</h3>
                <p className="text-deep-ocean/80 mb-8 flex-1 leading-relaxed">
                  {ministry.description}
                </p>
                <Button 
                  className="w-full bg-deep-ocean text-white sketchy-border-sm hard-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Learn More
                </Button>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-24 p-12 bg-white sketchy-border hard-shadow text-center space-y-6">
          <h2 className="text-3xl font-display font-bold">Not sure where you fit?</h2>
          <p className="text-deep-ocean/70 max-w-xl mx-auto">
            Our welcome team is happy to help you find a group that matches your passions and spiritual needs.
          </p>
          <Button variant="outline" className="sketchy-border-sm h-12 px-8">
            Contact Support
          </Button>
        </div>
      </section>
    </ChurchLayout>
  );
}