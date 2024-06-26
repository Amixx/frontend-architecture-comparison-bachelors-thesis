import fs from 'fs/promises'
import path from 'path'

const baseDir = '../results-data/'
const architectures = ['t-ssr', 'hda', 'spa', 'm-ssr', 'ssg']
const maxFiles = 5
const sitesToRoutes = {
  'content-platform': ['', 'about-us', 'news', 'offers', 'contacts'],
  'shopping-platform': ['', 'catalogue', 'cart', 'checkout'],
  'productivity-tool': [
    'authenticate',
    'todos',
    'todo-categories',
    'spent-times',
  ],
  'entertainment-platform': ['authenticate', '', 'video/1'],
  'social-network': ['authenticate', 'posts', 'posts/new', 'user/21'],
}

export default async function (site) {
  const data = {}

  const promises = architectures.flatMap((category, categoryIndex) => {
    if (
      category === 'ssg' &&
      site !== 'content-platform' &&
      site !== 'entertainment-platform'
    ) {
      return
    }

    data[category] = []

    return sitesToRoutes[site].map((route, routeIndex) => {
      data[category].push([])
      return Promise.all(
        Array.from({ length: maxFiles }, (_, i) => {
          const fileName = `${encodeURIComponent(`${route}\n`)}_${i + 1}.json`
          const filePath = path.join(`${baseDir}/${site}/`, category, fileName)
          return fs
            .readFile(filePath, 'utf8')
            .then((content) => {
              try {
                const json = JSON.parse(content)
                data[category][routeIndex].push(json)
              } catch (error) {
                console.error(`Error parsing JSON from ${filePath}: ${error}`)
              }
            })
            .catch((error) => {
              console.error(`Failed to load ${filePath}: ${error}`)
            })
        }),
      )
    })
  })

  await Promise.all(promises)

  return data
}
