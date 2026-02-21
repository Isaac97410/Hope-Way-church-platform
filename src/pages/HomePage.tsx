import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { SERVICE_TIMES, CHURCH_INFO } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Play, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
export function HomePage() {
  return (
    <ChurchLayout>
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="font-script text-3xl text-terra-cotta">Akwaaba! Welcome home.</span>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                Experience <span className="underline decoration-terra-cotta decoration-wavy underline-offset-4">Faith</span> in Ghana
              </h1>
              <p className="text-lg text-deep-ocean/80 max-w-lg leading-relaxed">
                Join our family as we worship, grow, and serve our community in Accra. We are a community of believers dedicated to the transformative power of God's word.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-terra-cotta hover:bg-terra-cotta/90 text-white sketchy-border hard-shadow h-14 px-8 text-lg">
                I'm New Here
              </Button>
              <Button variant="outline" size="lg" className="border-deep-ocean text-deep-ocean hover:bg-deep-ocean/5 sketchy-border hard-shadow h-14 px-8 text-lg flex gap-2">
                <Play className="w-5 h-5 fill-current" /> Watch Sermons
              </Button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square sketchy-border hard-shadow overflow-hidden bg-white rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1544427928-c49cdfebf194?auto=format&fit=crop&q=80&w=1200" 
                alt="Church Community" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            {/* Floating accent icon */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 sketchy-border-sm hard-shadow-sm -rotate-6 hidden sm:block">
              <Quote className="w-8 h-8 text-terra-cotta" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* Service Times Grid */}
      <section className="py-20 bg-deep-ocean/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Worship with Us</h2>
            <div className="w-24 h-1 bg-terra-cotta mx-auto sketchy-border-sm"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICE_TIMES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <IllustrativeCard className="h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-terra-cotta/20 rounded-full flex items-center justify-center mb-6">
                    <Clock className="w-8 h-8 text-deep-ocean" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{service.day}</h3>
                  <p className="text-terra-cotta font-bold mb-4">{service.time}</p>
                  <p className="text-deep-ocean/70 text-sm mb-6 flex-1">{service.description}</p>
                  <Button variant="link" className="text-deep-ocean font-bold flex gap-2">
                    <MapPin className="w-4 h-4" /> Get Directions
                  </Button>
                </IllustrativeCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Pastor's Welcome */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="order-2 md:order-1 space-y-6">
            <span className="text-terra-cotta font-bold uppercase tracking-widest text-sm">From the Pastor's Desk</span>
            <h2 className="text-4xl font-display font-bold">"God is doing something new in our midst."</h2>
            <p className="text-deep-ocean/80 leading-relaxed italic">
              "We believe that every soul that walks through our doors is a divine appointment. Our mission is to see lives transformed by the power of the Gospel and the warmth of community. Whether you are searching for answers or looking for a home, you are welcome here."
            </p>
            <div>
              <p className="font-display font-bold text-xl">{CHURCH_INFO.pastor}</p>
              <p className="text-terra-cotta">Lead Pastor, Harvest Faith Chapel</p>
            </div>
            <Button variant="outline" className="sketchy-border-sm">Read Our Story</Button>
          </div>
          <div className="order-1 md:order-2">
            <div className="sketchy-border hard-shadow bg-white -rotate-2 overflow-hidden aspect-[4/5]">
               <img 
                src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=800" 
                alt="Pastor" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-terra-cotta text-white sketchy-border hard-shadow py-12 px-12 text-center rotate-1">
          <h2 className="text-4xl font-display font-bold mb-6">Plan Your Visit</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We'd love to host you this Sunday! Let us know you're coming and we'll have a special welcome pack waiting for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-deep-ocean hover:bg-deep-ocean/90 text-white sketchy-border hard-shadow px-8 h-12">
              Let Us Know You're Coming
            </Button>
          </div>
        </div>
      </section>
    </ChurchLayout>
  );
}