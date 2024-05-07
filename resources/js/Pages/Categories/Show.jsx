import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Container from '@/Components/Container';
import Grid from '@/Components/Grid';
import ArticleBlock from '@/Components/ArticleBlock';
import Pagination from '@/Components/Pagination';

export default function Show({ category, ...props }) {
    const { data: articles, meta, links } = props.articles;
    return (
        <div>
            <Head title={category.name} />
            <Hero>
                <Hero.Title>{category.name}</Hero.Title>
                <Hero.Subtitle>
                    Halaman ini menampilkan semua {category.name.toLowerCase()}
                </Hero.Subtitle>
            </Hero>

            <Container>
                {articles.length ? (
                    <>
                        <Grid className='items-start'>
                            {articles.map((article) => (
                                <ArticleBlock
                                    article={article}
                                    key={article.slug}
                                />
                            ))}
                        </Grid>
                        <Pagination {...{ meta, links }} />
                    </>
                ) : (
                    <p>No articles yet.</p>
                )}
            </Container>
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
