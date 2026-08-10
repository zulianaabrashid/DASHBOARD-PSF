'use client';

import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const months = ['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogos','Sep','Okt','Nov','Dis'];
const data = months.map((month, i) => ({ month, baca: [120,145,138,172,190,210,225,248,236,265,280,302][i], minda: [80,96,110,105,128,142,155,168,160,185,194,215][i], pengunjung: [310,360,405,430,475,510,545,590,575,620,655,710][i], ict: [24,28,31,35,39,44,47,52,50,56,61,68][i] }));
const cards = [
  { key: 'baca', title: 'Baca dan Kongsi', icon: '📚', desc: 'Aktiviti pembacaan & perkongsian' },
  { key: 'minda', title: 'Kongsi Minda', icon: '💡', desc: 'Perkongsian ilmu dan idea' },
  { key: 'pengunjung', title: 'Statistik Pengunjung', icon: '👥', desc: 'Jumlah kunjungan PSF' },
  { key: 'ict', title: 'Pengguna ICT', icon: '💻', desc: 'Penggunaan kemudahan ICT' },
] as const;

export default function Dashboard() {
  const [year, setYear] = useState('2026');
  const [month, setMonth] = useState('Semua Bulan');
  const [metric, setMetric] = useState<'baca'|'minda'|'pengunjung'|'ict'>('pengunjung');
  const [date, setDate] = useState('');

  const totals = useMemo(() => data.reduce((a, x) => ({ baca:a.baca+x.baca, minda:a.minda+x.minda, pengunjung:a.pengunjung+x.pengunjung, ict:a.ict+x.ict }), {baca:0,minda:0,pengunjung:0,ict:0}), []);
  const selected = cards.find(c => c.key === metric)!;

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><div className="mark">PSF</div><div><div className="brandTitle">PUSAT SUMBER DAN FOTOGRAFI</div><div className="brandSub">JABATAN PENERANGAN MALAYSIA</div></div></div>
        <div className="headerRight"><span className="statusDot"/> Data Dashboard <span className="live">LIVE</span></div>
      </header>

      <section className="hero">
        <div><div className="eyebrow">PAPAN PEMUKAAN ANALITIK</div><h1>Dashboard Interaktif PSF</h1><p>Pemantauan prestasi Pusat Sumber dan Fotografi mengikut tarikh, bulan dan tahun.</p></div>
        <div className="filters"><label>Tahun<select value={year} onChange={e=>setYear(e.target.value)}><option>2026</option><option>2025</option><option>2024</option></select></label><label>Bulan<select value={month} onChange={e=>setMonth(e.target.value)}><option>Semua Bulan</option>{months.map(m=><option key={m}>{m}</option>)}</select></label><label>Tarikh<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label></div>
      </section>

      <section className="cards">{cards.map(c => <button key={c.key} className={`card ${metric===c.key?'active':''}`} onClick={()=>setMetric(c.key)}><span className="icon">{c.icon}</span><span><b>{c.title}</b><small>{c.desc}</small></span><strong>{totals[c.key].toLocaleString('ms-MY')}</strong></button>)}</section>

      <section className="grid">
        <div className="panel chartPanel"><div className="panelHead"><div><h2>Trend {selected.title}</h2><p>{year} · {month}</p></div><span className="pill">Bulanan</span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Line type="monotone" dataKey={metric} strokeWidth={3} dot={{r:3}}/></LineChart></ResponsiveContainer></div></div>
        <div className="panel"><div className="panelHead"><div><h2>Perbandingan Aktiviti</h2><p>Prestasi bulanan semua modul</p></div></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.slice(0,6)}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="baca"/><Bar dataKey="minda"/><Bar dataKey="pengunjung"/><Bar dataKey="ict"/></BarChart></ResponsiveContainer></div></div>
      </section>

      <section className="insight"><div className="insightIcon">✦</div><div><b>Ringkasan Prestasi</b><p>Gunakan penapis di atas dan pilih mana-mana modul untuk melihat trend. Data contoh ini boleh digantikan dengan data sebenar PSF melalui pangkalan data atau fail Excel/CSV.</p></div><div className="dateInfo">{date || `01 Jan – 31 Dis ${year}`}<small>Tempoh analisis</small></div></section>
      <footer>© 2026 Pusat Sumber dan Fotografi · Dashboard Analitik PSF</footer>
    </main>
  );
}
