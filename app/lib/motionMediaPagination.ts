import { MotionMediaContentShort } from '@/interfaces/Content';

export function getNextAndPreviousSlugs(allContent: MotionMediaContentShort[], currentSlug: string) {
    const allSlugs: string[] = [];
    for (let i = 0; i < allContent.length; i++) {
        allSlugs.push(allContent[i].slug);
    }

    // Get number in array but starting with zero because we are dealing with array index.
    const allSlugsNumber: number = allSlugs.length - 1;

    const currentSlugIndex = allSlugs.indexOf(currentSlug);

    let prevSlug = "";
    let prevSlugTitle = "";
    let nextSlug = "";
    let nextSlugTitle = "";

    if (currentSlugIndex > 0) {
        prevSlug = allSlugs[currentSlugIndex - 1];
        prevSlugTitle = allContent[currentSlugIndex - 1].title ?? "";
    }
    if (currentSlugIndex < allSlugsNumber) {
        nextSlug = allSlugs[currentSlugIndex + 1];
        nextSlugTitle = allContent[currentSlugIndex + 1].title ?? "";
    }
    return { 
        prev: { 
            slug: prevSlug, 
            title: prevSlugTitle 
        }, 
        next: { 
            slug: nextSlug, 
            title: nextSlugTitle 
        } 
    };
}