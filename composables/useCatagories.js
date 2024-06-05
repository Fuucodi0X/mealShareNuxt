const catagories = ["Experimental","Fast Food", "Traditional"]

export function useAvalibleCatagories() {
    const data = useState("catagoriess", () => catagories)
    function addCatagory(catagory) {
        data.value.push(catagory)
    }
    return {data, addCatagory}
}

export function useSelectedCatagory() {
    const data = useState("selected-catagories", () => "All")
    return data
}