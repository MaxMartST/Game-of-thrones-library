export default class GoService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + 
                `, received ${res.status}`);
        }

        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter)
    }

    async getCharecter(id) {
        const character = await this.getResource(`/characters/${id}`);  
        return this._transformCharacter(character);      
    }

    _transformCharacter(char) {
        const res = {
            name: null,
            gender: null,
            born: null,
            died: null,
            culture: null
        };

        for (let key in char)
        {
            if (!res.hasOwnProperty(key)) {
                continue;
            }
            if (char[key] === "") {
                res[key] = "no data";
            } else {
                res[key] = char[key];
            }
        }

        return res;
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transform(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}