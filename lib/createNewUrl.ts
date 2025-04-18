"use server";
import getCollection, { COLLECTION } from "@/db";

export default async function createNewUrl(
    longUrl: string,
    alias: string
) {
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



// const collection = await getCollection(COLLECTION);
// const exist = await collection.findOne({alias});
// if (exist) {
//     throw new Error("alias already in use");
// }

// const checkUrl = await fetch(longUrl)
// if (!checkUrl.ok) {
//     throw new Error("Invalid url")
// }

// const data = {
//     longUrl: longUrl,
//     alias: alias,
// }
// const result = await collection.insertOne(data);
// if (!result.acknowledged) {
//     throw new Error("DB insert failed");
// }
// return { alias };