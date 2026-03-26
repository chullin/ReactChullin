import Link from 'next/link';

export default function BlogPostPage() {
  return (
    <>
      {/* Page Header */}
      <header className="masthead" style={{ backgroundImage: "url('/assets/post-bg.jpg')", padding: '150px 0', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading text-center">
                <h1 className="fw-bolder">Man must explore, and this is exploration at its greatest</h1>
                <h2 className="subheading fw-light">Problems look mighty small from 150 miles up</h2>
                <span className="meta">
                  Posted by <Link href="/" className="text-white">Joseph Chen</Link> on August 24, 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Post Content */}
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7 mt-5">
              <p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman&apos;s earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>
              <p>Science cuts two ways, of course; its products can be used for both good and evil. But there&apos;s no turning back from science. The early warnings about technological dangers also come from science.</p>
              <p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>
              <p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That&apos;s how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>
              <p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>
              
              <h2 className="section-heading fw-bolder mt-4 mb-3">The Final Frontier</h2>
              <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>
              <blockquote className="blockquote border-start ps-4 my-4 fst-italic">The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>
              <p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>
              
              <h2 className="section-heading fw-bolder mt-4 mb-3">Reaching for the Stars</h2>
              <p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.</p>
              <div className="text-center my-4">
                <img className="img-fluid rounded" src="/assets/post-sample-image.jpg" alt="Post Sample" />
                <span className="caption text-muted d-block mt-2">To go places and do things that have never been done before – that’s what living is all about.</span>
              </div>
              <p>Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.</p>
              <p>As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
