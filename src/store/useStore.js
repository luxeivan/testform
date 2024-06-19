import { create } from 'zustand'
import formJson from '../components/Form.json'

const useStore = create((set, get) => ({
    json: formJson,
    err: false,
    createJson: (value) => {
        try {
            set({ json: JSON.parse(value), err: false })
            localStorage.setItem('json', value)
        } catch (error) {
            console.log(error)
            set({ err: true })
        }
    },
    clearJson: () => {
        try {
            set({ json: formJson, err: false })
        } catch (error) {
            console.log(error)
            set({ err: true })
        }
    }

}))
export default useStore