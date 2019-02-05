class repoModel {
    
    constructor(dao) {
        this.dao = dao;
    }
    
    create() {

        return this.dao.run(`
            CREATE TABLE if not exists repos(
                id INTEGER UNIQUE,
                name TEXT,
                url TEXT)`);
    }
    
    all() {
        
        return this.dao.all(`SELECT * FROM repos`);
    }
    
    get(id) {
        
        return this.dao.get(`SELECT * FROM repos WHERE id = ?`, id);
    }
    
    insert(id, name, url) {
        
        return this.dao.run(
            `INSERT INTO repos (id, name, url) values(?,?,?)`,
            [id, name, url]);
    }
    
    deleteAll() {
        
        return this.dao.run(`DELETE FROM repos`);
    }
    
    delete(id){
        
        return this.dao.run(`DELETE FROM repos WHERE id = ?`,[id]);
    }
}

module.exports = repoModel;