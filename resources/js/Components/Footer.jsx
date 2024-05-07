import ApplicationLogo from '@/Components/ApplicationLogo';
import Container from '@/Components/Container';
import React from 'react';

export default function Footer() {
    return (
        <div className="border-t border-gray-800 bg-gray-900 py-10 mt-8 md:mt-16">
            <Container>
                <div className="max-w-2xl mx-auto text-center">
                    <ApplicationLogo className="fill-white w-16 h-16 mx-auto" />
                    <p className="mt-5 text-gray-300">
                        Saya adalah seorang web developer yang saat ini bekerja full-time remote di Jakarta. Saat ini saya tinggal di Bogor, Jawa Barat. Pernah bekerja sebagai IT Supervisor di salah satu perusahaan di Bogor selama 1.5 tahun. Terbiasa menggunakan Laravel, ReactJS, VueJS, Tailwind dan Inertia, serta <i>advance</i> dalam menggunakan CodeIgniter.
                    </p>
                    <p className="font-mono text-sm text-gray-400 mt-10 max-w-lg mx-auto">
                        Dibuat dan didesain dengan menggunakan cinta oleh{' '}
                        <strong className="font-semibold text-white">
                            {import.meta.env.VITE_APP_NAME}
                        </strong>{' '}
                    </p>

                    <p className='mt-8 text-gray-400 font-mono text-xs'>Copyright {new Date().getFullYear()} All right reserved.</p>
                </div>
            </Container>
        </div>
    );
}
