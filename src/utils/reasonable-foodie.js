import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export const getPlace = async (placeId) => {
  const rawResponse = await Vue.http.post('http://localhost:3000/api/place/details', {
    place_id: placeId
  })
  const response = JSON.parse(rawResponse.body)
  return response.result
}

export const getNearPlacesByType = async (location, radius, type) => {
  const rawResponse = await Vue.http.post('http://localhost:3000/api/place/nearbytype', {
    location: location,
    radius: radius,
    type: type
  })
  const response = JSON.parse(rawResponse.body)
  return response.results
}
