import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { TV_CHANNELS, TV_SCHEDULE } from '@/data/content';

export default function SchedulePage() {
  const [selectedChannelId, setSelectedChannelId] = useState<number>(1);
  const schedule = TV_SCHEDULE[selectedChannelId] || [];

  const getNowIndex = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let nowIdx = 0;
    for (let i = 0; i < schedule.length; i++) {
      const [h, m] = schedule[i].time.split(':').map(Number);
      const start = h * 60 + m;
      const end = start + schedule[i].duration;
      if (currentMinutes >= start && currentMinutes < end) { nowIdx = i; break; }
      if (currentMinutes >= start) nowIdx = i;
    }
    return nowIdx;
  };

  const nowIdx = getNowIndex();

  const getProgress = (idx: number) => {
    if (idx !== nowIdx) return null;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [h, m] = schedule[idx].time.split(':').map(Number);
    const start = h * 60 + m;
    return Math.min(100, Math.round(((currentMinutes - start) / schedule[idx].duration) * 100));
  };

  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });

  const selectedChannel = TV_CHANNELS.find(c => c.id === selectedChannelId);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-16 min-h-screen animate-fade-in">
      <div className="mb-8">
        <h1 className="font-oswald text-4xl font-bold text-white">ПРОГРАММА ПЕРЕДАЧ</h1>
        <p className="text-gray-500 text-sm mt-1 capitalize">{today}</p>
      </div>

      {/* Channel selector */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 animate-stagger" style={{ scrollbarWidth: 'none' }}>
        {TV_CHANNELS.map(ch => (
          <button
            key={ch.id}
            onClick={() => setSelectedChannelId(ch.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all font-medium text-sm"
            style={
              selectedChannelId === ch.id
                ? { background: ch.color, color: 'white', transform: 'scale(1.05)', boxShadow: `0 4px 20px ${ch.color}66` }
                : { background: 'hsl(220,14%,12%)', color: 'hsl(0,0%,65%)', border: '1px solid hsl(220,14%,20%)' }
            }
          >
            <span className="font-bold">{ch.logo}</span>
            <span className="hidden sm:inline">{ch.name}</span>
          </button>
        ))}
      </div>

      {/* Selected channel header */}
      {selectedChannel && (
        <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl" style={{ background: 'hsl(220,14%,10%)', border: '1px solid hsl(220,14%,18%)' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black" style={{ background: selectedChannel.color }}>
            {selectedChannel.logo}
          </div>
          <div>
            <p className="text-white font-semibold">{selectedChannel.name}</p>
            <p className="text-gray-500 text-xs">{selectedChannel.description}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-red-400 font-medium">В эфире</span>
          </div>
        </div>
      )}

      {/* Schedule list */}
      <div className="space-y-2">
        {schedule.map((item, idx) => {
          const isCurrent = idx === nowIdx;
          const isPast = idx < nowIdx;
          const progress = getProgress(idx);

          return (
            <div
              key={idx}
              className={`relative p-4 rounded-xl transition-all ${isCurrent ? 'ring-1' : ''}`}
              style={{
                background: isCurrent ? 'hsl(220,14%,13%)' : isPast ? 'hsl(220,14%,8%)' : 'hsl(220,14%,10%)',
                border: isCurrent ? '1px solid hsl(25,100%,40%)' : '1px solid hsl(220,14%,16%)',
                ...(isCurrent ? { boxShadow: '0 0 20px hsla(25,100%,55%,0.1)' } : {}),
                opacity: isPast ? 0.5 : 1,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Time */}
                <div className="shrink-0 w-14">
                  <span
                    className="font-mono font-bold text-sm"
                    style={{ color: isCurrent ? 'hsl(25,100%,60%)' : isPast ? 'hsl(220,10%,40%)' : 'hsl(0,0%,70%)' }}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Now indicator */}
                <div className="shrink-0 w-4 flex justify-center pt-0.5">
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mt-1" />
                  )}
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm leading-tight ${isCurrent ? 'text-white' : isPast ? 'text-gray-600' : 'text-gray-200'}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.duration} мин</p>

                  {/* Progress for current */}
                  {isCurrent && progress !== null && (
                    <div className="progress-bar mt-2 w-32">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="shrink-0">
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'hsla(25,100%,55%,0.2)', color: 'hsl(25,100%,65%)' }}>
                      Сейчас
                    </span>
                  )}
                  {!isPast && !isCurrent && (
                    <button className="p-1.5 rounded-lg transition-colors hover:text-white text-gray-600">
                      <Icon name="Bell" size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
