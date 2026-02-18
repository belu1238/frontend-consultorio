import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { es } from 'date-fns/locale'; // Para nombres en español
import { FaRegUser } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SessionCalendarModal from '../session/SessionCalendarModal';
import { useQuery } from '@tanstack/react-query';
import { getSessionsByDate } from '../../api/PatientAPI';


export default function Calendar() {
  // Obtengo la url de la fecha
  const { fechaUrl } = useParams()

  // si hay fecha en la url, la uso; si no, uso la fecha actual
  const initialDate = fechaUrl ? new Date(fechaUrl) : new Date()

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  // funcion para cambiar la fecha seleccionada y actualizar la URL
  const handleDateClick = (day: Date) => {
    const formatted = format(day, 'yyyy-MM-dd')
    setSelectedDate(day)
    navigate(`/calendario/${formatted}${location.search}`)
  }
  const fechaQuery = format(selectedDate, 'yyyy-MM-dd')

  // 1. Calcular el rango de días a mostrar
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Empieza en Lunes
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const navigate = useNavigate()

  const {data} = useQuery({
    queryKey: ['sessionsByDate', fechaQuery],
    queryFn: () => getSessionsByDate(fechaQuery),
    retry: false
  })
  

  return (
    <>
    <div>
    <h1 className='text-4xl font-serif'>Calendario</h1>
    <p className='mt-2 text-gray-600 font-sans text-xl'>Gestiona tus citas y sesiones</p>

    </div>

    <div className="flex gap-8 p-6 min-h-screen">

      {/* TARJETA IZQUIERDA: CALENDARIO */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 w-[850px]">
        
        {/* Header: Mes y Navegación */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: es })}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-4 border-gray-300 bg-stone-100 rounded-lg hover:bg-orange-300"> &lt; </button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-4 border-gray-300 bg-stone-100 rounded-lg hover:bg-orange-300"> &gt; </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 mb-4 text-center text-gray-600 font-sans text-xl">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
            <div key={d} className="py-2">{d}</div>
          ))}
        </div>

        {/* Cuadrícula de días */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {calendarDays.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);

            return (
              <button
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                className={`
                  min-h-28 flex items-center justify-center rounded-xl text-lg transition-all
                  ${!isCurrentMonth ? 'text-stone-300' : 'text-stone-700'}
                  ${isSelected 
                    ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-bold' 
                    : 'hover:bg-orange-300'}
                `}
              >

                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      {/* TARJETA DERECHA: DETALLE DE LA CITA */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-stone-200 p-10 flex flex-col items-center">
         <h3 className="self-start text-2xl font-bold mb-6">
            {format(selectedDate, "d 'de' MMMM", { locale: es })}
         </h3>
         <div className='w-full overflow-y-auto'>
         {data && data.length > 0 ? (
          data.map(sesion => (
            <div key={sesion.id} className='p-4 border border-gray-200 rounded-xl mb-6 hover:bg-orange-200'>
              <div className='flex items-center gap-4'>
                <div>
                <FaRegUser className="w-5 h-6 text-gray-400"/>
                </div>

                <div className='flex-col mb-4'>
                <p className='font-sans text-xl'>{sesion.paciente.nombre} {sesion.paciente.apellido}</p>
                <p>{sesion.hora}</p>
                </div>
              </div>
              <span className='font-bold'>Estado de pago: </span>
              <span 
              className='px-3 py-1 rounded-xl text-sm font-medium'
              style={{backgroundColor: sesion.estado_pago.color}}>
                
                {sesion.estado_pago.nombre} 
              </span>
            </div>
          )) 
         ) : (
           <p className="text-stone-400 text-lg mb-6">No hay citas para este día</p>
         )}
         </div>
         
         <button 
         onClick={() => navigate(location.pathname + '?newSession=true')}
         className="flex items-center gap-2 border border-stone-200 px-6 py-3 rounded-xl hover:bg-orange-300 transition-all shadow-sm font-medium">
           <span className="text-xl">+</span> Agendar sesión
         </button>

         <SessionCalendarModal />
      </div>
    </div>
    </>
  );
}

