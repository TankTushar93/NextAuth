'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePagebyid() {
  const searchParams = useSearchParams();
const router = useRouter();
  const name = searchParams.get('name');
  const email = searchParams.get('email');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">{name}</h1>
        <p className="mb-6 text-gray-500">{email}</p>

        <Link
       href={`/profile`}
     className="px-6 py-3 ml-2 text-white transition-transform transform bg-indigo-500 rounded-full ml-font-semibold hover:bg-indigo-600 active:scale-95"
      >
     Profile
     </Link>
      </div>
    </div>
  );
}
