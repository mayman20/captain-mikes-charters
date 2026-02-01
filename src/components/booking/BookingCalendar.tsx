import { Calendar } from "@/components/ui/calendar";
import { useAvailability, getSlotAvailability } from "@/hooks/useBookings";
import { cn } from "@/lib/utils";
import { isBefore, startOfDay, addMonths, format } from "date-fns";

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  const { data: bookings } = useAvailability();
  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 3);

  const getDateStatus = (date: Date) => {
    if (!bookings) {
      return { full: false, am: false, pm: false };
    }
    const dateStr = format(date, "yyyy-MM-dd");
    const dayBookings = bookings.bookings.filter((b) => b.date === dateStr);
    const dayBlocked = bookings.blocked.filter((b) => b.date === dateStr);

    const hasFull = dayBookings.some((b) => b.slot_type === "FULL") || dayBlocked.some((b) => b.slot_type === "FULL");
    const hasAM = dayBookings.some((b) => b.slot_type === "AM") || dayBlocked.some((b) => b.slot_type === "AM");
    const hasPM = dayBookings.some((b) => b.slot_type === "PM") || dayBlocked.some((b) => b.slot_type === "PM");

    return { full: hasFull || (hasAM && hasPM), am: hasAM, pm: hasPM };
  };

  const isDateFullyBooked = (date: Date) => {
    const availability = getSlotAvailability(bookings, date);
    return !availability.AM && !availability.PM && !availability.FULL;
  };

  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
        Select Date
      </h3>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        disabled={(date) => 
          isBefore(date, today) || 
          date > maxDate ||
          isDateFullyBooked(date)
        }
        modifiers={{
          booked: (date) => isDateFullyBooked(date),
          am: (date) => {
            const status = getDateStatus(date);
            return status.am && !status.full;
          },
          pm: (date) => {
            const status = getDateStatus(date);
            return status.pm && !status.full;
          },
        }}
        modifiersClassNames={{
          booked: "line-through opacity-50",
          am: "ring-2 ring-yellow-400 text-foreground",
          pm: "ring-2 ring-purple-400 text-foreground",
        }}
        className={cn("p-0 pointer-events-auto")}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-semibold",
          nav: "space-x-1 flex items-center",
          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md inline-flex items-center justify-center",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "opacity-50",
          day_disabled: "opacity-50 cursor-not-allowed",
          day_hidden: "invisible",
        }}
      />
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-muted line-through" />
          <span>Fully Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded ring-2 ring-yellow-400" />
          <span>AM Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded ring-2 ring-purple-400" />
          <span>PM Booked</span>
        </div>
      </div>
    </div>
  );
}
