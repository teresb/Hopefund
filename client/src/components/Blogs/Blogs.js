import React from 'react'
import BlogCard from './BlogCard'


const BlogData = [
    {
        img: '../../assets/download.png',
        title: "Blog Title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. amet consectetur adipisicing elit.",
        date: "12th May 2021",
        writer: "John Doe"
    },
    {
        img: '../../assets/download.png',
        title: "Blog Title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. amet consectetur adipisicing elit.",
        date: "12th May 2021",
        writer: "John Doe"
    },
    {
        img: '../../assets/download.png',
        title: "Blog Title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. amet consectetur adipisicing elit.",
        date: "12th May 2021",
        writer: "John Doe"
    },
]
const Blogs = () => {
  return (
    <div className='dark:bg-gray-900 dark:text-white'>
      <div className='container py-8'>
        <h1 className='mb-8 border-l-8 pl-2 text-center text-3xl font-bold'>Our Latest Blogs</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {BlogData.map((blog) => (
                <BlogCard
                key={blog.title}
                img={blog.img}
                title={blog.title}
                description={blog.description}
                date={blog.date}
                writer={blog.writer} /> 
            ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
