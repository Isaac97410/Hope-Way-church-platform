import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, SkipForward, SkipBack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
interface SermonPlayerProps {
  sermon: {
    title: string;
    speaker: string;
    audioUrl: string;
  } | null;
  onClose: () => void;
}
export function SermonPlayer({ sermon, onClose }: SermonPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  if (!sermon) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none"
      >
        <div className="max-w-3xl mx-auto bg-white sketchy-border hard-shadow p-4 md:p-6 pointer-events-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <h4 className="font-display font-bold text-lg truncate text-hope-blue">{sermon.title}</h4>
            <p className="text-hope-gold text-sm font-bold uppercase tracking-wider">{sermon.speaker}</p>
          </div>
          <div className="flex flex-col items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:text-hope-gold text-hope-blue">
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-hope-blue text-white sketchy-border-sm hard-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-hope-gold text-hope-blue">
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3 w-full md:min-w-[300px]">
              <span className="text-xs font-mono text-hope-blue/60">0:00</span>
              <Slider
                value={[progress]}
                max={100}
                step={1}
                className="flex-1 cursor-pointer"
                onValueChange={(vals) => setProgress(vals[0])}
              />
              <span className="text-xs font-mono text-hope-blue/60">45:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-hope-blue/60" />
              <div className="w-20 h-1 bg-hope-blue/10 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-hope-gold" />
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-red-50 text-red-500">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}