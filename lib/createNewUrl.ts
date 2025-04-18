"use server";
import getCollection, { COLLECTION } from "@/db";

export default async function createNewUrl(
    longUrl: string,
    alias: string
): Promise<{alias: string}> {
    console.log("creating short url...");
    const coll = await getCollection(COLLECTION);
    const exists = await coll.findOne({ alias });
    if (exists) {
        throw new Error('That alias is already in use.');
    }

    try {
        new URL(longUrl);
    } catch {
        throw new Error('Invalid URL.');
    }

    const result = await coll.insertOne({
        alias,
        longUrl,
    });

    if (!result.acknowledged) {
        throw new Error('Database insert failed.');
    }
    return { alias };

}

