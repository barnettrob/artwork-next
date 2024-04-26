'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image'

interface PortfolioImages {
    url: string;
    width: number;
    height: number;
}

interface PortfolioImagesProps {
    images: PortfolioImages[]
}

const AllWork = (props: PortfolioImagesProps) => {
    const imgsNum = 10;
    const images = props.images;
    const [items, setItems] = useState<any[]>(images.slice(0, imgsNum));
    const [current, setCurrent] = useState(2);
    //const blogPosts = await getAllBlogPosts();

    const getNextN = useCallback(() => {
        return images.slice(imgsNum*current - imgsNum, imgsNum*current);
    }, [current, images])

    const handleImageLoad = useCallback(() => {
        setCurrent(current+1);
        const nextN = getNextN();

        for (let i = 0; i < nextN.length; i++) {
            items.push(nextN[i]);
        }
    }, [current, getNextN, items])

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            handleImageLoad();
        }
    }, [handleImageLoad]);  

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className='images-wrapper'>
            {items.map((post: any) => (
                <div key={post.url} className='image-card'>
                    <Image
                      alt="placeholder"
                      height={post.height}
                      src={post.url}
                      width={post.width}
                      placeholder='blur'
                      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
                      priority
                    />
                </div>
            ))}
        </div>
    )
}

export default AllWork