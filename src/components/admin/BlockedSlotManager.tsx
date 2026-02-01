import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { SlotType, useBlockedSlots, useCreateBlockedSlot, useDeleteBlockedSlot } from "@/hooks/useBookings";

const slotLabels: Record<SlotType, string> = {
  AM: "AM",
  PM: "PM",
  FULL: "Full",
};

export function BlockedSlotManager() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [reason, setReason] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<SlotType>("AM");

  const { data: blockedSlots } = useBlockedSlots();
  const createBlocked = useCreateBlockedSlot();
  const deleteBlocked = useDeleteBlockedSlot();

  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  const blocksForDate = useMemo(() => {
    if (!selectedDateStr || !blockedSlots) return [];
    return blockedSlots.filter((b) => b.date === selectedDateStr);
  }, [blockedSlots, selectedDateStr]);

  const handleBlock = async () => {
    if (!selectedDateStr) return;
    await createBlocked.mutateAsync({
      date: selectedDateStr,
      slot_type: selectedSlot,
      reason: reason || undefined,
    });
    setReason("");
  };

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Block Dates/Slots</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Close dates or specific time slots so no one can book them.
        </p>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="p-0"
        classNames={{
          months: "flex flex-col space-y-4",
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

      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {(Object.keys(slotLabels) as SlotType[]).map((slot) => (
            <Button
              key={slot}
              variant={selectedSlot === slot ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSlot(slot)}
            >
              {slotLabels[slot]}
            </Button>
          ))}
        </div>

        <Input
          placeholder="Reason (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <Button onClick={handleBlock} disabled={!selectedDate || createBlocked.isPending}>
          Block selected slot
        </Button>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Blocked for selected date</h4>
        {blocksForDate.length === 0 && (
          <p className="text-xs text-muted-foreground">No blocked slots for this date.</p>
        )}
        <div className="flex flex-col gap-2">
          {blocksForDate.map((block) => (
            <div key={block.id} className="flex items-center justify-between border rounded-md p-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{slotLabels[block.slot_type]}</Badge>
                <span className="text-sm text-muted-foreground">{block.reason || "No reason"}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteBlocked.mutateAsync({ id: block.id })}
                disabled={deleteBlocked.isPending}
              >
                Unblock
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
