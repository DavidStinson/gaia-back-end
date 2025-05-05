-- CreateTable
CREATE TABLE "GeneratedMicrolesson" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "learningObjective" TEXT NOT NULL,
    "outline" TEXT[],
    "smeResponse" TEXT NOT NULL,
    "ledResponse" TEXT NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "GeneratedMicrolesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedModule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "learnerPersona" TEXT NOT NULL,
    "tools" TEXT[],
    "prerequisites" TEXT[],

    CONSTRAINT "GeneratedModule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GeneratedMicrolesson" ADD CONSTRAINT "GeneratedMicrolesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "GeneratedModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
