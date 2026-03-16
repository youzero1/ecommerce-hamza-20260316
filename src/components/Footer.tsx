export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-white mb-2">ShopNext</p>
        <p className="text-sm">© {new Date().getFullYear()} ShopNext. All rights reserved.</p>
        <p className="text-xs mt-2">Built with Next.js, TypeORM & Tailwind CSS</p>
      </div>
    </footer>
  );
}
