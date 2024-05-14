import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import SeriesForm from '@/Components/SeriesForm';

export default function Edit({ series, statuses }) {
    const { data, setData } = useForm({
        title: series.title,
        teaser: series.teaser,
        category_id: series.category,
        body: series.body,
        picture: '',
        tags: series.tags,
        status: statuses.find((i) => i.id == series.status)
    });
    const onSubmit = (e) => {
        e.preventDefault();
        router.post(route('series.update', series.slug), {
            ...data,
            _method: "PUT",
            category_id: data.category_id.id,
            status: data.status.id,
            tags: data.tags.map((t) => t.id),
        });
    };
    return (
        <div>
            <Head title={'Create new series'} />
            <Hero>
                <Hero.Title>{data.title || 'The title...'}</Hero.Title>
                <Hero.Subtitle>
                    {data.teaser || 'The teaser...'}
                </Hero.Subtitle>
            </Hero>
            <Container>
                <form onSubmit={onSubmit}>
                    <SeriesForm {...{ data, setData }} />
                    <Button>Update</Button>
                </form>
            </Container>
        </div>
    );
}

Edit.layout = (page) => <DashboardLayout children={page} />;
