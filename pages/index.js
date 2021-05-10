import Head from 'next/head'
import Link from 'next/link'
import slug from 'slug'
function HomePage({ characters }) {
  return (
    <div>
      <Head>
        <title>Breaking Bad Cast</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>
        {characters.map((character) => (
          <Link
            href="/characters/[slug]"
            as={`/characters/${slug(character.name)}-${character.char_id}`}
            key={character.char_id}
          >
            <a>
              <h2>{character.name}</h2>
              <h3>{character.portrayed}</h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('https://www.breakingbadapi.com/api/characters/')
  const characters = await data.json()

  return {
    props: {
      characters
    }
  }
}

export default HomePage
