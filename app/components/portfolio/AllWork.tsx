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
    const images = props.images;
    const [items, setItems] = useState<any[]>(images.slice(0, 5));
    const [current, setCurrent] = useState(2);
    //const blogPosts = await getAllBlogPosts();

    const getNextN = useCallback(() => {
        return images.slice(5*current - 5, 5*current);
    }, [current, images])

    const handleImageLoad = () => {
        setCurrent(current+1);
        const nextN = getNextN();

        for (let i = 0; i < nextN.length; i++) {
            items.push(nextN[i]);
        }
    }

    useEffect(() => {
        //setItems(images.slice(5*current - 5, 5*current));
        //setCurrent(current+1);
    }, [current, images]);

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
            <div className='text-center'>
                <button onClick={handleImageLoad}>More</button>
            </div>
        </div>
    )
}

export default AllWork