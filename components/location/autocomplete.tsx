"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { Input } from "../ui/input";
import { ChevronRight} from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

export type Props = {
  label?: string;
  namePrefix: "from" | "to";
  placeholder?: string;
  required?: boolean;
  country?: string | string[];
  types?: string;
  limit?: number;
  proximity?: { lng: number; lat: number };
  onSelect?: (p: { text: string; lat: number; lng: number }) => void;
  className?: string;
};

export type Suggestion = {
  id: string;
  text: string;
  label:string;
  lat: number;
  lng: number;
};

export default function MapboxAutocomplete({
  label,
  namePrefix,
  placeholder = "Search a place",
  required = true,
  country = "in",
  types = "place,address,poi",
  limit = 6,
  proximity,
  onSelect,
  className,
}: Props) {
  const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Suggestion[]>([]);
  const [picked, setPicked] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(true); // controls visibility of suggestions
  const abortRef = useRef<AbortController | null>(null);

  const canSearch = useMemo(() => query.trim().length >= 2, [query]);

  useEffect(() => {
    if (!canSearch) {
      setItems([]);
      return;
    }

    setLoading(true);
    const t = setTimeout(async () => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        const base = "https://api.mapbox.com/geocoding/v5/mapbox.places";
        const url = new URL(`${base}/${encodeURIComponent(query)}.json`);
        url.searchParams.set("access_token", TOKEN);
        url.searchParams.set("autocomplete", "true");
        url.searchParams.set("limit", String(limit));
        url.searchParams.set("types", types);
        const countries = Array.isArray(country) ? country.join(",") : country;
        if (countries) url.searchParams.set("country", countries);
        if (proximity) url.searchParams.set("proximity", `${proximity.lng},${proximity.lat}`);

        const res = await fetch(url.toString(), { signal: ac.signal });
        if (!res.ok) throw new Error(`Mapbox ${res.status}`);
        const data = await res.json();

        const suggestions: Suggestion[] = (data.features ?? []).map((f: any) => ({
          id: f.id,
          label:f.text,
          text: f.place_name as string,
          lng: Number(f.center?.[0]),
          lat: Number(f.center?.[1]),
        }));

        setItems(suggestions);
      } catch {
        // ignore abort/network errors
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(t);
     
  }, [query, TOKEN, limit, types, country, proximity, canSearch]);

  const choose = (s: Suggestion) => {
    setPicked(s);
    setQuery(s.text);
    setShowList(false); // hide suggestions after select
    onSelect?.({ text: s.text, lat: s.lat, lng: s.lng });
  };

  return (
    <div className={cn("relative", className)}>
      <label className="block text-sm font-medium mb-1">{label}</label>

      <Command className="space-y-2" shouldFilter={false}>
        <CommandInput
          placeholder={placeholder}
          value={query}
          onValueChange={(val) => {
            setPicked(null);
            setQuery(val);
            setShowList(true); // re-open suggestions when user types
          }}
          className="mt-1 w-full"
        />
        {showList && (
          <CommandList className="max-h-screen">
            {loading &&query.length>0&& (
              <div className="py-3 text-sm text-muted-foreground w-full flex items-center justify-center text-center">
                <Spinner />
              </div>
            )}

            {!loading && (
              <>
                <CommandEmpty className="py-3 text-sm text-muted-foreground text-center">
                  {canSearch ? "No results" : "Type at least 2 characters"}
                </CommandEmpty>

                {items.length > 0 && (
                  <CommandGroup  >
                    {items.map((s) => (
                      <CommandItem className="py-4 text-muted-foreground" key={s.id} value={s.text} onSelect={() => choose(s)} asChild>
                       
                        <div className="flex items-center gap-2 justify-between text-wrap">
                          <div className="flex-1">
                            <h3 className="font-semibold pb-1">
                              {s.label}
                            </h3>

                          <p className="line-clamp-1">
                          {s.text}
                          </p>
                          </div>
                          <ChevronRight/>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        )}
      </Command>

      {/* Hidden fields posted with the form */}
      <Input type="hidden" name={`${namePrefix}Text`} value={query} readOnly required={required} />
      <Input type="hidden" name={`${namePrefix}Lat`} value={picked?.lat ?? ""} readOnly />
      <Input type="hidden" name={`${namePrefix}Lng`} value={picked?.lng ?? ""} readOnly />

    </div>
  );
}
