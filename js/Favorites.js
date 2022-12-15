export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
            .then(data => data.json())
            .then(({ login, name, public_repos, followers }) => ({
                login,
                name,
                public_repos,
                followers
            }))
    }
}

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    async add(username) {
        try {
            const user = await GithubUser.search(username)

            if (!user.login) {
                throw new Error('Usuário não encontrado!')
            }

            this.datas.forEach(userFav => {
                if (userFav.name === user.name){
                    throw new Error('Usuário já adicionado!')
                }

            })

            this.datas = [user, ...this.datas]
            
            this.update()
            this.save()
        } catch (error) {
            alert(error.message)
        }
    }

    load() {
        this.datas = JSON.parse(localStorage.getItem('@github-favorites:')) || []

        console.log(this.datas);
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.datas))
    }


    delete(user){
        const filteredData = this.datas.filter(data => data.login != user.login)
        
        this.datas = filteredData
        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)
        this.tbody = this.root.querySelector('table tbody')

    
        this.update()
        this.onAdd()
    }

    onAdd() {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
            value = ''
        }
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

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar esse usuário?')
                if(isOk){
                    this.delete(user)
                }
            }
            
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