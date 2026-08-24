import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-data-direct"],
    queryFn: async () => {
      const [rsvpsRes, wishesRes] = await Promise.all([
        supabase.from("rsvps").select("*").order("created_at", { ascending: false }),
        supabase.from("wishes").select("*").order("created_at", { ascending: false }),
      ]);

      if (rsvpsRes.error) throw rsvpsRes.error;
      if (wishesRes.error) throw wishesRes.error;

      return {
        rsvps: rsvpsRes.data || [],
        wishes: wishesRes.data || [],
      };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-600 font-sans">
        <p>იტვირთება მონაცემები...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-red-600 font-sans p-4 text-center">
        <p>დაფიქსირდა შეცდომა მონაცემების ჩატვირთვისას.</p>
      </div>
    );
  }

  const rsvps = data?.rsvps || [];
  const wishes = data?.wishes || [];
  const coming = rsvps.filter((r) => r.attending);
  const notComing = rsvps.filter((r) => !r.attending);

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-serif text-stone-800 border-b pb-4">
          ადმინ პანელი - სტუმრების სია
        </h1>

        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-stone-500">მოდის</p>
            <p className="text-2xl font-bold text-stone-800">{coming.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-stone-500">ვერ მოდის</p>
            <p className="text-2xl font-bold text-stone-800">{notComing.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-stone-500">სურვილები</p>
            <p className="text-2xl font-bold text-stone-800">{wishes.length}</p>
          </div>
        </div>

        {/* RSVPs */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <h2 className="text-xl font-medium text-stone-700">
            დადასტურებული სტუმრები ({rsvps.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm text-stone-500">
                  <th className="pb-3">სახელი</th>
                  <th className="pb-3">ესწრება</th>
                  <th className="pb-3">სტუმრები</th>
                  <th className="pb-3">მენიუ</th>
                  <th className="pb-3">დრო</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm text-stone-700">
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-stone-400">
                      ჯერ მონაცემები არ არის.
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-stone-50">
                      <td className="py-3 font-medium">{rsvp.name}</td>
                      <td className="py-3">
                        {rsvp.attending ? (
                          <span className="text-green-600 font-medium">კი</span>
                        ) : (
                          <span className="text-red-500">ვერ ახერხებს</span>
                        )}
                      </td>
                      <td className="py-3">{rsvp.guests || "-"}</td>
                      <td className="py-3">{rsvp.menu || "-"}</td>
                      <td className="py-3 text-stone-400 text-xs">
                        {new Date(rsvp.created_at).toLocaleString("ka-GE")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wishes */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <h2 className="text-xl font-medium text-stone-700">
            მოლოცვები და სურვილები ({wishes.length})
          </h2>
          <div className="space-y-3">
            {wishes.length === 0 ? (
              <p className="text-stone-400 text-sm">ჯერ სურვილები არ არის.</p>
            ) : (
              wishes.map((wish) => (
                <div key={wish.id} className="p-4 rounded-xl bg-stone-50 border space-y-1">
                  <p className="font-medium text-stone-800">{wish.name || "ანონიმური"}</p>
                  <p className="text-stone-600 text-sm">{wish.message}</p>
                  <p className="text-stone-400 text-xs pt-1">
                    {new Date(wish.created_at).toLocaleString("ka-GE")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
