import BlogOverlay from '@/components/blog/BlogOverlay';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlogOverlay>
      {children}
    </BlogOverlay>
  );
}
