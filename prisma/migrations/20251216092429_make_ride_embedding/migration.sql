-- CreateTable
CREATE TABLE "public"."RideEmbedding" (
    "rideId" TEXT NOT NULL,
    "embedding" vector(768) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RideEmbedding_pkey" PRIMARY KEY ("rideId")
);

-- AddForeignKey
ALTER TABLE "public"."RideEmbedding" ADD CONSTRAINT "RideEmbedding_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "public"."Ride"("id") ON DELETE CASCADE ON UPDATE CASCADE;
