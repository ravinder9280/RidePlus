import { supabaseServer } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = supabaseServer();

  const { data, error } = await supabase.from("rides").select("*").limit(10);
  if (error) throw new Error(error.message);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}