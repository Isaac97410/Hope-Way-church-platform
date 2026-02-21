import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { adminLogin, seedChurchData } from '@/lib/api';
import { useSermons, useEvents, useChurchInfo, useServiceTimes, useUpdateChurchData } from '@/hooks/use-church-data';
import { 
  SERMONS, 
  EVENTS_CALENDAR, 
  MINISTRIES, 
  LEADERSHIP, 
  CHURCH_INFO, 
  SERVICE_TIMES, 
  GIVING_INFO 
} from '@/lib/data';
import { toast } from 'sonner';
import { Loader2, Lock, Save, RefreshCw } from 'lucide-react';
export function AdminPage() {
  const [token, setToken] = React.useState<string | null>(localStorage.getItem('admin_token'));
  const [password, setPassword] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const { data: sermons } = useSermons();
  const { data: events } = useEvents();
  const { data: churchInfo } = useChurchInfo();
  const { data: serviceTimes } = useServiceTimes();
  const updateMutation = useUpdateChurchData();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const res = await adminLogin(password);
      setToken(res.token);
      localStorage.setItem('admin_token', res.token);
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error('Invalid password');
    } finally {
      setIsLoggingIn(false);
    }
  };
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
  };
  const handleUpdate = (type: string, data: any) => {
    if (!token) return;
    updateMutation.mutate({ type, data, token }, {
      onSuccess: () => toast.success(`${type} updated successfully`),
      onError: () => toast.error(`Failed to update ${type}`)
    });
  };
  const handleSeed = async () => {
    if (!token) return;
    try {
      await seedChurchData({
        sermons: SERMONS,
        events: EVENTS_CALENDAR,
        ministries: MINISTRIES,
        leadership: LEADERSHIP,
        churchInfo: CHURCH_INFO,
        serviceTimes: SERVICE_TIMES,
        givingInfo: GIVING_INFO
      }, token);
      toast.success('KV Store initialized with default data');
    } catch (e) {
      toast.error('Seeding failed');
    }
  };
  if (!token) {
    return (
      <ChurchLayout>
        <div className="max-w-md mx-auto py-32 px-4">
          <IllustrativeCard className="space-y-6">
            <div className="text-center">
              <Lock className="w-12 h-12 text-terra-cotta mx-auto mb-4" />
              <h1 className="text-3xl font-display font-bold">Admin Login</h1>
              <p className="text-deep-ocean/60 mt-2">Access restricted to church staff.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Enter Admin Password" 
                className="sketchy-border-sm h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" disabled={isLoggingIn} className="w-full bg-deep-ocean text-white h-12 sketchy-border hard-shadow">
                {isLoggingIn ? <Loader2 className="animate-spin mr-2" /> : null}
                Unlock Dashboard
              </Button>
            </form>
          </IllustrativeCard>
        </div>
      </ChurchLayout>
    );
  }
  return (
    <ChurchLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold">Church Dashboard</h1>
            <p className="text-terra-cotta font-script text-2xl">Manage your digital sanctuary</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleSeed} className="sketchy-border-sm flex gap-2">
              <RefreshCw className="w-4 h-4" /> Initialize KV
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-red-500">Logout</Button>
          </div>
        </div>
        <Tabs defaultValue="sermons" className="space-y-8">
          <TabsList className="bg-deep-ocean/5 p-1 h-auto flex flex-wrap gap-2 justify-start border-none">
            <TabsTrigger value="sermons" className="data-[state=active]:bg-deep-ocean data-[state=active]:text-white sketchy-border-sm px-6 py-2">Sermons</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-deep-ocean data-[state=active]:text-white sketchy-border-sm px-6 py-2">Events</TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-deep-ocean data-[state=active]:text-white sketchy-border-sm px-6 py-2">Church Info</TabsTrigger>
          </TabsList>
          <TabsContent value="sermons">
            <IllustrativeCard className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">Live Sermons ({sermons?.length})</h2>
                <Button onClick={() => handleUpdate('sermons', sermons)} className="bg-terra-cotta text-white sketchy-border-sm">
                  <Save className="w-4 h-4 mr-2" /> Save All Changes
                </Button>
              </div>
              <p className="text-deep-ocean/60 italic text-sm">Directly editing the raw JSON for flexibility in this phase.</p>
              <textarea 
                className="w-full min-h-[400px] font-mono text-sm p-4 sketchy-border-sm bg-bush-sand"
                defaultValue={JSON.stringify(sermons, null, 2)}
                onBlur={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    handleUpdate('sermons', parsed);
                  } catch (err) {
                    toast.error('Invalid JSON format');
                  }
                }}
              />
            </IllustrativeCard>
          </TabsContent>
          <TabsContent value="events">
            <IllustrativeCard className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">Upcoming Events ({events?.length})</h2>
                <Button onClick={() => handleUpdate('events', events)} className="bg-terra-cotta text-white sketchy-border-sm">
                   <Save className="w-4 h-4 mr-2" /> Save All Changes
                </Button>
              </div>
              <textarea 
                className="w-full min-h-[400px] font-mono text-sm p-4 sketchy-border-sm bg-bush-sand"
                defaultValue={JSON.stringify(events, null, 2)}
                onBlur={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    handleUpdate('events', parsed);
                  } catch (err) {
                    toast.error('Invalid JSON format');
                  }
                }}
              />
            </IllustrativeCard>
          </TabsContent>
          <TabsContent value="info">
            <div className="grid md:grid-cols-2 gap-8">
              <IllustrativeCard className="space-y-4">
                <h3 className="text-xl font-display font-bold">Church Basics</h3>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-deep-ocean/50">Tagline</label>
                   <Input 
                    defaultValue={churchInfo?.tagline}
                    className="sketchy-border-sm"
                    onBlur={(e) => handleUpdate('churchInfo', { ...churchInfo, tagline: e.target.value })}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-deep-ocean/50">Lead Pastor</label>
                   <Input 
                    defaultValue={churchInfo?.pastor}
                    className="sketchy-border-sm"
                    onBlur={(e) => handleUpdate('churchInfo', { ...churchInfo, pastor: e.target.value })}
                   />
                </div>
              </IllustrativeCard>
              <IllustrativeCard className="space-y-4">
                <h3 className="text-xl font-display font-bold">Service Times</h3>
                <p className="text-sm text-deep-ocean/60 mb-4">Edit the schedule displayed on the home page.</p>
                <textarea 
                  className="w-full min-h-[200px] font-mono text-sm p-4 sketchy-border-sm bg-bush-sand"
                  defaultValue={JSON.stringify(serviceTimes, null, 2)}
                  onBlur={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      handleUpdate('serviceTimes', parsed);
                    } catch (err) {
                      toast.error('Invalid JSON format');
                    }
                  }}
                />
              </IllustrativeCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ChurchLayout>
  );
}