class Item {
    public icon: string;
    public link: string;
    public text: string;

    constructor(icon:string, link:string, text:string) {
        this.icon = `icon-${icon}`
        this.link = link
        this.text = text
    }
}

export default Item
