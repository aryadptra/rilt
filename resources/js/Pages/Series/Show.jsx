import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Container from '@/Components/Container';
import Markdown from '@/Components/Markdown';
import SeriesMenu from '@/Components/SeriesMenu';

export default function Show(props) {
    const { data: serie, related: series } = props.series;
    return (
        <div>
            <Head title={serie.title} />
            <Hero>
                <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-4">
                        {/* Fill in:{' '}
                        <Link
                            className="text-white underline"
                            href={route(
                                'categories.show',
                                serie.category.slug
                            )}

                        >
                            {serie.category.name}
                        </Link>  */}
                        Oleh {' '}
                        <Link
                            className="text-white underline"
                            href={`/${serie.author.username}`}
                        >
                            {serie.author.name}
                        </Link>
                    </div>
                    {serie.tags.length ? (
                        <div className="flex flex-wrap gap-2">
                            {serie.tags.map((tag) => (
                                <Link
                                    className="bg-gray-700 text-white px-2 py-1 text-xs font-medium hover:bg-gray-600 transition duration-200 rounded shadow border-t border-gray-600"
                                    key={tag.slug}
                                    href={route('tags.show', tag.slug)}


                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </div>
                <Hero.Title>{serie.title}</Hero.Title>
                <Hero.Content>{serie.teaser}</Hero.Content>
            </Hero>
            <Container> {/* Tambahkan padding */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-8">
                        {/* {serie.picture ? (
                            <img
                                className="rounded mb-6 w-full"
                                src={serie.picture}
                                alt=""
                            />
                        ) : null} */}
                        <Markdown>{serie.body}</Markdown>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <h4 className="text-xl font-semibold text-black border-b pb-2 mb-4">
                            Daftar isi
                        </h4>
                        <SeriesMenu />
                        {/* {series.length ? (
                            <ul className="space-y-2">
                                {series.map((article) => (
                                    <li key={serie.slug}>
                                        <Link
                                            className="line-clamp-2 text-blue-600 underline decoration-blue-500"
                                            href={route(
                                                'series.show',
                                                serie.slug
                                            )}
                                        >
                                            {serie.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : null} */}
                    </div>
                </div>
            </Container>
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
