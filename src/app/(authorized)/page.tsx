import BlogCard from "@/components/blog-card";

export default function HomePage() {
  const blogPosts = [
    { id: 1, public: true },
    { id: 2, public: false },
    { id: 3, public: true },
    { id: 4, public: false },
  ];

  return (
    <div className="">
      <h1>Blog</h1>
      <div className="flex flex-col gap-4 mt-4">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} isPublic={post.public} />
        ))}
      </div>
    </div>
  );
}
