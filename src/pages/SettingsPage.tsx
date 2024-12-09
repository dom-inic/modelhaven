import React from 'react';
import { Bell, Globe, Shield, Moon, Palette, MessageSquare } from 'lucide-react';

const settingsSections = [
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { name: 'Email Notifications', type: 'toggle', value: true },
      { name: 'Desktop Notifications', type: 'toggle', value: false }
    ]
  },
  {
    title: 'Language & Region',
    icon: Globe,
    settings: [
      { name: 'Interface Language', type: 'select', value: 'English', options: ['English', 'Spanish', 'French'] },
      { name: 'Time Zone', type: 'select', value: 'UTC', options: ['UTC', 'EST', 'PST'] }
    ]
  },
  {
    title: 'Privacy',
    icon: Shield,
    settings: [
      { name: 'Chat History', type: 'toggle', value: true },
      { name: 'Data Collection', type: 'toggle', value: false }
    ]
  },
  {
    title: 'Appearance',
    icon: Palette,
    settings: [
      { name: 'Theme', type: 'select', value: 'Dark', options: ['Dark', 'Light', 'System'] },
      { name: 'Chat Bubble Style', type: 'select', value: 'Modern', options: ['Modern', 'Classic', 'Minimal'] }
    ]
  }
];

export function SettingsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-violet-100 mb-8">Settings</h1>

      <div className="space-y-6">
        {settingsSections.map(({ title, icon: Icon, settings }) => (
          <div key={title} className="border border-violet-500/20 rounded-xl p-6 bg-black/30">
            <div className="flex items-center space-x-3 mb-6">
              <Icon className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-medium text-violet-100">{title}</h2>
            </div>

            <div className="space-y-4">
              {settings.map((setting) => (
                <div key={setting.name} className="flex items-center justify-between">
                  <span className="text-violet-300">{setting.name}</span>
                  {setting.type === 'toggle' ? (
                    <button
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        setting.value ? 'bg-cyan-600' : 'bg-violet-500/30'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          setting.value ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  ) : (
                    <select
                      value={setting.value}
                      className="bg-violet-950/30 border border-violet-500/30 rounded-lg py-1 px-3
                               text-violet-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                      {setting.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}