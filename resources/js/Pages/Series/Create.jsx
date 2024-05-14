import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import SeriesForm from '@/Components/SeriesForm';

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
        router.post(route('series.store'), {
            ...data,
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
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12">
                        <form onSubmit={onSubmit}>
                            <SeriesForm {...{ data, setData }} />
                            <Button>Create</Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}

Create.layout = (page) => <DashboardLayout children={page} />;
