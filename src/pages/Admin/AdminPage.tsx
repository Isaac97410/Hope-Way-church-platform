import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { adminLogin, seedChurchData } from '@/lib/api';
import { useSermons, useEvents, useMinistries, useChurchInfo, useServiceTimes, useUpdateChurchData } from '@/hooks/use-church-data';
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
  const [sermonsJson, setSermonsJson] = React.useState('');
  const [eventsJson, setEventsJson] = React.useState('');
  const [servicesJson, setServicesJson] = React.useState('');
  const [ministriesJson, setMinistriesJson] = React.useState('');
  const { data: sermons } = useSermons();
  const { data: events } = useEvents();
  const { data: ministries } = useMinistries();
  const { data: churchInfo } = useChurchInfo();
  const { data: serviceTimes } = useServiceTimes();
  const updateMutation = useUpdateChurchData();
  React.useEffect(() => { if (sermons) setSermonsJson(JSON.stringify(sermons, null, 2)); }, [sermons]);
  React.useEffect(() => { if (events) setEventsJson(JSON.stringify(events, null, 2)); }, [events]);
  React.useEffect(() => { if (serviceTimes) setServicesJson(JSON.stringify(serviceTimes, null, 2)); }, [serviceTimes]);
  React.useEffect(() => { if (ministries) setMinistriesJson(JSON.stringify(ministries, null, 2)); }, [ministries]);
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
  const handleUpdate = (type: string, jsonString: string) => {
    if (!token) return;
    try {
      const parsedData = JSON.parse(jsonString);
      updateMutation.mutate({ type, data: parsedData, token }, {
        onSuccess: () => toast.success(`${type} updated successfully`),
        onError: () => toast.error(`Failed to update ${type}`)
      });
    } catch (err) {
      toast.error(`Invalid JSON format in ${type}`);
    }
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
      toast.success('Hope Way Ministries branding initialized to defaults');
    } catch (e) {
      toast.error('Initialization failed');
    }
  };
  if (!token) {
    return (
      <ChurchLayout>
        <div className="max-w-md mx-auto py-32 px-4">
          <IllustrativeCard className="space-y-6">
            <div className="text-center">
              <Lock className="w-12 h-12 text-hope-gold mx-auto mb-4" />
              <h1 className="text-3xl font-display font-bold text-hope-blue">Admin Login</h1>
              <p className="text-hope-blue/60 mt-2">Hope Way Staff Access Only.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter Admin Password"
                className="sketchy-border-sm h-12 focus-visible:ring-hope-gold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" disabled={isLoggingIn} className="w-full bg-hope-blue text-white font-bold h-12 sketchy-border hard-shadow hover:translate-y-0.5">
                {isLoggingIn ? <Loader2 className="animate-spin mr-2" /> : null}
                Access Dashboard
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
            <h1 className="text-4xl font-display font-bold text-hope-blue">Ministry Dashboard</h1>
            <p className="text-hope-gold font-script text-2xl">Hope Way Ministries Management</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleSeed} className="sketchy-border-sm border-hope-blue text-hope-blue flex gap-2 hover:bg-hope-blue hover:text-white transition-all">
              <RefreshCw className="w-4 h-4" /> Reset to Hope Way Brand
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:bg-red-50 font-bold">Logout</Button>
          </div>
        </div>
        <Tabs defaultValue="sermons" className="space-y-8">
          <TabsList className="bg-hope-blue/5 p-1 h-auto flex flex-wrap gap-2 justify-start border-none">
            <TabsTrigger value="sermons" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Sermons</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Events</TabsTrigger>
            <TabsTrigger value="ministries" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Ministries</TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Brand Info</TabsTrigger>
          </TabsList>
          <TabsContent value="sermons">
            <IllustrativeCard className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-hope-blue">Sermon Management</h2>
                <Button onClick={() => handleUpdate('sermons', sermonsJson)} disabled={updateMutation.isPending} className="bg-hope-gold text-hope-blue font-bold sketchy-border-sm hard-shadow-sm border-none">
                  {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
              <textarea
                className="w-full min-h-[400px] font-mono text-sm p-4 sketchy-border-sm bg-white focus:outline-none focus:ring-2 focus:ring-hope-gold border-hope-blue/20"
                value={sermonsJson}
                onChange={(e) => setSermonsJson(e.target.value)}
              />
            </IllustrativeCard>
          </TabsContent>
          <TabsContent value="events">
            <IllustrativeCard className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-hope-blue">Events Data</h2>
                <Button onClick={() => handleUpdate('events', eventsJson)} disabled={updateMutation.isPending} className="bg-hope-gold text-hope-blue font-bold sketchy-border-sm hard-shadow-sm border-none">
                   {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                   Save Changes
                </Button>
              </div>
              <textarea
                className="w-full min-h-[400px] font-mono text-sm p-4 sketchy-border-sm bg-white focus:outline-none focus:ring-2 focus:ring-hope-gold border-hope-blue/20"
                value={eventsJson}
                onChange={(e) => setEventsJson(e.target.value)}
              />
            </IllustrativeCard>
          </TabsContent>
          <TabsContent value="ministries">
            <IllustrativeCard className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-hope-blue">Ministries Management</h2>
                <Button onClick={() => handleUpdate('ministries', ministriesJson)} disabled={updateMutation.isPending} className="bg-hope-gold text-hope-blue font-bold sketchy-border-sm hard-shadow-sm border-none">
                   {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                   Save Changes
                </Button>
              </div>
              <p className="text-sm text-hope-blue/60 italic">Update ministry titles, descriptions, icons, and theme colors.</p>
              <textarea
                className="w-full min-h-[400px] font-mono text-sm p-4 sketchy-border-sm bg-white focus:outline-none focus:ring-2 focus:ring-hope-gold border-hope-blue/20"
                value={ministriesJson}
                onChange={(e) => setMinistriesJson(e.target.value)}
              />
            </IllustrativeCard>
          </TabsContent>
          <TabsContent value="info">
            <div className="grid md:grid-cols-2 gap-8">
              <IllustrativeCard className="space-y-4">
                <h3 className="text-xl font-display font-bold text-hope-blue">Church Basics</h3>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-hope-blue/50">Brand Tagline</label>
                   <Input
                    defaultValue={churchInfo?.tagline}
                    className="sketchy-border-sm focus-visible:ring-hope-gold border-hope-blue/20"
                    onBlur={(e) => handleUpdate('churchInfo', JSON.stringify({ ...churchInfo, tagline: e.target.value }))}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-hope-blue/50">Lead Pastor</label>
                   <Input
                    defaultValue={churchInfo?.pastor}
                    className="sketchy-border-sm focus-visible:ring-hope-gold border-hope-blue/20"
                    onBlur={(e) => handleUpdate('churchInfo', JSON.stringify({ ...churchInfo, pastor: e.target.value }))}
                   />
                </div>
              </IllustrativeCard>
              <IllustrativeCard className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-display font-bold text-hope-blue">Service Times</h3>
                   <Button size="sm" onClick={() => handleUpdate('serviceTimes', servicesJson)} className="bg-hope-blue text-white h-8 sketchy-border-sm border-none">Save Times</Button>
                </div>
                <textarea
                  className="w-full min-h-[200px] font-mono text-sm p-4 sketchy-border-sm bg-white focus:outline-none focus:ring-2 focus:ring-hope-gold border-hope-blue/20"
                  value={servicesJson}
                  onChange={(e) => setServicesJson(e.target.value)}
                />
              </IllustrativeCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ChurchLayout>
  );
}