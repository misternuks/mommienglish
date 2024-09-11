-- CreateTable
CREATE TABLE "MembersLesson" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MembersLesson_pkey" PRIMARY KEY ("id")
);
