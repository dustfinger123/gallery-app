"use client"
import Header from '@/components/header'
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import Image from 'next/image';

// const contentStyle: React.CSSProperties = {
//   height: '100vh',
//   color: '#fff',
//   textAlign: 'center',
//   background: '#364d79',
//   display: 'flex',
//   alignItems: 'flex-start',
//   flexDirection: 'column',
//   justifyContent: 'center',
// };
// const Home = () => {
//   const [category, setCategory] = useState<[]>()
//   const [publicId, setPublicId] = useState<[]>()
//   const [opacity, setOpacity] = useState(false)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/getimagedata');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         // Extract public IDs
//         const publicId = data.data.map((item: { public_id: string }) => item.public_id)

//         // Filter unique categories and limit to the first four
//         const uniqueCategories: string[] = [];
//         const uniqueCategory_publicId = publicId.filter((value: string) => {
//           const category = value.split('/')[0];
//           if (!uniqueCategories.includes(category)) {
//             uniqueCategories.push(category);
//             return true;
//           }
//           return false;
//         });

//         const category_publicId_4 = uniqueCategory_publicId.slice(0, 4)
//         setPublicId(category_publicId_4)

//         // Split the category/public_id strings and extract the categories
//         const category_publicId = category_publicId_4.map((item: any) => item.split('/'))
//         const category = category_publicId.map((item: any) => item[0])
//         setCategory(category)

//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // Handle the error, e.g., show an error message to the user
//       }
//     };

//     fetchData();
//   }, [])

//   const handleLeave = () => {
//     setOpacity(false)
//   }
//   const handleEnter = () => {
//     setOpacity(true)
//   }
//   return (
//     <div className='overflow-hidden'>
//       <Header className={{
//         position: '',
//         text: '',
//         background: 'bg-[#f0f8ff70]',
//         shadow: ''
//       }} />
//       <Carousel fade autoplay autoplaySpeed={5000}>
//         {category?.map((categoryItem: string, index: number) => (
//           <div className='bg-red-500' key={index}>
//             {/* {categoryItem} */}
//             {publicId && publicId[index] ? (
//               <h3 style={contentStyle}>
//                 <CldImage className={`${opacity ? 'opacity-100' : 'opacity-25'} transition-all duration-300 ease-linear`} width="1440" height="1440" src={publicId[index]} sizes="100vw" alt={publicId[index]} />
//                 <div className='group flex flex-col items-start absolute z-[1] top-50%'>
//                   <Link href={`/album/${categoryItem}`}
//                     onMouseEnter={handleEnter}
//                     onMouseLeave={handleLeave}>
//                     <p className={`${opacity ? '!text-black' : ''} transition-all duration-300 ease-linear text-7xl font-sans text-slate-200 font-extrabold ml-20`}>{categoryItem.replace(/_/g, ' ')}</p>
//                   </Link>
//                   <Link href={`/album/${categoryItem}`}
//                     onMouseEnter={handleEnter}
//                     onMouseLeave={handleLeave}>
//                     <p className={`${opacity ? '!text-black' : ''} transition-all duration-300 ease-linear text-xl ml-20 mt-4 text-slate-200 tracking-widest after:block after:w-0 group-hover:after:w-full after:border-2 after:border-transparent group-hover:after:border-orange-500 after:transition-all after:duration-500 after:ease-in-out`}>Explore Here</p>

//                   </Link>
//                 </div>
//               </h3>
//             ) : null}
//           </div>
//         ))}
//       </Carousel >
//       {/* <MainUploadModule /> */}
//     </div >
//   )
// }

// export default Home

