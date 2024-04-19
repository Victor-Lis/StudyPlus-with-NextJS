
# Study Plus with NextJS

Esse é o meu primeiro projeto que posso postar aqui usando NextJS e TSX, migrei para o TS após entender o porque de seu uso, consegui entender que se torna muito mais fácil entender uma aplicação feita em TS do que uma usando apenas JS, tanto para outros devs, tanto para o próprio dev depois de um tempo.

Também é mais um projeto que vejo como Next realmente agiliza e facilita as coisas, o exemplo mais fácil que posso usar é que, esse projeto é uma releitura de um projeto que já venho insistindo em construir desde meados de 2023, a ideia começou em uma conversa com o [Vini Buava](https://github.com/Vinicius-B-Leite).


Passou por 3 versões: 
- HTML / CSS / JS no Front-End e Node / JSON no Back-End
- [React no Front-End](https://github.com/Victor-Lis/StudyPlus-Front-End) e [Prisma Schema no Back-End](https://github.com/Victor-Lis/StudyPlus-Back-End)
- E a atual, usando apenas NextJS e Prisma. A grande vantagem dessa versão é que as anteriores trabalhavam com armazenamento local e não tinham separações por user, a atual trabalha com um banco em nuvem e contém sistema de users, sendo assim pode ser acessada de qualquer lugar por qualquer pessoa!

## Techs
<div align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" width="40px" height="40px" alt="React">
  <img src="https://github.com/devicons/devicon/blob/master/icons/nextjs/nextjs-original.svg" width="40px" height="40px" alt="Next">
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" width="40px" height="40px" alt="PostgreSQL">
</div>

## Aprendizados
- Trabalhar com TS/TSX;
- Trabalhar com NextJS;
- Trabalhar com CSR e SSR;
- Utilizar Google Auth.

## Uso / Exemplos

### Next-Auth
Sem dúvidas um dos recursos que eu mais me interesso no NextJS é a biblioteca Next-Auth, pois permite inumeras formas de SignIn / SignUp nas aplicações, porém é tem uma arquitetura um tanto complexa de explicar por aqui, então deixarei o link para a documentação aqui a baixo:
[https://next-auth.js.org/](https://next-auth.js.org/)

Também deixo aqui os links que utilizei para autenticação utilizada nessa aplicação:
- [Prisma Adapter](https://next-auth.js.org/v3/adapters/prisma-legacy#setup)
- [Google Auth](https://next-auth.js.org/v3/providers/google)

### Server-side Rendering (SSR)
Outra feature muito bacana para mim do NextJS é o SSR e o CSR, como são conceitos relativamente simples, deixo abaixo um trecho de código da própria documentação e o link da mesma:
[https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering)

```js
export default function Page({ data }) {
  // Render data...
}
 
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
}
```

### Client-side Rendering (CSR)
Agora falando do CSR, ele é bem familiar ao React que já estamos acostumados, funcionando do lado do cliente, da mesma forma deixo o link da documentação e um trecho de código:
[https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering](https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering)

```js
import React, { useState, useEffect } from 'react'
 
export function Page() {
  const [data, setData] = useState(null)
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    }
 
    fetchData().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])
 
  return <p>{data ? `Your data: ${data}` : 'Loading...'}</p>
}
```

## Versões

### v1.91 <= 
- Implementação de novas rotas na API

## Autores

![Home](https://github.com/Victor-Lis/StudyPlus-with-NextJS/blob/master/public/project-images/StudyPlus.png)

![Semana](https://github.com/Victor-Lis/StudyPlus-with-NextJS/blob/master/public/project-images/Semana.png)

![Dia](https://github.com/Victor-Lis/StudyPlus-with-NextJS/blob/master/public/project-images/Day.png)

![Criar Tarefa](https://github.com/Victor-Lis/StudyPlus-with-NextJS/blob/master/public/project-images/Criar%20Tarefa.png)

![Editar Tarefa](https://github.com/Victor-Lis/StudyPlus-with-NextJS/blob/master/public/project-images/Editar%20Tarefa.png)

![Criar Categoria](https://github.com/Victor-Lis/StudyPlus-with-NextJS/blob/master/public/project-images/Criar%20Categoria.png)

![Editar Categoria](https://github.com/Victor-Lis/StudyPlus-with-NextJS/blob/master/public/project-images/Editar%20Categoria.png)

## [Confira você mesmo!](https://study-plus-by-dev-victor-lis.vercel.app/)

## Autores

- [@Victor-Lis](https://www.github.com/Victor-Lis)

