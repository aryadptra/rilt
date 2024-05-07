import Container from '@/Components/Container'
import Hero from '@/Components/Hero'
import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <Hero>
                <Hero.Title>Halo 👋, Saya Arya</Hero.Title>
                <Hero.Subtitle>
                    Saya adalah seorang software developer yang saat ini bekerja remote untuk perusahaan di Jakarta dan Bogor.
                </Hero.Subtitle>
                <Hero.Content>
                    <p>
                        Informasi seputar web programming dapat kamu lihat di website ini. Saya juga terbuka jika ada pertanyaan dan konsultasi mengenai web programming.
                    </p>
                </Hero.Content>
            </Hero>
            <Container>
                <p>Home Page</p>
            </Container>
        </>
    )
}

Home.layout = page => <AppLayout children={page} title="Inertia" />

export default Home
