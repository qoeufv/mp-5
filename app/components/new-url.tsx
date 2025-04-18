'use client';
import createNewUrl from '@/lib/createNewUrl';

import React, { useState, FormEvent } from 'react';

export default function NewUrl() {
    const [url,   setUrl]   = useState<string>('');
    const [alias, setAlias] = useState<string>('');
    const [error,   setError]   = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setShortUrl('');

        try {
            const { alias: savedAlias } = await createNewUrl(url, alias);
            const origin = window.location.origin;
            setShortUrl(`${origin}/${savedAlias}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', padding: '2rem'}}>
            <label>
                Original URL
                <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.currentTarget.value)}
                    placeholder="https://example.com/…"
                    required
                    style={{border: 'lightblue solid', margin: '2rem'}}
                />
            </label>

            <label>
                Alias
                <input
                    type="text"
                    value={alias}
                    onChange={e => setAlias(e.currentTarget.value)}
                    placeholder="my‑cool‑alias"
                    required
                    style={{border: 'lightblue solid', marginBottom: '2rem'}}
                />
            </label>

            <button type="submit" style={{border: 'purple solid'}}>Shorten</button>

            {error && (
                <p style={{ color: 'red', marginTop: 8 }}>
                    {error}
                </p>
            )}

            {shortUrl && (
                <div style={{margin: '2rem'}}>
                    <p>Your new link:</p>
                    <code>{shortUrl}</code>
                    <button
                        type='button'
                        onClick={() => navigator.clipboard.writeText(shortUrl)}
                        style={{border: 'gray solid', marginLeft: '1rem'}}
                    >
                        Copy
                    </button>
                </div>
            )}
        </form>
    );
}