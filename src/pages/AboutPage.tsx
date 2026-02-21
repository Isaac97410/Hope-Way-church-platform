import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { useLeadership, useChurchInfo } from '@/hooks/use-church-data';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
export function AboutPage() {
  const { data: leadership, isLoading: isLeadLoading } = useLeadership();
  const { data: churchInfo, isLoading: isInfoLoading } = useChurchInfo();

  return (
    <ChurchLayout>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(isLeadLoading || isInfoLoading) ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-terra-cotta" /></div>
        ) : (
          <>
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <span className="font-script text-3xl text-terra-cotta">Our Journey</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold">A Legacy of Grace</h1>
          <p className="text-lg text-deep-ocean/80 leading-relaxed">
            Founded on the pillars of faith and community, Harvest Faith Chapel has been a lighthouse in Accra for over two decades. What started as a small prayer gathering in a living room has blossomed into a vibrant family of believers dedicated to transforming lives.
          </p>
          <div className="w-32 h-2 bg-terra-cotta/20 mx-auto sketchy-border-sm -rotate-2"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="aspect-video sketchy-border hard-shadow rotate-1 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544427928-c49cdfebf194?auto=format&fit=crop&q=80&w=1200" 
              alt="Church History" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold">Our Vision & Mission</h2>
            <div className="space-y-4">
              <IllustrativeCard variant="accent">
                <h3 className="font-bold text-xl mb-2">The Vision</h3>
                <p className="text-deep-ocean/70">To see a generation in Ghana and beyond fully awakened to the love of Christ and walking in their divine inheritance.</p>
              </IllustrativeCard>
              <IllustrativeCard>
                <h3 className="font-bold text-xl mb-2">The Mission</h3>
                <p className="text-deep-ocean/70">Cultivating a community of believers through sound biblical teaching, passionate worship, and impactful outreach.</p>
              </IllustrativeCard>
            </div>
          </div>
        </div>
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-display font-bold">Leadership Team</h2>
            <p className="text-terra-cotta font-script text-2xl mt-2">Shepherds of the flock</p>
          </div>
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
                  <div className="aspect-[4/5] sketchy-border hard-shadow overflow-hidden bg-white -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -right-2 bg-white px-4 py-2 sketchy-border-sm hard-shadow-sm rotate-2">
                    <p className="font-display font-bold text-deep-ocean">{leader.name}</p>
                  </div>
                </div>
                <div className="pt-4 text-center">
                  <p className="text-terra-cotta font-bold text-sm uppercase tracking-wider mb-2">{leader.role}</p>
                  <p className="text-deep-ocean/70 text-sm italic">"{leader.bio}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
          </>
        )}
      </section>
    </ChurchLayout>
  );
}