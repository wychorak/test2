import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isSameDay, addDays, startOfToday } from 'date-fns';
import { pl } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { X, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

// Mock availability data for Oct/Nov 2026
const today = startOfToday();
const bookedDates = [
  addDays(today, 2), addDays(today, 3), addDays(today, 4), addDays(today, 10), addDays(today, 15)
];
const closedDays = [1, 2, 3]; // Monday, Tuesday, Wednesday

const formSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  email: z.string().email('Nieprawidłowy adres email'),
  phone: z.string().min(9, 'Numer telefonu musi mieć co najmniej 9 cyfr'),
  guests: z.string().min(1, 'Wybierz liczbę gości'),
  time: z.string().min(1, 'Wybierz godzinę'),
  requests: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function Reservations() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const setHoveringInteractive = useStore((state) => state.setHoveringInteractive);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const isDateBooked = (dateToCheck: Date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate, dateToCheck));
  };

  const isDateClosed = (dateToCheck: Date) => {
    return closedDays.includes(dateToCheck.getDay());
  };

  const modifiers = {
    booked: bookedDates,
    closed: (date: Date) => isDateClosed(date) || date < today,
    available: (date: Date) => !isDateClosed(date) && !isDateBooked(date) && date >= today,
  };

  const modifiersClassNames = {
    booked: 'date-booked',
    closed: 'date-closed',
    available: 'date-available',
  };

  const handleDateClick = (value: Date | undefined) => {
    if (value && !isDateClosed(value) && !isDateBooked(value) && value >= today) {
      setDate(value);
      setIsModalOpen(true);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Reservation Data:', { date, ...data });
    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
      reset();
      setDate(undefined);
      toast.success('Prośba o rezerwację wysłana. Wkrótce się z Tobą skontaktujemy.');
    }, 3000);
  };

  return (
    <section id="reservations" className="py-32 bg-yugen-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Info */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <span className="font-jp text-yugen-gold text-2xl md:text-3xl mb-4 block opacity-80">
            ご予約
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-yugen-washi mb-8">
            Rezerwacje
          </h2>
          <div className="w-12 h-[1px] bg-yugen-gold mx-auto lg:mx-0 mb-8 opacity-50" />
          
          <div className="space-y-6 font-sans text-yugen-washi/70 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
            <p>
              Yūgen oferuje kameralne doświadczenie kulinarne dla 12 gości. Rezerwacje otwierane są z 60-dniowym wyprzedzeniem pierwszego dnia każdego miesiąca o 10:00 rano.
            </p>
            <p>
              Jesteśmy otwarci od czwartku do niedzieli. Nasze menu degustacyjne wymaga około 2,5 godziny.
            </p>
            <div className="pt-8 border-t border-yugen-washi/10">
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-2">
                <div className="w-3 h-3 rounded-full bg-[#86efac]" />
                <span className="text-xs uppercase tracking-widest">Dostępne</span>
              </div>
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-2">
                <div className="w-3 h-3 rounded-full bg-yugen-vermilion opacity-50" />
                <span className="text-xs uppercase tracking-widest">Zarezerwowane</span>
              </div>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-3 h-3 rounded-full bg-yugen-washi/20" />
                <span className="text-xs uppercase tracking-widest">Zamknięte</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Calendar */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
          <div 
            className="bg-yugen-ink p-8 rounded-sm border border-yugen-washi/5 shadow-2xl w-full max-w-md flex justify-center"
            onMouseEnter={() => setHoveringInteractive(true)}
            onMouseLeave={() => setHoveringInteractive(false)}
          >
            <DayPicker
              mode="single"
              selected={date}
              onSelect={handleDateClick}
              locale={pl}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              disabled={modifiers.closed}
              fromDate={today}
              toDate={addDays(today, 60)}
              showOutsideDays={false}
            />
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-yugen-charcoal/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-yugen-ink border border-yugen-gold/20 p-8 md:p-12 max-w-lg w-full relative overflow-hidden"
            >
              {!isSuccess ? (
                <>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 text-yugen-washi/50 hover:text-yugen-washi transition-colors"
                  >
                    <X size={24} strokeWidth={1} />
                  </button>
                  
                  <div className="text-center mb-8">
                    <span className="font-jp text-yugen-gold text-xl mb-2 block">ご予約</span>
                    <h3 className="font-serif text-3xl text-yugen-washi mb-2">Zarezerwuj Stolik</h3>
                    <p className="font-sans text-yugen-gold text-sm uppercase tracking-widest">
                      {date && format(date, 'd MMMM yyyy', { locale: pl })}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-yugen-washi/50 mb-2">Godzina</label>
                        <select 
                          {...register('time')}
                          className="w-full bg-transparent border-b border-yugen-washi/20 py-2 text-yugen-washi focus:outline-none focus:border-yugen-gold transition-colors font-sans text-sm appearance-none"
                        >
                          <option value="" className="bg-yugen-charcoal">Wybierz godzinę</option>
                          <option value="18:00" className="bg-yugen-charcoal">18:00</option>
                          <option value="18:30" className="bg-yugen-charcoal">18:30</option>
                          <option value="19:00" className="bg-yugen-charcoal">19:00</option>
                          <option value="20:30" className="bg-yugen-charcoal">20:30</option>
                          <option value="21:00" className="bg-yugen-charcoal">21:00</option>
                        </select>
                        {errors.time && <p className="text-yugen-vermilion text-xs mt-1">{errors.time.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-yugen-washi/50 mb-2">Goście</label>
                        <select 
                          {...register('guests')}
                          className="w-full bg-transparent border-b border-yugen-washi/20 py-2 text-yugen-washi focus:outline-none focus:border-yugen-gold transition-colors font-sans text-sm appearance-none"
                        >
                          <option value="" className="bg-yugen-charcoal">Liczba gości</option>
                          {[1,2,3,4,5,6].map(num => (
                            <option key={num} value={num} className="bg-yugen-charcoal">{num} {num === 1 ? 'Gość' : (num < 5 ? 'Gości' : 'Gości')}</option>
                          ))}
                        </select>
                        {errors.guests && <p className="text-yugen-vermilion text-xs mt-1">{errors.guests.message}</p>}
                      </div>
                    </div>

                    <div>
                      <input 
                        {...register('name')}
                        placeholder="Imię i nazwisko"
                        className="w-full bg-transparent border-b border-yugen-washi/20 py-2 text-yugen-washi placeholder:text-yugen-washi/30 focus:outline-none focus:border-yugen-gold transition-colors font-sans text-sm"
                      />
                      {errors.name && <p className="text-yugen-vermilion text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input 
                          {...register('email')}
                          placeholder="Adres Email"
                          type="email"
                          className="w-full bg-transparent border-b border-yugen-washi/20 py-2 text-yugen-washi placeholder:text-yugen-washi/30 focus:outline-none focus:border-yugen-gold transition-colors font-sans text-sm"
                        />
                        {errors.email && <p className="text-yugen-vermilion text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input 
                          {...register('phone')}
                          placeholder="Numer telefonu"
                          type="tel"
                          className="w-full bg-transparent border-b border-yugen-washi/20 py-2 text-yugen-washi placeholder:text-yugen-washi/30 focus:outline-none focus:border-yugen-gold transition-colors font-sans text-sm"
                        />
                        {errors.phone && <p className="text-yugen-vermilion text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <textarea 
                        {...register('requests')}
                        placeholder="Wymagania dietetyczne lub życzenia specjalne (Opcjonalnie)"
                        rows={2}
                        className="w-full bg-transparent border-b border-yugen-washi/20 py-2 text-yugen-washi placeholder:text-yugen-washi/30 focus:outline-none focus:border-yugen-gold transition-colors font-sans text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-yugen-vermilion text-yugen-washi text-xs uppercase tracking-[0.2em] hover:bg-yugen-vermilion/90 transition-colors duration-300 mt-8"
                      onMouseEnter={() => setHoveringInteractive(true)}
                      onMouseLeave={() => setHoveringInteractive(false)}
                    >
                      Potwierdź Prośbę
                    </button>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="text-yugen-gold w-16 h-16 mb-6" strokeWidth={1} />
                  <span className="font-jp text-yugen-gold text-2xl mb-4 block">ありがとうございます</span>
                  <h3 className="font-serif text-3xl text-yugen-washi mb-4">Prośba Otrzymana</h3>
                  <p className="font-sans text-yugen-washi/70 text-sm leading-relaxed max-w-xs">
                    Twoja prośba o rezerwację na {date && format(date, 'd MMMM', { locale: pl })} została przyjęta. Nasz konsjerż wkrótce się z Tobą skontaktuje w celu potwierdzenia.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
