import { Link } from '@inertiajs/react';
import React from 'react';

export default function ArticleBlock({ article }) {

    return (
        <div className="border shadow-sm rounded-lg overflow-hidden">
            {article.picture ? (
                <Link href={route('articles.show', article.slug)}>
                    <img src={article.picture} alt="" />
                </Link>
            ) : null}
            <div className="px-4 py-4">
                <div className="mb-1">
                    {article.tags.length ? (
                        <div className="text-[10px] font-semibold tracking-tight space-x-1 mb-3">
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href=''
                                    className="text-white hover:bg-blue-600 bg-blue-500 transition duration-200 px-2 py-1 rounded-md"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                    <Link href={route('articles.show', article.slug)}>
                        <h1 className="text-lg text-gray-800  md:line-clamp-1 font-semibold tracking-tight">
                            {article.title}
                        </h1>
                        <p className='text-gray-500  line-clamp-2'>
                            {article.teaser}
                        </p>
                    </Link>
                </div>

                <small className="text-xs text-gray-500 md:mt-4">
                    {article.created_at} by{' '}
                    <Link className='underline' href={`/${article.author.username}`}>
                        {article.author.name}
                    </Link>
                </small>
            </div>
        </div>
    );
}