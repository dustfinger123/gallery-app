'use client'
import AnimatedNavigation from "@/components/animatedNavigation";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

export default function Blog() {
    const [rcvdData, setRcvdData] = useState<any>()
    const [uniqueCategory, setUniqueCategory] = useState<string[]>([])

    useEffect(() => {
        const fetcher = async () => {
            try {
                const response = await fetch('/api/getimagedata');
                if (!response.ok) {
                    throw new Error('Request failed with status: ' + response.status)
                }
                const data = await response.json()
                const category = data.data.map((item: { albumCategory: any; }) => item.albumCategory)

                const uniqueCategory: string[] = Array.from(new Set(category));
                setUniqueCategory(uniqueCategory)

                setRcvdData(data.data)
                // console.log(rcvdData)
            } catch (error) {
                console.error(error)
            }
        }
        fetcher()
    }, [])

    // const uniqueCategory = [
    //     "Nature_and_Landscapes",
    //     "Sports and Fitness",
    //     "Food and Culinary Delights",
    //     "Fashion and Style",
    //     "Portraits and People",
    //     "Family Memories",
    //     "Black and White Photography",
    //     "Historical and Vintage",
    //     "Music and Concerts",
    //     'Architecture and Design']

    const categorizedPublicId: { [key: string]: string[] } = {}
    const categorizedTitle: { [key: string]: string[] } = {}
    const categorizedDate: { [key: string]: string[] } = {}
    // const uniqueCategory


    rcvdData?.forEach((element: { albumCategory: string, public_id: string, imageTitle: string, date_string: string }) => {

        const category = element.albumCategory
        const publicId = element.public_id
        const title = element.imageTitle
        const obtDate = element.date_string
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Create a Date object by parsing the date string
        const dateObject = new Date(obtDate);

        // Get the month and date from the Date object
        const monthName = months[dateObject.getMonth()];
        const datee = dateObject.getDate();
        const year = dateObject.getFullYear()

        const date = `${datee}-${monthName}-${year}`

        if (!categorizedPublicId[category]) {
            categorizedPublicId[category] = []
            categorizedTitle[category] = []
            categorizedDate[category] = []

        }

        categorizedTitle[category].push(title)
        categorizedPublicId[category].push(publicId)
        categorizedDate[category].push(date)

    });

    //INDEXING
    const [index, setIndex] = useState(0)

    const handleNextClick = () => {
        setIndex((index + 1) % uniqueCategory.length);
    };

    const handlePrevClick = () => {
        setIndex((index + 1) % uniqueCategory.length);
    };

    return (
        <div className="bg-image6 w-screen h-screen">
            {
                uniqueCategory?.map((item, i) => (
                    <div key={i} className={`${index === i ? 'opacity-100' : 'opacity-0'} absolute transition-all duration-500 ease-linear overflow-hidden h-screen w-screen z-0`}>
                        <CldImage className="h-screen w-screen overflow-hidden filter grayscale-[60%]" src={categorizedPublicId[item][0]} width={1440} height={900} alt="dsad" />
                    </div>
                ))
            }
            <div className="flex flex-row absolute h-screen w-screen bg-image5 bg-cover bg-no-repeat overflow-hidden z-10">
                <AnimatedNavigation />
                <div className="flex flex-row justify-around h-2/3 w-2/5 m-auto">
                    <div className={`relative flex h-80 w-80 justify-center items-center rounded-full self-center overflow-hidden`}>
                        {
                            uniqueCategory?.map((item, i) => (
                                <div key={i} className={`${index === i ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'} absolute transition-all duration-500 ease-linear`}>
                                    <CldImage className="h-80 w-80 overflow-hidden" src={categorizedPublicId[item][0]} width={300} height={300} alt="dsad" />
                                </div>
                            ))
                        }
                        <div className="flex flex-col justify-between items-center overflow-auto relative h-60 w-60 blob-border bg-[#93c5fd33] backdrop-filter backdrop-blur-[2px] z-10">
                            <Button type="text" className="flex items-center justify-center h-8 w-8" onClick={handlePrevClick}>
                                <CaretUpOutlined className="text-white" />
                            </Button>
                            {uniqueCategory?.map((item, i) => (
                                <div key={i} className={`${i === index ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'} flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl tracking-widest font-playball w-3/4 text-center text-white transition-all duration-500 ease-linear`}>{item.replace(/_/g, ' ')}</div>
                            ))}
                            <Button type="text" className="flex items-center justify-center h-8 w-8" onClick={handleNextClick}>
                                <CaretDownOutlined className="text-white" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div id="blog-block" className="flex items-end justify-end pr-6 border h-full w-3/5 m-auto bg-green-40">
                    <div className="flex flex-col gap-2 h-2/3 w-4/5  overflow-auto scrollbar-thin border">
                        <h1>
                            Introduction
                        </h1>
                        <p>
                            In a fast-paced world dominated by technology and urbanization, it&aposs easy to forget the incredible beauty that Mother Nature has to offer. From vast mountains to serene beaches and lush forests, our planet is adorned with landscapes that seem to be taken straight out of a dream. In this blog post&apos we&aposll embark on a virtual journey through some of the most awe-inspiring landscapes our world has to offer.
                        </p>
                        <h1>
                            Majestic Mountains
                        </h1>
                        <p>
                            The world is home to numerous awe-inspiring mountain ranges that stand tall and proud. From the towering Himalayas to the rugged Rockies, these majestic giants have captivated adventurers, hikers, and mountaineers for centuries. The grandeur of mountains not only provides breathtaking vistas but also serves as a reminder of the Earth&aposs ancient and powerful forces.
                        </p>
                        <h1>
                            Enchanting Forests
                        </h1>
                        <p>
                            Forests are nature&aposs sanctuary, offering tranquility, biodiversity, and life-giving oxygen. Explore the mystical depths of the Amazon Rainforest, the ancient beauty of the Black Forest, or the ethereal charm of Japan&aposs bamboo groves. Each forest has its own unique allure, and their lush canopies and vibrant ecosystems are a testament to the marvels of our planet.
                        </p>
                        <h1>
                            Mesmerizing Deserts
                        </h1>
                        <p>
                            Deserts may seem desolate at first glance, but they hold their own enchanting beauty. From the mesmerizing sand dunes of the Sahara to the otherworldly landscapes of Utah&aposs red rock country, these arid expanses display the stunning contrast between stark, golden sand and piercing blue skies.
                        </p>
                        <h1>
                            Serene Lakes and Rivers
                        </h1>
                        <p>
                            Water bodies have an innate ability to soothe the soul. Gaze at the tranquil mirror-like surface of Lake Louise in Canada, listen to the melodious rush of the Amazon River, or be mesmerized by the pure blue waters of New Zealand&aposs Lake Tekapo. These serene lakes and rivers offer moments of reflection and serenity amidst the hustle and bustle of life.
                        </p>
                        <h1>
                            Coastal Wonders
                        </h1>
                        <p>
                            Coastlines have an undeniable charm, from the rugged cliffs of the Mediterranean to the white sandy beaches of the Maldives. Coastal landscapes not only offer breathtaking sunsets but also the soothing sounds of crashing waves, providing a sense of relaxation and wonder that&aposs hard to find anywhere else.
                        </p>
                        <h1>
                            Arctic Wilderness
                        </h1>
                        <p>
                            The Arctic, though harsh and unforgiving, is a landscape of pure, untouched beauty. The vast ice sheets, frozen tundras, and the dance of the Northern Lights create a mesmerizing, almost otherworldly experience. This environment highlights the incredible resilience of life in extreme conditions.
                        </p>
                        <h1>
                            Rolling Plains and Grasslands
                        </h1>
                        <p>
                            The endless expanse of grasslands and plains evokes a sense of freedom and serenity. Explore the sweeping grasslands of the African savanna, the romantic landscapes of the American Midwest, or the rolling hills of Tuscany. These regions are not only visually stunning but also hold deep cultural and ecological significance.
                        </p>
                        <h1>
                            Island Paradises
                        </h1>
                        <p>
                            Islands, whether tropical or remote, offer a sense of seclusion and enchantment. Bask in the warm embrace of Bali, discover the unique biodiversity of the Galápagos Islands, or experience the untamed beauty of Iceland. Each island has a story to tell and a world of wonder to explore.
                        </p>
                        <h1>
                            Conclusion
                        </h1>
                        <p>
                            The world is a treasure trove of natural beauty, offering an endless array of landscapes that can take your breath away. Whether you&aposre a nature enthusiast, an adventurer, or simply someone looking for a moment of tranquility, our planet&aposs diverse landscapes have something to offer everyone. So, take a break from the hustle and bustle of modern life, and embark on a journey to explore and appreciate the breathtaking landscapes that our world has to offer. Nature truly is a masterpiece&apos and it&aposs our responsibility to preserve and protect it for generations to come.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}