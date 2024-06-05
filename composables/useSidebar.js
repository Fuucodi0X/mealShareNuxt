const sideBarItems = [{title: "Home", icon: "lucide:home", url: "/"},{title: "Chefs", icon: "lucide:chef-hat", url: "/"},]

export function useSidebarItems(){
    const data = useState("sidebar-icons", () => sideBarItems)
    function addItem (sidebarItem) {
        data.value.push(sidebarItem)
    }
    return {
        data,
        addItem
    }
}