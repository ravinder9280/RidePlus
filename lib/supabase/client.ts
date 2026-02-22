import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
