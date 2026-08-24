import { createFileRoute } from "@tanstack/react-router";
import { getAdminData } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  loader: async () => await getAdminData(),
  component: AdminPage,
});

function AdminPage() {
  // მონაცემები პირდაპირ სერვერიდან მოდის როუტის loader-ის გავლით
  const data = Route.useLoaderData();

  if (!data || !data.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-red-600 font-sans p-4 text-center">
        <p>დაფიქსირდა შეცდომა მონაცემების ჩატვირთვისას ან ბაზასთან კავშირისას.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-serif text-stone-800 border-b pb-4">
          ადმინ პანელი - სტუმრების სია
        </h1>

        {/* RSVPs */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <h2 className="text-xl font-medium text-stone-700">
            დადასტურებული სტუმრები ({data.rsvps.length})
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
                {data.rsvps.map((rsvp) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wishes */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <h2 className="text-xl font-medium text-stone-700">
            მოლოცვები და სურვილები ({data.wishes.length})
          </h2>
          <div className="space-y-3">
            {data.wishes.map((wish) => (
              <div key={wish.id} className="p-4 rounded-xl bg-stone-50 border space-y-1">
                <p className="font-medium text-stone-800">{wish.name || "ანონიმური"}</p>
                <p className="text-stone-600 text-sm">{wish.message}</p>
                <p className="text-stone-400 text-xs pt-1">
                  {new Date(wish.created_at).toLocaleString("ka-GE")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
