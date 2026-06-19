import { PrismaClient } from "../../generated/prisma/client";
import fs from "fs";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
//
console.log("CA CERT LENGTH:", process.env.AIVEN_CA_CERT?.length);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca: process.env.AIVEN_CA_CERT,
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
