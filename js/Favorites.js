export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.datas = [
            {
                login: 'Givs',
                name: 'Givaldo Neto',
                public_repos: '25',
                followers: '120'
            },
            {
                login: 'diego3g',
                name: 'Diego Neto',
                public_repos: '25',
                followers: '120'
            }
        ]
    }
}

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)
        this.tbody = this.root.querySelector('table tbody')

    
        this.update()
    }

    update() {
        this.removeAllTr()

        this.datas.forEach(user => {
            const row = this.createRow()
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repos').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            this.tbody.append(row)
        })
    }

    removeAllTr(){
        this.tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove()
        })
    }

    createRow(){
        const tr = document.createElement('tr')

        tr.innerHTML = `
            <td class="user">
                <img src="https://github.com/Givs.png" alt="imagem de Givs">
                <a href="https://github.com/Givs" target="_blank">
                    <p>Givaldo Neto</p>
                    <span>Givs</span>
                </a>
            </td>
            <td class="repos">
                25
            </td>
            <td class="followers">
                1254
            </td>
            <td class="remove">&times;</td>
       
        `
        return tr
    }
}