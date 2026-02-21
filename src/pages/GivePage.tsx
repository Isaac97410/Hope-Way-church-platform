import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { GIVING_INFO } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Smartphone, Landmark, HeartHandshake, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
export default function GivePage() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };
  return (
    <ChurchLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="font-script text-4xl text-terra-cotta">Honor the Lord with your wealth</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold">Giving & Tithing</h1>
            <p className="text-lg text-deep-ocean/80 leading-relaxed italic pt-4">
              "{GIVING_INFO.whyWeGive}"
            </p>
            <div className="w-32 h-1.5 bg-terra-cotta/30 mx-auto sketchy-border-sm -rotate-2"></div>
          </div>
          {/* Giving Options Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* Mobile Money */}
            <IllustrativeCard variant="accent" className="flex flex-col">
              <div className="w-14 h-14 bg-white sketchy-border-sm hard-shadow-sm flex items-center justify-center mb-6 -rotate-3">
                <Smartphone className="w-7 h-7 text-terra-cotta" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-6">Mobile Money</h2>
              <div className="space-y-4 flex-1">
                {GIVING_INFO.momo.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 sketchy-border-sm hard-shadow-sm group relative">
                    <p className="text-xs font-bold text-terra-cotta uppercase tracking-widest">{item.provider}</p>
                    <p className="text-xl font-mono font-bold text-deep-ocean my-1">{item.number}</p>
                    <p className="text-sm text-deep-ocean/60">{item.name}</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-deep-ocean/40 hover:text-terra-cotta"
                      onClick={() => copyToClipboard(item.number, item.provider)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-deep-ocean/50 mt-6 italic">*Please use your name as the reference.</p>
            </IllustrativeCard>
            {/* Bank Transfer */}
            <IllustrativeCard className="flex flex-col">
              <div className="w-14 h-14 bg-terra-cotta/10 sketchy-border-sm hard-shadow-sm flex items-center justify-center mb-6 rotate-3">
                <Landmark className="w-7 h-7 text-deep-ocean" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-6">Bank Transfer</h2>
              <div className="bg-deep-ocean/5 p-6 space-y-4 flex-1">
                <div>
                  <label className="text-xs font-bold uppercase text-deep-ocean/40">Bank Name</label>
                  <p className="font-bold">{GIVING_INFO.bank.bankName}</p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-deep-ocean/40">Account Name</label>
                  <p className="font-bold">{GIVING_INFO.bank.accountName}</p>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-deep-ocean/40">Account Number</label>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-lg font-bold">{GIVING_INFO.bank.accountNumber}</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-deep-ocean/40 hover:text-terra-cotta"
                      onClick={() => copyToClipboard(GIVING_INFO.bank.accountNumber, "Bank Account")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-deep-ocean/40">Branch</label>
                  <p className="font-bold">{GIVING_INFO.bank.branch}</p>
                </div>
              </div>
              <Button className="w-full mt-6 bg-deep-ocean text-white sketchy-border-sm hard-shadow-sm">
                Get Digital Receipt
              </Button>
            </IllustrativeCard>
            {/* In Person */}
            <IllustrativeCard className="flex flex-col border-dashed">
              <div className="w-14 h-14 bg-terra-cotta/10 sketchy-border-sm hard-shadow-sm flex items-center justify-center mb-6">
                <HeartHandshake className="w-7 h-7 text-deep-ocean" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-4">In Person</h2>
              <p className="text-deep-ocean/70 mb-8 flex-1 leading-relaxed">
                You can give during any of our weekly services. We provide tithe envelopes at the entrance and during the offering session. 
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-deep-ocean/80">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Tithes & Seed Offering</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-deep-ocean/80">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Welfare & Missions Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-deep-ocean/80">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Project Harvest Support</span>
                </div>
              </div>
              <Button variant="outline" className="w-full sketchy-border-sm h-12">
                Visit Us This Sunday
              </Button>
            </IllustrativeCard>
          </div>
          {/* Scriptural Promise */}
          <div className="max-w-4xl mx-auto p-12 bg-white sketchy-border hard-shadow text-center space-y-6 rotate-1">
             <span className="font-script text-3xl text-terra-cotta">A Blessed Life</span>
             <h3 className="text-2xl font-display font-bold italic">
               "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this,” says the Lord Almighty, “and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it."
             </h3>
             <p className="text-deep-ocean/50 font-bold">— Malachi 3:10</p>
          </div>
        </div>
      </div>
    </ChurchLayout>
  );
}