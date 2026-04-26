'use client';

import { 
  Card, 
  CardBody, 
  Button, 
  Link, 
  Divider,
  Avatar,
  Image
} from '@heroui/react';
import { 
  Mail, 
  MessageSquare, 
  Send,
  Phone,
  Globe
} from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const OneZeroFourLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 54 26"
    width="54"
    height="26"
    {...props}
  >
    <path
      d="M27.782 12.998V13h4.443v-.002c0-6.961-5.639-12.6-12.598-12.6-4.549 0-8.518 2.414-10.734 6.02V.398H4.446L0 4.846h4.445v20.752h4.447v-6.023A12.543 12.543 0 0 1 7.026 13c0-2.621.979-5.01 2.582-6.836.039-.043.08-.09.121-.133a10.164 10.164 0 0 1 .853-.842c.27-.234.551-.459.844-.666.025-.016.047-.035.07-.053.328-.227.67-.438 1.025-.627.014-.008.029-.014.043-.021.318-.168.65-.318.988-.453.102-.041.203-.076.307-.113.26-.096.521-.18.791-.252.125-.035.25-.068.377-.098.27-.063.543-.113.818-.154.117-.018.234-.039.355-.055.395-.045.793-.074 1.199-.074.604 0 1.193.059 1.768.158.074.014.152.018.225.033.1.02.195.049.293.07.859.193 1.682.484 2.443.875l.01.006c.279.143.553.299.818.469.025.016.044.032.068.049.242.156.48.32.709.498.021.016.039.033.059.047.229.18.451.367.664.564.02.016.035.037.053.053.213.199.418.404.611.621.021.025.041.053.063.076.188.213.367.43.537.658.072.096.135.201.205.301.109.16.225.316.328.482.104.172.193.354.291.529.053.102.115.201.166.307.098.197.182.402.266.609.039.09.084.176.119.27.109.291.207.588.291.891.004.01.008.018.01.029.174.627.291 1.275.344 1.945.028.275.042.552.042.835m20.707 3.705V.398h-.74L27.735 20.41h16.313v5.191h4.441V20.41h5.188v-3.707h-5.188zm-4.442 0h-7.416l7.416-7.406v7.406z"
      fill="#686868"
    />
    <path
      d="M27.735 20.408l4.012-4.012c.305-1.084.477-2.219.477-3.398h-4.441c0 4.5-3.648 8.152-8.154 8.152a8.15 8.15 0 0 1-8.152-8.152 8.15 8.15 0 0 1 8.152-8.154c4.221 0 7.689 3.207 8.111 7.314-.428-5.334-4.885-9.535-10.338-9.535-5.734 0-10.375 4.646-10.375 10.375 0 6.957 5.639 12.602 12.602 12.602 4.186 0 7.883-2.049 10.174-5.191h-2.068z"
      fill="#ff7800"
    />
  </svg>
);

const Github = ({ size = 24, ...props }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="bg-gray-50/30 min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-6">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-2xl bg-white overflow-visible">
            <CardBody className="p-12 flex flex-col items-center text-center space-y-8">
              {/* Profile Header */}
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full" />
                <Avatar 
                  isBordered 
                  color="primary" 
                  src="https://github.com/chullin.png" 
                  className="w-24 h-24 text-large relative z-10"
                />
                <div className="absolute -bottom-1 -right-1 bg-success w-6 h-6 rounded-full border-4 border-white z-20" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900">Let's work together!</h2>
                <p className="text-gray-500 font-medium leading-relaxed">
                  歡迎隨時聯絡我！不論是技術交流、專案合作<br />
                  或是任何有趣的想法，都非常樂意討論。
                </p>
              </div>

              <Button
                as={Link}
                href="mailto:fg6ts15@gmail.com"
                color="primary"
                size="lg"
                className="w-full font-black py-8 text-xl shadow-xl shadow-blue-500/20"
                radius="full"
                startContent={<Mail size={24} />}
              >
                聯絡我 (Email Me)
              </Button>

              <div className="w-full space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <Divider className="flex-1 opacity-50" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap">Find me elsewhere</span>
                  <Divider className="flex-1 opacity-50" />
                </div>

                <div className="flex justify-center gap-6">
                   <Button
                    isIconOnly
                    as={Link}
                    href="https://github.com/chullin"
                    target="_blank"
                    variant="flat"
                    color="primary"
                    size="lg"
                    radius="full"
                    className="bg-primary/5 hover:bg-primary/10 w-16 h-16"
                  >
                    <Github size={28} />
                  </Button>
                  <Button
                    isIconOnly
                    as={Link}
                    href="https://profile.104.com.tw/profile/c71bed22-e78d-4e03-acdf-fb9c42e0076d/about?utm_source=104&utm_medium=resumes"
                    target="_blank"
                    variant="flat"
                    color="primary"
                    size="lg"
                    radius="full"
                    className="bg-primary/5 hover:bg-primary/10 w-16 h-16 overflow-hidden flex items-center justify-center"
                  >
                    <OneZeroFourLogo className="w-[80%] h-auto" />
                  </Button>
                  <Button
                    isIconOnly
                    onPress={() => alert('LINE ID: chullin')}
                    variant="flat"
                    color="primary"
                    size="lg"
                    radius="full"
                    className="bg-primary/5 hover:bg-primary/10 w-16 h-16"
                  >
                    <MessageSquare size={28} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full pt-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                    <Phone size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Phone</p>
                    <p className="text-sm font-bold text-gray-700">(+886) 960-967-058</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                    <Globe size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Location</p>
                    <p className="text-sm font-bold text-gray-700">Taipei, Taiwan</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
