import React from "react";
import { getAllSocialMedia } from "@/app/lib/api";
import InstagramIcon from "./icons/Instagram";

interface socialMedia {
    name: string;
    url: string;
}

const SocialMedia = async () => {
    const social = await getAllSocialMedia();

    let items = [];
    if ("data" in social && 
        "socialMediaCollection" in social.data && 
        "items" in social.data.socialMediaCollection) {
            items = social.data.socialMediaCollection.items;
    }

    return (
        <>
            {items.map((social: socialMedia) => {
                let icon: React.JSX.Element;
                switch(social.name) {
                    case "instagram":
                        icon = <InstagramIcon />
                        break; 
                    default:
                         icon = <InstagramIcon />
                }
                return (
                    <li key={social.url}>
                        <a href={social.url}>
                            {icon}
                        </a>
                    </li>
                )
            })}
        </>
    )
}

export default SocialMedia;