import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import ArticleForm from '@/Components/ArticleForm';

export default function Edit({ article, statuses }) {
    const { data, setData } = useForm({
        title: article.title,
        teaser: article.teaser,
        category_id: article.category,
        body: article.body,
        picture: '',
        tags: article.tags,
        status: statuses.find((i) => i.id == article.status)
    });
    const onSubmit = (e) => {
        e.preventDefault();
        router.post(route('articles.update', article.slug), {
            ...data,
            _method: "PUT",
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
                    <Button>Update</Button>
                </form>
            </Container>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} />;
