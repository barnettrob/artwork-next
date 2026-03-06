interface ChevronProps {
    direction?: "up" | "down" | "left" | "right";
}
const Chevron = ( props: ChevronProps ) => {
    const direction = props.direction || "up";

    return (
        <svg className={`chevron ${direction}`} fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 407.436 407.436" xmlSpace="preserve">
                <polygon points="203.718,91.567 0,294.621 21.179,315.869 203.718,133.924 386.258,315.869 407.436,294.621 "/>
        </svg>
    )
}

export default Chevron;