import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div style={{backgroundColor:"#0A1018" , height:"100%"}}>
      <Navbar />
      <div className='mt-16 flex flex-col text-center gap-6'>
        <div className='text-white text-5xl font-bold'>Get in Touch</div>
        <div className='text-gray-500 text-xl flex justify-center w-full'>
          <div className='w-[55%]'>
            Have a question, suggestion, or just want to say hello? I'd love to hear from you!
          </div>
        </div>
      </div>
      <div className='mt-12 flex mx-16 gap-16 mb-20'>
        <div className='bg-[#050B16] h-[550px] w-[725px] rounded-xl border-[1px] border-gray-800'>
          <div className='m-6'>
            <span className='bi bi-chat-left text-2xl text-[#00D4FF]'></span>
            <span className='ml-2 text-2xl text-white font-semibold'> Send a Message</span>
          </div>
          <div>
            <form>
              <div className='flex w-full gap-5 px-6 justify-start'>
                <div className='flex flex-col w-full gap-2'>
                  <label htmlFor="name" className='text-white text-base'>Name</label>
                  <input type="text" placeholder='Your full name' className='bg-[#020817] border-[1px] border-gray-800 rounded-lg p-2 text-gray-300 text-sm' id='name'/>
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <label htmlFor="mail" className='text-white text-base'>Email</label>
                  <input type="email" placeholder='your@email.com' className='bg-[#020817] border-[1px] border-gray-800 rounded-lg p-2 text-gray-300 text-sm' id='mail'/>
                </div>
              </div>
              <div className='flex w-full px-6 justify-start mt-5'>
                <div className='flex flex-col w-full gap-2'>
                  <label htmlFor="subject" className='text-white text-base'>Subject</label>
                  <input type="text" placeholder="What's this about?" className='bg-[#020817] border-[1px] border-gray-800 rounded-lg p-2 text-gray-300 text-sm' id='subject'/>
                </div>
              </div>
              <div className='flex w-full px-6 justify-start mt-5'>
                <div className='flex flex-col w-full gap-2'>
                  <label htmlFor="message" className='text-white text-base'>Message</label>
                  <textarea placeholder="Tell me more..." className='bg-[#020817] border-[1px] border-gray-800 rounded-lg p-2 text-gray-300 text-sm' id='message' rows={7}/>
                </div>
              </div>
              <div className='bg-[#00D4FF] py-2 mt-5 mx-6 rounded-lg text-center cursor-pointer'>
                <span className='bi bi-send font-semibold text-lg'> Send Message</span>
              </div>
            </form>
          </div>
        </div>
        <div className='flex flex-col gap-10'>
          <div className='bg-[#060C17] h-[250px] w-[350px] rounded-xl border-[1px] border-gray-800'>
            <div className='text-white text-xl font-semibold mt-4 mx-5'>
              Contact Information
            </div>
            <div className='flex mx-5 mt-5 gap-3'>
              <div className='h-full mt-2'>
                <span className='bi bi-envelope text-[#00D4FF] text-xl'></span>
              </div>
              <div>
                <div className='text-white font-semibold'>
                  Email
                </div>
                <div className='text-gray-500 text-sm'>
                  allanjoseph3005@gmail.com
                </div>
              </div>
            </div>
            <div className='flex mx-5 mt-3 gap-3'>
              <div className='h-full mt-2'>
                <span className='bi bi-geo-alt text-[#00D4FF] text-xl'></span>
              </div>
              <div>
                <div className='text-white font-semibold'>
                  Location
                </div>
                <div className='text-gray-500 text-sm'>
                  Bangalore , India
                </div>
              </div>
            </div>
            <div className='flex mx-5 mt-3 gap-3'>
              <div className='h-full mt-2'>
                <span className='bi bi-clock text-[#00D4FF] text-xl'></span>
              </div>
              <div>
                <div className='text-white font-semibold'>
                  Response Time
                </div>
                <div className='text-gray-500 text-sm'>
                  Usually within 24 hours
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[#060C17] h-[325px] w-[350px] rounded-xl border-[1px] border-gray-800'>
            <div className='text-white text-xl font-semibold mt-4 mx-5'>
              Follow Me
            </div>
            <div className='flex mx-5 mt-5 gap-3 rounded-lg px-3 py-[12px] hover:bg-[#0c3949] cursor-pointer'>
              <div className='h-full mt-2'>
                <span className='bi bi-github text-[#00D4FF] text-2xl'></span>
              </div>
              <a href="https://github.com/allanjoseph01" target='new'>
                <div>
                  <div className='text-white font-semibold'>
                    Github
                  </div>
                  <div className='text-gray-500 text-sm'>
                    @allanjoseph01
                  </div>
                </div>
              </a>
            </div>
            <div className='flex mx-5 mt-3 gap-3 rounded-lg px-3 py-[12px] hover:bg-[#0c3949] cursor-pointer'>
              <div className='h-full mt-2'>
                <span className='bi bi-linkedin text-[#00D4FF] text-xl'></span>
              </div>
              <a href="https://www.linkedin.com/in/allan-santosh-joseph/" target='new'>
                <div>
                  <div className='text-white font-semibold'>
                    LinkedIn
                  </div>
                  <div className='text-gray-500 text-sm'>
                    Allan Santosh Joseph
                  </div>
                </div>
              </a>
            </div>
            <div className='flex mx-5 mt-3 gap-3 rounded-lg px-3 py-[12px] hover:bg-[#0c3949] cursor-pointer'>
              <div className='h-full mt-2'>
                <span className='bi bi-twitter text-[#00D4FF] text-xl'></span>
              </div>
              <a href="https://x.com/AllanJoseph30" target='new'>
                <div>
                  <div className='text-white font-semibold'>
                    Twitter
                  </div>
                  <div className='text-gray-500 text-sm'>
                    @AllanJoseph30
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className='bg-[#020817] h-[160px] w-[350px] rounded-xl border-[1px] border-gray-800'>
            <div className='text-white text-xl font-semibold text-center mt-3'>
              Quick Question?
            </div>
            <div className='flex justify-center mt-2'>
              <div className='text-gray-400 text-sm w-[80%] text-center'>
                For quick questions or feedback, feel free to reach out directly!
              </div>
            </div>
            <div className='px-5 mt-3'>
              <button className='text-white text-sm font-bold border-[1px] border-gray-800 py-2 w-full rounded-lg cursor-pointer hover:bg-[#00D4FF] hover:text-black'>
                <span className='bi bi-envelope'> Send Quick Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
