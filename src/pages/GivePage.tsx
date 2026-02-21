import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { useGivingInfo } from '@/hooks/use-church-data';
import { Button } from '@/components/ui/button';
import { Smartphone, Landmark, HeartHandshake, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
export default function GivePage() {
  const { data: givingInfo, isLoading } = useGivingInfo();
  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} information copied to clipboard!`);
  };
  if (isLoading) {
    return (
      <ChurchLayout>
        <div className="flex justify-center py-48">
          <Loader2 className="animate-spin text-hope-gold w-12 h-12" />
        </div>
      </ChurchLayout>
    );
  }
  return (
    <ChurchLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="font-script text-4xl text-hope-gold">Faithful Stewardship</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-hope-blue">Giving & Tithing</h1>
            <p className="text-lg text-hope-blue/80 leading-relaxed italic pt-4">
              "{givingInfo?.whyWeGive || "Your support helps Hope Way Ministries impact lives in Accra and beyond."}"
            </p>
            <div className="w-32 h-1.5 bg-hope-gold/30 mx-auto sketchy-border-sm -rotate-2"></div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            <IllustrativeCard variant="accent" className="flex flex-col">
              <div className="w-14 h-14 bg-white sketchy-border-sm hard-shadow-sm flex items-center justify-center mb-6 -rotate-3">
                <Smartphone className="w-7 h-7 text-hope-gold" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-6 text-hope-blue">Mobile Money</h2>
              <div className="space-y-4 flex-1">
                {givingInfo?.momo?.length ? givingInfo.momo.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white p-4 sketchy-border-sm hard-shadow-sm group relative">
                    <p className="text-xs font-bold text-hope-gold uppercase tracking-widest">{item.provider}</p>
                    <p className="text-xl font-mono font-bold text-hope-blue my-1">{item.number}</p>
                    <p className="text-sm text-hope-blue/60">{item.name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-hope-blue/40 hover:text-hope-gold"
                      onClick={() => copyToClipboard(item.number, item.provider)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                )) : <p className="text-hope-blue/50 text-sm">No MoMo accounts listed.</p>}
              </div>
              <p className="text-xs text-hope-blue/50 mt-6 italic">*Reference: [Your Name]</p>
            </IllustrativeCard>
            <IllustrativeCard className="flex flex-col">
              <div className="w-14 h-14 bg-hope-gold/10 sketchy-border-sm hard-shadow-sm flex items-center justify-center mb-6 rotate-3">
                <Landmark className="w-7 h-7 text-hope-blue" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-6 text-hope-blue">Bank Transfer</h2>
              {givingInfo?.bank ? (
                <div className="bg-hope-blue/5 p-6 space-y-4 flex-1">
                  <div>
                    <label className="text-xs font-bold uppercase text-hope-blue/40">Bank Name</label>
                    <p className="font-bold text-hope-blue">{givingInfo.bank.bankName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-hope-blue/40">Account Name</label>
                    <p className="font-bold text-hope-blue">{givingInfo.bank.accountName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-hope-blue/40">Account Number</label>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-lg font-bold text-hope-blue">{givingInfo.bank.accountNumber}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-hope-blue/40 hover:text-hope-gold"
                        onClick={() => copyToClipboard(givingInfo.bank.accountNumber, "Bank Account")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-hope-blue/40">Branch</label>
                    <p className="font-bold text-hope-blue">{givingInfo.bank.branch}</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-6 bg-hope-blue/5 text-hope-blue/50 text-sm italic">
                  Bank information unavailable.
                </div>
              )}
            </IllustrativeCard>
            <IllustrativeCard className="flex flex-col border-dashed">
              <div className="w-14 h-14 bg-hope-gold/10 sketchy-border-sm hard-shadow-sm flex items-center justify-center mb-6">
                <HeartHandshake className="w-7 h-7 text-hope-blue" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-4 text-hope-blue">In Person</h2>
              <p className="text-hope-blue/70 mb-8 flex-1 leading-relaxed">
                Experience the joy of giving during our Sunday or midweek services. Our hospitality team is available to assist you with envelopes.
              </p>
              <div className="space-y-3 mb-8">
                {["Tithes & Special Offerings", "Welfare & Needy Support", "Mission Outreach Funds"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-hope-blue/80">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full sketchy-border-sm border-hope-blue text-hope-blue font-bold h-12 hover:bg-hope-blue hover:text-white">
                Visit Us
              </Button>
            </IllustrativeCard>
          </div>
          <div className="max-w-4xl mx-auto p-12 bg-white sketchy-border hard-shadow text-center space-y-6 rotate-1">
             <span className="font-script text-3xl text-hope-gold">A Scriptural Promise</span>
             <h3 className="text-2xl font-display font-bold italic text-hope-blue">
               "God is able to make all grace abound to you, so that in all things at all times, having all that you need, you will abound in every good work."
             </h3>
             <p className="text-hope-blue/50 font-bold">— 2 Corinthians 9:8</p>
          </div>
        </div>
      </div>
    </ChurchLayout>
  );
}