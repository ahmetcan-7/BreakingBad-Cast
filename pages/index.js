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

      <img
        src="https://iconape.com/wp-content/png_logo_vector/breaking-bad.png"
        className="max-h-40 m-auto"
      />
      <div className="bg-gray-100 ">
        <div className="card-group text-center mx-6 md:mx-8 lg:mx-10 xl:mx-12 ">
          <h1 className="text-3xl font-bold text-gray-700 p-5">Cast</h1>
          {characters.map((character) => (
            <Link
              href="/characters/[slug]"
              as={`/characters/${slug(character.name)}-${character.char_id}`}
              key={character.char_id}
            >
              <a>
                <div className="card inline-block p-2 h-54 w-60 mb-4">
                  <img
                    src={character.img}
                    width="110px"
                    height="110px"
                    className="rounded-full h-32 w-32 m-auto"
                  ></img>
                  <h2 className="mt-4 font-bold text-xl text-gray-700">
                    {character.name}
                  </h2>
                  <h3 className="text-sm font-normal text-gray-500">
                    {character.portrayed}
                  </h3>
                </div>
              </a>
            </Link>
          ))}
        </div>
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
