import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
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
                <form onSubmit={onSubmit}>
                    <ArticleForm {...{ data, setData }} />
                    <Button>Create</Button>
                </form>
            </Container>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} />;
