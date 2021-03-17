export default class GetItem {
    /**
     * Return array with good paths according to items in localStorage
     * @throw Error if item not available in localStorage
     * @return {Array<String>} array path of images
     */
    static img_according_localStorage() {
        const array_path = [];
        let i;
        const obj_path = {
                            img1 : '../img/manette.png',
                            img2 : '../img/true.png',
                            img3 : '../img/mort.png',
                            img4 : '../img/carre.png',
                            img5 : '../img/false.png',
                            img6 : '../img/child.png',
        }
        
        for (i = 1; i < 3; i++) {           
            const item = window.localStorage.getItem(`player${i}`);
            if (item === null) {
                throw new Error("Un probleme est survenu dans la récupération des items dans le localStorage (img)");
            }
            array_path.push(obj_path[item]);
            }                  
        return array_path;
    }

    /**
     * 
     * @returns player
     * @throw Error if item not available in localStorage
     */
    static getStartPlayer() {
        const data = { p1: 'o', p2: 'x' };
        const getPlayer = window.localStorage.getItem('begin');
        if (getPlayer) {
            return data[getPlayer];           
        } else {
            throw new Error('Aucun "begin" item dans le localStorage');
        }

                
    }

}