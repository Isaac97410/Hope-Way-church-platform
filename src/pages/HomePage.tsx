import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { useServiceTimes, useChurchInfo, useLeadership } from '@/hooks/use-church-data';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Play, Quote, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export function HomePage() {
  const { data: churchInfo, isLoading: isInfoLoading } = useChurchInfo();
  const { data: services, isLoading: isServiceLoading } = useServiceTimes();
  const { data: leadership } = useLeadership();
  const leadPastor = leadership?.[0] || { 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    name: "Rev. Martha Allottey"
  };
  return (
    <ChurchLayout>
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="font-script text-3xl text-hope-gold">Akwaaba! Your Hope begins here.</span>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-hope-blue">
                Walking the <span className="underline decoration-hope-gold decoration-wavy underline-offset-4">Way</span> of Hope
              </h1>
              <p className="text-lg text-hope-blue/80 max-w-lg leading-relaxed">
                Welcome to Hope Way Ministries. Join us in Accra as we cultivate a life of deep faith, unwavering hope, and transformative love in the heart of Ghana.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button size="lg" className="bg-hope-gold hover:bg-hope-gold/90 text-hope-blue font-bold sketchy-border hard-shadow h-14 px-8 text-lg">
                  I'm New Here
                </Button>
              </Link>
              <Link to="/sermons">
                <Button variant="outline" size="lg" className="border-hope-blue text-hope-blue hover:bg-hope-blue/5 sketchy-border hard-shadow h-14 px-8 text-lg flex gap-2">
                  <Play className="w-5 h-5 fill-current" /> Watch Sermons
                </Button>
              </Link>
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
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200"
                alt="Hope Way Community Gathering"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 sketchy-border-sm hard-shadow-sm -rotate-6 hidden sm:block">
              <Quote className="w-8 h-8 text-hope-gold" />
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-hope-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-hope-blue">Worship with Us</h2>
            <div className="w-24 h-1 bg-hope-gold mx-auto sketchy-border-sm"></div>
          </div>
          {isServiceLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-hope-gold" /></div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {services?.map((service: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <IllustrativeCard className="h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-hope-gold/20 rounded-full flex items-center justify-center mb-6">
                      <Clock className="w-8 h-8 text-hope-blue" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 text-hope-blue">{service.day}</h3>
                    <p className="text-hope-gold font-bold mb-4">{service.time}</p>
                    <p className="text-hope-blue/70 text-sm mb-6 flex-1">{service.description}</p>
                    <Button variant="link" className="text-hope-blue font-bold flex gap-2 hover:text-hope-gold">
                      <MapPin className="w-4 h-4" /> Get Directions
                    </Button>
                  </IllustrativeCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="order-2 md:order-1 space-y-6">
            <span className="text-hope-gold font-bold uppercase tracking-widest text-sm">Welcome Message</span>
            <h2 className="text-4xl font-display font-bold text-hope-blue">"A New Season of Divine Hope."</h2>
            <p className="text-hope-blue/80 leading-relaxed italic">
              "At Hope Way Ministries, we believe that no matter where you are in life, God has a path of hope laid out for you. Our community is built on the power of prayer, sound biblical truth, and genuine sisterhood and brotherhood. We welcome you to experience the grace of God with us."
            </p>
            <div>
              <p className="font-display font-bold text-xl text-hope-blue">{leadPastor.name}</p>
              <p className="text-hope-gold font-medium">General Overseer, Hope Way Ministries</p>
            </div>
            <Link to="/about">
              <Button variant="outline" className="sketchy-border-sm border-hope-blue text-hope-blue hover:bg-hope-blue hover:text-white mt-4">Read Our Story</Button>
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <div className="sketchy-border hard-shadow bg-white -rotate-2 overflow-hidden aspect-[4/5]">
               <img
                src={leadPastor.image}
                alt={leadPastor.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-hope-gold text-hope-blue sketchy-border hard-shadow py-12 px-12 text-center rotate-1">
          <h2 className="text-4xl font-display font-bold mb-6">Plan Your Visit</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto font-medium">
            Join us this Sunday! We have prepared a special seat just for you and your family. We can't wait to welcome you home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-hope-blue hover:bg-hope-blue/90 text-white font-bold sketchy-border hard-shadow px-8 h-12">
                Let Us Know You're Coming
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </ChurchLayout>
  );
}