import { redirect } from 'next/navigation'
import getCollection, { COLLECTION } from '@/db'

export default async function Page({
                                       params: { alias }
                                   }: {
    params: { alias: string }
}) {
    const coll = await getCollection(COLLECTION)
    const doc  = await coll.findOne<{ longUrl: string }>({ alias })
    if (!doc) {
        redirect('/')
    }
    redirect(doc.longUrl)
}





// export default async function Redirect({params,}: {params: Promise<{ alias: string }>}) {
//     console.log(params);
//     const { alias } =  await params;
//     console.log("alias", alias)
//
//     let newUrl = ""
//     try{
//         const collection = await getCollection(COLLECTION);
//         const data = await collection.findOne(
//         {
//             alias: alias
//         });
//         if (data === null) {
//             throw new Error("do not exist");
//         }
//         const longUrl = data.longUrl;
//         console.log(longUrl);
//         newUrl = longUrl
//     } catch (err) {
//         console.error(err);
//     }
//     redirect(newUrl);
// }