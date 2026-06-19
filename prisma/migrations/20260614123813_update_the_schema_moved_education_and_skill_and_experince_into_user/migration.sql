/*
  Warnings:

  - You are about to drop the column `applicationId` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the `ApplicationSkill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED');

-- DropForeignKey
ALTER TABLE "ApplicationSkill" DROP CONSTRAINT "ApplicationSkill_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationSkill" DROP CONSTRAINT "ApplicationSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_applicationId_fkey";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "applicationId";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "applicationId";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "status" "JobStatus" NOT NULL;

-- DropTable
DROP TABLE "ApplicationSkill";
