import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfMonth, endOfMonth, addMonths } from "date-fns";

export type SlotType = "AM" | "PM" | "FULL";
export type BookingStatus = "confirmed" | "canceled";

export interface Booking {
  id: string;
  date: string;
  slot_type: SlotType;
  name: string;
  phone: string;
  email: string;
  party_size: number;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  slot_type: SlotType;
  reason: string | null;
  created_at: string;
}

export interface BookingInput {
  date: string;
  slot_type: SlotType;
  name: string;
  phone: string;
  email: string;
  party_size: number;
  notes?: string;
}

// Get bookings for availability checking (next 3 months)
export function useAvailability() {
  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(addMonths(new Date(), 3));

  return useQuery({
    queryKey: ["availability", format(startDate, "yyyy-MM-dd")],
    queryFn: async () => {
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select("date, slot_type, status")
        .gte("date", format(startDate, "yyyy-MM-dd"))
        .lte("date", format(endDate, "yyyy-MM-dd"))
        .eq("status", "confirmed");

      if (bookingError) throw bookingError;

      const { data: blockedData, error: blockedError } = await supabase
        .from("blocked_slots")
        .select("date, slot_type")
        .gte("date", format(startDate, "yyyy-MM-dd"))
        .lte("date", format(endDate, "yyyy-MM-dd"));

      if (blockedError) {
        console.warn("blocked_slots unavailable, continuing without blocks", blockedError.message);
      }

      return {
        bookings: bookingData as Pick<Booking, "date" | "slot_type" | "status">[],
        blocked: (blockedData || []) as Pick<BlockedSlot, "date" | "slot_type">[],
      };
    },
    staleTime: 30000, // 30 seconds
  });
}

// Check slot availability for a specific date
export function getSlotAvailability(
  data:
    | {
        bookings: Pick<Booking, "date" | "slot_type" | "status">[];
        blocked: Pick<BlockedSlot, "date" | "slot_type">[];
      }
    | undefined,
  date: Date
): { AM: boolean; PM: boolean; FULL: boolean } {
  if (!data) return { AM: true, PM: true, FULL: true };

  const dateStr = format(date, "yyyy-MM-dd");
  const dateBookings = data.bookings.filter((b) => b.date === dateStr);
  const dateBlocked = data.blocked.filter((b) => b.date === dateStr);

  const hasFullDay = dateBookings.some((b) => b.slot_type === "FULL");
  const hasAM = dateBookings.some((b) => b.slot_type === "AM");
  const hasPM = dateBookings.some((b) => b.slot_type === "PM");
  const blockedFull = dateBlocked.some((b) => b.slot_type === "FULL");
  const blockedAM = dateBlocked.some((b) => b.slot_type === "AM");
  const blockedPM = dateBlocked.some((b) => b.slot_type === "PM");

  if (hasFullDay || blockedFull) {
    return { AM: false, PM: false, FULL: false };
  }

  return {
    AM: !hasAM && !blockedAM,
    PM: !hasPM && !blockedPM,
    FULL: !hasAM && !hasPM && !blockedAM && !blockedPM,
  };
}

// Create a new booking
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BookingInput) => {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          date: input.date,
          slot_type: input.slot_type,
          name: input.name,
          phone: input.phone,
          email: input.email,
          party_size: input.party_size,
          notes: input.notes || null,
        })
        .select()
        .single();

      if (error) throw error;

      try {
        const { error: fnError } = await supabase.functions.invoke("send-booking-email", {
          body: { booking: data },
        });
        if (fnError) {
          console.error("send-booking-email failed", fnError.message);
        }
      } catch (err) {
        console.error("send-booking-email failed", err);
      }

      return data as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
}

// Get all bookings (for admin)
export function useAllBookings() {
  return useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("date", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Booking[];
    },
  });
}

// Get blocked slots (for admin calendar)
export function useBlockedSlots() {
  return useQuery({
    queryKey: ["blocked-slots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blocked_slots")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return data as BlockedSlot[];
    },
  });
}

// Create blocked slot (admin)
export function useCreateBlockedSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ date, slot_type, reason }: { date: string; slot_type: SlotType; reason?: string }) => {
      const { data, error } = await supabase
        .from("blocked_slots")
        .insert({ date, slot_type, reason: reason || null })
        .select()
        .single();

      if (error) throw error;
      return data as BlockedSlot;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked-slots"] });
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
}

// Delete blocked slot (admin)
export function useDeleteBlockedSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { error } = await supabase.from("blocked_slots").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked-slots"] });
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
}

// Delete booking (admin)
export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
}
// Update booking status (for admin)
export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const { data, error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
}
