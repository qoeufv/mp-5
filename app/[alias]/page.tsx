import { redirect } from 'next/navigation'
import getCollection, { COLLECTION } from '@/db'

export default async function Page({
                                       params,
                                   }: {
    params: { alias: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const { alias } = params
    const coll = await getCollection(COLLECTION)
    const doc  = await coll.findOne<{ longUrl: string }>({ alias })

    if (!doc) {
        redirect('/')
    }
    redirect(doc.longUrl)
}