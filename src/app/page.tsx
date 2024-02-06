export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24 bg-zinc-900">
        <h2 className='text-3xl sm:text-7xl text-white'>
        Study<span className="text-blue-500">+</span></h2>
        <p className="mb-10 text-1xl text-white text-center"> Feito para ajudar você na organização de suas tarefas! </p> 
      <h4 className='absolute bottom-14 text-white'> Feito por <a className="text-blue-500" href='https://www.linkedin.com/in/victor-lis-bronzo/' target='_blank'>Victor Lis</a> </h4>
    </main>
  );
}
