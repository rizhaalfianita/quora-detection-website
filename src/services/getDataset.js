import { ref } from 'vue'
const getDataset = () => {
  const dataset = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      let data = await fetch('http://127.0.0.1:5000/dataset')
      if (!data.ok) {
        throw Error('No data available')
      }
      dataset.value = await data.json()
    } catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }
  return { dataset, error, load }
}
export default getDataset
