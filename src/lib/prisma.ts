import { PrismaClient } from "../../generated/prisma/client";
import fs from "fs";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
//
const ca = fs.readFileSync(path.join(process.cwd(), "certs", "ca.pem"), "utf8");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca,
    rejectUnauthorized: true,
  },
});
// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });
const adapter = new PrismaPg(pool);
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
