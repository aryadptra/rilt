import ArticleBlock from '@/Components/ArticleBlock';
import Container from '@/Components/Container'
import Grid from '@/Components/Grid';
import Hero from '@/Components/Hero'
import SeriesBlock from '@/Components/SeriesBlock';
import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react';

const Index = ({ series }) => {
    const filteredSeries = series.data.filter(series => series.status === 2);
    return (
        <>
            <Head title="Series" />
            <Hero>
                <Hero.Title>Daftar Series</Hero.Title>
                <Hero.Subtitle>
                    Belajar melalui series lengkap dengan studi kasus dan materi yang terstuktur.
                </Hero.Subtitle>
                <Hero.Content>
                    <p>Dibuat dengan materi yang disusun secara terstruktur dan sistematis, cocok bagi kamu yang ingin belajar namun belum memiliki mentor dan arahan yang jelas.</p>
                </Hero.Content>
            </Hero>
            <Container>
                {filteredSeries.length > 0 ? (
                    <Grid cols={3}>
                        {filteredSeries.map((series, index) => (
                            <SeriesBlock series={series} key={index} />
                        ))}
                    </Grid>
                ) : (
                    <div className="px-4 md:px-0">No series yet.</div>
                )}
            </Container>
        </>
    )
}

Index.layout = page => <AppLayout children={page} title="Inertia" />

export default Index
