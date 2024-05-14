import Hero from '@/Components/Hero'
import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'

const Index = () => {
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
        </>
    )
}

Index.layout = page => <AppLayout children={page} title="Inertia" />

export default Index
