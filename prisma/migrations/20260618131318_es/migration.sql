/*
  Warnings:

  - A unique constraint covering the columns `[userId,company,startDate,role]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Experience_company_startDate_role_key";

-- CreateIndex
CREATE UNIQUE INDEX "Experience_userId_company_startDate_role_key" ON "Experience"("userId", "company", "startDate", "role");
