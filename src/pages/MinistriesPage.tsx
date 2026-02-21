import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { useMinistries } from '@/hooks/use-church-data';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
export function MinistriesPage() {
  const { data: ministries, isLoading } = useMinistries();
  return (
    <ChurchLayout>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-display font-bold text-hope-blue">Ministries Hub</h1>
          <p className="text-lg text-hope-blue/70 max-w-2xl mx-auto italic font-script text-2xl">
            Finding your place in the Way.
          </p>
          <div className="w-24 h-1.5 bg-hope-gold mx-auto sketchy-border-sm"></div>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-24"><Loader2 className="animate-spin text-hope-gold w-10 h-10" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries?.map((ministry: any, index: number) => {
            const IconComponent = (LucideIcons as any)[ministry.icon] || LucideIcons.Users;
            // Use hex color if provided, otherwise fallback to hope-gold
            const themeColor = ministry.color?.startsWith('#') ? ministry.color : null;
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
                  "bg-white"
                )}
              >
                <div 
                  className={cn(
                    "w-16 h-16 sketchy-border-sm hard-shadow-sm flex items-center justify-center mb-6 -rotate-6",
                    !themeColor && "bg-hope-gold/20"
                  )}
                  style={themeColor ? { backgroundColor: `${themeColor}33`, borderColor: themeColor } : {}}
                >
                  <IconComponent 
                    className="w-8 h-8" 
                    style={themeColor ? { color: 'hsl(216 70% 20%)' } : { color: 'hsl(216 70% 20%)' }} 
                  />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4 text-hope-blue">{ministry.title}</h3>
                <p className="text-hope-blue/80 mb-8 flex-1 leading-relaxed">
                  {ministry.description}
                </p>
                <Button
                  className="w-full bg-hope-blue text-white font-bold sketchy-border-sm hard-shadow-sm hover:bg-hope-blue/90 transition-all"
                >
                  Join Ministry
                </Button>
              </motion.div>
            );
          })}
        </div>
        )}
        <div className="mt-24 p-12 bg-white sketchy-border hard-shadow text-center space-y-6">
          <h2 className="text-3xl font-display font-bold text-hope-blue">Not sure where you fit?</h2>
          <p className="text-hope-blue/70 max-w-xl mx-auto">
            Our welcome team is happy to help you find a group that matches your passions and spiritual needs.
          </p>
          <Button variant="outline" className="sketchy-border-sm border-hope-blue text-hope-blue h-12 px-8 hover:bg-hope-blue/5">
            Contact Welcome Team
          </Button>
        </div>
      </section>
    </ChurchLayout>
  );
}