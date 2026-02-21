import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { CHURCH_INFO } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    (e.target as HTMLFormElement).reset();
  };
  return (
    <ChurchLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl font-display font-bold text-hope-blue">Connect With Us</h1>
            <p className="text-hope-gold font-script text-3xl">We're here for you</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-hope-blue">Visit or Call</h2>
                <p className="text-hope-blue/70 max-w-md leading-relaxed">
                  Whether you have a prayer request, a testimony, or just want to say hi, our doors and ears are open.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <IllustrativeCard className="space-y-4">
                  <div className="w-10 h-10 bg-hope-gold/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-hope-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hope-blue">Phone</h4>
                    <p className="text-sm text-hope-blue/70">{CHURCH_INFO.contact.phone}</p>
                  </div>
                </IllustrativeCard>
                <IllustrativeCard className="space-y-4">
                  <div className="w-10 h-10 bg-hope-gold/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-hope-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hope-blue">Email</h4>
                    <p className="text-sm text-hope-blue/70 truncate">{CHURCH_INFO.contact.email}</p>
                  </div>
                </IllustrativeCard>
              </div>
              <IllustrativeCard variant="accent" className="p-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-hope-gold shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1 text-hope-blue text-lg">Our Location</h4>
                    <p className="text-hope-blue/70 leading-relaxed">
                      {CHURCH_INFO.contact.address}<br />
                      Greater Accra, Ghana
                    </p>
                    <Button variant="link" className="px-0 text-hope-gold font-bold mt-2 hover:no-underline">
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </IllustrativeCard>
              <div className="p-8 bg-hope-blue text-white sketchy-border hard-shadow flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xl">Join our WhatsApp</h4>
                  <p className="text-white/60 text-sm">Daily inspirations & announcements</p>
                </div>
                <Button size="icon" className="bg-[#25D366] hover:bg-[#128C7E] sketchy-border-sm border-none hard-shadow-sm text-white">
                  <MessageCircle className="w-6 h-6" />
                </Button>
              </div>
            </div>
            <div>
              <IllustrativeCard className="p-8 md:p-12">
                <h2 className="text-3xl font-display font-bold mb-8 text-hope-blue">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hope-blue/70">Full Name</label>
                    <Input
                      required
                      placeholder="Your Name"
                      className="sketchy-border-sm bg-hope-cream h-12 focus-visible:ring-hope-gold border-hope-blue/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hope-blue/70">Email Address</label>
                    <Input
                      required
                      type="email"
                      placeholder="your@email.com"
                      className="sketchy-border-sm bg-hope-cream h-12 focus-visible:ring-hope-gold border-hope-blue/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hope-blue/70">Subject</label>
                    <select className="w-full h-12 px-3 sketchy-border-sm bg-hope-cream focus:outline-none focus:ring-2 focus:ring-hope-gold border-hope-blue/20 text-hope-blue">
                      <option>General Inquiry</option>
                      <option>Prayer Request</option>
                      <option>Testimony</option>
                      <option>Membership</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-hope-blue/70">Your Message</label>
                    <Textarea
                      required
                      placeholder="How can we help or pray for you?"
                      className="sketchy-border-sm bg-hope-cream min-h-[150px] focus-visible:ring-hope-gold border-hope-blue/20"
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 bg-hope-blue text-white font-bold text-lg sketchy-border hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex gap-2">
                    Send Message <Send className="w-5 h-5" />
                  </Button>
                </form>
              </IllustrativeCard>
            </div>
          </div>
        </div>
      </div>
    </ChurchLayout>
  );
}