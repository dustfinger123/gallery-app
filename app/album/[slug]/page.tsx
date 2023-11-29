'use client'
import Header from "@/components/header"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { CldImage } from "next-cloudinary"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page({ params }: any) {
  // console.log(params.slug)
  const param = params.slug
  const [rcvdData, setRcvdData] = useState<any>()
  const [displayedImage, setDisplayedImage] = useState<string>('')
  const [displayedTitle, setDisplayedTitle] = useState<string>('')
  const [displayedDate, setDisplayedDate] = useState<string>('')

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch('/api/getimagedata');
        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status)
        }
        const data = await response.json()
        setRcvdData(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetcher()
  }, [])

  const categorizedPublicId: { [key: string]: string[] } = {}
  const categorizedTitle: { [key: string]: string[] } = {}
  const categorizedDate: { [key: string]: string[] } = {}


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

  const handleClick = (item: string, title: string, date: string) => {
    setDisplayedImage(item)
    setDisplayedTitle(title)
    setDisplayedDate(date)
    console.log(item, title, date)
  }


  //Indexing

  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(categorizedPublicId[param]?.length / itemsPerPage)

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <Header className={{ position: "", text: "text-transparent", background: "bg-transparent", shadow: 'shadow-none' }} />
      <Link href={'/album'}>
        <h1 className="absolute text-8xl font-bold tracking-wider z-10 font-tangerine top-7 left-7 text-black">{param.replace(/_/g, ' ')}</h1>
      </Link>

      <div className="flex flex-row items-center gap-2 absolute bottom-10 left-10">
        <Button className="bg-blue-400 flex items-center justify-center" type="primary" onClick={handlePrevClick} disabled={currentPage === 1}>
          <LeftOutlined />
        </Button>
        <div className="flex flex-row gap-2 w-[470px]">
          {categorizedPublicId[param]?.slice(startIndex, endIndex).map((item, index) => (
            <div className="bg--100 h-auto w-auto shadow-lg" key={index}>
              <div className="group overflow-hidden" onClick={() => handleClick(item, categorizedTitle[param][index], categorizedDate[param][index])}>
                <div className="overflow-hidden">
                  <CldImage className="group-hover:scale-150 h-28 w-28 transition-all duration-300 ease-linear" src={item} alt={item} width={300} height={300} />
                </div>
                <div className="group-hover:font-bold font-sansopen italic text-gray-400 tracking-wide text-center w-28 whitespace-nowrap overflow-hidden text-ellipsis  transition-all duration-100 ease-linear">{categorizedTitle[param][index]}</div>
              </div>
            </div>
          ))}

        </div>
        <Button className="bg-blue-400 flex items-center justify-center" type="primary" onClick={handleNextClick} disabled={currentPage === totalPages}>
          <RightOutlined />
        </Button>
      </div>











      <div className="h-screen w-screen bg-green-100">
        {categorizedPublicId[param] && categorizedTitle[param] && (
          <div>
            <CldImage className="h-screen w-screen" src={`${displayedImage ? displayedImage : categorizedPublicId[param][0]}`} width={1440} height={1440} alt="No-Image" />
            <div className="group">
              <div className="absolute bottom-20 right-14 font-tangerine font-bold text-8xl group-hover:scale-150 transition-all duration-300 ease-linear group-hover:-translate-x-8">{`${displayedTitle ? displayedTitle : categorizedTitle[param][0]}`}</div>
              <div className="absolute text-white bottom-10 right-14 font-tangerine font-bold text-3xl group-hover:scale-150 transition-all duration-300 ease-linear group-hover:-translate-x-4">{`${displayedDate ? displayedDate : categorizedDate[param][0]}`}</div>
            </div>
          </div>
        )}
      </div>
    </div >)
}