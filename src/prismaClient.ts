import {PrismaClient} from "@/generated/prisma/client";

export const prisma = new PrismaClient({
    datasourceUrl: `file:${process.env.PWD}/db.sqlite`
});