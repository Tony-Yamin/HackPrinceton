"use client"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Search } from "@/components/search"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { Question } from "@/components/quiz/question"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video } from "@/components/video/video"
import { wait } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"

export default function IndexPage() {
  
    const [generating, setGen] = useState(false);
    const [responseData, setResponseData] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: any) => {
      const file = event.target.files[0];
      console.log(file, file.name)
      setSelectedFile(file);
    };

    // Function to handle button click
    const handleClick = async () => {
      if (!selectedFile || selectedFile.type !== 'audio/mpeg') {
        console.error('Selected file is not an MP3');
        return;
      }else {
        setGen(true);
        try {
          //const response = await fetch('your-api-endpoint');
          //const data = await response.json();
          wait().then(() => {
            setResponseData("/gen.mp4");
            setGen(false);
          })
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    return (
        <>
        <header className="bg-background sticky top-0 z-40 w-full">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mt-4">
              <MainNav />    
          </div>
        </header>
        <section className="container grid items-center gap-10 pb-8 md:pb-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="leading-tight mb-6 flex flex-col items-center">
            <span className="font-semibold text-3xl mb-3" style={{ backgroundImage: 'linear-gradient(135deg, #3e61c1, #a6b6e2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Choreography</span>
            <p className="max-w-[700px] text-md text-muted-foreground">
              Upload a music audio MP3 file (shorter clips work faster) and we will do the rest.
            </p>
          </span>
          <Input id="audio" type="file" className="w-[500px]" onChange={handleFileChange}/>
          <Button variant="secondary" className="min-w-[200px] mt-3" onClick={handleClick} disabled={!selectedFile}>
            {generating ? 'Loading...' : 'Generate'}
          </Button>
          {responseData != '' && (
            <Video videoUrl={responseData}/>
          )}
        </div>
        </section>
        </>
    )
}
