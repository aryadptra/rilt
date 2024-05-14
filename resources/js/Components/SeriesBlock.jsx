import { Link } from '@inertiajs/react';
import React from 'react';

export default function SeriesBlock({ series }) {
    return (
        <div className="border shadow-sm rounded-lg overflow-hidden">
            {series.picture ? (
                <Link href={route('series.show', series.slug)}>
                    <img src={series.picture} alt={series.title} />
                </Link>
            ) : null}
            <div className="px-4 py-4">
                <div className="mb-1">
                    {series.tags.length ? (
                        <div className="text-[10px] font-semibold tracking-tight space-x-1 mb-3">
                            {series.tags.map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href={route('tags.show', tag.slug)}
                                    className="text-white hover:bg-blue-600 bg-blue-500 transition duration-200 px-2 py-1 rounded-md"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                    <Link href={route('series.show', series.slug)}>
                        <h1 className="text-lg text-gray-800  md:line-clamp-1 font-semibold tracking-tight">
                            {series.title}
                        </h1>
                        <p className='text-gray-500  line-clamp-2'>
                            {series.teaser}
                        </p>
                    </Link>
                </div>

                <small className="text-xs text-gray-500 md:mt-4">
                    {series.created_at} oleh {' '}
                    <Link className='underline' href={`/${series.author.username}`}>
                        {series.author.name}
                    </Link>
                </small>
            </div>
        </div>
    );
}
