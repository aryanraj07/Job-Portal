/*
  Warnings:

  - A unique constraint covering the columns `[userId,college,degree,startDate]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company,startDate,role]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ApplicationEducation" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "educationId" TEXT NOT NULL,

    CONSTRAINT "ApplicationEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationExperience" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,

    CONSTRAINT "ApplicationExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationSkill" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "ApplicationSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationEducation_applicationId_educationId_key" ON "ApplicationEducation"("applicationId", "educationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationSkill_applicationId_skillId_key" ON "ApplicationSkill"("applicationId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "Education_userId_college_degree_startDate_key" ON "Education"("userId", "college", "degree", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_company_startDate_role_key" ON "Experience"("company", "startDate", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_userId_name_key" ON "Skill"("userId", "name");

-- AddForeignKey
ALTER TABLE "ApplicationEducation" ADD CONSTRAINT "ApplicationEducation_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationEducation" ADD CONSTRAINT "ApplicationEducation_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationExperience" ADD CONSTRAINT "ApplicationExperience_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationExperience" ADD CONSTRAINT "ApplicationExperience_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationSkill" ADD CONSTRAINT "ApplicationSkill_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationSkill" ADD CONSTRAINT "ApplicationSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
