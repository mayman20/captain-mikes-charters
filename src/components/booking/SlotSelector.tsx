import { useAvailability, getSlotAvailability, SlotType } from "@/hooks/useBookings";
import { cn } from "@/lib/utils";
import { Sun, Sunset, Clock } from "lucide-react";

interface SlotSelectorProps {
  selectedDate: Date | undefined;
  selectedSlot: SlotType | undefined;
  onSelectSlot: (slot: SlotType) => void;
}

const slotConfig: Record<SlotType, { label: string; time: string; price: string; icon: React.ReactNode }> = {
  AM: {
    label: "Half-Day Morning",
    time: "6:00 AM – 12:00 PM",
    price: "$350",
    icon: <Sun className="h-5 w-5" />,
  },
  PM: {
    label: "Half-Day Afternoon",
    time: "1:00 PM – 7:00 PM",
    price: "$350",
    icon: <Sunset className="h-5 w-5" />,
  },
  FULL: {
    label: "Full Day",
    time: "6:00 AM – 4:00 PM",
    price: "$600",
    icon: <Clock className="h-5 w-5" />,
  },
};

export function SlotSelector({ selectedDate, selectedSlot, onSelectSlot }: SlotSelectorProps) {
  const { data: bookings } = useAvailability();

  const availability = selectedDate 
    ? getSlotAvailability(bookings, selectedDate)
    : { AM: true, PM: true, FULL: true };

  if (!selectedDate) {
    return (
      <div className="bg-card rounded-lg border p-4">
        <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
          Select Trip Type
        </h3>
        <p className="text-sm text-muted-foreground">
          Please select a date first
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
        Select Trip Type
      </h3>
      <div className="space-y-3">
        {(Object.keys(slotConfig) as SlotType[]).map((slot) => {
          const config = slotConfig[slot];
          const isAvailable = availability[slot];
          const isSelected = selectedSlot === slot;

          return (
            <button
              key={slot}
              onClick={() => isAvailable && onSelectSlot(slot)}
              disabled={!isAvailable}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left",
                isSelected && "slot-selected",
                isAvailable && !isSelected && "slot-available",
                !isAvailable && "slot-booked"
              )}
            >
              <div className={cn(
                "p-2 rounded-full",
                isSelected ? "bg-primary-foreground/20" : "bg-muted"
              )}>
                {config.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{config.label}</div>
                <div className="text-sm opacity-80">{config.time}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{config.price}</div>
                {!isAvailable && (
                  <div className="text-xs uppercase">Booked</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        💵 Cash preferred • Deposit optional on request
      </p>
    </div>
  );
}
