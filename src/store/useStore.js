import { create } from 'zustand'

const useStore = create((set, get) => ({
    json: [
        {
            "type": "divider",
            "label": "ФИО"
        },
        {
            "type": "textInput",
            "name": "Фамилия",
            "label": "Фамилия",
            "placeholder": "Иванов",
            "required": true
        },
    ],
    createJson: (value) => {
        try {
            set({ json: JSON.parse(value) })
            localStorage.setItem('json', value)
        } catch (error) {
            console.log(error)
        }
    }

}))
export default useStore