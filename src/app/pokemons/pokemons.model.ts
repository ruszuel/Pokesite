export interface pokebag {
    name: string,
    image: string,
    types: string | string[],
    id: number,
    height: number,
    weight: number,
    base_exp: number,
    stats: {
        hp: string,
        attack: string,
        defense: string,
        special_atk: string,
        special_def: string,
        speed: string,
    }
    abilities: {
        passive: string,
        active: string
    }
}