const FlipComponent = ({ image1, image2, interval, rotateAxis }: any) => {
  const [cardFlip, setCardFlip] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCardFlip((prevCardFlip) => !prevCardFlip);
    }, interval);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [interval]);

  return (
    <div className="flip-card">
      <div className={`flip-card-inner ${cardFlip ? `${rotateAxis}` : ''}`}>
        <div className="flip-card-front overflow-hidden">
          <img className='h-full w-full bg-contain' src={image1} alt="Avatar" width={600} height={600} />
        </div>
        <div className="flip-card-back overflow-hidden">
          <img className='h-full w-full bg-contain' src={image2} alt="Avatar" width={600} height={600} />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <Header className={{
        position: '',
        text: '',
        background: 'bg-[#f0f8ff70]',
        shadow: ''
      }} />
      <div className='absolute top-0 left-0 flex flex-row h-screen w-screen gap-1 bg-gray-300'>

        <div id='section1' className='grid grid-rows-[2_1fr] h-full w-full gap-1'>
          <div className='flex flex-row h-full w-full gap-1'>
            <div className='flex-grow flex flex-col gap-1'>
              <div className='bg-green-500 h-full w-full'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=01'}
                  image2={'https://picsum.photos/700/350?random=42'}
                  interval={3700}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
              <div className='bg-green-600 h-full w-full'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=02'}
                  image2={'https://picsum.photos/700/350?random=41'}
                  interval={3300}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
            </div>
            <div className='bg-red-300 flex-grow-[2]'>
              <FlipComponent
                image1={'https://picsum.photos/700/350?random=03'}
                image2={'https://picsum.photos/700/350?random=40'}
                interval={4000}
                rotateAxis={'flip-card-inner-rotateZ'} />
            </div>
            <div className='flex-grow flex flex-col gap-1'>
              <div className='bg-gray-400 flex-grow-[2]'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=04'}
                  image2={'https://picsum.photos/700/350?random=39'}
                  interval={3400}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
              <div className='bg-gray-600 h-fi w-fi flex-grow'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=05'}
                  image2={'https://picsum.photos/700/350?random=38'}
                  interval={3000}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
            </div>
          </div>
          <div className='flex flex-row h-full w-full gap-1'>
            <div className='h-full w-full grid grid-cols-2 grid-rows-2 gap-1'>
              <div className='bg-yellow-50'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=06'}
                  image2={'https://picsum.photos/700/350?random=37'}
                  interval={3400}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
              <div className='bg-yellow-100'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=07'}
                  image2={'https://picsum.photos/700/350?random=36'}
                  interval={3400}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
              <div className='bg-yellow-200'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=08'}
                  image2={'https://picsum.photos/700/350?random=35'}
                  interval={4000}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
              <div className='bg-yellow-300'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=09'}
                  image2={'https://picsum.photos/700/350?random=34'}
                  interval={3500}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
            </div>
            <div className='grid grid-cols-1 h-full w-full gap-1'>
              <div className='bg-blue-300'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=10'}
                  image2={'https://picsum.photos/700/350?random=32'}
                  interval={3200}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
              <div className='bg-blue-500'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=11'}
                  image2={'https://picsum.photos/700/350?random=31'}
                  interval={3000}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
            </div>
          </div>
        </div>

        <div id='section2' className='grid grid-rows-[2_1fr] h-full w-full gap-1'>
          <div className='flex flex-row h-full w-full gap-1'>
            <div className='grid grid-cols-1 h-full w-full gap-1'>
              <div className='bg-orange-300'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=12'}
                  image2={'https://picsum.photos/700/350?random=33'}
                  interval={3000}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
              <div className='bg-orange-500'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=13'}
                  image2={'https://picsum.photos/700/350?random=30'}
                  interval={3000}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
            </div>
            <div className='h-full w-full grid grid-cols-2 grid-rows-2 gap-1'>
              <div className='bg-sky-50'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=14'}
                  image2={'https://picsum.photos/700/350?random=29'}
                  interval={3200}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
              <div className='bg-sky-100'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=15'}
                  image2={'https://picsum.photos/700/350?random=27'}
                  interval={3400}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
              <div className='bg-sky-200'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=16'}
                  image2={'https://picsum.photos/700/350?random=27'}
                  interval={3100}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
              <div className='bg-sky-300'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=17'}
                  image2={'https://picsum.photos/700/350?random=26'}
                  interval={3000}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
            </div>
          </div>
          <div className='flex flex-row h-full w-full gap-1'>
            <div className='bg-green-200 flex-grow-[2] flex items-center justify-center'>
              <FlipComponent
                image1={'https://picsum.photos/700/350?random=18'}
                image2={'https://picsum.photos/700/350?random=25'}
                interval={4000}
                rotateAxis={'flip-card-inner-rotateY'} />
            </div>
            <div className='bg-green-300 flex-grow-[2]'>
              <FlipComponent
                image1={'https://picsum.photos/700/350?random=19'}
                image2={'https://picsum.photos/700/350?random=24'}
                interval={3800}
                rotateAxis={'flip-card-inner-rotateY'} />
            </div>
            <div className='flex-grow flex flex-col gap-1'>
              <div className='flex-grow bg-green-300'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=20'}
                  image2={'https://picsum.photos/700/350?random=23'}
                  interval={3700}
                  rotateAxis={'flip-card-inner-rotateZ'} />
              </div>
              <div className='flex-grow bg-green-800'>
                <FlipComponent
                  image1={'https://picsum.photos/700/350?random=21'}
                  image2={'https://picsum.photos/700/350?random=22'}
                  interval={3600}
                  rotateAxis={'flip-card-inner-rotateY'} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute h-full w-full bg-[#93c5fd33] backdrop-blur-[4px] top-0 left-0'>
        <Carousel fade autoplay autoplaySpeed={5000}>
          <div className='!flex flex-col items-center justify-center h-screen w-screen bg-blue200 opacity80'>
            <div className='text-black mb-4 font-sacramento text-7xl font-bold tracking-wider'>Discover and Share the World&rsquo;s Best Photos</div>
            <div className='text-black text-4xl font-alice text-center w-full'>
              Explore diverse styles and genres worldwide, finding inspiration in extraordinary photos. We prioritize great photography, free from trends and fads.
            </div>
          </div>

          <div className='!flex flex-col items-center justify-center h-screen w-screen bg-blue200 opacity80'>
            <div className='text-black mb-4 font-sacramento text-7xl font-bold tracking-wider'>Memories Captured</div>
            <div className='text-black text-4xl font-alice text-center w-full'>
              Freeze moments in the frame of time with &#34;Memories Captured,&#34; where each photo tells a story that lasts a lifetime.
            </div>
          </div>

          <div className='!flex flex-col items-center justify-center h-screen w-screen bg-blue200 opacity80'>
            <div className='text-black mb-4 font-sacramento text-7xl font-bold tracking-wider'>Visual Adventures</div>
            <div className='text-black text-4xl font-alice text-center w-full'>
              Embark on &ldquo;Visual Adventures,&ldquo; where each image is a portal to explore diverse landscapes, emotions, and the artistry of the visual narrative.
            </div>
          </div>

          <div className='!flex flex-col items-center justify-center h-screen w-screen bg-blue200 opacity80'>
            <div className='text-black mb-4 font-sacramento text-7xl font-bold tracking-wider'>Expressive Narratives</div>
            <div className='text-black text-4xl font-alice text-center w-full'>
              Your personal journey for <i>Inspiration</i>.
            </div>
          </div>

        </Carousel >
      </div>
    </div>
  )
}