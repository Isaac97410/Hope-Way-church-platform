import React from 'react';
import { ChurchLayout } from '@/components/layout/ChurchLayout';
import { IllustrativeCard } from '@/components/ui/illustrative-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { adminLogin, seedChurchData } from '@/lib/api';
import { useSermons, useEvents, useMinistries, useChurchInfo, useServiceTimes, useGivingInfo, useUpdateChurchData } from '@/hooks/use-church-data';
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
import { Loader2, Lock, Save, RefreshCw, Undo2 } from 'lucide-react';
export function AdminPage() {
  const [token, setToken] = React.useState<string | null>(localStorage.getItem('admin_token'));
  const [password, setPassword] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  // Local state for JSON editors
  const [sermonsJson, setSermonsJson] = React.useState('');
  const [eventsJson, setEventsJson] = React.useState('');
  const [servicesJson, setServicesJson] = React.useState('');
  const [ministriesJson, setMinistriesJson] = React.useState('');
  const [givingJson, setGivingJson] = React.useState('');
  // Local state for Brand Info (Basics)
  const [infoState, setInfoState] = React.useState({
    tagline: '',
    pastor: ''
  });
  const { data: sermons } = useSermons();
  const { data: events } = useEvents();
  const { data: ministries } = useMinistries();
  const { data: churchInfo } = useChurchInfo();
  const { data: serviceTimes } = useServiceTimes();
  const { data: givingInfo } = useGivingInfo();
  const updateMutation = useUpdateChurchData();
  // Reset helpers that use the latest data from the server or fallbacks
  const syncSermons = React.useCallback(() => { setSermonsJson(JSON.stringify(sermons ?? SERMONS, null, 2)); }, [sermons]);
  const syncEvents = React.useCallback(() => { setEventsJson(JSON.stringify(events ?? EVENTS_CALENDAR, null, 2)); }, [events]);
  const syncServices = React.useCallback(() => { setServicesJson(JSON.stringify(serviceTimes ?? SERVICE_TIMES, null, 2)); }, [serviceTimes]);
  const syncMinistries = React.useCallback(() => { setMinistriesJson(JSON.stringify(ministries ?? MINISTRIES, null, 2)); }, [ministries]);
  const syncGiving = React.useCallback(() => { setGivingJson(JSON.stringify(givingInfo ?? GIVING_INFO, null, 2)); }, [givingInfo]);
  const syncInfo = React.useCallback(() => {
    const info = churchInfo ?? CHURCH_INFO;
    setInfoState({ tagline: info.tagline || '', pastor: info.pastor || '' });
  }, [churchInfo]);
  // Initial sync effects
  React.useEffect(() => { syncSermons(); }, [sermons, syncSermons]);
  React.useEffect(() => { syncEvents(); }, [events, syncEvents]);
  React.useEffect(() => { syncServices(); }, [serviceTimes, syncServices]);
  React.useEffect(() => { syncMinistries(); }, [ministries, syncMinistries]);
  React.useEffect(() => { syncGiving(); }, [givingInfo, syncGiving]);
  React.useEffect(() => { syncInfo(); }, [churchInfo, syncInfo]);
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
  const saveBrandBasics = () => {
    if (!token) return;
    const baseInfo = churchInfo ?? CHURCH_INFO;
    const newData = { ...baseInfo, ...infoState };
    updateMutation.mutate({ type: 'churchInfo', data: newData, token }, {
      onSuccess: () => toast.success('Brand basics updated successfully'),
      onError: () => toast.error('Failed to update brand basics')
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
      toast.success('Branding initialized to defaults. Reloading data...');
      // Note: react-query hooks will refresh on invalidation
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
              <RefreshCw className="w-4 h-4" /> Reset Brand Defaults
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:bg-red-50 font-bold">Logout</Button>
          </div>
        </div>
        <Tabs defaultValue="sermons" className="space-y-8">
          <TabsList className="bg-hope-blue/5 p-1 h-auto flex flex-wrap gap-2 justify-start border-none">
            <TabsTrigger value="sermons" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Sermons</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Events</TabsTrigger>
            <TabsTrigger value="ministries" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Ministries</TabsTrigger>
            <TabsTrigger value="giving" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Giving</TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-hope-blue data-[state=active]:text-white sketchy-border-sm px-6 py-2 transition-all font-bold">Brand Info</TabsTrigger>
          </TabsList>
          <TabsContent value="sermons">
            <IllustrativeCard className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-hope-blue">Sermon Management</h2>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={syncSermons} className="sketchy-border-sm border-hope-blue text-hope-blue h-9">
                    <Undo2 className="w-4 h-4 mr-2" /> Reset
                  </Button>
                  <Button onClick={() => handleUpdate('sermons', sermonsJson)} disabled={updateMutation.isPending} className="bg-hope-gold text-hope-blue font-bold sketchy-border-sm hard-shadow-sm border-none h-9">
                    {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
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
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={syncEvents} className="sketchy-border-sm border-hope-blue text-hope-blue h-9">
                    <Undo2 className="w-4 h-4 mr-2" /> Reset
                  </Button>
                  <Button onClick={() => handleUpdate('events', eventsJson)} disabled={updateMutation.isPending} className="bg-hope-gold text-hope-blue font-bold sketchy-border-sm hard-shadow-sm border-none h-9">
                    {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
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
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={syncMinistries} className="sketchy-border-sm border-hope-blue text-hope-blue h-9">
                    <Undo2 className="w-4 h-4 mr-2" /> Reset
                  </Button>
                  <Button onClick={() => handleUpdate('ministries', ministriesJson)} disabled={updateMutation.isPending} className="bg-hope-gold text-hope-blue font-bold sketchy-border-sm hard-shadow-sm border-none h-9">
                    {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full min-h-[400px] font-mono text-sm p-4 sketchy-border-sm bg-white focus:outline-none focus:ring-2 focus:ring-hope-gold border-hope-blue/20"
                value={ministriesJson}
                onChange={(e) => setMinistriesJson(e.target.value)}
              />
            </IllustrativeCard>
          </TabsContent>
          <TabsContent value="giving">
            <IllustrativeCard className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-hope-blue">Giving Instructions</h2>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={syncGiving} className="sketchy-border-sm border-hope-blue text-hope-blue h-9">
                    <Undo2 className="w-4 h-4 mr-2" /> Reset
                  </Button>
                  <Button onClick={() => handleUpdate('givingInfo', givingJson)} disabled={updateMutation.isPending} className="bg-hope-gold text-hope-blue font-bold sketchy-border-sm hard-shadow-sm border-none h-9">
                    {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full min-h-[400px] font-mono text-sm p-4 sketchy-border-sm bg-white focus:outline-none focus:ring-2 focus:ring-hope-gold border-hope-blue/20"
                value={givingJson}
                onChange={(e) => setGivingJson(e.target.value)}
              />
            </IllustrativeCard>
          </TabsContent>
          <TabsContent value="info">
            <div className="grid md:grid-cols-2 gap-8">
              <IllustrativeCard className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-display font-bold text-hope-blue">Church Basics</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={syncInfo} className="text-hope-blue">Reset</Button>
                    <Button size="sm" onClick={saveBrandBasics} className="bg-hope-gold text-hope-blue h-8 sketchy-border-sm border-none font-bold">Save Basics</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-hope-blue/50">Brand Tagline</label>
                    <Input
                      value={infoState.tagline}
                      className="sketchy-border-sm focus-visible:ring-hope-gold border-hope-blue/20"
                      onChange={(e) => setInfoState(prev => ({ ...prev, tagline: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-hope-blue/50">Lead Pastor</label>
                    <Input
                      value={infoState.pastor}
                      className="sketchy-border-sm focus-visible:ring-hope-gold border-hope-blue/20"
                      onChange={(e) => setInfoState(prev => ({ ...prev, pastor: e.target.value }))}
                    />
                  </div>
                </div>
              </IllustrativeCard>
              <IllustrativeCard className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-display font-bold text-hope-blue">Service Times</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={syncServices} className="text-hope-blue">Reset</Button>
                    <Button size="sm" onClick={() => handleUpdate('serviceTimes', servicesJson)} className="bg-hope-blue text-white h-8 sketchy-border-sm border-none font-bold">Save Times</Button>
                  </div>
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