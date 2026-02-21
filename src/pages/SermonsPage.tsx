import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { SermonPlayer } from '@/components/SermonPlayer';
import { useSermons } from '@/hooks/use-church-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Play, Calendar, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
export function SermonsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { data: sermons, isLoading } = useSermons();
  const [activeSermon, setActiveSermon] = React.useState<any | null>(null);
  const filteredSermons = sermons?.filter((s: any) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.speaker.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <ChurchLayout>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-display font-bold text-hope-blue">Sermon Archive</h1>
            <p className="text-hope-gold font-script text-2xl">Spiritual food for your soul</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hope-blue/40" />
            <Input
              placeholder="Search by title or speaker..."
              className="pl-10 h-12 sketchy-border-sm hard-shadow-sm bg-white focus-visible:ring-hope-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-12 h-12 text-hope-gold animate-spin" />
          </div>
        ) : filteredSermons && filteredSermons.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredSermons.map((sermon: any, index: number) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <IllustrativeCard className="p-0 overflow-hidden group">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-hope-blue/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => setActiveSermon(sermon)}
                        className="w-16 h-16 rounded-full bg-white text-hope-blue sketchy-border hard-shadow hover:scale-110"
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </Button>
                    </div>
                    <div className="absolute top-3 right-3 bg-hope-gold text-hope-blue text-xs font-bold px-2 py-1 sketchy-border-sm rotate-3">
                      {sermon.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="font-display font-bold text-xl text-hope-blue line-clamp-2 min-h-[3.5rem]">{sermon.title}</h3>
                    <div className="space-y-2 text-sm text-hope-blue/60">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{sermon.speaker}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{sermon.date}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => setActiveSermon(sermon)}
                      variant="outline"
                      className="w-full sketchy-border-sm border-hope-blue text-hope-blue hover:bg-hope-blue hover:text-white transition-colors"
                    >
                      Listen Now
                    </Button>
                  </div>
                </IllustrativeCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-xl text-hope-blue/40 font-display italic">No sermons found matching your search.</p>
          </div>
        )}
      </section>
      <SermonPlayer
        sermon={activeSermon}
        onClose={() => setActiveSermon(null)}
      />
    </ChurchLayout>
  );
}