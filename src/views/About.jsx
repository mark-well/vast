
import Header from '../components/Header'

function About() {
    return (
        <>
            <div className='min-h-dvh flex flex-col gap-y-8'>
                <Header type="navigation" />
                <div className='w-full grow px-4 flex flex-col gap-y-3.5'>
                    <div className='flex flex-col items-center gap-y-4 border-b-gray-700 border-b py-4'>
                        <h1 className='font-bold text-gray-800'>VAST: A Smart Study Guide App</h1>
                        <p className='text-sm text-center min-w-96 font-(family-name:--font-secondary)'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nibh ipsum, porttitor posuere aliquam sed.</p>
                    </div>

                    <div className='text-sm font-(family-name:--font-secondary)'>
                        <h2>VAST</h2>
                        <h2>Version: 1.0</h2>
                        <h2>Updated on: Feb 18, 2026</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;