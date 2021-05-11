import Head from 'next/head'
import slug from 'slug'
function EachCharacter({ character }) {
  return (
    <div>
      <Head>
        <title>Breaking Bad Cast</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <img
        src="https://iconape.com/wp-content/png_logo_vector/breaking-bad.png"
        className="max-h-40 m-auto"
      />

      <div className="text-center">
        <div>
          <img
            src={character[0].img}
            alt={character[0].name}
            width="700px"
            className=" m-auto"
          />
        </div>
        <h2 className="mt-4 font-bold text-xl text-gray-700">
          {character[0].nickname}
        </h2>
        <h3 className="text-sm font-normal text-gray-500">
          Played By {character[0].portrayed}
        </h3>
      </div>
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
