'use client';

import React, { useState } from 'react';
import { Calendar, Bell, Clock, ShieldCheck, Zap, User, Users, MessageSquare, TrendingUp, BarChart3, Link, Target, Check, X } from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('self');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus(null);
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="antialiased font-sans bg-white text-slate-800">
      {/* Header / Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
            <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-current stroke-[8]">
              <path d="M20 40 Q20 20 50 20 Q80 20 80 40 L80 80 L20 80 Z" />
              <line x1="50" y1="20" x2="50" y2="80" />
              <line x1="20" y1="50" x2="80" y2="50" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Окошко</span>
        </div>
        <div>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            Попробовать бесплатно
          </button>
        </div>
      </nav>

      {/* Block 1: Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Твои свободные окошки теперь работают сами
          </h1>
          <p className="text-xl text-slate-500 max-w-lg">
            Умная запись и автоматизация рутины в связке с Telegram. Для тех, кто ценит время и легкий сервис.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1"
            >
              Попробовать бесплатно
            </button>
            <p className="text-sm text-slate-400">
              Доступно первым 50 <br /> участникам навсегда
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="relative">
            {/* Mockup Calendar Widget */}
            <div className="bg-white border border-slate-100 shadow-xl rounded-[2rem] p-6 max-w-md mx-auto transform rotate-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Понедельник, 24 мая</h3>
                <Calendar className="text-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-50">09:00 — Занято</div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-50">10:30 — Занято</div>
                <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-500 text-blue-700 font-medium flex items-center justify-between">
                  12:00 — Окошко
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">13:30 — Свободно</div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">15:00 — Свободно</div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">16:30 — Свободно</div>
              </div>
            </div>
            {/* Mini Float Widget */}
            <div className="absolute -bottom-6 -left-6 sm:left-0 bg-white/80 backdrop-blur-md border border-slate-100 shadow-lg rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Telegram Уведомление</p>
                <p className="text-sm font-medium">Новая запись: Маникюр, 12:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Value Vectors */}
      <section className="bg-slate-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                <Clock />
              </div>
              <h3 className="text-xl font-bold">Экономия времени</h3>
              <p className="text-slate-500 font-medium">Убийца рутины</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-blue-500 mt-0.5" /> Минус 5 часов переписок в неделю</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-blue-500 mt-0.5" /> Клиенты записываются сами</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-blue-500 mt-0.5" /> Мгновенное обновление графика</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 space-y-4">
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                <ShieldCheck />
              </div>
              <h3 className="text-xl font-bold">Защита дохода</h3>
              <p className="text-slate-500 font-medium">Никаких «забыл» и простоев</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-500 mt-0.5" /> Умные уведомления дисциплинируют</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-500 mt-0.5" /> Снижение неявок на 40%</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-500 mt-0.5" /> Аналитика заработка в боте</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 space-y-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                <Zap />
              </div>
              <h3 className="text-xl font-bold">Премиум-сервис</h3>
              <p className="text-slate-500 font-medium">Запись в 2 клика 24/7</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-purple-500 mt-0.5" /> Персональная ссылка в био</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-purple-500 mt-0.5" /> Бронирование даже ночью</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-purple-500 mt-0.5" /> Авто-поиск партнеров для групп</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Interactive Avatar Switcher */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Адаптируется под ваши задачи</h2>

          <div className="bg-slate-100 p-1 rounded-2xl flex mb-12">
            {['self', 'venue', 'network'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab ? 'bg-white shadow-sm text-blue-500' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'self' && 'Я работаю на себя'}
                {tab === 'venue' && 'Я управляю площадкой'}
                {tab === 'network' && 'Я ищу клиентов в сети'}
              </button>
            ))}
          </div>

          {activeTab === 'self' && (
            <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in duration-500">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Фокус на личном росте</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><User size={20} /></div>
                    <div><p className="font-semibold">Личная визитка</p><p className="text-slate-500 text-sm">Красивая страница, заменяющая целый лендинг.</p></div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><MessageSquare size={20} /></div>
                    <div><p className="font-semibold">Авто-напоминания</p><p className="text-slate-500 text-sm">Бот сам напишет клиенту за 2 часа до визита.</p></div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><TrendingUp size={20} /></div>
                    <div><p className="font-semibold">Финансы под контролем</p><p className="text-slate-500 text-sm">Учет доходов и расходов без лишних таблиц.</p></div>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Дашборд мастера</p>
                <div className="h-32 bg-white rounded-xl border border-slate-100 flex items-end p-4 gap-2">
                  <div className="flex-1 bg-blue-200 rounded-t h-1/2"></div>
                  <div className="flex-1 bg-blue-300 rounded-t h-3/4"></div>
                  <div className="flex-1 bg-blue-500 rounded-t h-full"></div>
                  <div className="flex-1 bg-blue-400 rounded-t h-2/3"></div>
                  <div className="flex-1 bg-blue-100 rounded-t h-1/3"></div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400">Доход сегодня</p>
                  <p className="text-xl font-bold">12 400 ₽</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'venue' && (
            <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in duration-500">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Контроль всей студии</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><Users size={20} /></div>
                    <div><p className="font-semibold">Командный календарь</p><p className="text-slate-500 text-sm">Все мастера на одном экране.</p></div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><Check size={20} /></div>
                    <div><p className="font-semibold">Распределение заявок</p><p className="text-slate-500 text-sm">Мгновенная передача клиента свободному мастеру.</p></div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><BarChart3 size={20} /></div>
                    <div><p className="font-semibold">Контроль нагрузки</p><p className="text-slate-500 text-sm">Визуальная аналитика занятости команды.</p></div>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Мастера студии</p>
                <div className="space-y-3">
                  {['Анна (Йога) - 85% занято', 'Игорь (Пилатес) - 40% занято', 'Мария (Растяжка) - 90% занято'].map((m, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="font-medium text-sm">{m.split(' - ')[0]}</span>
                      <span className={`text-xs px-2 py-1 rounded ${m.includes('90%') || m.includes('85%') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {m.split(' - ')[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="grid md:grid-cols-2 gap-12 items-center animate-in fade-in duration-500">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Захват горячего спроса</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><Link size={20} /></div>
                    <div><p className="font-semibold">Мгновенный переход</p><p className="text-slate-500 text-sm">Ссылка в Авито или Соцсетях ведет прямо к записи.</p></div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><Zap size={20} /></div>
                    <div><p className="font-semibold">Без пауз на ответ</p><p className="text-slate-500 text-sm">Запись происходит, пока вы заняты работой.</p></div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><Target size={20} /></div>
                    <div><p className="font-semibold">Трекинг каналов</p><p className="text-slate-500 text-sm">Видьте точно, откуда пришел клиент.</p></div>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex justify-center">
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 max-w-[240px]">
                  <div className="bg-slate-100 h-2 w-12 rounded-full mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-bl-none text-xs">Хочу записаться к вам через Авито.</div>
                    <div className="bg-slate-100 p-3 rounded-2xl rounded-br-none text-xs">Привет! Выберите время: <span className="text-blue-500 font-bold block mt-1">okoshko.me/master</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Block 4: Telegram Integration Flow */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Как это работает</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { step: 1, who: 'Для Мастера', desc: 'Открываешь «Окошко» в календаре за 2 клика. Бот мгновенно обновляет публичную ссылку.' },
              { step: 2, who: 'Для Клиента', desc: 'Клиент переходит по ссылке, выбирает время. Бот присылает вам уведомление о новой записи.' },
              { step: 3, who: 'Для Обоих', desc: 'За 2 часа до встречи бот присылает пуш-напоминание. Вы спокойны, клиент вовремя.' },
            ].map((s) => (
              <div key={s.step} className="text-center space-y-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">{s.step}</div>
                <h4 className="text-xl font-semibold">{s.who}</h4>
                <p className="text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5: CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-[2.5rem] p-8 lg:p-16 text-center space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">Станьте первыми в «Окошке»</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Первые 50 участников получают пожизненный бесплатный доступ ко всем функциям.
            </p>
            <button
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-lg shadow-blue-200 transition-all"
            >
              Занять место
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>&copy; 2024 Окошко. Сделано с любовью к мастерам своего дела.</p>
      </footer>

      {/* Modal Contact Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            {submitStatus === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold">Заявка принята!</h3>
                <p className="text-slate-500">Мы свяжемся с вами в ближайшее время через Telegram.</p>
                <button
                  onClick={closeModal}
                  className="mt-8 w-full bg-slate-100 hover:bg-slate-200 py-4 rounded-2xl font-semibold transition-colors"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Станьте первым</h3>
                <p className="text-slate-500 mb-8">Оставьте свои контакты, чтобы получить бесплатный доступ навсегда.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">ФИО</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Иван Иванов"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ivan@example.com"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Телефон / Telegram</label>
                    <input
                      required
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-red-500 text-sm">Что-то пошло не так. Попробуйте еще раз.</p>
                  )}

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
