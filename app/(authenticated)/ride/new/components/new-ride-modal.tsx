"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { publishRide } from "@/actions/rides/actions";
import LocationDialogInput from "@/components/common/LocationDialogInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { SeatSelector } from "@/components/ui/seat-stepper";
import { NewRideSchema, NewRideSchemaType } from "@/lib/validations/ride";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NewRideForm() {
  const [pending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(NewRideSchema),
    defaultValues: {
      fromText: "",
      service: "OWNER",
      toText: "",
      departureDate: "",
      departureTime: "",
      seatsTotal: 1,
      fromLat: 0,
      fromLng: 0,
      toLat: 0,
      toLng: 0,
    },
  });

  const onSubmit = async (data: NewRideSchemaType) => {
    startTransition(async () => {
      const res = await publishRide(data);
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      form.reset();
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 md:p-8">
        <FieldGroup className="">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Leaving From</label>
            <LocationDialogInput
              namePrefix="from"
              placeholder="Pickup location"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Going To</label>
            <LocationDialogInput
              namePrefix="to"
              placeholder="Drop location"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 items-center gap-3">
            <Controller
              name="departureDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                  <Input
                    type="date"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="date"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="departureTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="">
                  <FieldLabel htmlFor={field.name}>Time</FieldLabel>
                  <Input
                    type="time"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Time"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="seatsTotal"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Seats Available </FieldLabel>
                <div className="w-full flex items-center justify-center">
                  <SeatSelector
                    value={field.value as number}
                    onChange={field.onChange}
                    name={field.name}
                    min={1}
                    max={8}
                  />{" "}
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="estTotalFare"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Estimated Fare (₹)</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  value={field.value as number}
                  aria-invalid={fieldState.invalid}
                  type="number"
                  placeholder="₹3000"
                  name="estTotalFare"
                  min={1}
                  max={5000}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="service"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Service</FieldLabel>

                <RadioGroup
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className="grid grid-cols-3"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={"OLA"} id="r1" />
                    <Label htmlFor="r1">OLA</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="UBER" id="r2" />
                    <Label htmlFor="r2">UBER</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="OWNER" id="r3" />
                    <Label htmlFor="r3">OWNER</Label>
                  </div>
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
              <>
                <Spinner />
                <span>Publishing…</span>
              </>
            ) : (
              "Publish Ride"
            )}
          </Button>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
