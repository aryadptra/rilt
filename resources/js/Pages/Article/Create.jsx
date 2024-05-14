import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import ArticleForm from '@/Components/ArticleForm';

export default function Create({ statuses, tags }) {
    const { data, setData } = useForm({
        title: '',
        teaser: '',
        category_id: '',
        body: '',
        picture: '',
        tags: [tags[0], tags[1]],
        status: statuses[0]
    });

    const onSubmit = (e) => {
        e.preventDefault();
        router.post(route('articles.store'), {
            ...data,
            category_id: data.category_id.id,
            status: data.status.id,
            tags: data.tags.map((t) => t.id),
        });
    };
    return (
        <div>
            <Head title={'Create new article'} />
            <Hero>
                <Hero.Title>{data.title || 'The title...'}</Hero.Title>
                <Hero.Subtitle>
                    {data.teaser || 'The teaser...'}
                </Hero.Subtitle>
            </Hero>
            <Container>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-2">
                        <ul className="w-full text-sm font-medium  rounded-lg bg-gray-800 border-gray-600 text-white">
                            <li className="w-full px-4 py-2 border-b border-gray-500 rounded-t-lg">
                                <Link href={route('articles.table')}>Semua Artikel</Link>
                            </li>
                            <li className="w-full px-4 py-2 border-b border-gray-500 rounded-t-lg">
                                <Link href={route('articles.create')}>Buat Artikel</Link>
                            </li>
                        </ul >
                    </div >

                    <div className="col-span-12 md:col-span-10">
                        <form onSubmit={onSubmit}>
                            <ArticleForm {...{ data, setData }} />
                            <Button>Create</Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}

Create.layout = (page) => <DashboardLayout children={page} />;
