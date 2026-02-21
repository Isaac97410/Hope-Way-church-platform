import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { useLeadership } from '@/hooks/use-church-data';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
export function AboutPage() {
  const { data: leadership, isLoading: isLeadLoading } = useLeadership();
  return (
    <ChurchLayout>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <span className="font-script text-3xl text-hope-gold">Our Sacred Path</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-hope-blue">The Way of Hope</h1>
          <p className="text-lg text-hope-blue/80 leading-relaxed">
            Hope Way Ministries was established with a singular vision: to create a spiritual haven where the broken find healing, the seeker finds truth, and the believer finds purpose. Our roots in Accra run deep, fueled by a commitment to the Word and our local community.
          </p>
          <div className="w-32 h-2 bg-hope-gold/20 mx-auto sketchy-border-sm -rotate-2"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="aspect-video sketchy-border hard-shadow rotate-1 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1590483734748-361273942944?auto=format&fit=crop&q=80&w=1200"
              alt="Ministry Vision & Landscapes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-hope-blue">Our Divine Vision</h2>
            <div className="space-y-4">
              <IllustrativeCard variant="accent">
                <h3 className="font-bold text-xl mb-2 text-hope-blue">The Vision</h3>
                <p className="text-hope-blue/70">To be a global ministry center in Ghana that leads individuals into the fullness of their identity in Christ through hope and empowerment.</p>
              </IllustrativeCard>
              <IllustrativeCard>
                <h3 className="font-bold text-xl mb-2 text-hope-blue">The Mission</h3>
                <p className="text-hope-blue/70">Discipling nations through the uncompromising Word of God, fervent prayer, and compassionate outreach projects that impact real lives.</p>
              </IllustrativeCard>
            </div>
          </div>
        </div>
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-display font-bold text-hope-blue">Leadership Team</h2>
            <p className="text-hope-gold font-script text-2xl mt-2">Guided by Grace & Excellence</p>
          </div>
          {isLeadLoading ? (
             <div className="flex justify-center py-10"><Loader2 className="animate-spin text-hope-gold" /></div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {leadership?.map((leader: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative mb-6">
                    <div className="aspect-[4/5] sketchy-border hard-shadow overflow-hidden bg-white -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02]" 
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-2 bg-hope-gold px-4 py-2 sketchy-border-sm hard-shadow-sm rotate-2">
                      <p className="font-display font-bold text-hope-blue">{leader.name}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-center">
                    <p className="text-hope-gold font-bold text-sm uppercase tracking-wider mb-2">{leader.role}</p>
                    <p className="text-hope-blue/70 text-sm italic px-4">"{leader.bio}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </ChurchLayout>
  );
}