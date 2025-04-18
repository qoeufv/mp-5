import NewUrl from "@/app/components/new-url";
export default function Home() {
    return (
        <main style={{backgroundColor: 'lightyellow', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem'}}>
            <h1 style={{fontSize: '2rem'}}>CS391 URL Shortener</h1>
            <NewUrl />
        </main>
    );
}
