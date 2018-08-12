import fetch from 'isomorphic-fetch'
import { server } from '../../config'

export function checkUserData (language = 'all') {  
  const encodedURI = encodeURI(`${server}/api/user`)
  return fetch(encodedURI, { credentials: 'include' })
    .then((data) => {
    	console.log(data.json())
    	return data.json()
    })
    .catch((error) => {
      console.warn(error)
      return null
    });
}

export function fetchDemoData (language = 'all') {  
  const encodedURI = encodeURI(`${server}/tests?lang=${language}`)
  return fetch(encodedURI, { credentials: 'include' })
    .then((data) => data.json())
    .catch((error) => {
      console.warn(error)
      return null
    });

}