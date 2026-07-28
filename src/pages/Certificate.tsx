import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Download, FileImage, Printer, Lock } from 'lucide-react';
import { currentTopic } from '../data/topics';
import { useApp } from '../context/AppContext';
import { getAvatarEmoji } from '../data/avatars';
import { formatUzbekDate } from '../utils/formatDate';
import BigButton from '../components/BigButton';
import ConfettiEffect from '../components/ConfettiEffect';
import ProgressBar from '../components/ProgressBar';

export default function Certificate() {
  const { state, pushToast } = useApp();
  const certRef = useRef<HTMLDivElement>(null);
  const [celebrating, setCelebrating] = useState(false);

  const visitedCount = Object.values(state.visited).filter(Boolean).length;
  const eligible = visitedCount >= 4;
  const bestQuiz = state.quizHistory.length ? Math.max(...state.quizHistory.map((q) => q.percent)) : 0;
  const today = formatUzbekDate(new Date());
  const displayName = state.profile.name || "Bo'lajak bilimdon";

  async function handleDownloadPng() {
    if (!certRef.current) return;
    try {
      const dataUrl = await toPng(certRef.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'edukids-sertifikat.png';
      link.href = dataUrl;
      link.click();
      celebrate();
    } catch {
      pushToast('error', 'Rasmga olishda xatolik yuz berdi.');
    }
  }

  async function handleDownloadPdf() {
    if (!certRef.current) return;
    try {
      const dataUrl = await toPng(certRef.current, { pixelRatio: 2 });
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [certRef.current.offsetWidth, certRef.current.offsetHeight] });
      pdf.addImage(dataUrl, 'PNG', 0, 0, certRef.current.offsetWidth, certRef.current.offsetHeight);
      pdf.save('edukids-sertifikat.pdf');
      celebrate();
    } catch {
      pushToast('error', 'PDF yaratishda xatolik yuz berdi.');
    }
  }

  function handlePrint() {
    window.print();
  }

  function celebrate() {
    setCelebrating(true);
    pushToast('success', 'Sertifikat yuklab olindi!', '🏆');
    setTimeout(() => setCelebrating(false), 2500);
  }

  if (!eligible) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-16 text-center">
        <Lock size={56} className="text-slate-300" />
        <h1 className="text-2xl font-extrabold text-slate-700 dark:text-white">Sertifikat hali qulflangan</h1>
        <p className="text-slate-500 dark:text-slate-300">
          Sertifikatni olish uchun barcha 4 ta bo'limni (O'rganish, Viktorina, O'yin, Video) tugatishingiz kerak.
        </p>
        <div className="w-full max-w-sm">
          <ProgressBar percent={(visitedCount / 4) * 100} label={`${visitedCount} / 4 bo'lim`} colorClass="bg-gradient-to-r from-bubble-400 to-leafy-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ConfettiEffect active={celebrating} />
      <h1 className="mb-8 text-center text-3xl font-extrabold text-slate-700 dark:text-white">🏆 Sening sertifikating</h1>

      <div
        ref={certRef}
        className="relative overflow-hidden rounded-2xl border-[10px] border-double border-sunny-400 bg-gradient-to-br from-sunny-50 via-white to-bubble-50 p-10 text-center"
      >
        <div className="absolute left-4 top-4 text-4xl" aria-hidden="true">🌟</div>
        <div className="absolute right-4 top-4 text-4xl" aria-hidden="true">🌟</div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sunny-600">EduKids Sertifikati</p>
        <div className="my-3 text-6xl" aria-hidden="true">{getAvatarEmoji(state.profile.avatar)}</div>
        <p className="text-lg text-slate-500">Ushbu sertifikat berildi:</p>
        <p className="my-2 text-4xl font-extrabold text-slate-800" style={{ fontFamily: "'Baloo 2', cursive" }}>{displayName}</p>
        <p className="mx-auto max-w-md text-slate-600">
          <strong>{currentTopic.emoji} {currentTopic.title}</strong> mavzusi bo'yicha barcha bo'limlarni muvaffaqiyatli tugatgani uchun
        </p>
        <div className="my-6 flex flex-wrap justify-center gap-8">
          <div>
            <p className="text-3xl font-extrabold text-candy-500">{bestQuiz}%</p>
            <p className="text-xs font-bold uppercase text-slate-400">Eng yaxshi viktorina</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-sunny-500">{state.xp}</p>
            <p className="text-xs font-bold uppercase text-slate-400">Jami XP</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-leafy-500">{state.badges.length}</p>
            <p className="text-xs font-bold uppercase text-slate-400">Nishonlar</p>
          </div>
        </div>
        <p className="text-sm text-slate-400">{today}</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-300">EduKids — o'rgan, o'yna, rivojlan!</p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4 print:hidden">
        <BigButton onClick={handleDownloadPng} icon={FileImage} variant="secondary">PNG yuklab olish</BigButton>
        <BigButton onClick={handleDownloadPdf} icon={Download} variant="primary">PDF yuklab olish</BigButton>
        <BigButton onClick={handlePrint} icon={Printer} variant="white">Chop etish</BigButton>
      </div>
    </div>
  );
}
