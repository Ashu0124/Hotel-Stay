export default function Loader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-500 font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
