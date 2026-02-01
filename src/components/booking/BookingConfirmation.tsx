import { format } from "date-fns";
import { CheckCircle, Calendar, Clock, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlotType } from "@/hooks/useBookings";

const slotLabels: Record<SlotType, string> = {
  AM: "Half-Day Morning (6 AM – 12 PM)",
  PM: "Half-Day Afternoon (1 PM – 7 PM)",
  FULL: "Full Day (6 AM – 4 PM)",
};

interface BookingConfirmationProps {
  date: Date;
  slot: SlotType;
  name: string;
  partySize: number;
  onReset: () => void;
}

export function BookingConfirmation({
  date,
  slot,
  name,
  partySize,
  onReset,
}: BookingConfirmationProps) {
  return (
    <div className="max-w-md mx-auto text-center py-8 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 text-success mb-6">
        <CheckCircle className="h-8 w-8" />
      </div>

      <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
      <p className="text-muted-foreground mb-6">
        Thanks, {name.split(" ")[0]}! We'll see you on the water.
      </p>

      <div className="bg-card rounded-lg border p-6 text-left space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <div className="font-semibold">{format(date, "EEEE, MMMM d, yyyy")}</div>
            <div className="text-sm text-muted-foreground">Trip Date</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <div className="font-semibold">{slotLabels[slot]}</div>
            <div className="text-sm text-muted-foreground">Trip Type</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <div className="font-semibold">{partySize} {partySize === 1 ? "person" : "people"}</div>
            <div className="text-sm text-muted-foreground">Party Size</div>
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4 mb-6 text-sm text-left">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Phone className="h-4 w-4" /> What's Next?
        </h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>• You'll receive a confirmation email shortly</li>
          <li>• We'll text you meeting location details</li>
          <li>• Questions? Call us at (555) 123-4567</li>
        </ul>
      </div>

      <Button variant="outline" onClick={onReset}>
        Book Another Trip
      </Button>
    </div>
  );
}
