import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { TV_CHANNELS, TV_SCHEDULE } from '@/data/content';

interface TVPageProps {
  onNavigateSchedule: () => void;
}

export default function TVPage({ onNavigateSchedule }: TVPageProps) {
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);

  const selected = selectedChannel ? TV_CHANNELS.find(c => c.id === selectedChannel) : null;
  const schedule = selectedChannel ? TV_SCHEDULE[selectedChannel] || [] : [];

  const getNowIndex = (channelSchedule: { time: string; title: string; duration: number }[]) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let nowIdx = 0;
    for (let i = 0; i < channelSchedule.length; i++) {
      const [h, m] = channelSchedule[i].time.split(':').map(Number);
      const start = h * 60 + m;
      const end = start + channelSchedule[i].duration;
      if (currentMinutes >= start && currentMinutes < end) { nowIdx = i; break; }
      if (currentMinutes >= start) nowIdx = i;
    }
    return nowIdx;
  };

  const getCurrentShow = (channelId: number) => {
    const sch = TV_SCHEDULE[channelId] || [];
    const nowIdx = getNowIndex(sch);
    return sch[nowIdx]?.title || '—';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-16 min-h-screen animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-oswald text-4xl font-bold text-white">ТВ-КАНАЛЫ</h1>
          <p className="text-gray-500 text-sm mt-1">8 каналов в прямом эфире</p>
        </div>
        <button
          onClick={onNavigateSchedule}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
          style={{ background: 'hsl(220,14%,14%)', color: 'hsl(25,100%,65%)', border: '1px solid hsl(220,14%,22%)' }}
        >
          <Icon name="CalendarDays" size={15} />
          Программа передач
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
        {TV_CHANNELS.map(ch => (
          <div
            key={ch.id}
            className="tv-channel-card rounded-2xl p-5 cursor-pointer"
            onClick={() => setSelectedChannel(selectedChannel === ch.id ? null : ch.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0"
                style={{ background: ch.color }}
              >
                {ch.logo}
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">{ch.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                  <span className="text-gray-500 text-xs">В эфире</span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-snug line-clamp-2 mb-3">{getCurrentShow(ch.id)}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'hsl(220,10%,55%)' }}>{ch.description.slice(0, 30)}...</span>
              <button
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
                style={{ background: 'linear-gradient(135deg, hsl(25,100%,55%), hsl(0,90%,55%))', color: 'white' }}
              >
                <Icon name="Play" size={10} />
                Смотреть
              </button>
            </div>

            {/* Expand — schedule preview */}
            {selectedChannel === ch.id && (
              <div className="mt-4 pt-4 animate-fade-in" style={{ borderTop: '1px solid hsl(220,14%,20%)' }}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Программа сегодня</p>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {schedule.slice(0, 6).map((s, i) => {
                    const nowIdx = getNowIndex(schedule);
                    const isCurrent = i === nowIdx;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`text-xs font-mono shrink-0 ${isCurrent ? 'font-bold' : 'text-gray-600'}`} style={isCurrent ? { color: 'hsl(25,100%,60%)' } : {}}>
                          {s.time}
                        </span>
                        <span className={`text-xs truncate ${isCurrent ? 'text-white font-medium' : 'text-gray-500'}`}>
                          {isCurrent && <span className="mr-1 text-red-500">▶</span>}
                          {s.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); onNavigateSchedule(); }}
                  className="mt-2 text-xs hover:text-white transition-colors"
                  style={{ color: 'hsl(25,100%,55%)' }}
                >
                  Полная программа →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
