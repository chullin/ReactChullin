'use client';

import { 
  Card, 
  CardBody, 
  Divider, 
  Image, 
  Button, 
  Link as HeroLink 
} from '@heroui/react';
import { Calendar, User, ArrowLeft, Bookmark, Share2, Globe, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ManMustExplorePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header / Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/post-bg.jpg"
          alt="Space Exploration"
          className="absolute inset-0 w-full h-full object-cover z-0"
          radius="none"
          removeWrapper
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Man must explore, and this is exploration at its greatest
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium mt-4 italic">
              Problems look mighty small from 150 miles up
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-white/80 font-bold">
                <User size={18} className="text-blue-400" />
                <Link href="/" className="hover:text-blue-400 transition-colors">Joseph Chen</Link>
              </div>
              <div className="flex items-center gap-2 text-white/80 font-bold">
                <Calendar size={18} className="text-blue-400" />
                <span>August 24, 2023</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Post Content */}
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Action Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <Button
              as={Link}
              href="/blog"
              variant="light"
              color="primary"
              className="font-bold"
              startContent={<ArrowLeft size={18} />}
            >
              Back to Blog
            </Button>
            <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
              Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman&apos;s earth, if free men make it, will be truly round: a globe in practice, not in theory.
            </p>
            
            <p>
              Science cuts two ways, of course; its products can be used for both good and evil. But there&apos;s no turning back from science. The early warnings about technological dangers also come from science.
            </p>
            
            <Card className="bg-blue-50/50 border-none shadow-none my-12">
              <CardBody className="p-10 flex flex-row gap-6 relative overflow-hidden">
                <Quote size={48} className="text-blue-200 absolute -top-2 -left-2 rotate-12" />
                <div className="relative z-10">
                   <p className="text-2xl font-black text-blue-900 leading-snug">
                     "What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth."
                   </p>
                </div>
              </CardBody>
            </Card>

            <p>
              A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That&apos;s how I felt seeing the Earth for the first time. I could not help but love and cherish her.
            </p>
            
            <p>
              For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.
            </p>
            
            <div className="pt-10 space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                The Final Frontier
              </h2>
              <p>
                There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.
              </p>
              
              <blockquote className="border-l-4 border-blue-500 pl-8 py-4 my-8 bg-gray-50 rounded-r-2xl italic text-xl text-gray-700 font-medium">
                The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.
              </blockquote>
              
              <p>
                Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.
              </p>
            </div>
            
            <div className="pt-10 space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                Reaching for the Stars
              </h2>
              <p>
                As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.
              </p>
              
              <div className="flex flex-col items-center gap-4 py-10">
                <Image 
                  className="w-full max-w-4xl shadow-2xl rounded-[2rem]" 
                  src="/assets/post-sample-image.jpg" 
                  alt="Post Sample" 
                />
                <p className="text-sm font-bold text-gray-400 bg-gray-50 px-6 py-2 rounded-full flex items-center gap-2">
                  <Globe size={14} className="text-blue-400" />
                  To go places and do things that have never been done before – that’s what living is all about.
                </p>
              </div>
              
              <p>
                Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.
              </p>
              
              <p className="font-bold text-gray-900 italic pt-6">
                As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.
              </p>
            </div>
          </div>
          
          <Divider className="my-16 opacity-50" />
          
          <div className="bg-gray-50 p-10 rounded-[2rem] flex flex-col items-center text-center space-y-6">
            <h3 className="text-2xl font-black text-gray-900">Enjoyed this read?</h3>
            <p className="text-gray-500 font-medium">Subscribe to our newsletter for more space exploration and tech updates.</p>
            <div className="flex gap-2">
               <Button color="primary" radius="full" size="lg" className="font-black px-8">Subscribe</Button>
               <Button variant="flat" size="lg" radius="full" className="font-bold">Follow @Joseph</Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
