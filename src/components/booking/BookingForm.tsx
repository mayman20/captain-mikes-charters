import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateBooking, SlotType } from "@/hooks/useBookings";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  phone: z.string().min(10, "Valid phone number required").max(20),
  email: z.string().email("Valid email required").max(255),
  party_size: z.number().min(1).max(4),
  notes: z.string().max(500).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  selectedDate: Date | undefined;
  selectedSlot: SlotType | undefined;
  onSuccess: () => void;
}

export function BookingForm({ selectedDate, selectedSlot, onSuccess }: BookingFormProps) {
  const [partySize, setPartySize] = useState<number>(2);
  const { toast } = useToast();
  const createBooking = useCreateBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      party_size: 2,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Please complete selection",
        description: "Select a date and trip type before booking",
        variant: "destructive",
      });
      return;
    }

    try {
      await createBooking.mutateAsync({
        date: format(selectedDate, "yyyy-MM-dd"),
        slot_type: selectedSlot,
        name: data.name,
        phone: data.phone,
        email: data.email,
        party_size: partySize,
        notes: data.notes,
      });

      toast({
        title: "Booking Confirmed! 🎣",
        description: "You'll receive a confirmation email shortly.",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "This slot may no longer be available",
        variant: "destructive",
      });
    }
  };

  const isReady = selectedDate && selectedSlot;

  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
        Your Details
      </h3>

      {!isReady ? (
        <p className="text-sm text-muted-foreground">
          Select a date and trip type to continue
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/40 p-3 text-xs leading-5 text-muted-foreground">
            A 20% deposit or card hold is required to secure the trip date. Capacity depends on boat assignment, with up to 4 people on the big boat and up to 3 people on the small boat.
          </div>

          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Smith"
              {...register("name")}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              {...register("phone")}
              className="mt-1"
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label>Party Size</Label>
            <Select
              value={partySize.toString()}
              onValueChange={(v) => setPartySize(parseInt(v))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n} {n === 1 ? "person" : "people"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-1 text-xs text-muted-foreground">
              The current booking form is capped at 4 people until the owner confirms how boat assignment should be handled online.
            </p>
          </div>

          <div>
            <Label htmlFor="notes">Special Requests (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requests or notes..."
              {...register("notes")}
              className="mt-1"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            size="lg"
            disabled={createBooking.isPending}
          >
            {createBooking.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
