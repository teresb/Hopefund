import Header from '../components/header/header'
import Navbar from '../components/navbar/navbar'
import OverviewCounter from '../components/OverviewCounter/OverviewCounter'
import Vision from '../components/Vision/Vision'
import Banner from '../components/banner/Banner'
import Banner2 from '../components/banner/Banner2'
import Video from '../components/Video/Video'
import Blogs from '../components/Blogs/Blogs'
import Footer from '../components/Footer/Footer'


function Home(){
    return(
        <div className='overflow-x-hidden dark:bg:gray-900 bg-white'>
            <Navbar/>
            <Header/>
            <OverviewCounter/>
            <Vision/>
            <Banner/>
            <Banner2/>
            <Video/>
            <h1 className="ml-20 mt-24 border-l-8 pl-2 text-3xl font-bold">
               Discover some fundraisers...
            </h1>
            <Blogs/>
            <Footer/>
        </div>
    )
}

export default Home