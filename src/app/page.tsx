import Image from 'next/image'
import heroImg from '@/assets/hero.png'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)] bg-zinc-900">
      <h2 className='font-medium text-2xl mb-2 text-white'> Gerencia suas tarefas de maneira fácil </h2> 
      <h1 className='font-bold text-3xl mb-8 text-blue-600 md:text-4xl'> Agilizando seu aprendizado </h1>
      <Image 
        src={heroImg}
        alt='Imagem hero do dev controle'
        width={600}
        className='max-w-28'
      />
      {session?.user &&
        <Link
          className="font-bold text-1xl mt-7 px-5 py-2 bg-blue-600 text-white rounded hover:scale-105 duration-300"
          href="/dashboard"
        >
          Começar agora
        </Link>
      }
    </main>
  )
}
