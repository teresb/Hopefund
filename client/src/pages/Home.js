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
            <Blogs/>
            <Footer/>
        </div>
    )
}

export default Home