import { useMemo, useState } from "react";
import { addDays, format, isAfter, isBefore, startOfDay } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import {
  useAllBookings,
  useUpdateBookingStatus,
  useDeleteBooking,
  useBlockedSlots,
  Booking,
  SlotType,
} from "@/hooks/useBookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2, Eye, EyeOff, Lock, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { BlockedSlotManager } from "@/components/admin/BlockedSlotManager";
import { Calendar } from "@/components/ui/calendar";

const slotLabels: Record<SlotType, string> = {
  AM: "AM",
  PM: "PM",
  FULL: "Full",
};

export default function Admin() {
  const { loading, session } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { data: bookings, isLoading } = useAllBookings();
  const { data: blockedSlots } = useBlockedSlots();
  const updateStatus = useUpdateBookingStatus();
  const deleteBooking = useDeleteBooking();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) {
      setError(authError.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const bookingsForDate = useMemo(() => {
    if (!selectedDateStr || !bookings) return [];
    return bookings.filter((b) => b.date === selectedDateStr);
  }, [bookings, selectedDateStr]);

  const getDateStatus = (date: Date) => {
    if (!bookings) {
      return { full: false, am: false, pm: false };
    }
    const dateStr = format(date, "yyyy-MM-dd");
    const dayBookings = bookings.filter((b) => b.date === dateStr && b.status === "confirmed");
    const dayBlocked = blockedSlots ? blockedSlots.filter((b) => b.date === dateStr) : [];
    const hasFull = dayBookings.some((b) => b.slot_type === "FULL");
    const hasAM = dayBookings.some((b) => b.slot_type === "AM");
    const hasPM = dayBookings.some((b) => b.slot_type === "PM");
    const blockedFull = dayBlocked.some((b) => b.slot_type === "FULL");
    const blockedAM = dayBlocked.some((b) => b.slot_type === "AM");
    const blockedPM = dayBlocked.some((b) => b.slot_type === "PM");
    return {
      full: hasFull || blockedFull || (hasAM && hasPM) || (blockedAM && blockedPM),
      am: hasAM || blockedAM,
      pm: hasPM || blockedPM,
    };
  };

  const upcomingCharters = useMemo(() => {
    if (!bookings) return [];
    const today = startOfDay(new Date());
    const end = addDays(today, 7);
    return bookings.filter((b) => {
      if (b.status !== "confirmed") return false;
      const date = new Date(`${b.date}T00:00:00`);
      return (isAfter(date, addDays(today, -1)) && isBefore(date, addDays(end, 1)));
    });
  }, [bookings]);

  const handleCancel = async (booking: Booking) => {
    if (window.confirm(`Cancel booking for ${booking.name} on ${format(new Date(booking.date), "MMM d")}?`)) {
      await updateStatus.mutateAsync({ id: booking.id, status: "canceled" });
    }
  };

  const handleRestore = async (booking: Booking) => {
    await updateStatus.mutateAsync({ id: booking.id, status: "confirmed" });
  };

  const handleDelete = async (booking: Booking) => {
    if (window.confirm(`Delete booking for ${booking.name} on ${format(new Date(booking.date), "MMM d")}?`)) {
      await deleteBooking.mutateAsync({ id: booking.id });
    }
  };

  const exportCSV = () => {
    if (!bookings) return;

    const headers = ["Date", "Slot", "Name", "Phone", "Email", "Party Size", "Notes", "Status", "Created"];
    const rows = bookings.map((b) => [
      b.date,
      b.slot_type,
      b.name,
      b.phone,
      b.email,
      b.party_size.toString(),
      b.notes || "",
      b.status,
      format(new Date(b.created_at), "yyyy-MM-dd HH:mm"),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-12 text-center text-muted-foreground">Loading...</div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <div className="container py-12 max-w-sm">
          <div className="bg-card rounded-lg border p-6">
            <div className="text-center mb-6">
              <Lock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h1 className="text-xl font-bold">Admin Access</h1>
              <p className="text-sm text-muted-foreground">Sign in to manage bookings</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportCSV} disabled={!bookings?.length}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Booking Calendar
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="p-0"
                modifiers={{
                  booked: (date) => getDateStatus(date).full,
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
              />
              <div className="mt-3 text-xs text-muted-foreground">
                Select a date to view bookings.
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
          </div>
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Bookings for {selectedDate ? format(selectedDate, "MMM d, yyyy") : "selected date"}
              </h3>
              {selectedDate && bookingsForDate.length === 0 && (
                <p className="text-sm text-muted-foreground">No bookings for this date.</p>
              )}
              {!selectedDate && (
                <p className="text-sm text-muted-foreground">Pick a date to see bookings.</p>
              )}
              <div className="space-y-3">
                {bookingsForDate.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-3 flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">{slotLabels[booking.slot_type]}</Badge>
                    <div className="flex-1">
                      <div className="font-semibold">{booking.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {booking.party_size} • {booking.email} • {booking.phone}
                      </div>
                    </div>
                    <Badge variant={booking.status === "confirmed" ? "default" : "destructive"}>
                      {booking.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {booking.status === "confirmed" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancel(booking)}
                          disabled={updateStatus.isPending}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRestore(booking)}
                          disabled={updateStatus.isPending}
                        >
                          Restore
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(booking)}
                        disabled={deleteBooking.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4 mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Upcoming Charters (Next 7 Days)
          </h3>
          {upcomingCharters.length === 0 ? (
            <p className="text-sm text-muted-foreground">No upcoming charters in the next week.</p>
          ) : (
            <div className="space-y-2">
              {upcomingCharters.map((booking) => (
                <div key={booking.id} className="flex flex-wrap items-center gap-3 border rounded-md p-3">
                  <Badge variant="secondary">{slotLabels[booking.slot_type]}</Badge>
                  <div className="flex-1">
                    <div className="font-semibold">{booking.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(`${booking.date}T00:00:00`), "MMM d, yyyy")} • {booking.party_size} • {booking.email}
                    </div>
                  </div>
                  <Badge variant="default">confirmed</Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        <BlockedSlotManager />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !bookings?.length ? (
          <div className="text-center py-12 text-muted-foreground">
            No bookings yet
          </div>
        ) : (
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Slot</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow
                      key={booking.id}
                      className={cn(booking.status === "canceled" && "opacity-60")}
                    >
                      <TableCell className="font-medium">
                        {format(new Date(booking.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{slotLabels[booking.slot_type]}</Badge>
                      </TableCell>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{booking.phone}</TableCell>
                      <TableCell className="hidden lg:table-cell">{booking.email}</TableCell>
                      <TableCell>{booking.party_size}</TableCell>
                      <TableCell>
                        <Badge
                          variant={booking.status === "confirmed" ? "default" : "destructive"}
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {booking.status === "confirmed" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel(booking)}
                            disabled={updateStatus.isPending}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRestore(booking)}
                            disabled={updateStatus.isPending}
                          >
                            Restore
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(booking)}
                          disabled={deleteBooking.isPending}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
