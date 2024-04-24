import Image from "next/image";

const About = () => {
  return (
    <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto'>
      {/* Placeholder div for about content */}
      <div>
        <p className='py-3'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam sem, hendrerit nec nulla viverra, accumsan sodales est. Vivamus eget mauris in turpis porttitor blandit. Ut vulputate elementum fermentum. Aenean sed volutpat metus. Praesent tincidunt erat et risus faucibus elementum. Nam quis est hendrerit, mattis lacus vitae, elementum erat. Maecenas at ex mi. Donec at sagittis metus. Nullam eget dui sit amet diam tristique rutrum vel vehicula risus. Nullam sodales est nec erat dapibus sollicitudin. Proin quis vestibulum elit. Aliquam erat volutpat. Duis et lacus nibh. Mauris sit amet est venenatis, hendrerit lorem pharetra, fringilla ipsum. Nullam mollis aliquet nunc, in ornare ante pretium pulvinar.
        </p>
        <p className='py-3'>
        Vivamus semper ex eget odio varius gravida. Mauris odio neque, tincidunt vitae metus sed, feugiat condimentum tellus. Donec feugiat sapien vitae dictum finibus. Praesent venenatis velit vel tristique rhoncus. Mauris ac molestie magna, et pellentesque augue. Pellentesque laoreet viverra nisl, at rhoncus urna. Mauris molestie sapien sit amet sodales dapibus. Ut laoreet nisl dolor, vel rhoncus nunc posuere in.
        </p>
      </div>
      {/* Placeholder div for about image */}
      <div>
        <Image
          alt="about placeholder"
          height={`400`}
          src={`https://picsum.photos/300/400`}
          width={`300`}
        />
      </div>
    </div>
  )
}

export default About