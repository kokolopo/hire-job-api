-- CreateTable
CREATE TABLE "Hirings" (
    "id" SERIAL NOT NULL,
    "worker_id" INTEGER NOT NULL,
    "recruter_id" INTEGER NOT NULL,
    "hiring_type" TEXT NOT NULL,
    "recruter_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Hirings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hirings" ADD CONSTRAINT "Hirings_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hirings" ADD CONSTRAINT "Hirings_recruter_id_fkey" FOREIGN KEY ("recruter_id") REFERENCES "Recruters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
