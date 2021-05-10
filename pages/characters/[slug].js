import Head from 'next/head'
import slug from 'slug'
function EachCharacter({ character }) {
  return (
    <div>
      <Head>
        <title>Breaking Bad Cast</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <figure>
        <img src={character[0].img} alt={character[0].name} />
      </figure>

      <div>{character[0].nickname}</div>
    </div>
  )
}

export async function getStaticPaths() {
  const data = await fetch('https://www.breakingbadapi.com/api/characters/')
  const characters = await data.json()
  return {
    paths: characters.map((character) => {
      return {
        params: { slug: `${slug(character.name)}-${character.char_id}` }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const id = params.slug.split('-').slice(-1)[0]
  const data = await fetch(
    `https://www.breakingbadapi.com/api/characters/${id}`
  )
  const character = await data.json()

  return {
    props: {
      character
    }
  }
}

export default EachCharacter
