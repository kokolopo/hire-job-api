-- CreateTable
CREATE TABLE "Workers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailWorkers" (
    "id" SERIAL NOT NULL,
    "worker_id" INTEGER NOT NULL,
    "job_desc" TEXT NOT NULL,
    "domisili" TEXT NOT NULL,
    "temp_kerja" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "DetailWorkers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portofolios" (
    "id" SERIAL NOT NULL,
    "worker_id" INTEGER NOT NULL,
    "app_name" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "screen_shot" TEXT NOT NULL,

    CONSTRAINT "Portofolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiences" (
    "id" SERIAL NOT NULL,
    "worker_id" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "worker_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recruters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Recruters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailRexruters" (
    "id" SERIAL NOT NULL,
    "recruter_id" INTEGER NOT NULL,
    "division" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "DetailRexruters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workers_email_key" ON "Workers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DetailWorkers_worker_id_key" ON "DetailWorkers"("worker_id");

-- CreateIndex
CREATE UNIQUE INDEX "Recruters_email_key" ON "Recruters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DetailRexruters_recruter_id_key" ON "DetailRexruters"("recruter_id");

-- AddForeignKey
ALTER TABLE "DetailWorkers" ADD CONSTRAINT "DetailWorkers_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portofolios" ADD CONSTRAINT "Portofolios_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiences" ADD CONSTRAINT "Experiences_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailRexruters" ADD CONSTRAINT "DetailRexruters_recruter_id_fkey" FOREIGN KEY ("recruter_id") REFERENCES "Recruters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
