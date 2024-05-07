import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Container from '@/Components/Container';
import Markdown from '@/Components/Markdown';

export default function Show(props) {
    const { data: article, related: articles } = props.article;
    return (
        <div>
            <Head title={article.title} />
            <Hero>
                <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-4">
                        Fill in:{' '}
                        <Link
                            className="text-white underline"

                        >
                            {article.category.name}
                        </Link> by{' '}
                        <Link
                            className="text-white underline"
                            href={`/${article.author.username}`}
                        >
                            {article.author.name}
                        </Link>
                    </div>
                    {article.tags.length ? (
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <Link
                                    className="bg-gray-700 text-white px-2 py-1 text-xs font-medium hover:bg-gray-600 transition duration-200 rounded shadow border-t border-gray-600"
                                    key={tag.slug}
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </div>
                <Hero.Title>{article.title}</Hero.Title>
                <Hero.Subtitle>{article.teaser}</Hero.Subtitle>
            </Hero>
            <Container> {/* Tambahkan padding */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-8">
                        {article.picture ? (
                            <img
                                className="rounded mb-6 w-full"
                                src={article.picture}
                                alt=""
                            />
                        ) : null}
                        <Markdown>{article.body}</Markdown>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <h4 className="text-xl font-semibold text-black border-b pb-2 mb-4">
                            Artikel terkait dengan {article.category.name}
                        </h4>
                        {articles.length ? (
                            <ul className="space-y-2">
                                {articles.map((article) => (
                                    <li key={article.slug}>
                                        <Link
                                            className="line-clamp-2 text-blue-600 underline decoration-blue-500"
                                            href={route(
                                                'articles.show',
                                                article.slug
                                            )}
                                        >
                                            {article.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                </div>
            </Container>
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
