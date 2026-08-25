type PublicTable = "rsvps" | "wishes";

const backendUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function submitPublicRecord(
  table: PublicTable,
  record: Record<string, string | boolean | null>,
) {
  if (!backendUrl || !publishableKey) {
    throw new Error("Public database connection is not configured");
  }

  const response = await fetch(`${backendUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: publishableKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Public submission failed (${response.status}): ${detail}`);
  }
}