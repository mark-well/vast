
import Header from '../components/Header'
import Main from '../components/Main'

function Home() {
    return (
        <>

            <div className='flex flex-col min-h-dvh'>
                <Header type="main" />
                <Main />
            </div>
        </>
    )
}

export default Home
