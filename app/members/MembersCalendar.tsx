'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'; // removed dateFnsLocalizer
// import { format, parse, startOfWeek, getDay } from 'date-fns';
import moment from 'moment';
import enUS from 'date-fns/locale/en-US';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './MembersCalendar.module.scss'

import { ToolbarProps } from 'react-big-calendar';

function CustomToolbar({ onNavigate, label }: ToolbarProps<EventType, object>) {
  return (
    <div className="custom-toolbar">
      <button onClick={() => onNavigate('PREV')}>Back</button>
      <span>{label}</span>
      <button onClick={() => onNavigate('NEXT')}>Next</button>
    </div>
  );
}

const locales = { 'en-US': enUS };
const localizer = momentLocalizer(moment);
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

type EventType = {
  id: number;
  eventName: string;
  start: Date;
  end: Date;
};

export default function MembersCalendar() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [date, setDate] = useState(new Date());
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fetchEvents = async () => {
    const response = await fetch('/api/admin/events');
    const data: EventType[] = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      id='members-calendar'
    >
      <div className={styles['members-calendar-container']}>
        <h2 id="calendar" className="members-header">Events Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="eventName"
          style={{ height: 500 }}
          views={['month']}
          defaultView="month"
          date={date} // Bind the date state to the Calendar component
          onNavigate={(newDate) => setDate(newDate)} // Update date state on navigation
        />
      </div>
    </motion.section>
  );
};
