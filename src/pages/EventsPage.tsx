import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { useEvents } from '@/hooks/use-church-data';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
export function EventsPage() {
  const { data: events, isLoading } = useEvents();
  if (isLoading) {
    return (
      <ChurchLayout>
        <div className="flex justify-center py-48">
          <Loader2 className="w-12 h-12 text-hope-gold animate-spin" />
        </div>
      </ChurchLayout>
    );
  }
  const featuredEvent = events && events.length > 0 ? events[0] : null;
  const upcomingEvents = events ? events.slice(1) : [];
  return (
    <ChurchLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="mb-12 text-center md:text-left">
            <span className="font-script text-3xl text-hope-gold">Join our fellowship</span>
            <h1 className="text-5xl font-display font-bold mt-2 text-hope-blue">Upcoming Programs</h1>
          </div>
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20"
            >
              <IllustrativeCard variant="accent" className="p-0 overflow-hidden lg:flex min-h-[400px]">
                <div className="lg:w-1/2 relative h-64 lg:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-hope-blue text-white sketchy-border-sm px-4 py-1 border-none">Featured Event</Badge>
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-hope-gold font-bold mb-2 block uppercase tracking-wider">
                    {new Date(featuredEvent.date).toLocaleDateString('en-GH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-hope-blue">{featuredEvent.title}</h2>
                  <p className="text-hope-blue/70 mb-8 text-lg leading-relaxed">
                    {featuredEvent.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 mb-8 text-sm text-hope-blue/60">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-hope-gold" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-hope-gold" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>
                  <Button className="w-fit bg-hope-blue text-white sketchy-border hard-shadow px-8 h-12 text-lg hover:bg-hope-blue/90">
                    Set a Reminder
                  </Button>
                </div>
              </IllustrativeCard>
            </motion.div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event: any, index: number) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <IllustrativeCard className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-hope-gold/10 p-3 sketchy-border-sm">
                      <CalendarIcon className="w-6 h-6 text-hope-gold" />
                    </div>
                    <Badge variant="outline" className="sketchy-border-sm border-hope-blue/20 text-hope-blue">
                      {event.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 text-hope-blue">{event.title}</h3>
                  <div className="space-y-1 mb-6 text-sm text-hope-blue/60">
                    <p className="font-semibold text-hope-blue">{new Date(event.date).toLocaleDateString('en-GH', { month: 'long', day: 'numeric' })}</p>
                    <p>{event.time} • {event.location}</p>
                  </div>
                  <p className="text-hope-blue/70 text-sm mb-8 flex-1 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  <Button variant="ghost" className="w-full border-t-2 border-hope-blue/5 pt-4 hover:text-hope-gold flex gap-2 font-bold">
                    Details <ArrowRight className="w-4 h-4" />
                  </Button>
                </IllustrativeCard>
              </motion.div>
            ))}
          </div>
          <section className="mt-24 bg-white sketchy-border hard-shadow p-8 md:p-12 text-center">
            <h2 className="text-3xl font-display font-bold mb-4 text-hope-blue">Past Testimonies</h2>
            <p className="text-hope-blue/70 max-w-2xl mx-auto mb-8">
              God has been faithful in all our gatherings. Browse our media archive to see highlights from previous conferences and community outreach programs.
            </p>
            <Button variant="outline" className="sketchy-border-sm border-hope-blue text-hope-blue hover:bg-hope-blue hover:text-white">View Photo Gallery</Button>
          </section>
        </div>
      </div>
    </ChurchLayout>
  );
}